'use client';

import React from 'react';
import { Task } from '@/lib/mockData';
import { Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Avatar from '@/components/Avatar';

interface RecentTasksProps {
  tasks: Task[];
  users: Array<{ id: string; name: string; avatar: string }>;
}

const priorityColors = {
  low: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
  medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
};

const statusColors = {
  pending: 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300',
  'in-progress': 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
  completed: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
};

export default function RecentTasks({ tasks, users }: RecentTasksProps) {
  const getUserById = (id: string) => users.find(user => user.id === id);
  
  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'in-progress': return 'Em andamento';
      case 'completed': return 'Concluída';
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Tarefas Recentes
      </h3>
      <div className="space-y-4">
        {tasks.slice(0, 5).map((task) => {
          const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;
          
          return (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {task.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {task.description}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
                    {getStatusText(task.status)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                    {getPriorityText(task.priority)}
                  </span>
                  {task.dueDate && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {assignee && (
                  <div className="flex items-center space-x-2">
                    <Avatar
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="w-6 h-6 rounded-full"
                      fallback={assignee.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {assignee.name}
                    </span>
                  </div>
                )}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  {format(new Date(task.createdAt), 'dd/MM', { locale: ptBR })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
