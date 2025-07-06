export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  assignedTo?: string;
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  position: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  data: string; // Base64 encoded data
  size: number;
  createdAt: Date;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultView: 'board' | 'calendar' | 'list';
  boardColumns: string[];
  notifications: boolean;
  autoSave: boolean;
}

export interface BoardColumn {
  id: string;
  name: string;
  status: Task['status'];
  position: number;
  color?: string;
}

export interface CalendarEvent {
  id: string;
  taskId: string;
  title: string;
  date: Date;
  type: 'due' | 'reminder' | 'created';
}

export type ViewType = 'board' | 'calendar' | 'list' | 'dashboard';
export type ThemeType = 'light' | 'dark' | 'system';
export type PriorityType = 'low' | 'medium' | 'high' | 'urgent';
export type StatusType = 'todo' | 'in-progress' | 'review' | 'done';