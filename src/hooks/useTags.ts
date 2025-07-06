import { useState, useEffect } from 'react';
import { tagService } from '../utils/database';
import type { Tag } from '../types';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTags = async () => {
    try {
      setLoading(true);
      const data = await tagService.getAll();
      setTags(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Tags');
    } finally {
      setLoading(false);
    }
  };

  const createTag = async (tag: Omit<Tag, 'id' | 'createdAt'>) => {
    try {
      await tagService.create(tag);
      await loadTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen des Tags');
    }
  };

  const updateTag = async (id: string, updates: Partial<Tag>) => {
    try {
      await tagService.update(id, updates);
      await loadTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Aktualisieren des Tags');
    }
  };

  const deleteTag = async (id: string) => {
    try {
      await tagService.delete(id);
      await loadTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen des Tags');
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return {
    tags,
    loading,
    error,
    createTag,
    updateTag,
    deleteTag,
    refreshTags: loadTags
  };
};