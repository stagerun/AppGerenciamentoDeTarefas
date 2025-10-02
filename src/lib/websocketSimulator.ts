import { useStore } from '@/store/useStore';
import { Task } from '@/lib/mockData';

type EventType = 'task_updated' | 'task_created' | 'task_deleted' | 'notification_added' | 'project_updated';

interface WebSocketEvent {
  type: EventType;
  data: any;
  timestamp: string;
}

class WebSocketSimulator {
  private listeners: Map<EventType, Set<(event: WebSocketEvent) => void>> = new Map();
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;

  connect() {
    if (this.isConnected) return;
    
    this.isConnected = true;
    console.log('WebSocket Simulator: Connected');
    
    // Simular eventos periódicos
    this.intervalId = setInterval(() => {
      this.simulateRandomEvent();
    }, 30000); // Evento a cada 30 segundos
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
    console.log('WebSocket Simulator: Disconnected');
  }

  subscribe(eventType: EventType, callback: (event: WebSocketEvent) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);
  }

  unsubscribe(eventType: EventType, callback: (event: WebSocketEvent) => void) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  private emit(eventType: EventType, data: any) {
    const event: WebSocketEvent = {
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
    };

    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }

  private simulateRandomEvent() {
    const events = [
      'task_updated',
      'notification_added',
    ] as EventType[];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    
    switch (randomEvent) {
      case 'task_updated':
        this.simulateTaskUpdate();
        break;
      case 'notification_added':
        this.simulateNotification();
        break;
    }
  }

  private simulateTaskUpdate() {
    const store = useStore.getState();
    const tasks = store.tasks;
    
    if (tasks.length === 0) return;
    
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    const statuses: Array<Task['status']> = ['pending', 'in-progress', 'completed'];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    if (newStatus !== randomTask.status) {
      store.updateTask(randomTask.id, { status: newStatus });
      
      this.emit('task_updated', {
        taskId: randomTask.id,
        newStatus,
        task: { ...randomTask, status: newStatus },
      });
    }
  }

  private simulateNotification() {
    const store = useStore.getState();
    const currentUser = store.currentUser;
    
    if (!currentUser) return;
    
    const notifications = [
      'Nova tarefa atribuída a você',
      'Tarefa atualizada por um membro da equipe',
      'Projeto atualizado',
      'Lembrete: Tarefa próxima do prazo',
    ];
    
    const randomMessage = notifications[Math.floor(Math.random() * notifications.length)];
    
    store.addNotification({
      title: 'Atualização em tempo real',
      message: randomMessage,
      type: 'info',
      read: false,
      userId: currentUser.id,
    });
    
    this.emit('notification_added', {
      message: randomMessage,
    });
  }

  // Método para simular eventos específicos
  simulateTaskCreated(task: any) {
    this.emit('task_created', { task });
  }

  simulateTaskDeleted(taskId: string) {
    this.emit('task_deleted', { taskId });
  }

  simulateProjectUpdated(project: any) {
    this.emit('project_updated', { project });
  }
}

// Instância singleton
export const websocketSimulator = new WebSocketSimulator();

// Hook para usar o WebSocket Simulator
export function useWebSocket() {
  return {
    connect: () => websocketSimulator.connect(),
    disconnect: () => websocketSimulator.disconnect(),
    subscribe: websocketSimulator.subscribe.bind(websocketSimulator),
    unsubscribe: websocketSimulator.unsubscribe.bind(websocketSimulator),
    simulateTaskCreated: websocketSimulator.simulateTaskCreated.bind(websocketSimulator),
    simulateTaskDeleted: websocketSimulator.simulateTaskDeleted.bind(websocketSimulator),
    simulateProjectUpdated: websocketSimulator.simulateProjectUpdated.bind(websocketSimulator),
  };
}
