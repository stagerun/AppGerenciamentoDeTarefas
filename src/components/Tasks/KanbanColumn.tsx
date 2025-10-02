'use client';

import React from 'react';
import { Task } from '@/lib/mockData';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  users: Array<{ id: string; name: string; avatar: string }>;
  onEditTask: (task: Task) => void;
  count: number;
}

const statusColors = {
  pending: 'border-gray-300 dark:border-gray-600',
  'in-progress': 'border-blue-300 dark:border-blue-600',
  completed: 'border-green-300 dark:border-green-600',
};

const headerColors = {
  pending: 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  'in-progress': 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  completed: 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300',
};

export default function KanbanColumn({ 
  title, 
  status, 
  tasks, 
  users, 
  onEditTask, 
  count 
}: KanbanColumnProps) {
  return (
    <div className={`kanban-column ${statusColors[status]}`}>
      <div className={`flex items-center justify-between mb-4 p-3 rounded-lg ${headerColors[status]}`}>
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm font-medium bg-white dark:bg-gray-700 px-2 py-1 rounded-full">
          {count}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-sm">Nenhuma tarefa</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
