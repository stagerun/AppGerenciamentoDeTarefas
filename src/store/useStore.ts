import { create } from 'zustand';
import { User, Project, Task, Notification } from '@/lib/mockData';
import { mockUsers, mockProjects, mockTasks, mockNotifications } from '@/lib/mockData';

interface AppState {
  // Users
  users: User[];
  currentUser: User | null;
  
  // Projects
  projects: Project[];
  
  // Tasks
  tasks: Task[];
  
  // Notifications
  notifications: Notification[];
  
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppState>()((set, get) => ({
      // Initial state
      users: mockUsers,
      currentUser: null,
      projects: mockProjects,
      tasks: mockTasks,
      notifications: mockNotifications,
      sidebarOpen: true,
      theme: 'light',
      
      // User actions
      setCurrentUser: (user) => set({ currentUser: user }),
      
      // Project actions
      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: (get().projects.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ projects: [...state.projects, newProject] }));
      },
      
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates, updatedAt: new Date().toISOString() }
              : project
          ),
        }));
      },
      
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          tasks: state.tasks.filter((task) => task.projectId !== id),
        }));
      },
      
      // Task actions
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: (get().tasks.length + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      moveTask: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },
      
      // Notification actions
      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: (get().notifications.length + 1).toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ notifications: [...state.notifications, newNotification] }));
      },
      
      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          ),
        }));
      },
      
      markAllNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
        }));
      },
      
      // UI actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    })
);
