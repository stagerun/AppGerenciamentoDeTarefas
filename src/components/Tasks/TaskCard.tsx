'use client';

import React, { useState } from 'react';
import { Task } from '@/lib/mockData';
import { useStore } from '@/store/useStore';
import { Calendar, User, MoreVertical, Edit, Trash2, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

interface TaskCardProps {
  task: Task;
  users: Array<{ id: string; name: string; avatar: string }>;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
  medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300',
  urgent: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
};

const priorityIcons = {
  low: '🟢',
  medium: '🟡',
  high: '🟠',
  urgent: '🔴',
};

export default function TaskCard({ task, users, onEdit }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteTask, moveTask } = useStore();

  const assignee = task.assigneeId ? users.find(user => user.id === task.assigneeId) : null;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask(task.id);
      toast.success('Tarefa excluída com sucesso!');
    }
    setShowMenu(false);
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    moveTask(task.id, newStatus);
    toast.success('Status da tarefa atualizado!');
  };

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
    <div className={`task-card ${priorityColors[task.priority]} ${isOverdue ? 'ring-2 ring-red-500' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
            {task.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {task.description}
          </p>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit className="w-4 h-4 mr-3" />
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {getPriorityText(task.priority)}
          </span>
          <span className="text-xs">
            {priorityIcons[task.priority]}
          </span>
        </div>
        
        {assignee && (
          <div className="flex items-center space-x-2">
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {assignee.name}
            </span>
          </div>
        )}
      </div>

      {task.dueDate && (
        <div className={`flex items-center text-xs ${
          isOverdue ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'
        }`}>
          <Calendar className="w-3 h-3 mr-1" />
          {format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
          {isOverdue && <span className="ml-1 font-medium">(Atrasada)</span>}
        </div>
      )}

      {/* Status Actions */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex space-x-2">
          {task.status !== 'pending' && (
            <button
              onClick={() => handleStatusChange('pending')}
              className="flex-1 text-xs py-1 px-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Pendente
            </button>
          )}
          {task.status !== 'in-progress' && (
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="flex-1 text-xs py-1 px-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              Em andamento
            </button>
          )}
          {task.status !== 'completed' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="flex-1 text-xs py-1 px-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800"
            >
              Concluída
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
