// Unified Mock Data Models for Autick Study Frontend
// This centralizes data structures to match expected Backend APIs

// 1. Turmas (Courses / Classes)
export const mockTurmas = [
  {
    id: '1',
    nome: 'Sistemas Operacionais',
    code: 'SO-2024-A',
    professor: 'Prof. Carlos Mendes',
    professorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-MmgNSQayP04gxtr2yRRvqbWWqbT3OQ6Y7zcIBgcD7S86HBt1t5_WZFhRZdOir79VVQnTtlW_YZSS_lXN-N8MvEipMWY6cnjngp7dLKIRYYieNYgzS5iFYJGqvGRDSewe3KxP7l40G865MgocnCpG97kKO1aO7I7jmX2-a_FpI7RNHrwiL28wKizht4hUVtlDoF3u-LKWtWgsaP-ZyCk0vB1kZav_XC3xJjrXwp1IyIxFv2FOcxW1fZttIjdWrqclpvRQlN7Nw00',
    horario: 'Seg/Qua 09:00',
    progresso: 75,
    proximaAula: 'Gerenciamento de Memória (Hoje)',
    nextClass: 'Hoje, 14:00',
    status: 'Em andamento',
    students: 42,
    materials: 18,
    lastUpdate: 'há 3 horas',
    gradient: 'kinetic-gradient',
    icon: 'memory',
    announcements: 2,
    pdfs: [
      { name: 'SO_Cap5_Deadlocks.pdf', size: '2.4 MB', date: '25 Mai 2024', pages: 34 }, 
      { name: 'SO_Cap6_Memoria_Virtual.pdf', size: '3.1 MB', date: '22 Mai 2024', pages: 41 },
      { name: 'Exercícios_Escalonamento.pdf', size: '890 KB', date: '20 Mai 2024', pages: 12 }
    ]
  },
  {
    id: '2',
    nome: 'Banco de Dados',
    code: 'BD-2024-A',
    professor: 'Profª. Ana Ferreira',
    professorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcl9nwC5RZHQLDHqPbW9uz0IoOF4Fo2cbsLBRdwDWJbvsJ2U1H6wJx0smGzq9YZh2GyCfHR54BubyO_MoFKxkBcKDjsd9g2H3wTxsCZwUr9w1lQ2QISlfS2UAxO7y6pt30dasCHM_N80-eKE0Z7oxG-Qhyc2swLoI-FHTEQDT6DfF8Ho5pTc524buHVEnB7s4VxvozjcuxW2Qc--OpQ9cGlCmlo9MqHxvCJyT83n31uhncNLFB1tH4XAacGYdLbfGcPTnA_GuT_gc',
    horario: 'Ter/Qui 14:00',
    progresso: 40,
    proximaAula: 'Normalização de Dados (Amanhã)',
    nextClass: 'Amanhã, 08:00',
    status: 'Em andamento',
    students: 38,
    materials: 12,
    lastUpdate: 'há 1 dia',
    gradient: 'action-gradient',
    icon: 'database',
    announcements: 0,
    pdfs: [
      { name: 'BD_Normalizacao_3FN.pdf', size: '1.8 MB', date: '24 Mai 2024', pages: 22 }, 
      { name: 'SQL_Avancado.pdf', size: '2.2 MB', date: '21 Mai 2024', pages: 30 }
    ]
  },
  {
    id: '3',
    nome: 'Engenharia de Software',
    code: 'ES-2024-A',
    professor: 'Prof. Ricardo Silva',
    professorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfMCTY-xWao40TGjR5mT_mu-KljjGICIOtrjmECqiJWXBxg9zjUV0k5yNzQ0steDv15nfFGckTIgp1VWGw1kYM5cKUSrR51mWxlVLxcDu-C3O8lE3CWBZWHeyyfofQ6kGF08WQZv_04YWqor9W6OlMJkUw82TAIMApecKm2aYLBRh-lAloCf63Gnb1sFZV725yIJHm9pEomWQ3LNDEZZmi29-wKcgbdqpu3zOTItK1rvFNZXUC3-doOBf-4kXNHBYsGtDzXREaVZY',
    horario: 'Sex 16:00',
    progresso: 15,
    proximaAula: 'Padrões de Projeto (Em 3 dias)',
    nextClass: 'Qui, 10:30',
    status: 'Nova',
    students: 55,
    materials: 24,
    lastUpdate: 'há 5 horas',
    gradient: 'kinetic-gradient',
    icon: 'psychology',
    announcements: 1,
    pdfs: [
      { name: 'ES_Design_Patterns.pdf', size: '4.2 MB', date: '25 Mai 2024', pages: 68 }, 
      { name: 'Clean_Architecture.pdf', size: '2.7 MB', date: '17 Mai 2024', pages: 32 }
    ]
  }
];

