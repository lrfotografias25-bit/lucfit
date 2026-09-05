import { useState } from "react";
import {
  Dumbbell, TrendingUp, Zap, Calendar, ChevronRight,
  Home, BookOpen, User, Trophy, Play, BarChart3, LogOut, Sun, Moon
} from "lucide-react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart
} from "recharts";
import { studentData, todayWorkout, nextWorkout, progressChartData, workoutExercises } from "../data/mockData";
import WorkoutMode from "./WorkoutMode";
import ExerciseLibrary from "./ExerciseLibrary";

interface Props {
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

type Tab = "inicio" | "treino" | "evolucao" | "exercicios" | "perfil";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 text-xs shadow-lg">
        <div className="text-foreground-sub mb-2">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-foreground">{p.value} kg</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function StudentDashboard({ onLogout, isDark, onToggleTheme }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("inicio");
  const [workoutActive, setWorkoutActive] = useState(false);

  if (workoutActive) {
    return <WorkoutMode onExit={() => setWorkoutActive(false)} />;
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "inicio", label: "Início", icon: <Home size={20} /> },
    { id: "treino", label: "Treino", icon: <Dumbbell size={20} /> },
    { id: "evolucao", label: "Evolução", icon: <TrendingUp size={20} /> },
    { id: "exercicios", label: "Exercícios", icon: <BookOpen size={20} /> },
    { id: "perfil", label: "Perfil", icon: <User size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:flex flex-col w-56 bg-surface border-r border-border shrink-0">
          <div className="p-5 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                  <Dumbbell size={14} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="font-display font-black text-lg text-foreground tracking-wide" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                  LUCFIT
                </span>
              </div>
              <button
                onClick={onToggleTheme}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-border transition-all"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground-sub hover:text-foreground hover:bg-card"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xs">
                CS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground text-xs font-medium truncate">Carlos Silva</div>
                <div className="text-foreground-muted text-[10px]">Aluno</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-card text-sm transition-all"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "inicio" && <TabHome onStartWorkout={() => setWorkoutActive(true)} />}
          {activeTab === "treino" && <TabTreino onStartWorkout={() => setWorkoutActive(true)} />}
          {activeTab === "evolucao" && <TabEvolucao />}
          {activeTab === "exercicios" && <ExerciseLibrary />}
          {activeTab === "perfil" && <TabPerfil onLogout={onLogout} />}
        </main>
      </div>

      {/* Bottom nav - mobile */}
      <nav className="md:hidden flex border-t border-border bg-surface shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-all ${
              activeTab === t.id ? "text-primary" : "text-foreground-muted"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function TabHome({ onStartWorkout }: { onStartWorkout: () => void }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-5">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold text-foreground">{greeting}, Carlos</h1>
        <p className="text-foreground-sub mt-1 text-sm">Pronto para o próximo treino?</p>
      </div>

      {/* Today's workout card */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
        <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-primary font-medium uppercase tracking-wider">Treino de hoje</span>
            <Dumbbell size={18} className="text-primary/60" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            {todayWorkout.name}
          </h2>
          <p className="text-foreground-sub text-sm mb-4">{todayWorkout.focus}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {[`${todayWorkout.exercises} exercícios`, `~${todayWorkout.duration} min`, todayWorkout.level, todayWorkout.goal].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-background/60 text-foreground-sub border border-border">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={onStartWorkout}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-primary text-white font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_24px_var(--color-primary-glow)] transition-all active:scale-95"
          >
            <Play size={16} fill="white" />
            Começar treino
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Treinos", val: "24", icon: <Dumbbell size={14} /> },
          { label: "Sequência", val: "7d", icon: <Zap size={14} /> },
          { label: "Volume", val: "18k", icon: <BarChart3 size={14} /> },
          { label: "Evolução", val: "+12%", icon: <TrendingUp size={14} /> },
        ].map((s) => (
          <div key={s.label} className="card-glass p-3 text-center">
            <div className="text-primary flex justify-center mb-1.5">{s.icon}</div>
            <div
              className="font-black text-lg text-foreground"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              {s.val}
            </div>
            <div className="text-[10px] text-foreground-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Next workout */}
      <div className="card-glass p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-border flex items-center justify-center shrink-0">
            <Calendar size={16} className="text-foreground-sub" />
          </div>
          <div>
            <div className="text-xs text-foreground-muted mb-0.5">Próximo treino</div>
            <div className="text-foreground text-sm font-semibold">{nextWorkout.name} — {nextWorkout.focus}</div>
            <div className="text-foreground-sub text-xs">{nextWorkout.day} • {nextWorkout.time}</div>
          </div>
        </div>
        <ChevronRight size={16} className="text-foreground-muted shrink-0" />
      </div>

      {/* Training photo banner */}
      <div className="relative rounded-2xl overflow-hidden bg-surface" style={{ height: "140px" }}>
        <img
          src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=300&fit=crop&auto=format"
          alt="Treinamento"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent flex items-center px-5">
          <div>
            <div className="text-primary text-xs font-medium uppercase tracking-wider mb-1">Dica do dia</div>
            <div className="text-foreground font-semibold text-sm">"Consistência supera intensidade."</div>
            <div className="text-foreground-muted text-xs mt-1">— Lucas Ferreira, seu Personal</div>
          </div>
        </div>
      </div>

      {/* Progress chart */}
      <div className="card-glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-semibold text-sm">Evolução de carga</h3>
          <div className="flex items-center gap-3 text-[10px] text-foreground-muted">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Supino
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
              Agacha.
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={progressChartData}>
            <defs>
              <linearGradient id="gSupino" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gAgacha" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.12} />
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
            <XAxis dataKey="week" tick={{ fill: "var(--color-foreground-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--color-foreground-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="supino" stroke="var(--color-primary)" strokeWidth={2} fill="url(#gSupino)" dot={false} />
            <Area type="monotone" dataKey="agachamento" stroke="var(--color-secondary)" strokeWidth={2} fill="url(#gAgacha)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Gamification */}
      <div className="card-glass p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center shrink-0">
          <Trophy size={16} className="text-primary" />
          <span className="text-primary text-[10px] font-bold font-mono mt-0.5">7</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-foreground text-sm font-semibold">Nível 7 — Consistente</span>
            <span className="text-primary text-xs font-mono">80%</span>
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: "80%" }} />
          </div>
          <div className="text-foreground-muted text-[10px] mt-1.5">Próximo nível: Disciplinado</div>
        </div>
      </div>
    </div>
  );
}

function TabTreino({ onStartWorkout }: { onStartWorkout: () => void }) {
  return (
    <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="pt-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Meu Treino</h1>
          <p className="text-foreground-sub text-sm mt-0.5">Treino A • Peito + Tríceps</p>
        </div>
        <span className="text-xs text-foreground-muted bg-border px-3 py-1.5 rounded-full">~55 min</span>
      </div>

      <button
        onClick={onStartWorkout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-primary text-white font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_24px_var(--color-primary-glow)] transition-all active:scale-95"
      >
        <Play size={16} fill="white" />
        Iniciar treino
      </button>

      <div className="space-y-3">
        {workoutExercises.map((ex, idx) => (
          <div key={ex.id} className="card-glass p-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-border flex items-center justify-center text-foreground-muted text-sm font-mono shrink-0">
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-foreground text-sm font-medium truncate">{ex.name}</div>
              <div className="text-foreground-muted text-xs mt-0.5">
                {ex.sets} séries × {ex.reps} reps • {ex.suggestedWeight} kg • {ex.rest}s descanso
              </div>
            </div>
            <span className="text-xs text-foreground-muted bg-border px-2 py-1 rounded-lg shrink-0">{ex.muscleGroup}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabEvolucao() {
  const [period, setPeriod] = useState<string>("8S");
  const periods = ["7D", "30D", "8S", "3M", "1A"];

  const prs = [
    { exercise: "Supino Reto", weight: "62.5 kg", date: "Hoje" },
    { exercise: "Agachamento Livre", weight: "97 kg", date: "Semana passada" },
    { exercise: "Levantamento Terra", weight: "122 kg", date: "2 semanas atrás" },
  ];

  return (
    <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-xl font-semibold text-foreground">Minha Evolução</h1>
      </div>

      {/* Period selector */}
      <div className="flex gap-1 bg-surface rounded-xl p-1 border border-border">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
              period === p ? "bg-primary text-white" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Volume chart */}
      <div className="card-glass p-5">
        <div className="text-foreground-sub text-xs mb-1">Evolução de carga — Supino reto</div>
        <div className="text-primary text-2xl font-black mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
          +25% <span className="text-sm font-normal text-foreground-sub">nas últimas 8 semanas</span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={progressChartData}>
            <defs>
              <linearGradient id="gS2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="var(--color-border)" />
            <XAxis dataKey="week" tick={{ fill: "var(--color-foreground-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--color-foreground-muted)", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="supino" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#gS2)" dot={{ fill: "var(--color-primary)", r: 3, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PRs */}
      <div className="card-glass p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4 flex items-center gap-2">
          <Trophy size={14} className="text-primary" />
          Recordes pessoais
        </h3>
        <div className="space-y-4">
          {prs.map((pr) => (
            <div key={pr.exercise} className="flex items-center justify-between">
              <div>
                <div className="text-foreground text-sm">{pr.exercise}</div>
                <div className="text-foreground-muted text-xs">{pr.date}</div>
              </div>
              <div className="text-primary font-mono font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                {pr.weight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Treinos realizados", val: "24", sub: "Desde janeiro" },
          { label: "Sequência atual", val: "7 dias", sub: "Continue assim!" },
          { label: "Volume total", val: "18.420 kg", sub: "Acumulado" },
          { label: "Consistência", val: "85%", sub: "Este mês" },
        ].map((s) => (
          <div key={s.label} className="card-glass p-4">
            <div className="text-foreground-muted text-xs mb-1">{s.label}</div>
            <div className="text-foreground text-xl font-black" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
              {s.val}
            </div>
            <div className="text-primary text-xs mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabPerfil({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-xl font-semibold text-foreground">Meu Perfil</h1>
      </div>

      <div className="card-glass p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-black text-xl shrink-0">
          CS
        </div>
        <div>
          <h2 className="text-foreground text-xl font-bold">{studentData.name} {studentData.lastName}</h2>
          <p className="text-foreground-sub text-sm">{studentData.goal} • {studentData.level}</p>
          <p className="text-foreground-muted text-xs mt-1">Personal: {studentData.trainer}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Treinos", val: "24" },
          { label: "Sequência", val: "7d" },
          { label: "Desde", val: "Jan 2024" },
        ].map((s) => (
          <div key={s.label} className="card-glass p-4 text-center">
            <div className="text-foreground font-black text-lg" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
              {s.val}
            </div>
            <div className="text-foreground-muted text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card-glass divide-y divide-border">
        {[
          { label: "Objetivo", val: studentData.goal },
          { label: "Nível", val: studentData.level },
          { label: "Personal", val: studentData.trainer },
          { label: "Membro desde", val: studentData.startDate },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-foreground-sub text-sm">{item.label}</span>
            <span className="text-foreground text-sm font-medium">{item.val}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onLogout}
        className="w-full py-3 rounded-xl border border-border text-foreground-sub hover:text-foreground hover:border-border-bright transition-all text-sm flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        Sair da conta
      </button>
    </div>
  );
}
