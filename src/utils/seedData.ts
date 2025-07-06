import { projectService, taskService, tagService } from './database';

export const initializeWithSampleData = async () => {
  try {
    // Check if data already exists
    const existingProjects = await projectService.getAll();
    if (existingProjects.length > 0) {
      return; // Data already exists
    }

    // Create sample tags
    await tagService.create({
      name: 'Web',
      color: '#3B82F6'
    });

    await tagService.create({
      name: 'Design',
      color: '#EC4899'
    });

    await tagService.create({
      name: 'Urgent',
      color: '#EF4444'
    });

    // Create sample projects
    const project1 = await projectService.create({
      name: 'Website Redesign',
      description: 'Komplettes Redesign der Firmenwebsite mit modernem Design und besserer UX',
      color: '#3B82F6',
      archived: false
    });

    const project2 = await projectService.create({
      name: 'Mobile App',
      description: 'Entwicklung einer nativen Mobile App für iOS und Android',
      color: '#10B981',
      archived: false
    });

    const project3 = await projectService.create({
      name: 'Marketing Kampagne',
      description: 'Q1 Marketing Kampagne für neue Produktlinie',
      color: '#F59E0B',
      archived: false
    });

    // Create sample tasks for Project 1 (Website Redesign)
    await taskService.create({
      projectId: project1,
      title: 'Wireframes erstellen',
      description: 'Detaillierte Wireframes für alle Hauptseiten erstellen',
      status: 'done',
      priority: 'high',
      tags: ['Design'],
      position: 0
    });

    await taskService.create({
      projectId: project1,
      title: 'UI Design System',
      description: 'Farben, Typografie und Komponenten definieren',
      status: 'in-progress',
      priority: 'high',
      tags: ['Design', 'Web'],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      position: 1
    });

    await taskService.create({
      projectId: project1,
      title: 'Frontend Entwicklung',
      description: 'React Components basierend auf Design System implementieren',
      status: 'todo',
      priority: 'medium',
      tags: ['Web'],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
      position: 2
    });

    await taskService.create({
      projectId: project1,
      title: 'Backend API',
      description: 'REST API für Content Management implementieren',
      status: 'todo',
      priority: 'medium',
      tags: ['Web'],
      position: 3
    });

    // Create sample tasks for Project 2 (Mobile App)
    await taskService.create({
      projectId: project2,
      title: 'App Konzept',
      description: 'Grundlegendes Konzept und User Journey definieren',
      status: 'done',
      priority: 'high',
      tags: ['Design'],
      position: 0
    });

    await taskService.create({
      projectId: project2,
      title: 'Prototyp erstellen',
      description: 'Klickbarer Prototyp in Figma erstellen',
      status: 'review',
      priority: 'high',
      tags: ['Design'],
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 days
      position: 1
    });

    await taskService.create({
      projectId: project2,
      title: 'iOS Entwicklung',
      description: 'Native iOS App in Swift entwickeln',
      status: 'todo',
      priority: 'medium',
      tags: [],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      position: 2
    });

    // Create sample tasks for Project 3 (Marketing)
    await taskService.create({
      projectId: project3,
      title: 'Zielgruppe analysieren',
      description: 'Detaillierte Analyse der Zielgruppe und Personas',
      status: 'done',
      priority: 'high',
      tags: [],
      position: 0
    });

    await taskService.create({
      projectId: project3,
      title: 'Content Strategie',
      description: 'Content Plan für Social Media und Blog erstellen',
      status: 'in-progress',
      priority: 'medium',
      tags: [],
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // +5 days
      position: 1
    });

    await taskService.create({
      projectId: project3,
      title: 'Kampagne Launch',
      description: 'Koordinierter Launch aller Marketing Kanäle',
      status: 'todo',
      priority: 'urgent',
      tags: ['Urgent'],
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // -2 days (overdue)
      position: 2
    });

    console.log('Sample data initialized successfully!');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};