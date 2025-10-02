'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/store/useStore';
import MainLayout from '@/components/Layout/MainLayout';
import { User, Bell, Palette, Shield, Download, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Avatar from '@/components/Avatar';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme, markAllNotificationsAsRead, notifications } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };

  const handleClearNotifications = () => {
    markAllNotificationsAsRead();
    toast.success('Notificações marcadas como lidas!');
  };

  const handleExportData = () => {
    const data = {
      user,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflow-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Dados exportados com sucesso!');
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'appearance', name: 'Aparência', icon: Palette },
    { id: 'data', name: 'Dados', icon: Shield },
  ];

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
              Configurações
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Gerencie suas preferências e configurações pessoais
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-6 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Informações do Perfil
                  </h2>
                  
                  <div className="flex items-center space-x-4">
                    <Avatar
                      src={user?.avatar || ''}
                      alt={user?.name || ''}
                      className="w-20 h-20 rounded-full"
                      fallback={user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {user?.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </p>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                        user?.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {user?.role === 'admin' ? 'Administrador' : 'Membro'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        disabled
                        className="input bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="input bg-gray-50 dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="btn btn-danger"
                    >
                      Sair da Conta
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Configurações de Notificações
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          Notificações não lidas
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notifications.filter(n => !n.read).length} notificações pendentes
                        </p>
                      </div>
                      <button
                        onClick={handleClearNotifications}
                        className="btn btn-secondary"
                      >
                        Marcar todas como lidas
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Preferências de Notificação
                      </h4>
                      
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Novas tarefas atribuídas
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Atualizações de status
                          </span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Lembretes de prazo
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Aparência
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Tema
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-4 border-2 rounded-lg text-left ${
                            theme === 'light'
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            Claro
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Tema claro para ambientes bem iluminados
                          </div>
                        </button>
                        
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-4 border-2 rounded-lg text-left ${
                            theme === 'dark'
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            Escuro
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Tema escuro para reduzir fadiga ocular
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Tab */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Gerenciamento de Dados
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                        Exportar Dados
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                        Baixe uma cópia dos seus dados pessoais e configurações.
                      </p>
                      <button
                        onClick={handleExportData}
                        className="btn btn-primary"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Dados
                      </button>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">
                        Excluir Conta
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
                      </p>
                      <button
                        onClick={() => toast.error('Funcionalidade não implementada em demonstração')}
                        className="btn btn-danger"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Conta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}
