import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/project/ProjectList';

const Projects = () => {
  const { 
    projects, 
    loading, 
    createProject, 
    updateProject, 
    deleteProject, 
    archiveProject 
  } = useProjects();

  return (
    <div className="p-6">
      <ProjectList
        projects={projects}
        loading={loading}
        onCreateProject={createProject}
        onUpdateProject={updateProject}
        onDeleteProject={deleteProject}
        onArchiveProject={archiveProject}
      />
    </div>
  );
};

export default Projects;