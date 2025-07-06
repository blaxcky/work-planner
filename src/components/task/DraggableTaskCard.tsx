import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { Task } from '../../types';

interface DraggableTaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
}

const DraggableTaskCard = ({ task, onEdit, onDelete }: DraggableTaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: 'task',
      task,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 border-gray-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200'
  };

  const priorityLabels = {
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    urgent: 'Dringend'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 shadow-lg rotate-3' : ''
      } ${isOverdue ? 'border-red-300' : 'border-gray-200'}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 -ml-1 text-gray-400 hover:text-gray-600"
          >
            <GripVertical size={16} />
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Task Title */}
            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
              {task.title}
            </h4>

            {/* Task Description */}
            {task.description && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Priority and Due Date */}
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                {priorityLabels[task.priority]}
              </span>

              {task.dueDate && (
                <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                  {isOverdue ? 'Überfällig: ' : 'Fällig: '}
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {task.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{task.tags.length - 3} weitere
                  </span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors"
                  title="Bearbeiten"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                  className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                  title="Löschen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableTaskCard;