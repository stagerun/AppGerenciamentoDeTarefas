'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { CheckCircle, Clock, AlertTriangle, Users, FolderOpen, TrendingUp } from 'lucide-react';

export default function StatsOverview() {
  const { tasks, projects, users } = useStore();

  const stats = React.useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const overdueTasks = tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      task.status !== 'completed'
    ).length;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const activeProjects = projects.length;
    const teamMembers = users.length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      overdueTasks,
      completionRate,
      activeProjects,
      teamMembers
    };
  }, [tasks, projects, users]);

  const statCards = [
    {
      title: 'Total de Tarefas',
      value: stats.totalTasks,
      icon: CheckCircle,
      color: 'blue',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Concluídas',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Em Andamento',
      value: stats.inProgressTasks,
      icon: Clock,
      color: 'yellow',
      bgColor: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Atrasadas',
      value: stats.overdueTasks,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Projetos Ativos',
      value: stats.activeProjects,
      icon: FolderOpen,
      color: 'purple',
      bgColor: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Taxa de Conclusão',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'indigo',
      bgColor: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgColor} p-6 rounded-xl border ${stat.borderColor} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-white/50 dark:bg-gray-800/50`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
