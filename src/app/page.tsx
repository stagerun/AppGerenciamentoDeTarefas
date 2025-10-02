import MainLayout from '@/components/Layout/MainLayout';
import PWAInstallPrompt from '@/components/PWA/PWAInstallPrompt';
import StatsOverview from '@/components/Dashboard/StatsOverview';
import CriticalTasks from '@/components/Dashboard/CriticalTasks';
import RecentActivity from '@/components/Dashboard/RecentActivity';
import ProductivityChart from '@/components/Dashboard/ProductivityChart';
import QuickActions from '@/components/Dashboard/QuickActions';

export default function Home() {
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
              Dashboard
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Visão geral do seu sistema de gerenciamento de tarefas
            </p>
          </div>

          {/* Stats Overview */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Estatísticas Gerais
            </h2>
            <StatsOverview />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <CriticalTasks />
              <RecentActivity />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <ProductivityChart />
              <QuickActions />
            </div>
          </div>
        </div>
        
        <PWAInstallPrompt />
      </div>
    </MainLayout>
  );
}
