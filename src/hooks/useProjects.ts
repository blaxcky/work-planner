import { useState, useEffect } from 'react';
import { projectService } from '../utils/database';
import type { Project } from '../types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Projekte');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await projectService.create(project);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen des Projekts');
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      await projectService.update(id, updates);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Aktualisieren des Projekts');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectService.delete(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen des Projekts');
    }
  };

  const archiveProject = async (id: string) => {
    try {
      await projectService.archive(id);
      await loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Archivieren des Projekts');
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    archiveProject,
    refreshProjects: loadProjects
  };
};