import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  BookOpen,
  Trophy,
  ArrowRight,
  Play,
  Sparkles,
  ChevronRight,
  Home,
  CheckCircle2,
  Layers,
  Terminal,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';

interface LanguageCard {
  id: string;
  name: string;
  version: string;
  category: string;
  group: 'web' | 'systems' | 'data';
  icon: string;
  accent: string;
  description: string;
  tags: string[];
}

const LANGUAGES: LanguageCard[] = [
  {
    id: 'python',
    name: 'Python',
    version: '3.10',
    category: 'CBSE Class 11-12 & AI',
    group: 'web',
    icon: '🐍',
    accent: '#42A5E8',
    description: 'The preferred language for Indian school curriculums, data science, and AI development.',
    tags: ['CBSE Aligned', 'Easy to Read', 'Data Science'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    version: 'ES2023',
    category: 'Full-Stack Web',
    group: 'web',
    icon: '⚡',
    accent: '#F5A623',
    description: 'The engine of the modern web. Master DOM manipulation, events, and asynchronous programming.',
    tags: ['Web Native', 'Interactive DOM', 'Full-Stack'],
  },
  {
    id: 'cpp',
    name: 'C++',
    version: 'GCC 10.2',
    category: 'Competitive Programming',
    group: 'systems',
    icon: '⚡',
    accent: '#6541F5',
    description: 'Blazing-fast execution, Standard Template Library (STL), and algorithmic problem solving.',
    tags: ['High Speed', 'STL Vectors', 'Competitions'],
  },
  {
    id: 'java',
    name: 'Java',
    version: 'OpenJDK 15',
    category: 'ICSE Syllabus & OOP',
    group: 'systems',
    icon: '☕',
    accent: '#E95778',
    description: 'Strict object-oriented foundations, encapsulation, inheritance, and ICSE Class 9/10 syllabus.',
    tags: ['ICSE Board', 'OOP Principles', 'Robust Typing'],
  },
  {
    id: 'c',
    name: 'C Language',
    version: 'C17',
    category: 'Systems & Hardware',
    group: 'systems',
    icon: '⚙️',
    accent: '#77778D',
    description: 'Understand memory addresses, pointers, binary manipulation, and how computers run code.',
    tags: ['Pointers', 'Low-level', 'Memory Model'],
  },
  {
    id: 'html',
    name: 'HTML & CSS',
    version: 'HTML5 / CSS3',
    category: 'Visual Web Design',
    group: 'web',
    icon: '🎨',
    accent: '#E95778',
    description: 'Design beautiful, responsive web interfaces with live instant sandbox rendering.',
    tags: ['Live Sandbox', 'Flexbox & Grid', 'Responsive'],
  },
  {
    id: 'sql',
    name: 'SQL',
    version: 'PostgreSQL / SQLite',
    category: 'Relational Databases',
    group: 'data',
    icon: '🗄️',
    accent: '#19B99A',
    description: 'Query, join, filter, and analyze relational data tables with declarative queries.',
    tags: ['Data Tables', 'SELECT / JOIN', 'CBSE Informatics'],
  },
];


function LanguageLogo({ id }: { id: string }) {
  switch (id) {
    case 'python':
      return (
        <svg viewBox="0 0 110 110" className="w-8 h-8 shrink-0 drop-shadow-sm" aria-label="Python">
          {/* Official Python Logo: Blue & Yellow Intertwined Snakes */}
          <path fill="#3776AB" d="M54.3 0.2c-14.7 0-23.8 6.5-23.8 19v13.9h24.4v3.5H20.1C8 36.6 0 45.4 0 62.4c0 16.5 8.9 25.9 23.6 25.9h8.1V76.8c0-13.7 11.7-25.6 25.4-25.6h24.4V47.7H57.1V31.5c0-11 9.4-19.4 20.3-19.4h16c-4.4-7.4-16.1-11.9-39.1-11.9zm-13 8.3a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z"/>
          <path fill="#FFD438" d="M56 109.8c14.7 0 23.8-6.5 23.8-19V76.9H55.4v-3.5h34.8c12.1 0 20.1-8.8 20.1-25.8 0-16.5-8.9-25.9-23.6-25.9h-8.1v11.5c0 13.7-11.7 25.6-25.4 25.6H28.8v3.5h24.4v16.2c0 11-9.4 19.4-20.3 19.4H16.9c4.4 7.4 16.1 11.9 39.1 11.9zm13-8.3a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2z"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 shrink-0 rounded-lg overflow-hidden shadow-xs" aria-label="JavaScript">
          {/* Official JavaScript Logo: Yellow background with bold black JS */}
          <rect width="100" height="100" fill="#F7DF1E"/>
          <path fill="#000000" d="M16.5 68.3l11.4-6.9c2.3 3.9 5.3 7 10.4 7 5.3 0 8.7-2.1 8.7-10.2V22.5h14.7v35.7c0 15.5-9.2 22.3-22 22.3-9.9 0-16.7-4.7-21.8-12.2zm46 7.8c2.9 4.9 6.8 8.5 13.8 8.5 5.8 0 9.5-2.9 9.5-7.1 0-4.9-3.9-6.7-10.5-9.6l-3.6-1.5c-10.4-4.5-17.4-10.1-17.4-22.1 0-11 8.4-19.3 21.6-19.3 9.4 0 16.2 3.5 20.8 11.8l-9.7 6.2c-2.3-4-4.7-5.8-11.1-5.8-4.7 0-8.1 3-8.1 6.6 0 4.3 3.2 6.1 9.2 8.7l3.6 1.6c12.3 5.3 18.9 10.8 18.9 23.2 0 13.3-10.4 20.7-24.1 20.7-13.5 0-21.3-6.6-24.9-15.4l12-6.7z"/>
        </svg>
      );
    case 'cpp':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 shrink-0 drop-shadow-xs" aria-label="C++">
          {/* Official C++ Logo: Blue Hexagonal Emblem with C++ */}
          <polygon fill="#00599C" points="50,4 90,27 90,73 50,96 10,73 10,27"/>
          <polygon fill="#004482" points="50,11 84,30 84,70 50,89 16,70 16,30"/>
          <path fill="#FFFFFF" d="M49 37c-2.8-2.6-6.6-4.2-11.2-4.2-9 0-15.8 7-15.8 16.2s6.8 16.2 15.8 16.2c4.6 0 8.4-1.6 11.2-4.2l5.8 5.4c-4.3 4.2-10.1 6.8-17 6.8-13.6 0-23.8-10.2-23.8-24.2s10.2-24.2 23.8-24.2c6.9 0 12.7 2.6 17 6.8L49 37z"/>
          <polygon fill="#FFFFFF" points="66,45 66,40 70,40 70,45 75,45 75,49 70,49 70,54 66,54 66,49 61,49 61,45"/>
          <polygon fill="#FFFFFF" points="82,45 82,40 86,40 86,45 91,45 91,49 86,49 86,54 82,54 82,49 77,49 77,45"/>
        </svg>
      );
    case 'java':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 shrink-0 drop-shadow-xs" aria-label="Java">
          {/* Official Java Logo: Steaming Cup in Red/Orange & Blue */}
          <path fill="#5382A1" d="M42 20c-6 6 1 12-1 18 5-4 6-9 1-18zm11-10c-9 9 2 18-3 28 7-6 9-13 3-28zm11 7c-6 5 1 11-1 17 5-4 6-8 1-17z"/>
          <path fill="#E76F00" d="M28 62c0 0 2 5 22 5s22-5 22-5-3 3-22 3-22-3-22-3zm-3 9c0 0 2 7 25 7s25-7 25-7-4 5-25 5-25-5-25-5zm5 11c0 0 3 5 20 5s20-5 20-5-3 3-20 3-20-3-20-3z"/>
          <path fill="#5382A1" d="M68 51c2-1 9-3 9-8s-6-5-10-1c2-3 6-5 11-5 7 0 12 4 12 9 0 8-11 11-18 13l-4-8z"/>
          <path fill="#E76F00" d="M24 49c0-6 5-10 11-11 6-1 11 0 15 0s11-1 15 0c6 1 11 5 11 11 0 13-13 17-26 17s-26-4-26-17z"/>
        </svg>
      );
    case 'c':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 shrink-0 drop-shadow-xs" aria-label="C">
          {/* Official C Logo: Classic Hexagonal Badge */}
          <polygon fill="#659AD2" points="50,4 90,27 90,73 50,96 10,73 10,27"/>
          <polygon fill="#00599C" points="50,11 84,30 84,70 50,89 16,70 16,30"/>
          <path fill="#FFFFFF" d="M57 37c-3.2-3-7.7-4.8-13-4.8-10.5 0-18.5 8.2-18.5 18.8s8 18.8 18.5 18.8c5.3 0 9.8-1.8 13-4.8l6.8 6.5C58.8 77.5 52 80 44 80 28 80 16 67.5 16 51s12-29 28-29c8 0 14.8 2.5 19.8 6.5L57 37z"/>
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 shrink-0 drop-shadow-xs" aria-label="HTML5 & CSS3">
          {/* Official HTML5 Orange Shield */}
          <g transform="translate(2, 10) scale(0.42)">
            <polygon fill="#E34F26" points="0,0 100,0 90.9,102.3 50,113.6 9.1,102.3"/>
            <polygon fill="#EF652A" points="50,9.3 50,104.5 82.5,95.5 89.9,11.6"/>
            <path fill="#FFFFFF" d="M50,44.7h-18l-1.2-14h19.2V19.4H17.8l3.6,40.7H50V44.7z M50,75.4L35.8,71.6l-0.9-10.4H23.5l1.8,20.4L50,88.2V75.4z"/>
            <path fill="#EBEBEB" d="M50,44.7h17.9l-1.7,19.2L50,67.7v12.8l24.7-6.8l2.6-29H50V44.7z M50,19.4v11.3h31.2l0.8-11.3H50z"/>
          </g>
          {/* Official CSS3 Blue Shield */}
          <g transform="translate(48, 10) scale(0.42)">
            <polygon fill="#1572B6" points="0,0 100,0 90.9,102.3 50,113.6 9.1,102.3"/>
            <polygon fill="#33A9DC" points="50,9.3 50,104.5 82.5,95.5 89.9,11.6"/>
            <path fill="#FFFFFF" d="M50,44.7h-18l-1.2-14h19.2V19.4H17.8l3.6,40.7H50V44.7z M50,75.4L35.8,71.6l-0.9-10.4H23.5l1.8,20.4L50,88.2V75.4z"/>
            <path fill="#EBEBEB" d="M50,44.7h17.9l-1.7,19.2L50,67.7v12.8l24.7-6.8l2.6-29H50V44.7z M50,19.4v11.3h31.2l0.8-11.3H50z"/>
          </g>
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 100 100" className="w-8 h-8 shrink-0 drop-shadow-xs" aria-label="SQL & PostgreSQL">
          {/* Official Relational DB Cylinder with SQL badge */}
          <ellipse cx="50" cy="22" rx="38" ry="14" fill="#336791"/>
          <ellipse cx="50" cy="20" rx="36" ry="12" fill="#4B88B8"/>
          <ellipse cx="50" cy="18" rx="32" ry="9" fill="#5C9ECE"/>
          <path fill="#336791" d="M12 22v26c0 8 17 14 38 14s38-6 38-14V22c-5 6-20 10-38 10S17 28 12 22z"/>
          <path fill="#4B88B8" d="M14 24v22c5 6 19 10 36 10s31-4 36-10V24c-5 5-18 8-36 8s-31-3-36-8z"/>
          <path fill="#295173" d="M12 48v26c0 8 17 14 38 14s38-6 38-14V48c-5 6-20 10-38 10S17 54 12 48z"/>
          <path fill="#336791" d="M14 50v22c5 6 19 10 36 10s31-4 36-10V50c-5 5-18 8-36 8s-31-3-36-8z"/>
          <rect x="25" y="76" width="50" height="18" rx="5" fill="#1E3A5F" stroke="#4B88B8" strokeWidth="1.5"/>
          <text x="50" y="89" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">SQL</text>
        </svg>
      );
    default:
      return <Code2 className="w-8 h-8 text-primary" />;
  }
}

