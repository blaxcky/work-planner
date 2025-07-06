import { useState } from 'react';
import type { Project } from '../../types';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import Button from '../common/Button';

interface ProjectListProps {
  projects: Project[];
  loading?: boolean;
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onArchiveProject: (id: string) => void;
}

const ProjectList = ({
  projects,
  loading = false,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onArchiveProject
}: ProjectListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    setFormLoading(true);
    try {
      await onCreateProject(projectData);
      setIsFormOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProject) return;
    
    setFormLoading(true);
    try {
      await onUpdateProject(editingProject.id, projectData);
      setEditingProject(undefined);
      setIsFormOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(undefined);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Projekt löschen möchten? Alle zugehörigen Aufgaben werden ebenfalls gelöscht.')) {
      await onDeleteProject(id);
    }
  };

  const handleArchive = async (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Projekt archivieren möchten?')) {
      await onArchiveProject(id);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projekte</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          Neues Projekt
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" 
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Noch keine Projekte
          </h3>
          <p className="text-gray-500 mb-4">
            Erstellen Sie Ihr erstes Projekt, um mit der Planung zu beginnen.
          </p>
          <Button onClick={() => setIsFormOpen(true)}>
            Erstes Projekt erstellen
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}

      <ProjectForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        project={editingProject}
        loading={formLoading}
      />
    </>
  );
};

export default ProjectList;