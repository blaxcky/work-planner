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

  const statusIcons = {
    'todo': '📋',
    'in-progress': '⚡',
    'review': '👀',
    'done': '✅'
  };

  const columnStyles = {
    'todo': 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200',
    'in-progress': 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    'review': 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    'done': 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
  };

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl p-4 min-h-[600px] border-2 transition-all duration-200 ${
        columnStyles[id as keyof typeof columnStyles] || bgColor
      } ${
        isOver ? 'ring-2 ring-blue-400 ring-opacity-50 scale-[1.02] shadow-lg' : 'shadow-sm'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{statusIcons[id as keyof typeof statusIcons]}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-white bg-opacity-80 backdrop-blur-sm text-gray-700 text-sm px-3 py-1 rounded-full font-medium shadow-sm">
            {tasks.length}
          </span>
          {onAddTask && (
            <button
              onClick={() => onAddTask(id as Task['status'])}
              className="bg-white bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 text-gray-600 hover:text-blue-600 p-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md group"
              title="Neue Aufgabe"
            >
              <Plus size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Droppable Area */}
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className={`bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-8 text-center border-2 border-dashed transition-all duration-200 ${
              isOver ? 'border-blue-400 bg-blue-50 bg-opacity-80' : 'border-gray-300'
            }`}>
              <div className="text-4xl mb-2 opacity-50">
                {statusIcons[id as keyof typeof statusIcons]}
              </div>
              <p className="text-sm text-gray-600 font-medium">Keine Aufgaben</p>
              <p className="text-xs text-gray-500 mt-1">
                {isOver ? 'Hier ablegen!' : 'Ziehen Sie Aufgaben hierher'}
              </p>
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
      
      {/* Drop Zone Indicator */}
      {isOver && tasks.length > 0 && (
        <div className="mt-3 p-4 bg-blue-100 bg-opacity-80 backdrop-blur-sm border-2 border-dashed border-blue-400 rounded-xl text-center">
          <p className="text-sm text-blue-700 font-medium">Hier ablegen</p>
        </div>
      )}
    </div>
  );
};

export default DroppableColumn;