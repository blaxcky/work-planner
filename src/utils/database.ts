import Dexie, { type Table } from 'dexie';
import type { Project, Task, Tag, Settings, Attachment } from '../types';

export class WorkPlannerDatabase extends Dexie {
  projects!: Table<Project>;
  tasks!: Table<Task>;
  tags!: Table<Tag>;
  attachments!: Table<Attachment>;
  settings!: Table<Settings>;

  constructor() {
    super('WorkPlannerDatabase');
    
    this.version(1).stores({
      projects: '++id, name, color, createdAt, updatedAt, archived',
      tasks: '++id, projectId, title, status, priority, dueDate, createdAt, updatedAt, position',
      tags: '++id, name, color, createdAt',
      attachments: '++id, name, type, size, createdAt',
      settings: '++id'
    });
  }
}

export const db = new WorkPlannerDatabase();

// Initialize default settings if none exist
db.on('ready', async () => {
  const settingsCount = await db.settings.count();
  if (settingsCount === 0) {
    await db.settings.add({
      id: 'default',
      theme: 'system',
      defaultView: 'board',
      boardColumns: ['todo', 'in-progress', 'review', 'done'],
      notifications: true,
      autoSave: true
    } as Settings);
  }
});

// Project CRUD operations
export const projectService = {
  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    await db.projects.add(newProject);
    return newProject.id;
  },

  async getAll(): Promise<Project[]> {
    return await db.projects.where('archived').equals(0).toArray();
  },

  async getById(id: string): Promise<Project | undefined> {
    return await db.projects.get(id);
  },

  async update(id: string, updates: Partial<Project>): Promise<void> {
    await db.projects.update(id, {
      ...updates,
      updatedAt: new Date()
    });
  },

  async delete(id: string): Promise<void> {
    await db.projects.delete(id);
    // Also delete all tasks associated with this project
    await db.tasks.where('projectId').equals(id).delete();
  },

  async archive(id: string): Promise<void> {
    await db.projects.update(id, {
      archived: true,
      updatedAt: new Date()
    });
  }
};

// Task CRUD operations
export const taskService = {
  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const now = new Date();
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    await db.tasks.add(newTask);
    return newTask.id;
  },

  async getAll(): Promise<Task[]> {
    return await db.tasks.orderBy('position').toArray();
  },

  async getByProject(projectId: string): Promise<Task[]> {
    return await db.tasks.where('projectId').equals(projectId).sortBy('position');
  },

  async getByStatus(status: Task['status']): Promise<Task[]> {
    return await db.tasks.where('status').equals(status).sortBy('position');
  },

  async getById(id: string): Promise<Task | undefined> {
    return await db.tasks.get(id);
  },

  async update(id: string, updates: Partial<Task>): Promise<void> {
    const updateData: any = {
      ...updates,
      updatedAt: new Date()
    };
    
    if (updates.status === 'done' && !updates.completedAt) {
      updateData.completedAt = new Date();
    }
    
    await db.tasks.update(id, updateData);
  },

  async delete(id: string): Promise<void> {
    await db.tasks.delete(id);
  },

  async updatePosition(id: string, newPosition: number): Promise<void> {
    await db.tasks.update(id, {
      position: newPosition,
      updatedAt: new Date()
    });
  }
};

// Tag CRUD operations
export const tagService = {
  async create(tag: Omit<Tag, 'id' | 'createdAt'>): Promise<string> {
    const newTag: Tag = {
      ...tag,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    await db.tags.add(newTag);
    return newTag.id;
  },

  async getAll(): Promise<Tag[]> {
    return await db.tags.orderBy('name').toArray();
  },

  async getById(id: string): Promise<Tag | undefined> {
    return await db.tags.get(id);
  },

  async update(id: string, updates: Partial<Tag>): Promise<void> {
    await db.tags.update(id, updates);
  },

  async delete(id: string): Promise<void> {
    await db.tags.delete(id);
  }
};

// Settings operations
export const settingsService = {
  async get(): Promise<Settings> {
    const settings = await db.settings.get('default');
    if (!settings) {
      throw new Error('Settings not found');
    }
    return settings;
  },

  async update(updates: Partial<Settings>): Promise<void> {
    await db.settings.update('default', updates);
  }
};

// Attachment operations
export const attachmentService = {
  async create(attachment: Omit<Attachment, 'id' | 'createdAt'>): Promise<string> {
    const newAttachment: Attachment = {
      ...attachment,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    await db.attachments.add(newAttachment);
    return newAttachment.id;
  },

  async getById(id: string): Promise<Attachment | undefined> {
    return await db.attachments.get(id);
  },

  async delete(id: string): Promise<void> {
    await db.attachments.delete(id);
  }
};