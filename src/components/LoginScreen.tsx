import { useState } from "react";
import { Dumbbell, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface Props {
  onLoginStudent: () => void;
  onLoginTrainer: () => void;
  onBack: () => void;
}

type Role = "student" | "trainer";

export default function LoginScreen({ onLoginStudent, onLoginTrainer, onBack }: Props) {
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      role === "trainer" ? onLoginTrainer() : onLoginStudent();
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4f8ef7]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#8888aa] hover:text-[#f0f0f8] transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Card */}
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="font-display font-black text-2xl text-[#f0f0f8] tracking-wide"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            LUCFIT
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#f0f0f8] mb-1 text-center">Entrar na plataforma</h1>
        <p className="text-[#8888aa] text-sm text-center mb-8">Acesse sua conta para continuar</p>

        {/* Role toggle */}
        <div className="flex bg-[#0f0f1a] border border-[#1e1e30] rounded-xl p-1 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              role === "student"
                ? "bg-[#4f8ef7] text-white shadow-sm"
                : "text-[#555570] hover:text-[#f0f0f8]"
            }`}
          >
            Sou Aluno
          </button>
          <button
            onClick={() => setRole("trainer")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              role === "trainer"
                ? "bg-[#4f8ef7] text-white shadow-sm"
                : "text-[#555570] hover:text-[#f0f0f8]"
            }`}
          >
            Sou Personal
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#8888aa] mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "trainer" ? "personal@academia.com" : "aluno@email.com"}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f1a] border border-[#1e1e30] text-[#f0f0f8] text-sm placeholder-[#555570] focus:outline-none focus:border-[#4f8ef7]/50 focus:bg-[#13131f] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8888aa] mb-1.5">Senha</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#0f0f1a] border border-[#1e1e30] text-[#f0f0f8] text-sm placeholder-[#555570] focus:outline-none focus:border-[#4f8ef7]/50 focus:bg-[#13131f] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555570] hover:text-[#8888aa] transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-[#4f8ef7] hover:text-[#6aa3f9] transition-colors">
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(79,142,247,0.4)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
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

        {/* Demo hint */}
        <p className="text-center text-[#555570] text-xs mt-8">
          {role === "trainer"
            ? "O personal cria a conta do aluno pelo painel."
            : "Seu personal enviou o acesso por e-mail."}
        </p>
      </div>
    </div>
  );
}
