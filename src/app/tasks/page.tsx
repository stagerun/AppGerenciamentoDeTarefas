'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import MainLayout from '@/components/Layout/MainLayout';
import KanbanColumn from '@/components/Tasks/KanbanColumn';
import TaskModal from '@/components/Tasks/TaskModal';
import { Plus, Filter, Search } from 'lucide-react';
import { Task } from '@/lib/mockData';

export default function TasksPage() {
  const { tasks, users, projects } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = !filterProject || task.projectId === filterProject;
      const matchesAssignee = !filterAssignee || task.assigneeId === filterAssignee;
      
      return matchesSearch && matchesProject && matchesAssignee;
    });
  }, [tasks, searchTerm, filterProject, filterAssignee]);

  const tasksByStatus = useMemo(() => {
    const pending = filteredTasks.filter(task => task.status === 'pending');
    const inProgress = filteredTasks.filter(task => task.status === 'in-progress');
    const completed = filteredTasks.filter(task => task.status === 'completed');
    
    return { pending, inProgress, completed };
  }, [filteredTasks]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Gerenciamento de Tarefas
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize e acompanhe o progresso das suas tarefas
            </p>
          </div>
          <button
            onClick={handleCreateTask}
            className="btn btn-primary mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Tarefa
          </button>
        </div>

        {/* Filters */}
        <div className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input"
              />
            </div>
            
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="input"
            >
              <option value="">Todos os projetos</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="input"
            >
              <option value="">Todos os responsáveis</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <KanbanColumn
            title="Pendentes"
            status="pending"
            tasks={tasksByStatus.pending}
            users={users}
            onEditTask={handleEditTask}
            count={tasksByStatus.pending.length}
          />
          
          <KanbanColumn
            title="Em Andamento"
            status="in-progress"
            tasks={tasksByStatus.inProgress}
            users={users}
            onEditTask={handleEditTask}
            count={tasksByStatus.inProgress.length}
          />
          
          <KanbanColumn
            title="Concluídas"
            status="completed"
            tasks={tasksByStatus.completed}
            users={users}
            onEditTask={handleEditTask}
            count={tasksByStatus.completed.length}
          />
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={editingTask}
        />
      </div>
    </MainLayout>
  );
}
