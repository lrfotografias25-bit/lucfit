import { useState, useRef } from "react";
import {
  Dumbbell, Users, Bell, BookOpen, LayoutDashboard, LogOut, AlertCircle,
  TrendingUp, Zap, CircleCheckBig, ChevronRight, Search, Sun, Moon,
  Plus, X, ChevronDown, Check, Edit2, Trash2, User, Lock, Camera, Save,
  ArrowLeft, ClipboardList, Star
} from "lucide-react";
import { trainerAlerts, students, exerciseLibrary } from "../data/mockData";
import logoImg from "../imports/E2C2CAD3-7872-44EE-82A3-5244E8C43F56.png";

interface Props { onLogout: () => void; isDark: boolean; onToggleTheme: () => void; }

type Tab = "dashboard" | "alunos" | "treinos" | "biblioteca" | "notificacoes" | "perfil";

interface PlanExercise {
  libId: string; name: string; muscleGroup: string;
  sets: number; reps: number; rest: number; notes: string;
}
interface WorkoutPlan {
  id: string; name: string; studentId: string | null;
  exercises: PlanExercise[]; createdAt: string;
}

const INITIAL_PLANS: WorkoutPlan[] = [
  {
    id: "p1", name: "Treino A — Peito e Tríceps", studentId: "s1", createdAt: "10 set 2026",
    exercises: [
      { libId: "l1", name: "Supino Reto com Barra", muscleGroup: "Peito", sets: 4, reps: 10, rest: 90, notes: "Descer até o peito" },
      { libId: "l11", name: "Crucifixo na Máquina", muscleGroup: "Peito", sets: 3, reps: 15, rest: 60, notes: "" },
      { libId: "l6", name: "Tríceps Pulley", muscleGroup: "Tríceps", sets: 4, reps: 12, rest: 75, notes: "Cotovelos fixos" },
      { libId: "l18", name: "Mergulho nas Paralelas", muscleGroup: "Tríceps", sets: 3, reps: 10, rest: 60, notes: "" },
    ],
  },
  {
    id: "p2", name: "Treino B — Costas e Bíceps", studentId: "s1", createdAt: "10 set 2026",
    exercises: [
      { libId: "l2", name: "Puxada Frontal", muscleGroup: "Costas", sets: 4, reps: 10, rest: 90, notes: "" },
      { libId: "l10", name: "Remada Baixa", muscleGroup: "Costas", sets: 4, reps: 12, rest: 75, notes: "" },
      { libId: "l5", name: "Rosca Direta", muscleGroup: "Bíceps", sets: 3, reps: 12, rest: 60, notes: "" },
      { libId: "l13", name: "Rosca Martelo", muscleGroup: "Bíceps", sets: 3, reps: 12, rest: 60, notes: "" },
    ],
  },
  {
    id: "p3", name: "Treino Emagrecimento — Full Body", studentId: "s2", createdAt: "08 set 2026",
    exercises: [
      { libId: "l3", name: "Agachamento Livre", muscleGroup: "Quadríceps", sets: 4, reps: 15, rest: 60, notes: "" },
      { libId: "l7", name: "Hip Thrust", muscleGroup: "Glúteos", sets: 3, reps: 15, rest: 60, notes: "" },
      { libId: "l14", name: "Prancha", muscleGroup: "Abdômen", sets: 3, reps: 40, rest: 45, notes: "Reps = segundos" },
    ],
  },
];

