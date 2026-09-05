import { useState } from "react";
import { Dumbbell, TrendingUp, Users, BookOpen, CheckCircle, Star, Zap, Sun, Moon, X, Eye, EyeOff } from "lucide-react";

interface Props {
  onEnterStudent?: () => void;
  onEnterTrainer?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const UNS = "https://images.unsplash.com/photo-";

const photos = {
  heroPhone: `${UNS}1608138278561-4b1ade407411?w=900&h=1200&fit=crop&auto=format`,
  trainerCoaching: `${UNS}1738523686534-7055df5858d6?w=800&h=600&fit=crop&auto=format`,
  womanBarbell: `${UNS}1722925541142-5db2668ca492?w=600&h=800&fit=crop&auto=format`,
  manLift: `${UNS}1738523687459-963f3fb56522?w=600&h=800&fit=crop&auto=format`,
  trainerWoman: `${UNS}1758875569256-f37c438cac65?w=800&h=600&fit=crop&auto=format`,
};

function PricingSection({ onCta }: { onCta: () => void }) {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      monthly: 49.9,
      annual: 37.42,
      yearTotal: 449,
      highlight: false,
      features: [
        "Até 15 alunos ativos",
        "Criação de treinos ilimitados",
        "App para o aluno",
        "Demonstração de exercícios",
        "Alertas de inatividade",
        "Suporte por e-mail",
      ],
      missing: ["Relatórios avançados", "Marca personalizada"],
    },
    {
      name: "Pro",
      monthly: 89.9,
      annual: 67.42,
      yearTotal: 809,
      highlight: true,
      features: [
        "Alunos ilimitados",
        "Criação de treinos ilimitados",
        "App para o aluno",
        "Demonstração de exercícios",
        "Alertas de inatividade",
        "Relatórios avançados",
        "Marca personalizada",
        "Suporte prioritário",
      ],
      missing: [],
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2
            className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Planos simples,
            <br />
            <span className="text-primary">resultado real.</span>
          </h2>
          <p className="text-foreground-sub text-sm sm:text-base max-w-md mx-auto mb-8">
            Teste grátis por 7 dias. Cancele quando quiser.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 bg-card border border-border rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!annual ? "gradient-primary text-white shadow-sm" : "text-foreground-muted hover:text-foreground"}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${annual ? "gradient-primary text-white shadow-sm" : "text-foreground-muted hover:text-foreground"}`}
            >
              Anual
            </button>
          </div>
          {annual && (
            <div className="mt-3 text-xs text-primary font-medium">
              Economize até 25% no plano anual
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-7 flex flex-col ${
                plan.highlight
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  Mais popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-foreground-muted text-xs uppercase tracking-widest mb-2">{plan.name}</div>
                <div className="flex items-end gap-1.5">
                  <span className="text-foreground-sub text-sm">R$</span>
                  <span
                    className="text-5xl font-black text-foreground leading-none"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
                  >
                    {annual ? plan.annual.toFixed(2).replace(".", ",") : plan.monthly.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-foreground-muted text-xs mb-1">/mês</span>
                </div>
                {annual && (
                  <div className="text-foreground-muted text-xs mt-1">
                    R$ {plan.yearTotal}/ano — cobrado anualmente
                  </div>
                )}
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground-sub">
                    <CheckCircle size={15} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground-muted line-through">
                    <div className="w-[15px] h-[15px] rounded-full border border-border shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onCta}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                  plan.highlight
                    ? "gradient-primary text-white hover:opacity-90 hover:shadow-[0_0_24px_var(--color-primary-glow)]"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                Começar 7 dias grátis
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoginModal({
  onClose,
  onLoginStudent,
  onLoginTrainer,
}: {
  onClose: () => void;
  onLoginStudent?: () => void;
  onLoginTrainer?: () => void;
}) {
  const [role, setRole] = useState<"student" | "trainer">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "trainer") onLoginTrainer?.();
      else onLoginStudent?.();
    }, 800);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-surface border border-border rounded-3xl p-8 shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-card transition-all"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="font-black text-2xl text-foreground tracking-wide"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            LUCFIT
          </span>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-1 text-center">Entrar na plataforma</h2>
        <p className="text-foreground-sub text-sm text-center mb-6">Acesse sua conta para continuar</p>

        <div className="flex bg-card border border-border rounded-xl p-1 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              role === "student" ? "gradient-primary text-white shadow-sm" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Sou Aluno
          </button>
          <button
            onClick={() => setRole("trainer")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              role === "trainer" ? "gradient-primary text-white shadow-sm" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Sou Personal
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground-sub mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "trainer" ? "personal@academia.com" : "aluno@email.com"}
              required
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground-sub mb-1.5">Senha</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground-sub transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-primary hover:opacity-80 transition-opacity">
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm transition-all hover:shadow-[0_0_24px_var(--color-primary-glow)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-center text-foreground-muted text-xs mt-6">
          {role === "trainer"
            ? "O personal cria a conta do aluno pelo painel."
            : "Seu personal enviou o acesso por e-mail."}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage({ onEnterStudent, onEnterTrainer, isDark, onToggleTheme }: Props) {
  const [showLogin, setShowLogin] = useState(false);

  function openLogin() { setShowLogin(true); }
  function closeLogin() { setShowLogin(false); }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {showLogin && (
        <LoginModal
          onClose={closeLogin}
          onLoginStudent={onEnterStudent}
          onLoginTrainer={onEnterTrainer}
        />
      )}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Dumbbell size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-black text-xl text-foreground tracking-wide" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
            LUCFIT
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-card transition-all"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={openLogin}
            className="px-3 sm:px-4 py-2 text-sm text-foreground-sub hover:text-foreground transition-colors hidden sm:block"
          >
            Sou Personal
          </button>
          <button
            onClick={openLogin}
            className="px-3 sm:px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            Começar agora
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="animate-slide-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Zap size={12} className="text-primary" />
              <span className="text-xs text-primary font-medium tracking-wider uppercase">Plataforma de Treino</span>
            </div>
            <h1
              className="text-[56px] sm:text-[72px] lg:text-[80px] leading-[0.88] font-black uppercase mb-6 text-foreground"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-1px" }}
            >
              Seu treino.
              <br />
              <span className="text-primary">Sua evolução.</span>
              <br />
              Seu ritmo.
            </h1>
            <p className="text-foreground-sub text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Uma plataforma inteligente para personal trainers criarem, acompanharem e transformarem o treinamento de seus alunos.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openLogin}
                className="px-5 sm:px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-all hover:shadow-[0_0_24px_var(--color-primary-glow)] active:scale-95"
              >
                Começar agora
              </button>
              <button
                onClick={openLogin}
                className="px-5 sm:px-6 py-3.5 rounded-xl border border-border text-foreground hover:border-border-bright hover:bg-card transition-all"
              >
                Ver como Personal
              </button>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl pointer-events-none" />
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-surface" style={{ aspectRatio: "4/5" }}>
                <img
                  src={photos.heroPhone}
                  alt="Aluno no gym consultando o LucFit no celular"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/70" />

                {/* Phone UI overlay */}
                <div className="absolute bottom-6 left-4 right-4">
                  <div className="bg-card/95 backdrop-blur-md rounded-2xl border border-primary/20 p-4 shadow-2xl">
                    <div className="text-foreground-muted text-[10px] uppercase tracking-wider mb-1">Treino de hoje</div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-foreground font-black text-base" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                          TREINO A
                        </div>
                        <div className="text-foreground-sub text-xs">Peito + Tríceps</div>
                      </div>
                      <Dumbbell size={18} className="text-primary" />
                    </div>
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {["7 exercícios", "55 min", "Intermediário"].map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-border text-foreground-muted border border-border">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="h-8 rounded-lg gradient-primary flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold uppercase tracking-wide">Começar treino</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-primary font-medium">LucFit</span>
                </div>
              </div>

              <div className="absolute -right-4 top-1/3 bg-card border border-border rounded-2xl p-3 shadow-xl hidden sm:block">
                <div className="text-foreground-muted text-[9px] uppercase tracking-wider mb-1">Sequência</div>
                <div className="text-foreground font-black text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                  ⚡ 7
                </div>
                <div className="text-foreground-muted text-[9px]">dias seguidos</div>
              </div>

              <div className="absolute -left-4 top-1/2 bg-card border border-border rounded-2xl p-3 shadow-xl hidden sm:block">
                <div className="text-foreground-muted text-[9px] uppercase tracking-wider mb-1">Evolução</div>
                <div className="text-primary font-black text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                  +12%
                </div>
                <div className="text-foreground-muted text-[9px]">este mês</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-8 border-y border-border bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap gap-6 sm:gap-8 items-center justify-center md:justify-between">
          {[["2.400+", "Alunos ativos"], ["180+", "Personal trainers"], ["96%", "Satisfação"], ["4.9", "Avaliação"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground mb-0.5" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                {val}
              </div>
              <div className="text-xs text-foreground-sub">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Tudo que você precisa
            <br />
            <span className="text-primary">para acompanhar seus alunos.</span>
          </h2>
          <p className="text-foreground-sub max-w-md mx-auto text-sm sm:text-base">
            Do treino ao gráfico de evolução — tudo em um só lugar.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Dumbbell size={22} />, title: "Treinos personalizados", desc: "Monte fichas completas em poucos minutos com nossa biblioteca de exercícios." },
            { icon: <TrendingUp size={22} />, title: "Acompanhamento", desc: "Veja a evolução dos seus alunos em um só lugar. Métricas reais, sem planilhas." },
            { icon: <BookOpen size={22} />, title: "Biblioteca completa", desc: "Encontre rapidamente o exercício ideal. Filtros por músculo, equipamento e nível." },
            { icon: <Users size={22} />, title: "Gestão de alunos", desc: "Painel inteligente com alertas sobre frequência, evolução e necessidade de atenção." },
          ].map((f) => (
            <div key={f.title} className="card-glass p-5 sm:p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                {f.icon}
              </div>
              <h3 className="text-foreground font-semibold mb-2 text-sm sm:text-base">{f.title}</h3>
              <p className="text-foreground-sub text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-3 sm:gap-4" style={{ gridTemplateRows: "220px 220px" }}>
          <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative bg-surface">
            <img src={photos.trainerCoaching} alt="Personal trainer com aluno" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="text-primary text-xs font-medium uppercase tracking-wider mb-1">Personal + Aluno</div>
              <div className="text-white font-black text-xl sm:text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                Treinamento acompanhado
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden bg-surface">
            <img src={photos.manLift} alt="Treino com barra" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden bg-surface">
            <img src={photos.womanBarbell} alt="Treino feminino" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* For trainer */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Star size={12} className="text-primary" />
              <span className="text-xs text-primary font-medium tracking-wider uppercase">Para Personal Trainers</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              Seu trabalho de personal,
              <br />
              <span className="text-primary">elevado pela tecnologia.</span>
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Menos planilhas, mais organização",
                "Menos WhatsApp, mais acompanhamento",
                "Mais percepção de valor para o aluno",
                "Alertas quando o aluno precisa de atenção",
                "Histórico completo de cada aluno",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-foreground-sub text-sm">
                  <CheckCircle size={16} className="text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={openLogin}
              className="px-5 sm:px-6 py-3.5 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-all"
            >
              Quero ser um profissional LucFit
            </button>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-surface border border-border" style={{ aspectRatio: "4/3" }}>
              <img src={photos.trainerWoman} alt="Personal trainer acompanhando aluna" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface/60 to-transparent" />
            </div>
            <div className="absolute top-4 right-4 grid grid-cols-2 gap-2">
              {[
                { label: "Alunos", val: "32" },
                { label: "Adesão", val: "86%" },
              ].map((m) => (
                <div key={m.label} className="bg-background/85 backdrop-blur-md border border-border rounded-xl p-3 text-center">
                  <div className="text-primary font-black text-xl" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                    {m.val}
                  </div>
                  <div className="text-foreground-muted text-[9px] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For student */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2
              className="text-3xl sm:text-5xl font-black uppercase text-foreground mb-3 leading-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              Você sabe exatamente
              <br />
              <span className="text-primary">o que fazer na academia.</span>
            </h2>
            <p className="text-foreground-sub text-sm mb-8 leading-relaxed max-w-md">
              Do aquecimento ao último rep — o LucFit guia cada etapa do seu treino.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {[
                ["1", "Abra seu treino."],
                ["2", "Veja o exercício."],
                ["3", "Registre sua série."],
                ["4", "Descanse."],
                ["5", "Continue."],
                ["6", "Acompanhe sua evolução."],
              ].map(([num, text]) => (
                <div key={num} className="card-glass px-4 py-3 flex items-center gap-3">
                  <div
                    className="text-xl font-black text-primary shrink-0 w-5"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
                  >
                    {num}
                  </div>
                  <div className="text-foreground-sub text-xs sm:text-sm">{text}</div>
                </div>
              ))}
            </div>
            <button
              onClick={openLogin}
              className="px-6 sm:px-8 py-4 rounded-xl gradient-primary text-white font-semibold text-base hover:opacity-90 transition-all hover:shadow-[0_0_32px_var(--color-primary-glow)] active:scale-95"
            >
              Quero começar agora
            </button>
          </div>

          {/* Workout mode preview */}
          <div className="hidden lg:block">
            <div className="relative bg-surface border border-border rounded-3xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-primary/3 pointer-events-none" />
              <div className="text-foreground-muted text-[10px] uppercase tracking-widest mb-1">Modo treino ativo</div>
              <div className="text-foreground font-black text-3xl uppercase mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                Supino Reto
              </div>
              <div className="text-foreground-sub text-xs mb-4">4 séries × 10 reps • 90s descanso</div>
              <div className="flex gap-1.5 mb-5">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= 2 ? "bg-primary" : s === 3 ? "bg-primary/40" : "bg-border"}`} />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[{ label: "Peso", val: "60", unit: "kg" }, { label: "Reps", val: "10", unit: "repetições" }].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <div className="text-foreground-muted text-[9px] uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-foreground text-4xl font-black" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>{item.val}</div>
                    <div className="text-foreground-muted text-[10px]">{item.unit}</div>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <div className="text-foreground-muted text-[9px] uppercase tracking-wider mb-2">Esforço (RPE)</div>
                <div className="flex gap-1">
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                    <div key={n} className={`flex-1 h-6 rounded text-[8px] font-bold flex items-center justify-center ${
                      n <= 7 ? (n >= 7 ? "bg-warning text-white" : "bg-primary text-white") : "bg-border text-foreground-muted"
                    }`}>{n}</div>
                  ))}
                </div>
              </div>
              <div className="h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm uppercase tracking-wide">
                Concluir série 3
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection onCta={openLogin} />

      {/* Footer */}
      <footer className="py-8 border-t border-border px-4 sm:px-6 bg-surface">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
              <Dumbbell size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-foreground-sub text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              LUCFIT
            </span>
          </div>
          <div className="text-foreground-muted text-xs">Sua plataforma de treino inteligente.</div>
        </div>
      </footer>
    </div>
  );
}
