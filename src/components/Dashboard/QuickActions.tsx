'use client';

import React from 'react';
import { Plus, FolderOpen, CheckSquare, BarChart3, Users, Settings } from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Nova Tarefa',
      description: 'Criar uma nova tarefa',
      icon: Plus,
      href: '/tasks',
      color: 'blue',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Novo Projeto',
      description: 'Criar um novo projeto',
      icon: FolderOpen,
      href: '/projects',
      color: 'purple',
      bgColor: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Ver Tarefas',
      description: 'Gerenciar todas as tarefas',
      icon: CheckSquare,
      href: '/tasks',
      color: 'green',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Relatórios',
      description: 'Ver análises e métricas',
      icon: BarChart3,
      href: '/settings',
      color: 'orange',
      bgColor: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Equipe',
      description: 'Gerenciar membros',
      icon: Users,
      href: '/teams',
      color: 'indigo',
      bgColor: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Configurações',
      description: 'Configurar sistema',
      icon: Settings,
      href: '/settings',
      color: 'gray',
      bgColor: 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20',
      borderColor: 'border-gray-200 dark:border-gray-800',
      textColor: 'text-gray-600 dark:text-gray-400'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Ações Rápidas
        </h3>
        <div className="flex items-center space-x-2">
          <Plus className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Acesso rápido
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`bg-gradient-to-br ${action.bgColor} p-4 rounded-xl border ${action.borderColor} hover:shadow-lg transition-all duration-300 transform hover:scale-105 group`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
