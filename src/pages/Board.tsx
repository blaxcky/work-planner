import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import TaskCard from '../components/task/TaskCard';
import TaskForm from '../components/task/TaskForm';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import type { Task } from '../types';

const Board = () => {
  const { projects } = useProjects();
  const { tasks, createTask, updateTask, deleteTask } = useTasks();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const filteredTasks = selectedProjectId 
    ? tasks.filter(task => task.projectId === selectedProjectId)
    : tasks;

  const columns = [
    { status: 'todo' as const, title: 'To Do', bgColor: 'bg-gray-100' },
    { status: 'in-progress' as const, title: 'In Progress', bgColor: 'bg-yellow-100' },
    { status: 'review' as const, title: 'Review', bgColor: 'bg-blue-100' },
    { status: 'done' as const, title: 'Done', bgColor: 'bg-green-100' }
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks
      .filter(task => task.status === status)
      .sort((a, b) => a.position - b.position);
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createTask({
      ...taskData,
      projectId: selectedProjectId || taskData.projectId,
      position: filteredTasks.length
    });
    setIsTaskFormOpen(false);
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, taskData);
    setEditingTask(undefined);
    setIsTaskFormOpen(false);
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    await updateTask(taskId, { status: newStatus });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Aufgabe löschen möchten?')) {
      await deleteTask(taskId);
    }
  };

  const projectOptions = [
    { value: '', label: 'Alle Projekte' },
    ...projects.map(project => ({
      value: project.id,
      label: project.name
    }))
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
        <div className="flex items-center space-x-4">
          <div className="w-64">
            <Select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              options={projectOptions}
              placeholder="Projekt auswählen"
            />
          </div>
          <Button onClick={() => setIsTaskFormOpen(true)}>
            Neue Aufgabe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          
          return (
            <div key={column.status} className={`${column.bgColor} rounded-lg p-4 min-h-[500px]`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">{column.title}</h3>
                <span className="bg-white text-gray-600 text-sm px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {columnTasks.length === 0 ? (
                  <div className="bg-white bg-opacity-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Keine Aufgaben</p>
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                      draggable={true}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistics */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Board Statistiken</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {columns.map((column) => {
            const count = getTasksByStatus(column.status).length;
            const percentage = filteredTasks.length > 0 
              ? Math.round((count / filteredTasks.length) * 100) 
              : 0;
            
            return (
              <div key={column.status} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-500">{column.title}</div>
                <div className="text-xs text-gray-400">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        defaultProjectId={selectedProjectId}
      />
    </div>
  );
};

export default Board;