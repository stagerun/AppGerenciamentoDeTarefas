'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { AlertTriangle, Clock, Flag, Calendar, CheckCircle } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Avatar from '@/components/Avatar';

export default function CriticalTasks() {
  const { tasks, users, projects } = useStore();

  const criticalTasks = React.useMemo(() => {
    const now = new Date();
    const threeDaysFromNow = addDays(now, 3);

    return tasks
      .filter(task => {
        // Tarefas urgentes (prioridade alta)
        if (task.priority === 'urgent') return true;
        
        // Tarefas atrasadas
        if (task.dueDate && new Date(task.dueDate) < now && task.status !== 'completed') return true;
        
        // Tarefas próximas do vencimento (3 dias)
        if (task.dueDate && new Date(task.dueDate) <= threeDaysFromNow && task.status !== 'completed') return true;
        
        return false;
      })
      .sort((a, b) => {
        // Ordenar por prioridade: urgent > high > medium > low
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        
        if (aPriority !== bPriority) return bPriority - aPriority;
        
        // Se mesma prioridade, ordenar por data de vencimento
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        
        return 0;
      })
      .slice(0, 5); // Mostrar apenas as 5 mais críticas
  }, [tasks]);

  const getTaskStatus = (task: any) => {
    if (!task.dueDate) return 'no-date';
    
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    
    if (dueDate < now) return 'overdue';
    if (isAfter(dueDate, now) && isBefore(dueDate, addDays(now, 1))) return 'due-today';
    if (isAfter(dueDate, now) && isBefore(dueDate, addDays(now, 3))) return 'due-soon';
    
    return 'normal';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'due-today': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'due-soon': return <Calendar className="w-4 h-4 text-yellow-500" />;
      default: return <Flag className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'overdue': return 'Atrasada';
      case 'due-today': return 'Vence hoje';
      case 'due-soon': return 'Vence em breve';
      default: return 'Normal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-red-600 dark:text-red-400';
      case 'due-today': return 'text-orange-600 dark:text-orange-400';
      case 'due-soon': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          Tarefas Críticas
        </h3>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
            {criticalTasks.length} tarefas
          </span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {criticalTasks.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Nenhuma tarefa crítica no momento! 🎉
            </p>
          </div>
        ) : (
          criticalTasks.map((task) => {
            const assignee = users.find(user => user.id === task.assigneeId);
            const project = projects.find(project => project.id === task.projectId);
            const taskStatus = getTaskStatus(task);
            
            return (
              <div
                key={task.id}
                className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                          {task.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      {assignee && (
                        <div className="flex items-center space-x-2">
                          <Avatar
                            src={assignee.avatar}
                            alt={assignee.name}
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                            fallback={assignee.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                          />
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                            {assignee.name}
                          </span>
                        </div>
                      )}
                      
                      {project && (
                        <div className="flex items-center space-x-1">
                          <div 
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                            {project.name}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(taskStatus)}
                      <span className={`text-xs sm:text-sm font-medium ${getStatusColor(taskStatus)}`}>
                        {getStatusText(taskStatus)}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(task.dueDate), 'dd/MM', { locale: ptBR })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
