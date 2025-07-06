import { useState, useEffect } from 'react';
import type { Task } from '../../types';
import { useProjects } from '../../hooks/useProjects';
import { useTags } from '../../hooks/useTags';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Modal from '../common/Modal';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  task?: Task;
  defaultProjectId?: string;
  loading?: boolean;
}

const TaskForm = ({ isOpen, onClose, onSubmit, task, defaultProjectId, loading = false }: TaskFormProps) => {
  const { projects } = useProjects();
  const { tags } = useTags();
  
  const [formData, setFormData] = useState({
    projectId: defaultProjectId || '',
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    tags: [] as string[],
    position: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        projectId: task.projectId,
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        tags: task.tags || [],
        position: task.position
      });
    } else {
      setFormData({
        projectId: defaultProjectId || '',
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        tags: [],
        position: 0
      });
    }
    setErrors({});
  }, [task, defaultProjectId, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Aufgabentitel ist erforderlich';
    }

    if (!formData.projectId) {
      newErrors.projectId = 'Projekt ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit({
      projectId: formData.projectId,
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      tags: formData.tags,
      position: formData.position,
      attachments: []
    });
  };

  const handleClose = () => {
    setFormData({
      projectId: defaultProjectId || '',
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      tags: [],
      position: 0
    });
    setErrors({});
    onClose();
  };

  const handleTagToggle = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(t => t !== tagName)
        : [...prev.tags, tagName]
    }));
  };

  const projectOptions = projects.map(project => ({
    value: project.id,
    label: project.name
  }));

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Bearbeitung' },
    { value: 'review', label: 'Review' },
    { value: 'done', label: 'Erledigt' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Niedrig' },
    { value: 'medium', label: 'Mittel' },
    { value: 'high', label: 'Hoch' },
    { value: 'urgent', label: 'Dringend' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={task ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Aufgabentitel"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              placeholder="z.B. Homepage Design erstellen"
              required
            />
          </div>

          <Select
            label="Projekt"
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            options={projectOptions}
            error={errors.projectId}
            placeholder="Projekt auswählen"
            required
          />

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
            options={statusOptions}
          />

          <Select
            label="Priorität"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
            options={priorityOptions}
          />

          <Input
            label="Fälligkeitsdatum (optional)"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Beschreibung (optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Detaillierte Beschreibung der Aufgabe..."
          />
        </div>

        {tags.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.name)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm border transition-colors ${
                    formData.tags.includes(tag.name)
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Abbrechen
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {task ? 'Speichern' : 'Erstellen'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;