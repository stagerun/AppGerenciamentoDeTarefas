'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import MainLayout from '@/components/Layout/MainLayout';
import { Users, Mail, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Avatar from '@/components/Avatar';

export default function TeamsPage() {
  const { users, tasks, projects } = useStore();

  const getUserStats = (userId: string) => {
    const userTasks = tasks.filter(task => task.assigneeId === userId);
    const completed = userTasks.filter(task => task.status === 'completed').length;
    const inProgress = userTasks.filter(task => task.status === 'in-progress').length;
    const pending = userTasks.filter(task => task.status === 'pending').length;
    const overdue = userTasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      task.status !== 'completed'
    ).length;
    
    return {
      total: userTasks.length,
      completed,
      inProgress,
      pending,
      overdue,
      completionRate: userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0,
    };
  };

  const getUserProjects = (userId: string) => {
    return projects.filter(project => project.members.includes(userId));
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 space-y-8 p-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Equipes
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Gerencie membros da equipe e acompanhe a produtividade
            </p>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Total de Membros
                </h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Tarefas Concluídas
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {tasks.filter(task => task.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Em Andamento
                </h3>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {tasks.filter(task => task.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Atrasadas
                </h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {tasks.filter(task => 
                    task.dueDate && 
                    new Date(task.dueDate) < new Date() && 
                    task.status !== 'completed'
                  ).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {users.map((user) => {
            const stats = getUserStats(user.id);
            const userProjects = getUserProjects(user.id);
            
            return (
              <div key={user.id} className="card p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                    fallback={user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {user.role === 'admin' ? 'Administrador' : 'Membro'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {stats.total}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total de Tarefas
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.completionRate}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Taxa de Conclusão
                    </p>
                  </div>
                </div>

                {/* Task Status */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Concluídas</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {stats.completed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Em andamento</span>
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">
                      {stats.inProgress}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Pendentes</span>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      {stats.pending}
                    </span>
                  </div>
                  {stats.overdue > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-600 dark:text-red-400">Atrasadas</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {stats.overdue}
                      </span>
                    </div>
                  )}
                </div>

                {/* Projects */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Projetos ({userProjects.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProjects.slice(0, 3).map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center space-x-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {project.name}
                        </span>
                      </div>
                    ))}
                    {userProjects.length > 3 && (
                      <div className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          +{userProjects.length - 3} mais
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    Membro desde {format(new Date(user.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </MainLayout>
  );
}
