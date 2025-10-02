'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { CheckCircle, Plus, Edit, Trash2, User, FolderOpen, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Avatar from '@/components/Avatar';

export default function RecentActivity() {
  const { tasks, users, projects, notifications } = useStore();

  const recentActivity = React.useMemo(() => {
    const activities: any[] = [];

    // Adicionar tarefas recentes
    tasks
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
      .forEach(task => {
        const assignee = users.find(user => user.id === task.assigneeId);
        const project = projects.find(project => project.id === task.projectId);
        
        activities.push({
          id: `task-${task.id}`,
          type: 'task_created',
          title: 'Nova tarefa criada',
          description: task.title,
          user: assignee,
          project,
          timestamp: task.createdAt,
          icon: Plus,
          color: 'blue'
        });
      });

    // Adicionar tarefas completadas recentemente
    tasks
      .filter(task => task.status === 'completed')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 2)
      .forEach(task => {
        const assignee = users.find(user => user.id === task.assigneeId);
        const project = projects.find(project => project.id === task.projectId);
        
        activities.push({
          id: `completed-${task.id}`,
          type: 'task_completed',
          title: 'Tarefa concluída',
          description: task.title,
          user: assignee,
          project,
          timestamp: task.updatedAt,
          icon: CheckCircle,
          color: 'green'
        });
      });

    // Adicionar projetos recentes
    projects
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2)
      .forEach(project => {
        activities.push({
          id: `project-${project.id}`,
          type: 'project_created',
          title: 'Novo projeto criado',
          description: project.name,
          user: null,
          project: project,
          timestamp: project.createdAt,
          icon: FolderOpen,
          color: 'purple'
        });
      });

    // Adicionar notificações recentes
    notifications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2)
      .forEach(notification => {
        activities.push({
          id: `notification-${notification.id}`,
          type: 'notification',
          title: 'Nova notificação',
          description: notification.title,
          user: null,
          project: null,
          timestamp: notification.createdAt,
          icon: Clock,
          color: 'yellow'
        });
      });

    // Ordenar todas as atividades por timestamp
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);
  }, [tasks, users, projects, notifications]);

  const getActivityIcon = (activity: any) => {
    const Icon = activity.icon;
    const colorClasses = {
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
      yellow: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
    };
    
    return (
      <div className={`p-2 rounded-lg ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
        <Icon className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Atividade Recente
        </h3>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
            Últimas 24h
          </span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {recentActivity.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Nenhuma atividade recente
            </p>
          </div>
        ) : (
          recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                {getActivityIcon(activity)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {activity.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 text-right ml-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(activity.timestamp), { 
                          addSuffix: true, 
                          locale: ptBR 
                        })}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {format(new Date(activity.timestamp), 'HH:mm', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    {activity.user && (
                      <div className="flex items-center space-x-2">
                        <Avatar
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                          fallback={activity.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {activity.user.name}
                        </span>
                      </div>
                    )}
                    
                    {activity.project && (
                      <div className="flex items-center space-x-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: activity.project.color }}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {activity.project.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
