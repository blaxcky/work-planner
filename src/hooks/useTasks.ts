import { useState, useEffect } from 'react';
import { taskService } from '../utils/database';
import type { Task } from '../types';

export const useTasks = (projectId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = projectId 
        ? await taskService.getByProject(projectId)
        : await taskService.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Aufgaben');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await taskService.create(task);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen der Aufgabe');
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      await taskService.update(id, updates);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Aktualisieren der Aufgabe');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen der Aufgabe');
    }
  };

  const updateTaskPosition = async (id: string, newPosition: number) => {
    try {
      await taskService.updatePosition(id, newPosition);
      await loadTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Verschieben der Aufgabe');
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < now && 
      task.status !== 'done'
    );
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    updateTaskPosition,
    getTasksByStatus,
    getOverdueTasks,
    refreshTasks: loadTasks
  };
};