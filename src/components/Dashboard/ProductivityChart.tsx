'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, Target } from 'lucide-react';

export default function ProductivityChart() {
  const { tasks } = useStore();

  const chartData = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return last7Days.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const dayTasks = tasks.filter(task => 
        task.createdAt.startsWith(dateStr) || 
        (task.status === 'completed' && task.updatedAt.startsWith(dateStr))
      );
      
      const created = tasks.filter(task => task.createdAt.startsWith(dateStr)).length;
      const completed = tasks.filter(task => 
        task.status === 'completed' && task.updatedAt.startsWith(dateStr)
      ).length;
      
      return {
        day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        date: dateStr,
        created,
        completed,
        total: dayTasks.length
      };
    });
  }, [tasks]);

  const weeklyStats = React.useMemo(() => {
    const totalCreated = chartData.reduce((sum, day) => sum + day.created, 0);
    const totalCompleted = chartData.reduce((sum, day) => sum + day.completed, 0);
    const completionRate = totalCreated > 0 ? Math.round((totalCompleted / totalCreated) * 100) : 0;
    
    return {
      totalCreated,
      totalCompleted,
      completionRate,
      averagePerDay: Math.round(totalCreated / 7)
    };
  }, [chartData]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-blue-500/10 border border-white/20 dark:border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Produtividade da Semana
        </h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Últimos 7 dias
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Criadas</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {weeklyStats.totalCreated}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Concluídas</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {weeklyStats.totalCompleted}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Taxa</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {weeklyStats.completionRate}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Média/dia</p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {weeklyStats.averagePerDay}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="created" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              name="Criadas"
            />
            <Bar 
              dataKey="completed" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Concluídas"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}