// 2. Materiais (PDFs, Videos, etc)
export const mockMaterials = [
  { id: 1, title: 'Introdução aos Sistemas Operacionais', type: 'PDF', size: '2.4 MB', date: 'Hoje', status: 'Processado' },
  { id: 2, title: 'Aula 4: Processos e Threads', type: 'Video', size: '145 MB', date: 'Ontem', status: 'Pendente' },
  { id: 3, title: 'Resumo Cap. 3 - Memória', type: 'Doc', size: '1.1 MB', date: 'Semana Passada', status: 'Processado' },
  { id: 4, title: 'Exercícios Práticos', type: 'PDF', size: '4.5 MB', date: 'Semana Passada', status: 'Erro' },
  { id: 4, title: 'Prática: Normalização', type: 'Doc', size: '1.2 MB', date: 'Há 3 dias', status: 'Processado' }
];

export const mockQuizzes = [
  {
    id: 1,
    title: 'Deadlocks e Processos',
    subject: 'Sistemas Operacionais',
    icon: 'memory',
    questions: 10,
    difficulty: 'Avançado',
    difficultyColor: 'text-orange-700 bg-orange-50',
    source: 'SO_Cap5_Deadlocks.pdf',
    progress: 70,
    bestScore: 85,
    completed: false,
  },
  {
    id: 2,
    title: 'Normalização de Dados',
    subject: 'Banco de Dados',
    icon: 'database',
    questions: 8,
    difficulty: 'Intermediário',
    difficultyColor: 'text-primary-container bg-blue-50',
    source: 'BD_Normalizacao_3FN.pdf',
    progress: 100,
    bestScore: 92,
    completed: true,
  },
  {
    id: 3,
    title: 'Protocolos TCP/IP',
    subject: 'Redes de Computadores',
    icon: 'lan',
    questions: 12,
    difficulty: 'Avançado',
    difficultyColor: 'text-orange-700 bg-orange-50',
    source: 'Redes_TCP_IP_Modelo.pdf',
    progress: 0,
    bestScore: null,
    completed: false,
  },
  {
    id: 4,
    title: 'Padrões de Projeto',
    subject: 'Engenharia de Software',
    icon: 'psychology',
    questions: 15,
    difficulty: 'Avançado',
    difficultyColor: 'text-orange-700 bg-orange-50',
    source: 'ES_Design_Patterns.pdf',
    progress: 40,
    bestScore: 60,
    completed: false,
  },
  {
    id: 5,
    title: 'Árvores Binárias',
    subject: 'Algoritmos',
    icon: 'account_tree',
    questions: 10,
    difficulty: 'Básico',
    difficultyColor: 'text-emerald-700 bg-emerald-50',
    source: 'Algo_Arvores_Binarias.pdf',
    progress: 100,
    bestScore: 100,
    completed: true,
  },
  {
    id: 6,
    title: 'Criptografia Simétrica',
    subject: 'Segurança da Informação',
    icon: 'enhanced_encryption',
    questions: 8,
    difficulty: 'Intermediário',
    difficultyColor: 'text-primary-container bg-blue-50',
    source: 'Seg_Criptografia.pdf',
    progress: 0,
    bestScore: null,
    completed: false,
  },
];

export const mockActiveQuiz = {
  title: 'Deadlocks e Processos',
  currentQuestion: 4,
  totalQuestions: 10,
  timeRemaining: '08:32',
  question: 'Qual das seguintes NÃO é uma condição necessária para a ocorrência de um Deadlock?',
  options: [
    { id: 'A', text: 'Exclusão Mútua', correct: false },
    { id: 'B', text: 'Preempção', correct: true },
    { id: 'C', text: 'Posse e Espera', correct: false },
    { id: 'D', text: 'Espera Circular', correct: false },
  ],
};



export const activeQuizData = {
  title: 'Deadlocks e Processos',
  currentQuestion: 4,
  totalQuestions: 10,
  timeRemaining: '08:32',
  question: 'Qual das seguintes NÃO é uma condição necessária para a ocorrência de um Deadlock?',
  options: [
    { id: 'A', text: 'Exclusão Mútua', correct: false },
    { id: 'B', text: 'Preempção', correct: true },
    { id: 'C', text: 'Posse e Espera', correct: false },
    { id: 'D', text: 'Espera Circular', correct: false },
  ],
};

// 4. Calendário (Eventos e Tarefas)
export const mockEvents = {
  student: [
    { time: '09:00', title: 'Matemática Discreta', location: 'Lab 3 • 2h', color: 'border-primary-container', bg: 'bg-blue-50' },
    { time: '14:30', title: 'Proj. Inteligência Art.', location: 'Meet • 45min', color: 'border-orange-500', bg: 'bg-orange-50' },
    { time: '16:00', title: 'Aulas de C/C++', location: 'Sala 4 • 1h 30m', color: 'border-secondary', bg: 'bg-blue-50' },
  ],
  professor: [
    { time: '09:00', title: 'Sist. Operacionais - Turma A', location: 'Sala 12 • 2h', color: 'border-primary-container', bg: 'bg-blue-50' },
    { time: '14:00', title: 'Sist. Operacionais - Turma B', location: 'Sala 12 • 2h', color: 'border-secondary', bg: 'bg-blue-50' },
    { time: '16:30', title: 'Reunião de Departamento', location: 'Gabinete • 1h', color: 'border-orange-500', bg: 'bg-orange-50' },
  ]
};