export default function TrainerDashboard({ onLogout, isDark, onToggleTheme }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [plans, setPlans] = useState<WorkoutPlan[]>(INITIAL_PLANS);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "alunos", label: "Alunos", icon: <Users size={18} /> },
    { id: "treinos", label: "Treinos", icon: <ClipboardList size={18} /> },
    { id: "biblioteca", label: "Biblioteca", icon: <BookOpen size={18} /> },
    { id: "notificacoes", label: "Alertas", icon: <Bell size={18} /> },
    { id: "perfil", label: "Perfil", icon: <User size={18} /> },
  ];

  return (
    <div className="flex h-full bg-background">
      <aside className="hidden md:flex flex-col w-56 bg-surface border-r border-border shrink-0">
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="LUFIT" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
              <span className="font-display font-black text-lg text-foreground tracking-wide" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>LUFIT</span>
            </div>
            <button onClick={onToggleTheme} className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-border transition-all">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
          <div className="text-[10px] text-foreground-muted mt-1 pl-9">Personal Trainer</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? "bg-primary/10 text-primary border border-primary/20" : "text-foreground-sub hover:text-foreground hover:bg-card"}`}>
              {t.icon}{t.label}
              {t.id === "notificacoes" && <span className="ml-auto w-4 h-4 rounded-full bg-danger text-white text-[9px] flex items-center justify-center">{trainerAlerts.length}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={() => setActiveTab("perfil")} className="flex items-center gap-3 px-3 py-2 mb-2 w-full rounded-xl hover:bg-card transition-all text-left">
            <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-xs">LF</div>
            <div className="flex-1 min-w-0">
              <div className="text-foreground text-xs font-medium truncate">Lucas Ferreira</div>
              <div className="text-foreground-muted text-[10px]">Personal Trainer</div>
            </div>
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-card text-sm transition-all">
            <LogOut size={16} />Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <TabDashboard onNavigate={setActiveTab} />}
          {activeTab === "alunos" && <TabAlunos plans={plans} onNavigate={setActiveTab} />}
          {activeTab === "treinos" && <TabTreinos plans={plans} setPlans={setPlans} />}
          {activeTab === "biblioteca" && <TabBiblioteca onAddToPlan={() => setActiveTab("treinos")} />}
          {activeTab === "notificacoes" && <TabAlertas />}
          {activeTab === "perfil" && <TabPerfil onLogout={onLogout} />}
        </main>
        <nav className="md:hidden flex border-t border-border bg-surface shrink-0 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-medium transition-all relative min-w-[52px] ${activeTab === t.id ? "text-primary" : "text-foreground-muted"}`}>
              {t.icon}{t.label}
              {t.id === "notificacoes" && <span className="absolute top-2 right-1 w-3.5 h-3.5 rounded-full bg-danger text-white text-[8px] flex items-center justify-center">{trainerAlerts.length}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function TabDashboard({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  return (
    <div className="p-5 md:p-6 max-w-3xl mx-auto space-y-6">
      <div className="pt-2">
        <h1 className="text-2xl font-semibold text-foreground">Bom dia, Lucas</h1>
        <p className="text-foreground-sub mt-0.5 text-sm">Resumo dos seus alunos de hoje.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {[
          { url: "https://images.unsplash.com/photo-1738523686534-7055df5858d6?w=500&h=280&fit=crop&auto=format", label: "Carlos treinando hoje", sub: "Peito + Tríceps" },
          { url: "https://images.unsplash.com/photo-1758875569256-f37c438cac65?w=500&h=280&fit=crop&auto=format", label: "Ana com personal", sub: "Condicionamento" },
          { url: "https://images.unsplash.com/photo-1738523687459-963f3fb56522?w=500&h=280&fit=crop&auto=format", label: "João levantamento", sub: "Força — Recorde!" },
        ].map((p) => (
          <div key={p.label} className="relative rounded-2xl overflow-hidden bg-surface" style={{ height: 110 }}>
            <img src={p.url} alt={p.label} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-2.5">
              <div className="text-white text-[9px] font-semibold">{p.label}</div>
              <div className="text-primary text-[8px]">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Alunos ativos", val: "32", icon: <Users size={16} />, warn: false },
          { label: "Treinos hoje", val: "18", icon: <Dumbbell size={16} />, warn: false },
          { label: "Taxa conclusão", val: "86%", icon: <CircleCheckBig size={16} />, warn: false },
          { label: "Precisam atenção", val: "4", icon: <AlertCircle size={16} />, warn: true },
        ].map((m) => (
          <div key={m.label} className="card-glass p-4">
            <div className={`mb-2 ${m.warn ? "text-warning" : "text-primary"}`}>{m.icon}</div>
            <div className="text-3xl font-black text-foreground mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>{m.val}</div>
            <div className="text-foreground-muted text-xs">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <button onClick={() => onNavigate("treinos")} className="card-glass p-5 text-left hover:border-primary/30 transition-all group">
          <ClipboardList size={20} className="text-primary mb-3" />
          <div className="text-foreground font-semibold text-sm mb-1">Criar novo treino</div>
          <div className="text-foreground-muted text-xs">Monte fichas e atribua a alunos</div>
          <ChevronRight size={14} className="text-primary mt-3 group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => onNavigate("alunos")} className="card-glass p-5 text-left hover:border-primary/30 transition-all group">
          <Users size={20} className="text-primary mb-3" />
          <div className="text-foreground font-semibold text-sm mb-1">Ver desempenho dos alunos</div>
          <div className="text-foreground-muted text-xs">Acompanhe progresso e adesão</div>
          <ChevronRight size={14} className="text-primary mt-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="card-glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-semibold text-sm flex items-center gap-2"><Bell size={14} className="text-primary" />Alertas recentes</h3>
          <span className="text-xs text-foreground-muted">{trainerAlerts.length} total</span>
        </div>
        <div className="space-y-2">{trainerAlerts.slice(0, 3).map((a) => <AlertRow key={a.id} alert={a} />)}</div>
      </div>
    </div>
  );
}

// ── Alunos ────────────────────────────────────────────────────────────────────

function TabAlunos({ plans, onNavigate }: { plans: WorkoutPlan[]; onNavigate: (t: Tab) => void }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
  const selected = students.find((s) => s.id === selectedId) ?? null;
  const studentPlans = plans.filter((p) => p.studentId === selectedId);
  const statusCfg = {
    ok: { label: "Em dia", color: "var(--color-success)", bg: "var(--color-success-muted)" },
    warning: { label: "Atenção", color: "var(--color-danger)", bg: "var(--color-danger-muted)" },
    attention: { label: "Verificar", color: "var(--color-warning)", bg: "var(--color-warning-muted)" },
  };
  return (
    <div className="flex h-full">
      <div className={`flex flex-col ${selected ? "hidden md:flex md:w-80 md:border-r md:border-border" : "flex-1"}`}>
        <div className="p-5 md:p-6 space-y-4">
          <div><h1 className="text-xl font-semibold text-foreground">Meus Alunos</h1><p className="text-foreground-sub text-sm mt-0.5">{students.length} alunos ativos</p></div>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar aluno..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors" />
          </div>
        </div>
        <div className="px-5 md:px-6 pb-6 space-y-2 overflow-y-auto flex-1">
          {filtered.map((s) => {
            const st = statusCfg[s.status as keyof typeof statusCfg];
            const clr = s.adherence >= 80 ? "var(--color-primary)" : s.adherence >= 60 ? "var(--color-warning)" : "var(--color-danger)";
            return (
              <button key={s.id} onClick={() => setSelectedId(s.id)} className={`w-full card-glass p-4 flex items-center gap-4 text-left transition-all hover:border-primary/30 ${selectedId === s.id ? "border-primary/40 bg-primary/5" : ""}`}>
                <div className="w-10 h-10 rounded-xl bg-border flex items-center justify-center text-foreground-sub font-bold text-xs shrink-0">{s.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-foreground text-sm font-medium truncate">{s.name}</span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                  </div>
                  <div className="text-foreground-muted text-xs mb-2">{s.goal} • Último: {s.lastWorkout}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden"><div className="h-full rounded-full" style={{ width: `${s.adherence}%`, background: clr }} /></div>
                    <span className="text-[10px] text-foreground-muted font-mono shrink-0">{s.adherence}%</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-foreground-muted shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
      {selected && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 md:p-6 max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedId(null)} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-card transition-all"><ArrowLeft size={16} /></button>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">{selected.initials}</div>
                <div><h2 className="text-xl font-semibold text-foreground">{selected.name}</h2><p className="text-foreground-sub text-sm">{selected.goal} • {selected.workouts} treinos</p></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Adesão", val: `${selected.adherence}%` }, { label: "Último treino", val: selected.lastWorkout }, { label: "Total treinos", val: String(selected.workouts) }].map((m) => (
                <div key={m.label} className="card-glass p-3 text-center">
                  <div className="text-xl font-black text-primary" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>{m.val}</div>
                  <div className="text-foreground-muted text-[10px] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground font-semibold text-sm">Fichas atribuídas</h3>
                <button onClick={() => onNavigate("treinos")} className="flex items-center gap-1.5 text-xs text-primary hover:opacity-80 transition-opacity"><Plus size={13} />Criar ficha</button>
              </div>
              {studentPlans.length === 0
                ? <div className="card-glass p-6 text-center text-foreground-muted text-sm">Nenhuma ficha atribuída ainda.</div>
                : <div className="space-y-2">{studentPlans.map((plan) => (
                    <div key={plan.id} className="card-glass p-4 flex items-center gap-3">
                      <ClipboardList size={16} className="text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground text-sm font-medium truncate">{plan.name}</div>
                        <div className="text-foreground-muted text-xs">{plan.exercises.length} exercícios • {plan.createdAt}</div>
                      </div>
                      <button onClick={() => onNavigate("treinos")} className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground-muted hover:text-primary hover:bg-primary/10 transition-all"><Edit2 size={13} /></button>
                    </div>
                  ))}</div>
              }
            </div>
            <div className="card-glass p-5">
              <h3 className="text-foreground font-semibold text-sm mb-4 flex items-center gap-2"><TrendingUp size={14} className="text-primary" />Evolução de carga</h3>
              <div className="space-y-4">
                {[{ name: "Supino", weeks: [50, 52, 55, 57, 60, 62] }, { name: "Agachamento", weeks: [80, 82, 85, 87, 90, 92] }].map((ex) => (
                  <div key={ex.name}>
                    <div className="flex justify-between text-xs mb-1.5"><span className="text-foreground-sub">{ex.name}</span><span className="text-primary font-mono">{ex.weeks[ex.weeks.length - 1]} kg</span></div>
                    <div className="flex gap-1 items-end h-8">
                      {ex.weeks.map((v, i) => { const pct = (v / Math.max(...ex.weeks)) * 100; return <div key={i} className="flex-1 rounded-sm bg-primary/15 relative overflow-hidden"><div className="absolute bottom-0 left-0 right-0 bg-primary rounded-sm" style={{ height: `${pct}%` }} /></div>; })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glass p-5 border-primary/20">
              <h3 className="text-foreground font-semibold text-sm mb-1">Acesso do aluno</h3>
              <p className="text-foreground-muted text-xs mb-4">Envie as credenciais para o aluno acessar o app.</p>
              <div className="flex gap-2">
                <input readOnly value={`${selected.name.toLowerCase().replace(" ", ".")}@lufit.app`} className="flex-1 px-3 py-2.5 rounded-xl bg-card border border-border text-foreground-sub text-xs font-mono" />
                <button className="px-4 py-2.5 rounded-xl gradient-primary text-white text-xs font-semibold whitespace-nowrap">Enviar acesso</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Treinos ───────────────────────────────────────────────────────────────────

function TabTreinos({ plans, setPlans }: { plans: WorkoutPlan[]; setPlans: React.Dispatch<React.SetStateAction<WorkoutPlan[]>> }) {
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);

  function openNew() { setEditingPlan(null); setShowBuilder(true); }
  function openEdit(plan: WorkoutPlan) { setEditingPlan(plan); setShowBuilder(true); }
  function savePlan(plan: WorkoutPlan) {
    if (editingPlan) setPlans((p) => p.map((x) => (x.id === plan.id ? plan : x)));
    else setPlans((p) => [...p, plan]);
    setShowBuilder(false);
  }
  function deletePlan(id: string) { setPlans((p) => p.filter((x) => x.id !== id)); }

  if (showBuilder) return <WorkoutBuilder initial={editingPlan} onSave={savePlan} onCancel={() => setShowBuilder(false)} />;

  return (
    <div className="p-5 md:p-6 max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between pt-2">
        <div><h1 className="text-xl font-semibold text-foreground">Fichas de treino</h1><p className="text-foreground-sub text-sm mt-0.5">{plans.length} fichas criadas</p></div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all"><Plus size={16} />Criar ficha</button>
      </div>
      {plans.length === 0
        ? <div className="card-glass p-12 text-center"><ClipboardList size={32} className="text-foreground-muted mx-auto mb-3" /><div className="text-foreground-sub text-sm">Nenhuma ficha criada ainda</div></div>
        : <div className="space-y-3">
            {plans.map((plan) => {
              const student = students.find((s) => s.id === plan.studentId);
              return (
                <div key={plan.id} className="card-glass p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground font-semibold truncate">{plan.name}</h3>
                      <div className="text-foreground-muted text-xs mt-0.5">{plan.exercises.length} exercícios • {plan.createdAt}</div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => openEdit(plan)} className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-primary hover:bg-primary/10 transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => deletePlan(plan.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-danger hover:bg-danger/10 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  {student && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[9px] font-bold">{student.initials}</div>
                      <span className="text-foreground-sub text-xs">{student.name}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {[...new Set(plan.exercises.map((e) => e.muscleGroup))].map((g) => (
                      <span key={g} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{g}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
      }
    </div>
  );
}

// ── Workout Builder ───────────────────────────────────────────────────────────

function WorkoutBuilder({ initial, onSave, onCancel }: { initial: WorkoutPlan | null; onSave: (p: WorkoutPlan) => void; onCancel: () => void }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [studentId, setStudentId] = useState<string | null>(initial?.studentId ?? null);
  const [exercises, setExercises] = useState<PlanExercise[]>(initial?.exercises ?? []);
  const [showLib, setShowLib] = useState(false);
  const [libSearch, setLibSearch] = useState("");
  const [expandedEx, setExpandedEx] = useState<string | null>(null);

  const filteredLib = exerciseLibrary.filter(
    (e) => e.name.toLowerCase().includes(libSearch.toLowerCase()) || e.group.toLowerCase().includes(libSearch.toLowerCase())
  );

  function addExercise(lib: typeof exerciseLibrary[0]) {
    if (exercises.find((e) => e.libId === lib.id)) return;
    setExercises((prev) => [...prev, { libId: lib.id, name: lib.name, muscleGroup: lib.group, sets: 3, reps: 12, rest: 60, notes: "" }]);
    setShowLib(false);
  }

  function updateEx(libId: string, field: keyof PlanExercise, value: string | number) {
    setExercises((prev) => prev.map((e) => (e.libId === libId ? { ...e, [field]: value } : e)));
  }

  function removeEx(libId: string) { setExercises((prev) => prev.filter((e) => e.libId !== libId)); }

  function handleSave() {
    if (!name.trim()) return;
    onSave({ id: initial?.id ?? `p${Date.now()}`, name: name.trim(), studentId, exercises, createdAt: initial?.createdAt ?? new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) });
  }

  return (
    <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={onCancel} className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-card transition-all"><ArrowLeft size={16} /></button>
        <h1 className="text-xl font-semibold text-foreground">{initial ? "Editar ficha" : "Nova ficha"}</h1>
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground-sub mb-1.5">Nome da ficha</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Treino A — Peito e Tríceps" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors" />
      </div>
      <div>
        <label className="block text-xs font-medium text-foreground-sub mb-1.5">Atribuir ao aluno</label>
        <div className="relative">
          <select value={studentId ?? ""} onChange={(e) => setStudentId(e.target.value || null)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary/40 appearance-none">
            <option value="">Sem aluno atribuído</option>
            {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-medium text-foreground-sub">Exercícios ({exercises.length})</label>
          <button onClick={() => setShowLib(true)} className="flex items-center gap-1.5 text-xs text-primary hover:opacity-80 transition-opacity"><Plus size={13} />Adicionar da biblioteca</button>
        </div>
        {exercises.length === 0
          ? <button onClick={() => setShowLib(true)} className="w-full card-glass p-8 flex flex-col items-center gap-2 text-foreground-muted hover:border-primary/30 transition-all"><BookOpen size={24} /><span className="text-sm">Adicione exercícios da biblioteca</span></button>
          : <div className="space-y-2">
              {exercises.map((ex) => (
                <div key={ex.libId} className="card-glass overflow-hidden">
                  <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setExpandedEx(expandedEx === ex.libId ? null : ex.libId)}>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">{ex.muscleGroup}</span>
                    <span className="text-foreground text-sm font-medium flex-1 truncate">{ex.name}</span>
                    <span className="text-foreground-muted text-xs shrink-0">{ex.sets}×{ex.reps}</span>
                    <button onClick={(e) => { e.stopPropagation(); removeEx(ex.libId); }} className="w-6 h-6 rounded flex items-center justify-center text-foreground-muted hover:text-danger transition-colors shrink-0"><X size={12} /></button>
                  </button>
                  {expandedEx === ex.libId && (
                    <div className="px-4 pb-4 grid grid-cols-3 gap-3 border-t border-border pt-3">
                      {(["sets", "reps", "rest"] as const).map((field, i) => (
                        <div key={field}>
                          <label className="text-[10px] text-foreground-muted mb-1 block">{["Séries", "Reps", "Descanso (s)"][i]}</label>
                          <input type="number" value={ex[field]} onChange={(e) => updateEx(ex.libId, field, Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm text-center focus:outline-none focus:border-primary/40" />
                        </div>
                      ))}
                      <div className="col-span-3">
                        <label className="text-[10px] text-foreground-muted mb-1 block">Observações</label>
                        <input value={ex.notes} onChange={(e) => updateEx(ex.libId, "notes", e.target.value)} placeholder="Dica de execução..." className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
        }
      </div>
      <button onClick={handleSave} disabled={!name.trim()} className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">
        <Save size={15} className="inline mr-2" />{initial ? "Salvar alterações" : "Criar ficha"}
      </button>
      {showLib && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowLib(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input autoFocus value={libSearch} onChange={(e) => setLibSearch(e.target.value)} placeholder="Buscar exercício..." className="w-full pl-8 pr-3 py-2 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40" />
              </div>
              <button onClick={() => setShowLib(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-card transition-all"><X size={16} /></button>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredLib.map((ex) => {
                const added = exercises.some((e) => e.libId === ex.id);
                return (
                  <button key={ex.id} onClick={() => !added && addExercise(ex)} disabled={added} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${added ? "opacity-40 cursor-not-allowed" : "hover:bg-card"}`}>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">{ex.group.slice(0, 2)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-foreground text-sm font-medium truncate">{ex.name}</div>
                      <div className="text-foreground-muted text-xs">{ex.equipment} • {ex.level}</div>
                    </div>
                    {added ? <Check size={14} className="text-primary shrink-0" /> : <Plus size={14} className="text-foreground-muted shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Biblioteca ────────────────────────────────────────────────────────────────

function TabBiblioteca({ onAddToPlan }: { onAddToPlan: () => void }) {
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("Todos");
  const [filterLevel, setFilterLevel] = useState("Todos");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const groups = ["Todos", ...Array.from(new Set(exerciseLibrary.map((e) => e.group)))];
  const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"];
  const filtered = exerciseLibrary.filter((e) => {
    const ms = e.name.toLowerCase().includes(search.toLowerCase()) || e.group.toLowerCase().includes(search.toLowerCase());
    return ms && (filterGroup === "Todos" || e.group === filterGroup) && (filterLevel === "Todos" || e.level === filterLevel);
  });
  const levelColor: Record<string, string> = { Iniciante: "var(--color-success)", "Intermediário": "var(--color-warning)", Avançado: "var(--color-danger)" };
  return (
    <div className="p-5 md:p-6 max-w-3xl mx-auto space-y-5">
      <div className="pt-2">
        <h1 className="text-xl font-semibold text-foreground">Biblioteca de Exercícios</h1>
        <p className="text-foreground-sub text-sm mt-0.5">{exerciseLibrary.length} exercícios — use ao montar fichas de treino</p>
      </div>
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou grupo muscular..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors" />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {[{ label: "Grupo", value: filterGroup, setter: setFilterGroup, opts: groups }, { label: "Nível", value: filterLevel, setter: setFilterLevel, opts: levels }].map((f) => (
          <div key={f.label} className="relative">
            <select value={f.value} onChange={(e) => f.setter(e.target.value)} className="pl-3 pr-7 py-1.5 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none focus:border-primary/40 appearance-none">
              {f.opts.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
          </div>
        ))}
        <span className="text-foreground-muted text-xs ml-auto">{filtered.length} resultados</span>
      </div>
      <div className="space-y-2">
        {filtered.map((ex) => (
          <div key={ex.id} className="card-glass overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)}>
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">{ex.group.slice(0, 2)}</div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground text-sm font-medium truncate">{ex.name}</div>
                <div className="text-foreground-muted text-xs">{ex.group} • {ex.equipment}</div>
              </div>
              <span className="text-[10px] font-medium shrink-0" style={{ color: levelColor[ex.level] ?? "var(--color-primary)" }}>{ex.level}</span>
              <ChevronDown size={14} className={`text-foreground-muted shrink-0 transition-transform ${expandedId === ex.id ? "rotate-180" : ""}`} />
            </button>
            {expandedId === ex.id && (
              <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                <div>
                  <div className="text-[10px] text-foreground-muted uppercase tracking-wider mb-1.5">Músculos trabalhados</div>
                  <div className="flex flex-wrap gap-1.5">{ex.muscles.map((m) => <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-border text-foreground-sub">{m}</span>)}</div>
                </div>
                <button onClick={onAddToPlan} className="flex items-center gap-2 text-xs text-primary hover:opacity-80 transition-opacity font-medium"><Plus size={13} />Adicionar a uma ficha</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Alertas ───────────────────────────────────────────────────────────────────

function TabAlertas() {
  const cfg: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    warning: { icon: <AlertCircle size={14} />, color: "var(--color-danger)", bg: "var(--color-danger-muted)" },
    progress: { icon: <TrendingUp size={14} />, color: "var(--color-success)", bg: "var(--color-success-muted)" },
    streak: { icon: <Zap size={14} />, color: "var(--color-primary)", bg: "var(--color-primary-muted)" },
    goal: { icon: <CircleCheckBig size={14} />, color: "var(--color-primary)", bg: "var(--color-primary-muted)" },
  };
  return (
    <div className="p-5 md:p-6 max-w-2xl mx-auto space-y-4">
      <div className="pt-2"><h1 className="text-xl font-semibold text-foreground">Alertas inteligentes</h1><p className="text-foreground-sub text-sm mt-0.5">{trainerAlerts.length} novos alertas</p></div>
      <div className="space-y-3">
        {trainerAlerts.map((alert) => {
          const c = cfg[alert.type] ?? cfg.warning;
          return (
            <div key={alert.id} className="card-glass flex items-start gap-3 p-4 border-l-2" style={{ borderLeftColor: c.color }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ color: c.color, background: c.bg }}>{c.icon}</div>
              <p className="text-foreground text-sm leading-relaxed">{alert.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Perfil ────────────────────────────────────────────────────────────────────

function TabPerfil({ onLogout }: { onLogout: () => void }) {
  const [name, setName] = useState("Lucas Ferreira");
  const [email, setEmail] = useState("lucas@lufit.app");
  const [specialty, setSpecialty] = useState("Hipertrofia e Emagrecimento");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [saved, setSaved] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  function handleImg(e: React.ChangeEvent<HTMLInputElement>, setter: (u: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target?.result as string);
    reader.readAsDataURL(file);
  }
  function handleSaveProfile() { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  function handleSavePass() {
    if (!currentPass || !newPass || newPass !== confirmPass) return;
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
    setPassSaved(true); setTimeout(() => setPassSaved(false), 2000);
  }

  return (
    <div className="p-5 md:p-6 max-w-xl mx-auto space-y-6">
      <div className="pt-2"><h1 className="text-xl font-semibold text-foreground">Meu Perfil</h1><p className="text-foreground-sub text-sm mt-0.5">Gerencie suas informações pessoais</p></div>
      {/* Avatar */}
      <div className="card-glass p-6">
        <h2 className="text-foreground font-semibold text-sm mb-4 flex items-center gap-2"><Camera size={14} className="text-primary" />Foto de perfil</h2>
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
              {avatarUrl ? <img src={avatarUrl} alt="Foto de perfil" className="w-full h-full object-cover" /> : <span className="text-primary text-2xl font-black" style={{ fontFamily: "var(--font-display)" }}>LF</span>}
            </div>
            <button onClick={() => avatarRef.current?.click()} className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full gradient-primary flex items-center justify-center shadow-lg"><Camera size={13} className="text-white" /></button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImg(e, setAvatarUrl)} />
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">{name}</p>
            <p className="text-foreground-muted text-xs mt-0.5">Personal Trainer</p>
            <button onClick={() => avatarRef.current?.click()} className="mt-2 text-xs text-primary hover:opacity-80 transition-opacity">Alterar foto</button>
          </div>
        </div>
      </div>
      {/* Logo */}
      <div className="card-glass p-6">
        <h2 className="text-foreground font-semibold text-sm mb-4 flex items-center gap-2"><Star size={14} className="text-primary" />Logo do seu negócio</h2>
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl bg-card border-2 border-border flex items-center justify-center overflow-hidden">
              {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-1" /> : <Dumbbell size={24} className="text-foreground-muted" />}
            </div>
            <button onClick={() => logoRef.current?.click()} className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full gradient-primary flex items-center justify-center shadow-lg"><Camera size={11} className="text-white" /></button>
            <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImg(e, setLogoUrl)} />
          </div>
          <div>
            <p className="text-foreground-sub text-xs leading-relaxed">Sua marca pessoal aparecerá nas fichas enviadas aos alunos.</p>
            <button onClick={() => logoRef.current?.click()} className="mt-2 text-xs text-primary hover:opacity-80 transition-opacity">Carregar logo</button>
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="card-glass p-6 space-y-4">
        <h2 className="text-foreground font-semibold text-sm flex items-center gap-2"><User size={14} className="text-primary" />Informações pessoais</h2>
        {[{ label: "Nome completo", value: name, setter: setName, placeholder: "Seu nome" }, { label: "E-mail", value: email, setter: setEmail, placeholder: "seu@email.com" }, { label: "Especialidade", value: specialty, setter: setSpecialty, placeholder: "Ex: Hipertrofia e Força" }].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-foreground-sub mb-1.5">{f.label}</label>
            <input value={f.value} onChange={(e) => f.setter(e.target.value)} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors" />
          </div>
        ))}
        <button onClick={handleSaveProfile} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${saved ? "bg-success/20 text-success border border-success/30" : "gradient-primary text-white hover:opacity-90"}`}>
          {saved ? <><Check size={14} className="inline mr-1.5" />Salvo!</> : <><Save size={14} className="inline mr-1.5" />Salvar informações</>}
        </button>
      </div>
      {/* Password */}
      <div className="card-glass p-6 space-y-4">
        <h2 className="text-foreground font-semibold text-sm flex items-center gap-2"><Lock size={14} className="text-primary" />Alterar senha</h2>
        {[{ label: "Senha atual", value: currentPass, setter: setCurrentPass }, { label: "Nova senha", value: newPass, setter: setNewPass }, { label: "Confirmar nova senha", value: confirmPass, setter: setConfirmPass }].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-foreground-sub mb-1.5">{f.label}</label>
            <input type="password" value={f.value} onChange={(e) => f.setter(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors" />
          </div>
        ))}
        {newPass && confirmPass && newPass !== confirmPass && <p className="text-danger text-xs">As senhas não coincidem</p>}
        <button onClick={handleSavePass} disabled={!currentPass || !newPass || newPass !== confirmPass} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${passSaved ? "bg-success/20 text-success border border-success/30" : "gradient-primary text-white hover:opacity-90"}`}>
          {passSaved ? <><Check size={14} className="inline mr-1.5" />Senha alterada!</> : "Alterar senha"}
        </button>
      </div>
      <button onClick={onLogout} className="w-full py-3 rounded-xl border border-border text-foreground-sub hover:text-foreground hover:bg-card text-sm transition-all flex items-center justify-center gap-2">
        <LogOut size={14} />Sair da conta
      </button>
    </div>
  );
}

// ── Shared ────────────────────────────────────────────────────────────────────

function AlertRow({ alert }: { alert: typeof trainerAlerts[0] }) {
  const cfg: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    warning: { icon: <AlertCircle size={14} />, color: "var(--color-danger)", bg: "var(--color-danger-muted)" },
    progress: { icon: <TrendingUp size={14} />, color: "var(--color-success)", bg: "var(--color-success-muted)" },
    streak: { icon: <Zap size={14} />, color: "var(--color-primary)", bg: "var(--color-primary-muted)" },
    goal: { icon: <CircleCheckBig size={14} />, color: "var(--color-primary)", bg: "var(--color-primary-muted)" },
  };
  const c = cfg[alert.type] ?? cfg.warning;
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ color: c.color, background: c.bg }}>{c.icon}</div>
      <p className="text-foreground text-sm leading-relaxed">{alert.text}</p>
    </div>
  );
}
