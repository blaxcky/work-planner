Hier ist ein ausführlicher Prompt für Claude Code:

```markdown
# Projektmanagement Tool - Personal Planner

## Projektbeschreibung

Erstelle ein modernes, browserbasiertes Projektmanagement-Tool ähnlich wie Microsoft Planner für den persönlichen Gebrauch. Das Tool soll eine intuitive Kanban-Board-Oberfläche bieten, mit der ich meine Projekte, Aufgaben und Termine effizient verwalten kann.

**WICHTIG: Das Tool MUSS als Progressive Web App (PWA) entwickelt werden!**

### Kernfunktionen:
- **Kanban-Board System** mit Drag & Drop Funktionalität
- **Projekt- und Aufgabenverwaltung** mit verschiedenen Status-Spalten
- **Kalenderansicht** für zeitbasierte Planung
- **Dashboard** mit Übersicht über alle Projekte und Statistiken
- **Tagging-System** für bessere Organisation
- **Suchfunktion** über alle Projekte und Aufgaben
- **Dunkler/Heller Modus** für bessere Nutzererfahrung
- **PWA Features**: App-Installation, Offline-Funktionalität, Push-Benachrichtigungen

### Technische Anforderungen:
- **Frontend**: React mit TypeScript
- **Styling**: Tailwind CSS für modernes, responsives Design
- **State Management**: Zustand oder Context API
- **Datenspeicherung**: Ausschließlich IndexedDB (keine externe Datenbank!)
- **Icons**: Lucide React oder Heroicons
- **Drag & Drop**: react-beautiful-dnd oder dnd-kit
- **Datum/Zeit**: date-fns für Datumsoperationen
- **Build Tool**: Vite für schnelle Entwicklung
- **PWA**: Vite PWA Plugin für Service Worker und Web App Manifest
- **Hosting**: GitHub Pages für kostenlose HTTPS-Bereitstellung

## Detaillierte Todo-Liste

### Phase 1: Projekt-Setup und Grundstruktur
- [ ] Vite React TypeScript Projekt initialisieren
- [ ] Tailwind CSS einrichten und konfigurieren
- [ ] Ordnerstruktur erstellen (components, pages, hooks, utils, types)
- [ ] IndexedDB Wrapper erstellen mit Dexie.js
- [ ] Basis-Typen definieren (Project, Task, Tag, etc.)
- [ ] Router Setup mit React Router
- [ ] PWA Setup mit Vite PWA Plugin (Service Worker, Web App Manifest)
- [ ] GitHub Pages Deployment Setup (GitHub Actions)

### Phase 2: Datenschicht und IndexedDB
- [ ] IndexedDB Schema definieren:
  - Projects Tabelle
  - Tasks Tabelle
  - Tags Tabelle
  - Settings Tabelle
- [ ] CRUD Operationen implementieren:
  - [ ] createProject, updateProject, deleteProject, getProjects
  - [ ] createTask, updateTask, deleteTask, getTasks
  - [ ] createTag, updateTag, deleteTag, getTags
- [ ] Custom Hooks für Datenzugriff erstellen
- [ ] Offline-First Strategie implementieren

### Phase 3: UI Komponenten
- [ ] Layout-Komponenten:
  - [ ] Header mit Navigation
  - [ ] Sidebar für Projektliste
  - [ ] Main Content Area
- [ ] Projekt-Komponenten:
  - [ ] ProjectCard
  - [ ] ProjectList
  - [ ] ProjectForm (Erstellen/Bearbeiten)
- [ ] Task-Komponenten:
  - [ ] TaskCard mit Drag & Drop
  - [ ] TaskForm (Erstellen/Bearbeiten)
  - [ ] TaskDetails Modal
- [ ] Gemeinsame Komponenten:
  - [ ] Button, Input, Select, Modal
  - [ ] DatePicker
  - [ ] TagSelector
  - [ ] SearchBar

### Phase 4: Kanban-Board Funktionalität
- [ ] Board-Layout mit Spalten (Todo, In Progress, Review, Done)
- [ ] Drag & Drop zwischen Spalten implementieren
- [ ] Spalten dynamisch hinzufügen/entfernen
- [ ] Swimlanes nach Projekten oder Tags
- [ ] Board-Filter (nach Projekt, Tag, Fälligkeit)
- [ ] Board-Ansicht speichern

### Phase 5: Kalender-Integration
- [ ] Monatsansicht implementieren
- [ ] Wochenansicht implementieren
- [ ] Tasks im Kalender anzeigen
- [ ] Drag & Drop im Kalender für Terminverschiebung
- [ ] Heute-Markierung und Navigation
- [ ] Fälligkeits-Erinnerungen

### Phase 6: Dashboard und Analytik
- [ ] Übersichts-Dashboard erstellen:
  - [ ] Anzahl offener Tasks
  - [ ] Überfällige Tasks
  - [ ] Projekt-Fortschritt
  - [ ] Aktivitäts-Timeline
- [ ] Charts implementieren (Chart.js oder Recharts):
  - [ ] Task-Verteilung nach Status
  - [ ] Produktivitäts-Trends
  - [ ] Projekt-Burndown

### Phase 7: Erweiterte Features
- [ ] Globale Suche implementieren
- [ ] Filter und Sortieroptionen
- [ ] Bulk-Operationen (mehrere Tasks auswählen)
- [ ] Task-Templates erstellen
- [ ] Recurring Tasks
- [ ] Markdown-Support in Task-Beschreibungen
- [ ] Datei-Attachments (als Base64 in IndexedDB)

### Phase 8: UI/UX Verbesserungen
- [ ] Dark/Light Mode Toggle
- [ ] Keyboard Shortcuts implementieren
- [ ] Responsive Design für Mobile
- [ ] Loading States und Skeleton Screens
- [ ] Toast-Benachrichtigungen
- [ ] Undo/Redo Funktionalität
- [ ] Onboarding für neue Nutzer

### Phase 9: Performance und Optimierung
- [ ] React.memo für schwere Komponenten
- [ ] Virtualisierung für lange Listen
- [ ] IndexedDB Queries optimieren
- [ ] Lazy Loading implementieren
- [ ] Service Worker für Offline-Funktionalität (bereits durch PWA Setup)
- [ ] Bundle-Size optimieren
- [ ] PWA Features testen (Installation, Offline-Modus, Update-Mechanismus)
- [ ] GitHub Pages Deployment testen und finalisieren

### Phase 10: Export und Backup
- [ ] Export zu JSON
- [ ] Export zu CSV
- [ ] Import von JSON Backup
- [ ] Automatische lokale Backups
- [ ] Print-freundliche Ansichten

## Datenmodelle

```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  assignedTo?: string; // Für zukünftige Erweiterung
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  position: number; // Für Drag & Drop Reihenfolge
}

interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultView: 'board' | 'calendar' | 'list';
  boardColumns: string[];
  // weitere Einstellungen...
}
```

## Zusätzliche Hinweise

- Verwende moderne React Patterns (Hooks, Function Components)
- Implementiere Error Boundaries für robuste Fehlerbehandlung
- Achte auf Accessibility (ARIA Labels, Keyboard Navigation)
- Verwende TypeScript strict mode
- Schreibe sauberen, kommentierten Code
- Erstelle eine README.md mit Setup-Anweisungen
- **PWA Requirements**: 
  - App muss installierbar sein (Web App Manifest)
  - Offline-Funktionalität durch Service Worker
  - Responsive Design für alle Geräte
  - Schnelle Ladezeiten und Performance
  - HTTPS-Bereitstellung für PWA Features
- **GitHub Pages Deployment**:
  - Vite Base URL für GitHub Pages konfigurieren
  - GitHub Actions für automatisches Deployment
  - Korrekte Routing-Konfiguration für SPA

Beginne mit dem Projekt-Setup und arbeite dich systematisch durch die Phasen. Priorität haben die Grundfunktionen (Projekte und Tasks erstellen/verwalten) bevor erweiterte Features implementiert werden.
```

## Erinnerungen/Notizen

- commite änderungen direkt