export const mockTasks = {
  student: [
    { text: 'Revisar Cap 3 (Grafos)', checked: true },
    { text: 'Enviar commit do projeto', checked: false },
    { text: 'Exercícios de Assembly', checked: false },
    { text: 'Configurar Docker', checked: false },
  ],
  professor: [
    { text: 'Corrigir provas de SO', checked: true },
    { text: 'Preparar slides Aula 8', checked: false },
    { text: 'Lançar notas parciais', checked: false },
    { text: 'Revisar TPs entregues', checked: false },
  ]
};

// 5. Chat History (Assistente)
export const mockChat = {
  student: {
    welcome: 'Olá, Gabriel! Estou pronto para ajudar com seus estudos. Hoje temos os módulos de Sistemas Operacionais e Computação na Nuvem em pauta. Como posso te auxiliar agora?',
    suggestions: [
      { text: '✨ Resumir última aula', color: 'blue' },
      { text: '🧠 Gerar Quiz rápido', color: 'blue' },
      { text: '📝 Criar Flashcards', color: 'orange' }
    ],
    messages: [
      {
        role: 'user',
        content: 'Pode me dar um resumo sobre Deadlocks e como evitá-los? Foca especialmente em Condições de Corrida.',
        time: '14:32',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcl9nwC5RZHQLDHqPbW9uz0IoOF4Fo2cbsLBRdwDWJbvsJ2U1H6wJx0smGzq9YZh2GyCfHR54BubyO_MoFKxkBcKDjsd9g2H3wTxsCZwUr9w1lQ2QISlfS2UAxO7y6pt30dasCHM_N80-eKE0Z7oxG-Qhyc2swLoI-FHTEQDT6DfF8Ho5pTc524buHVEnB7s4VxvozjcuxW2Qc--OpQ9cGlCmlo9MqHxvCJyT83n31uhncNLFB1tH4XAacGYdLbfGcPTnA_GuT_gc'
      },
      {
        role: 'assistant',
        title: 'Deadlocks e Condições de Corrida',
        content: 'Com certeza! A essência do problema são processos concorrentes disputando recursos e o conceito de Race Condition.',
        points: [
          { text: 'Um Deadlock requer as condições: exclusão mútua, posse-espera, não-preempção e espera circular.', type: 'warning' },
          { text: 'Para solucionar você pode quebrar uma das 4 condições usando mecanismos como o Algoritmo do Banqueiro.', type: 'info' },
          { text: 'As corridas são solucionadas via travas (Locks, Mutexes e Semáforos) nas Regiões Críticas.', type: 'info' }
        ],
        progress: {
          percentage: 75,
          title: 'Progresso do Módulo',
          subtitle: 'Visão geral do trópico concluída.'
        }
      }
    ]
  },
  professor: {
    welcome: 'Olá, Professor! Estou pronto para ajudar na gestão das suas turmas. Hoje temos os módulos de Sistemas Operacionais e Engenharia de Software em foco. Como posso auxiliá-lo agora?',
    suggestions: [
      { text: '✨ Gerar Plano de Aula', color: 'blue' },
      { text: '🧠 Criar Quiz para SO', color: 'blue' },
      { text: '📝 Analisar Notas', color: 'orange' }
    ],
    messages: [
      {
        role: 'user',
        content: 'Gostaria de criar 3 questões de escolha múltipla sobre "Preempção de Processos" com nível de dificuldade moderado.',
        time: '14:32',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100&q=80'
      },
      {
        role: 'assistant',
        title: 'Questões de SO: Preempção',
        content: 'Perfeito. Aqui estão 3 questões elaboradas para testar a compreensão dos alunos sobre escalonamento preemptivo:',
        points: [
          { text: 'Q1. Qual das opções caracteriza corretamente a interrupção de um processo num sistema preemptivo?', type: 'warning' },
          { text: 'Q2. Num algoritmo Round-Robin, o que acontece quando o quantum de tempo de um processo expira?', type: 'info' },
          { text: 'Q3. Em relação ao starvation, qual é o principal risco associado a políticas preemptivas estritas baseadas em prioridade?', type: 'info' }
        ],
        action: {
          title: 'Adicionar à Turma A',
          subtitle: 'Criar um mini-teste no sistema com estas questões.'
        }
      }
    ]
  }
};
