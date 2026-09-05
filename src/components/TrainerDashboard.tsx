import { useState } from "react";
import {
  Dumbbell, Users, Bell, BookOpen, LayoutDashboard,
  LogOut, AlertCircle, TrendingUp, Zap, CircleCheckBig,
  ChevronRight, Search, Sun, Moon
} from "lucide-react";
import { trainerData, trainerAlerts, students } from "../data/mockData";

interface Props {
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

type Tab = "dashboard" | "alunos" | "treinos" | "biblioteca" | "notificacoes";

export default function TrainerDashboard({ onLogout, isDark, onToggleTheme }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchStudent, setSearchStudent] = useState("");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "alunos", label: "Alunos", icon: <Users size={18} /> },
    { id: "treinos", label: "Treinos", icon: <Dumbbell size={18} /> },
    { id: "biblioteca", label: "Biblioteca", icon: <BookOpen size={18} /> },
    { id: "notificacoes", label: "Alertas", icon: <Bell size={18} /> },
  ];

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
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
          <div className="text-[10px] text-foreground-muted mt-1 pl-9">Personal Trainer</div>
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
              {t.id === "notificacoes" && (
                <span className="ml-auto w-4 h-4 rounded-full bg-danger text-white text-[9px] flex items-center justify-center">
                  {trainerAlerts.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-xs">
              LF
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-foreground text-xs font-medium truncate">Lucas Ferreira</div>
              <div className="text-foreground-muted text-[10px]">Personal Trainer</div>
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

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <TrainerHome />}
          {activeTab === "alunos" && (
            <div className="p-5 md:p-6 max-w-3xl mx-auto space-y-5">
              <div className="pt-2">
                <h1 className="text-xl font-semibold text-foreground">Meus Alunos</h1>
                <p className="text-foreground-sub text-sm mt-0.5">{students.length} alunos ativos</p>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder="Buscar aluno..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div className="space-y-3">
                {filteredStudents.map((s) => (
                  <StudentCard key={s.id} student={s} />
                ))}
              </div>
            </div>
          )}
          {activeTab === "notificacoes" && (
            <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-4">
              <div className="pt-2">
                <h1 className="text-xl font-semibold text-foreground">Alertas inteligentes</h1>
                <p className="text-foreground-sub text-sm mt-0.5">{trainerAlerts.length} novos alertas</p>
              </div>
              <div className="space-y-3">
                {trainerAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}
          {(activeTab === "treinos" || activeTab === "biblioteca") && (
            <div className="p-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-64 text-center">
              <div className="w-12 h-12 rounded-2xl bg-border flex items-center justify-center mb-4">
                {activeTab === "treinos" ? <Dumbbell size={20} className="text-foreground-muted" /> : <BookOpen size={20} className="text-foreground-muted" />}
              </div>
              <div className="text-foreground-muted text-sm">Em desenvolvimento — Fase 2</div>
            </div>
          )}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex border-t border-border bg-surface shrink-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-medium transition-all relative ${
                activeTab === t.id ? "text-primary" : "text-foreground-muted"
              }`}
            >
              {t.icon}
              {t.label}
              {t.id === "notificacoes" && (
                <span className="absolute top-2 right-1/4 w-3.5 h-3.5 rounded-full bg-danger text-white text-[8px] flex items-center justify-center">
                  {trainerAlerts.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function TrainerHome() {
  return (
    <div className="p-5 md:p-6 max-w-3xl mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold text-foreground">Bom dia, Lucas</h1>
        <p className="text-foreground-sub mt-0.5 text-sm">Aqui está o resumo dos seus alunos de hoje.</p>
      </div>

      {/* Photo strip */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {[
          { url: "https://images.unsplash.com/photo-1738523686534-7055df5858d6?w=500&h=280&fit=crop&auto=format", label: "Carlos treinando hoje", sub: "Peito + Tríceps" },
          { url: "https://images.unsplash.com/photo-1758875569256-f37c438cac65?w=500&h=280&fit=crop&auto=format", label: "Ana com personal", sub: "Condicionamento" },
          { url: "https://images.unsplash.com/photo-1738523687459-963f3fb56522?w=500&h=280&fit=crop&auto=format", label: "João levantamento", sub: "Força — Recorde!" },
        ].map((p) => (
          <div key={p.label} className="relative rounded-2xl overflow-hidden bg-surface" style={{ height: "110px" }}>
            <img src={p.url} alt={p.label} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-2.5">
              <div className="text-white text-[9px] font-semibold leading-tight">{p.label}</div>
              <div className="text-primary text-[8px] mt-0.5">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Alunos ativos", val: "32", icon: <Users size={16} />, accent: false },
          { label: "Treinos hoje", val: "18", icon: <Dumbbell size={16} />, accent: false },
          { label: "Taxa de conclusão", val: "86%", icon: <CircleCheckBig size={16} />, accent: false },
          { label: "Precisam atenção", val: "4", icon: <AlertCircle size={16} />, accent: true },
        ].map((m) => (
          <div key={m.label} className="card-glass p-4">
            <div className={`mb-2 ${m.accent ? "text-warning" : "text-primary"}`}>{m.icon}</div>
            <div
              className="text-3xl font-black text-foreground mb-1"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              {m.val}
            </div>
            <div className="text-foreground-muted text-xs">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Alerts preview */}
      <div className="card-glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-semibold text-sm flex items-center gap-2">
            <Bell size={14} className="text-primary" />
            Alertas recentes
          </h3>
          <span className="text-xs text-foreground-muted">{trainerAlerts.length} total</span>
        </div>
        <div className="space-y-2">
          {trainerAlerts.slice(0, 3).map((a) => (
            <AlertCard key={a.id} alert={a} compact />
          ))}
        </div>
      </div>

      {/* Student overview */}
      <div className="card-glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-semibold text-sm">Alunos recentes</h3>
          <button className="text-xs text-primary flex items-center gap-1">
            Ver todos <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {students.slice(0, 4).map((s) => (
            <StudentCard key={s.id} student={s} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentCard({ student, compact = false }: { student: typeof students[0]; compact?: boolean }) {
  const statusConfig = {
    ok: { label: "Em dia", color: "var(--color-success)", bg: "var(--color-success-muted)" },
    warning: { label: "Atenção", color: "var(--color-danger)", bg: "var(--color-danger-muted)" },
    attention: { label: "Verificar", color: "var(--color-warning)", bg: "var(--color-warning-muted)" },
  };
  const st = statusConfig[student.status as keyof typeof statusConfig];

  const adherenceColor =
    student.adherence >= 80 ? "var(--color-primary)" : student.adherence >= 60 ? "var(--color-warning)" : "var(--color-danger)";

  return (
    <div className="card-glass p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-border flex items-center justify-center text-foreground-sub font-bold text-xs shrink-0">
        {student.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-foreground text-sm font-medium truncate">{student.name}</span>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0"
            style={{ color: st.color, background: st.bg }}
          >
            {st.label}
          </span>
        </div>
        <div className="text-foreground-muted text-xs">{student.goal} • Último: {student.lastWorkout}</div>
        {!compact && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${student.adherence}%`, background: adherenceColor }}
              />
            </div>
            <span className="text-[10px] text-foreground-muted font-mono shrink-0">{student.adherence}%</span>
          </div>
        )}
      </div>
      {compact && (
        <div className="text-right shrink-0">
          <div className="font-mono text-sm font-semibold" style={{ color: adherenceColor }}>
            {student.adherence}%
          </div>
          <div className="text-[10px] text-foreground-muted">adesão</div>
        </div>
      )}
    </div>
  );
}

const alertConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  warning: {
    icon: <AlertCircle size={14} />,
    color: "var(--color-danger)",
    bg: "var(--color-danger-muted)",
  },
  progress: {
    icon: <TrendingUp size={14} />,
    color: "var(--color-success)",
    bg: "var(--color-success-muted)",
  },
  streak: {
    icon: <Zap size={14} />,
    color: "var(--color-primary)",
    bg: "var(--color-primary-muted)",
  },
  goal: {
    icon: <CircleCheckBig size={14} />,
    color: "var(--color-primary)",
    bg: "var(--color-primary-muted)",
  },
};

function AlertCard({ alert, compact = false }: { alert: typeof trainerAlerts[0]; compact?: boolean }) {
  const cfg = alertConfig[alert.type] ?? alertConfig.warning;

  if (compact) {
    return (
      <div className="flex items-start gap-3 py-2">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ color: cfg.color, background: cfg.bg }}
        >
          {cfg.icon}
        </div>
        <p className="text-foreground text-sm leading-relaxed">{alert.text}</p>
      </div>
    );
  }

  return (
    <div className="card-glass flex items-start gap-3 p-4 border-l-2" style={{ borderLeftColor: cfg.color }}>
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ color: cfg.color, background: cfg.bg }}
      >
        {cfg.icon}
      </div>
      <p className="text-foreground text-sm leading-relaxed">{alert.text}</p>
    </div>
  );
}
