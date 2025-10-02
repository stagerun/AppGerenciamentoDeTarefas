# 🚀 TaskFlow - Sistema de Gerenciamento de Tarefas

<div align="center">
  <img src="public/icon.svg" alt="TaskFlow Logo" width="120" height="120">
  
  **Sistema completo de gerenciamento de tarefas e projetos com interface moderna**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-4285F4?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
</div>

## ✨ Características

### 🎯 **Funcionalidades Principais**
- 📊 **Dashboard Completo** - Visão geral com estatísticas e gráficos
- 📋 **Gerenciamento de Tarefas** - Criação, edição e acompanhamento de tarefas
- 🏢 **Gestão de Projetos** - Organização de projetos com equipes
- 👥 **Sistema de Equipes** - Colaboração entre membros
- ⚙️ **Configurações** - Personalização da experiência
- 🔔 **Notificações** - Sistema de alertas em tempo real

### 🎨 **Interface Moderna**
- 🌈 **Design Responsivo** - Funciona perfeitamente em desktop e mobile
- 🌙 **Modo Escuro/Claro** - Alternância automática de temas
- ✨ **Animações Suaves** - Transições e efeitos visuais
- 🎭 **Glassmorphism** - Efeitos de vidro e transparência
- 📱 **PWA Ready** - Instalável como aplicativo nativo

### 🛠️ **Tecnologias**
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Estado**: Zustand para gerenciamento global
- **Autenticação**: Context API com localStorage
- **PWA**: Service Worker, Manifest, Offline Support
- **Ícones**: Lucide React
- **Gráficos**: Recharts
- **Notificações**: React Hot Toast

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/stagerun/AppGerenciamentoDeTarefas.git
cd AppGerenciamentoDeTarefas
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Dashboard principal
│   ├── login/            # Página de login
│   ├── projects/         # Gestão de projetos
│   ├── tasks/            # Gestão de tarefas
│   ├── teams/            # Gestão de equipes
│   └── settings/         # Configurações
├── components/            # Componentes reutilizáveis
│   ├── Dashboard/        # Componentes do dashboard
│   ├── Layout/           # Layout e navegação
│   ├── Tasks/            # Componentes de tarefas
│   └── PWA/              # Componentes PWA
├── contexts/             # Contextos React
├── lib/                  # Utilitários e dados mock
├── store/                # Estado global (Zustand)
└── types/                # Definições TypeScript
```

## 🎯 Funcionalidades Detalhadas

### 📊 Dashboard
- **Estatísticas Gerais**: Total de tarefas, projetos, membros
- **Tarefas Críticas**: Tarefas com prazo próximo
- **Atividade Recente**: Timeline de atividades
- **Gráfico de Produtividade**: Análise de performance
- **Ações Rápidas**: Acesso rápido a funções principais

### 📋 Tarefas
- **Kanban Board**: Visualização em colunas (Pendente, Em Andamento, Concluída)
- **Filtros Avançados**: Por projeto, responsável, status, data
- **Prioridades**: Sistema de priorização visual
- **Comentários**: Sistema de comunicação
- **Anexos**: Upload de arquivos

### 🏢 Projetos
- **Gestão Completa**: Criação, edição, exclusão
- **Equipes**: Atribuição de membros
- **Progresso**: Acompanhamento visual
- **Cores**: Identificação visual por cores
- **Estatísticas**: Métricas de performance

### 👥 Equipes
- **Membros**: Gestão de usuários
- **Performance**: Acompanhamento individual
- **Projetos**: Distribuição de projetos
- **Estatísticas**: Métricas de produtividade

## 🎨 Design System

### Cores
- **Primária**: Azul (#3b82f6)
- **Secundária**: Roxo (#8b5cf6)
- **Sucesso**: Verde (#10b981)
- **Aviso**: Amarelo (#f59e0b)
- **Erro**: Vermelho (#ef4444)

### Tipografia
- **Fonte Principal**: Inter, system-ui, sans-serif
- **Tamanhos**: 12px, 14px, 16px, 18px, 24px, 32px, 48px

### Componentes
- **Cards**: Glassmorphism com blur
- **Botões**: Gradientes e hover effects
- **Inputs**: Bordas arredondadas e focus states
- **Modais**: Overlay com animações

## 📱 PWA Features

- **Instalável**: Pode ser instalado como app nativo
- **Offline**: Funciona sem conexão
- **Push Notifications**: Notificações em tempo real
- **Service Worker**: Cache inteligente
- **Manifest**: Configuração de app

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
npm run type-check   # Verificação de tipos
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Stagerun**
- GitHub: [@stagerun](https://github.com/stagerun)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide](https://lucide.dev/) - Ícones
- [Recharts](https://recharts.org/) - Gráficos
- [Zustand](https://zustand-demo.pmnd.rs/) - Estado global

---

<div align="center">
  <p>Feito com ❤️ por <strong>Stagerun</strong></p>
  <p>⭐ Se gostou, deixe uma estrela!</p>
</div>