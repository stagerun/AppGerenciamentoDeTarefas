export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: string | null;
  projectId: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  userId: string;
  createdAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    createdAt: '2024-01-04T00:00:00Z',
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Desenvolvimento de plataforma de e-commerce completa',
    color: '#3b82f6',
    members: ['1', '2', '3'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Aplicativo móvel para iOS e Android',
    color: '#10b981',
    members: ['1', '2', '4'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Campanha de marketing digital para Q1 2024',
    color: '#f59e0b',
    members: ['1', '3', '4'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Configurar banco de dados',
    description: 'Configurar PostgreSQL e criar tabelas iniciais',
    status: 'completed',
    priority: 'high',
    assigneeId: '2',
    projectId: '1',
    dueDate: '2024-01-20T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Implementar autenticação',
    description: 'Sistema de login e registro de usuários',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '3',
    projectId: '1',
    dueDate: '2024-01-25T00:00:00Z',
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Design da interface',
    description: 'Criar wireframes e protótipos da interface',
    status: 'pending',
    priority: 'medium',
    assigneeId: '4',
    projectId: '2',
    dueDate: '2024-01-30T00:00:00Z',
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '4',
    title: 'Configurar CI/CD',
    description: 'Pipeline de integração e deploy contínuo',
    status: 'pending',
    priority: 'medium',
    assigneeId: '2',
    projectId: '1',
    dueDate: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-19T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '5',
    title: 'Pesquisa de mercado',
    description: 'Análise da concorrência e tendências',
    status: 'in-progress',
    priority: 'low',
    assigneeId: '3',
    projectId: '3',
    dueDate: '2024-02-05T00:00:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
    createdBy: '1',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nova tarefa atribuída',
    message: 'Você foi atribuído à tarefa "Implementar autenticação"',
    type: 'info',
    read: false,
    userId: '3',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Tarefa concluída',
    message: 'A tarefa "Configurar banco de dados" foi marcada como concluída',
    type: 'success',
    read: false,
    userId: '1',
    createdAt: '2024-01-18T15:30:00Z',
  },
  {
    id: '3',
    title: 'Prazo próximo',
    message: 'A tarefa "Design da interface" vence em 2 dias',
    type: 'warning',
    read: true,
    userId: '4',
    createdAt: '2024-01-22T09:00:00Z',
  },
];
