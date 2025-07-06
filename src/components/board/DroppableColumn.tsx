import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import DraggableTaskCard from '../task/DraggableTaskCard';
import type { Task } from '../../types';

interface DroppableColumnProps {
  id: string;
  title: string;
  bgColor: string;
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
  onAddTask?: (status: Task['status']) => void;
}

const DroppableColumn = ({
  id,
  title,
  bgColor,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onAddTask
}: DroppableColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'column',
      status: id as Task['status'],
    }
  });

  return (
    <div
      ref={setNodeRef}
      className={`${bgColor} rounded-lg p-4 min-h-[500px] transition-colors ${
        isOver ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="bg-white text-gray-600 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
          {onAddTask && (
            <button
              onClick={() => onAddTask(id as Task['status'])}
              className="bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 p-1 rounded-full transition-colors"
              title="Neue Aufgabe"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>

      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-white bg-opacity-50 rounded-lg p-4 text-center border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-500">Keine Aufgaben</p>
              <p className="text-xs text-gray-400 mt-1">Ziehen Sie Aufgaben hierher</p>
            </div>
          ) : (
            tasks.map((task) => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default DroppableColumn;