export const CodeVersePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items } = useProgressStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'web' | 'systems' | 'data'>('all');

  const codeverseItems = items.filter((i) => i.module === 'codeverse');
  const completedCount = codeverseItems.filter((i) => i.completed).length;

  const filteredLanguages = selectedFilter === 'all'
    ? LANGUAGES
    : LANGUAGES.filter((l) => l.group === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-text-muted">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 hover:text-text-primary transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-text-muted/60" />
        <span className="text-[#6541F5] dark:text-[#7C5CFA] font-semibold flex items-center gap-1.5">
          <Code2 className="w-4 h-4" />
          CodeVerse
        </span>
      </nav>

      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE7FF] text-[#6541F5] dark:bg-[#26233E] dark:text-[#C4B5FD] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Code Studio • Piston Compiler
          </div>
          <h1 className="display-h1">
            VidyaVerse <span className="text-gradient-purple">CodeVerse</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
            Master coding through guided interactive lessons and algorithmic challenges. Execute Python,
            JavaScript, C++, Java, and SQL with instant test case verdicts.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/codeverse/learn')}
            className="btn-primary flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl"
          >
            <BookOpen className="w-4 h-4" />
            <span>Resume Lesson</span>
          </button>
          <button
            onClick={() => navigate('/codeverse/challenge')}
            className="btn-secondary flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl"
          >
            <Trophy className="w-4 h-4 text-[#F5A623]" />
            <span>Challenge Arena</span>
          </button>
        </div>
      </header>

      {/* 2 PRIMARY LEARNING PATHS: LEARN MODE VS CHALLENGE MODE */}
      <section className="space-y-3">
        <h2 className="section-h2 text-lg sm:text-xl">Choose Your Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Path 1: Learn Mode */}
          <div
            onClick={() => navigate('/codeverse/learn')}
            className="card p-6 hover:border-[#6541F5] hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#EAE7FF] text-[#6541F5] dark:bg-[#26233E] dark:text-[#C4B5FD] flex items-center justify-center shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="badge-purple">Step-by-Step Curriculum</span>
              </div>
              <h3 className="card-h3 text-xl group-hover:text-[#6541F5] dark:group-hover:text-[#7C5CFA] transition-colors">
                Interactive Learn Mode
              </h3>
              <p className="body-standard text-xs sm:text-sm text-text-muted leading-relaxed">
                Build rock-solid foundations from scratch. Concept breakdowns, visual code tracing, interactive
                multiple-choice checks, and incremental code builders for beginners.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#28B987]" /> 8 Languages
                </span>
                <span>•</span>
                <span>Beginner to Advanced</span>
                <span>•</span>
                <span>Self-Paced</span>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-between text-xs font-semibold text-[#6541F5] dark:text-[#7C5CFA]">
              <span>Explore curriculum lessons</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Path 2: Challenge Arena */}
          <div
            onClick={() => navigate('/codeverse/challenge')}
            className="card p-6 hover:border-[#F5A623] hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0D5] text-[#F5A623] dark:bg-[#35250D] flex items-center justify-center shadow-sm">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="badge-quest">Automated Judge</span>
              </div>
              <h3 className="card-h3 text-xl group-hover:text-[#F5A623] transition-colors">
                Code Challenge Arena
              </h3>
              <p className="body-standard text-xs sm:text-sm text-text-muted leading-relaxed">
                Sharpen algorithmic thinking with LeetCode-style problems. Live multi-language code editor with Monaco,
                Piston compiler backend, hidden edge test cases, and execution benchmarks.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-[#F5A623]" /> 10 Built-in Problems
                </span>
                <span>•</span>
                <span>Easy, Medium & Hard</span>
                <span>•</span>
                <span>XP Rewards</span>
              </div>
            </div>

            <div className="pt-5 flex items-center justify-between text-xs font-semibold text-[#F5A623]">
              <span>Enter challenge arena</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* LANGUAGE CATALOG */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="section-h2 text-lg sm:text-xl">Supported Languages & Stacks</h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Choose your stack to practice coding or solve algorithmic challenges.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'all', label: 'All Stacks' },
              { id: 'web', label: 'Web & Python' },
              { id: 'systems', label: 'Systems & C++' },
              { id: 'data', label: 'Data & SQL' },
            ].map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#6541F5] text-white shadow-sm'
                      : 'bg-card text-text-muted hover:text-text-primary border border-border'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLanguages.map((lang) => (
            <div
              key={lang.id}
              onClick={() => navigate(`/codeverse/challenge?lang=${lang.id}`)}
              className="card p-5 hover:border-[#6541F5] hover:shadow-card-hover transition-all duration-150 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <LanguageLogo id={lang.id} />
                    <div>
                      <h4 className="font-bold text-sm text-text-primary group-hover:text-[#6541F5] dark:group-hover:text-[#7C5CFA] transition-colors">
                        {lang.name}
                      </h4>
                      <span className="text-[10px] text-text-muted font-mono">{lang.version}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                  {lang.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lang.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-canvas border border-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-border mt-3 text-xs font-semibold text-[#6541F5] dark:text-[#7C5CFA]">
                <span>Practice {lang.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CodeVersePage;
