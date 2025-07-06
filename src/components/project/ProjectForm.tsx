import { useState, useEffect } from 'react';
import type { Project } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  project?: Project;
  loading?: boolean;
}

const PROJECT_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const ProjectForm = ({ isOpen, onClose, onSubmit, project, loading = false }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: PROJECT_COLORS[0],
    archived: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || '',
        color: project.color,
        archived: project.archived
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: PROJECT_COLORS[0],
        archived: false
      });
    }
    setErrors({});
  }, [project, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Projektname ist erforderlich';
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
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      color: formData.color,
      archived: formData.archived
    });
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      color: PROJECT_COLORS[0],
      archived: false
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={project ? 'Projekt bearbeiten' : 'Neues Projekt'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Projektname"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="z.B. Website Redesign"
          required
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Beschreibung (optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Beschreibung des Projekts..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Projektfarbe
          </label>
          <div className="flex flex-wrap gap-2">
            {PROJECT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-full border-2 ${
                  formData.color === color ? 'border-gray-400' : 'border-gray-200'
                } hover:border-gray-400 transition-colors`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="archived"
            checked={formData.archived}
            onChange={(e) => setFormData({ ...formData, archived: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="archived" className="text-sm text-gray-700">
            Projekt archiviert
          </label>
        </div>

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
            {project ? 'Speichern' : 'Erstellen'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectForm;