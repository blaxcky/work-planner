import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import DroppableColumn from '../components/board/DroppableColumn';
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
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<Task['status'] | null>(null);

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
    const statusToUse = newTaskStatus || taskData.status;
    const statusTasks = getTasksByStatus(statusToUse);
    
    await createTask({
      ...taskData,
      projectId: selectedProjectId || taskData.projectId,
      status: statusToUse,
      position: statusTasks.length
    });
    
    setIsTaskFormOpen(false);
    setNewTaskStatus(null);
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, taskData);
    setEditingTask(undefined);
    setIsTaskFormOpen(false);
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newStatusTasks = getTasksByStatus(newStatus);
    await updateTask(taskId, { 
      status: newStatus,
      position: newStatusTasks.length
    });
  };

  const handleAddTaskToColumn = (status: Task['status']) => {
    setNewTaskStatus(status);
    setIsTaskFormOpen(true);
  };

  // Drag and Drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;
    const overData = over.data.current;

    // Check if dropping on a column
    if (overData?.type === 'column') {
      const newStatus = overData.status as Task['status'];
      if (activeTask.status !== newStatus) {
        const newStatusTasks = getTasksByStatus(newStatus);
        await updateTask(activeTask.id, {
          status: newStatus,
          position: newStatusTasks.length
        });
      }
      return;
    }

    // Check if reordering within the same column
    const overTask = tasks.find(t => t.id === overId);
    if (!overTask || activeTask.status !== overTask.status) return;

    const statusTasks = getTasksByStatus(activeTask.status);
    const oldIndex = statusTasks.findIndex(t => t.id === activeTask.id);
    const newIndex = statusTasks.findIndex(t => t.id === overId);

    if (oldIndex !== newIndex) {
      const reorderedTasks = arrayMove(statusTasks, oldIndex, newIndex);
      
      // Update positions for all tasks in the column
      for (let i = 0; i < reorderedTasks.length; i++) {
        await updateTask(reorderedTasks[i].id, { position: i });
      }
    }
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

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.status);
            
            return (
              <DroppableColumn
                key={column.status}
                id={column.status}
                title={column.title}
                bgColor={column.bgColor}
                tasks={columnTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
                onAddTask={handleAddTaskToColumn}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-80">
              <TaskCard
                task={activeTask}
                draggable={false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

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
        defaultStatus={newTaskStatus || undefined}
      />
    </div>
  );
};

export default Board;