import { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, SkipForward, Check, Eye, EyeOff } from "lucide-react";
import { workoutExercises, exerciseImageUrls } from "../data/mockData";

interface Props {
  onExit: () => void;
}

type Phase = "exercise" | "rest" | "done";

interface SetLog {
  set: number;
  weight: number;
  reps: number;
  rpe: number;
  done: boolean;
}

export default function WorkoutMode({ onExit }: Props) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("exercise");
  const [currentSet, setCurrentSet] = useState(0);
  const [setLogs, setSetLogs] = useState<SetLog[][]>(
    workoutExercises.map((ex) => ex.loggedSets.map((s) => ({ ...s })))
  );
  const [restTime, setRestTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(
    workoutExercises.map(() => false)
  );
  const [workoutDone, setWorkoutDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const exercise = workoutExercises[exerciseIndex];
  const logs = setLogs[exerciseIndex];

  useEffect(() => {
    if (phase === "rest") {
      timerRef.current = setInterval(() => {
        setRestTime((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setPhase("exercise");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const updateLog = (field: keyof SetLog, value: number) => {
    setSetLogs((prev) => {
      const next = prev.map((arr) => arr.map((s) => ({ ...s })));
      next[exerciseIndex][currentSet] = { ...next[exerciseIndex][currentSet], [field]: value };
      return next;
    });
  };

  const completeSet = () => {
    setSetLogs((prev) => {
      const next = prev.map((arr) => arr.map((s) => ({ ...s })));
      next[exerciseIndex][currentSet].done = true;
      return next;
    });
    const isLastSet = currentSet >= logs.length - 1;
    if (isLastSet) {
      const newCompleted = [...completedExercises];
      newCompleted[exerciseIndex] = true;
      setCompletedExercises(newCompleted);
      if (exerciseIndex >= workoutExercises.length - 1) {
        setWorkoutDone(true);
      } else {
        setPhase("rest");
        setRestTime(exercise.rest);
      }
    } else {
      setPhase("rest");
      setRestTime(exercise.rest);
      setCurrentSet((s) => s + 1);
    }
  };

  const skipRest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("exercise");
    if (completedExercises[exerciseIndex]) {
      setExerciseIndex((i) => Math.min(i + 1, workoutExercises.length - 1));
      setCurrentSet(0);
    }
  };

  const addTime = (seconds: number) => {
    setRestTime((t) => Math.max(0, t + seconds));
  };

  const progress = completedExercises.filter(Boolean).length / workoutExercises.length;

  if (workoutDone) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background p-8 text-center animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-6 animate-check-pop">
          <Check size={40} className="text-primary" strokeWidth={2.5} />
        </div>
        <h1
          className="text-5xl font-black uppercase text-foreground mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
        >
          Treino concluído!
        </h1>
        <p className="text-foreground-sub text-lg mb-2">Excelente trabalho, Carlos.</p>
        <p className="text-foreground-muted text-sm mb-8">{workoutExercises.length} exercícios • Treino A completo</p>
        <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-sm">
          {[["7", "Exercícios"], ["24", "Séries"], ["+1", "Treino"]].map(([val, label]) => (
            <div key={label} className="card-glass p-4 text-center">
              <div className="text-primary font-black text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}>
                {val}
              </div>
              <div className="text-foreground-muted text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onExit}
          className="px-8 py-3.5 rounded-xl gradient-primary text-white font-bold hover:shadow-[0_0_24px_var(--color-primary-glow)] transition-all"
        >
          Voltar ao dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border shrink-0">
        <button
          onClick={onExit}
          className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-foreground-sub hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
        <div className="text-center">
          <div className="text-xs text-foreground-muted uppercase tracking-wider">Treino A</div>
          <div className="text-foreground text-sm font-semibold">Peito + Tríceps</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-foreground-muted">{exerciseIndex + 1}/{workoutExercises.length}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-border shrink-0">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-5">
        {phase === "rest" ? (
          <div className="flex flex-col items-center justify-center min-h-full py-8 animate-fade-in">
            <div className="text-xs text-foreground-muted uppercase tracking-widest mb-4">Descanso</div>
            <div
              className="text-[120px] leading-none font-black text-foreground mb-6 animate-pulse-ring"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              {String(Math.floor(restTime / 60)).padStart(2, "0")}:{String(restTime % 60).padStart(2, "0")}
            </div>
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addTime(30)}
                className="px-4 py-2 rounded-xl border border-border text-foreground-sub hover:text-foreground hover:border-border-bright text-sm transition-all"
              >
                +30s
              </button>
              <button
                onClick={skipRest}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-foreground-sub hover:text-foreground hover:border-border-bright text-sm transition-all"
              >
                <SkipForward size={14} />
                Pular descanso
              </button>
            </div>
            <div className="text-foreground-muted text-sm text-center">
              {completedExercises[exerciseIndex] ? (
                <span>Próximo: <span className="text-foreground">{workoutExercises[exerciseIndex + 1]?.name}</span></span>
              ) : (
                <span>Próxima série: <span className="text-foreground">{currentSet + 1} de {logs.length}</span></span>
              )}
            </div>
          </div>
        ) : completedExercises[exerciseIndex] ? (
          <div className="flex flex-col items-center justify-center min-h-full py-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-4 animate-check-pop">
              <Check size={28} className="text-primary" />
            </div>
            <div className="text-primary font-semibold mb-1">Exercício concluído</div>
            <div className="text-foreground-sub text-sm mb-6">Excelente! Você manteve a carga.</div>
            <button
              onClick={() => { setExerciseIndex((i) => i + 1); setCurrentSet(0); }}
              className="px-6 py-3 rounded-xl gradient-primary text-white font-bold"
            >
              Próximo exercício
            </button>
          </div>
        ) : (
          <div className="space-y-5 animate-slide-up">
            {/* Exercise navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {workoutExercises.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => { setExerciseIndex(i); setCurrentSet(0); }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    i === exerciseIndex
                      ? "bg-primary text-white"
                      : completedExercises[i]
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-card text-foreground-muted border border-border"
                  }`}
                >
                  {i + 1}. {ex.name.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>

            {/* Exercise image */}
            <ExerciseImage exerciseId={exercise.id} name={exercise.name} />

            {/* Exercise name */}
            <div>
              <div className="text-foreground-muted text-xs uppercase tracking-wider mb-1">{exercise.muscleGroup}</div>
              <h2
                className="text-4xl font-black uppercase text-foreground leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
              >
                {exercise.name}
              </h2>
              <div className="text-foreground-sub text-sm mt-1">
                {exercise.sets} × {exercise.reps} • Descanso: {exercise.rest}s
              </div>
            </div>

            {/* Series indicator */}
            <div className="flex gap-2">
              {logs.map((s, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    s.done ? "bg-primary" : i === currentSet ? "bg-primary/40" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="text-xs text-foreground-muted uppercase tracking-widest">
              Série {currentSet + 1} de {logs.length}
            </div>

            {/* Weight input */}
            <div className="card-glass p-5">
              <div className="text-foreground-muted text-xs uppercase tracking-wider mb-3">Peso (kg)</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateLog("weight", Math.max(0, logs[currentSet].weight - 2.5))}
                  className="w-12 h-12 rounded-xl bg-border border border-border-bright flex items-center justify-center text-foreground hover:bg-border-bright transition-all"
                >
                  <Minus size={18} />
                </button>
                <div
                  className="flex-1 text-center text-5xl font-black text-foreground"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
                >
                  {logs[currentSet].weight}
                </div>
                <button
                  onClick={() => updateLog("weight", logs[currentSet].weight + 2.5)}
                  className="w-12 h-12 rounded-xl bg-border border border-border-bright flex items-center justify-center text-foreground hover:bg-border-bright transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Reps input */}
            <div className="card-glass p-5">
              <div className="text-foreground-muted text-xs uppercase tracking-wider mb-3">Repetições</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateLog("reps", Math.max(1, logs[currentSet].reps - 1))}
                  className="w-12 h-12 rounded-xl bg-border border border-border-bright flex items-center justify-center text-foreground hover:bg-border-bright transition-all"
                >
                  <Minus size={18} />
                </button>
                <div
                  className="flex-1 text-center text-5xl font-black text-foreground"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
                >
                  {logs[currentSet].reps}
                </div>
                <button
                  onClick={() => updateLog("reps", logs[currentSet].reps + 1)}
                  className="w-12 h-12 rounded-xl bg-border border border-border-bright flex items-center justify-center text-foreground hover:bg-border-bright transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* RPE */}
            <div className="card-glass p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-foreground-muted text-xs uppercase tracking-wider">Esforço percebido (RPE)</div>
                <div className="text-foreground font-mono font-semibold">{logs[currentSet].rpe}/10</div>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => updateLog("rpe", n)}
                    className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all ${
                      n <= logs[currentSet].rpe
                        ? n >= 9 ? "bg-danger text-white" : n >= 7 ? "bg-warning text-white" : "bg-primary text-white"
                        : "bg-border text-foreground-muted"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Complete set button */}
            <button
              onClick={completeSet}
              className="w-full py-4 rounded-xl gradient-primary text-white font-bold text-base uppercase tracking-wide hover:shadow-[0_0_24px_var(--color-primary-glow)] transition-all active:scale-95"
            >
              Concluir série {currentSet + 1}
            </button>

            {/* Previous sets summary */}
            {logs.some((s) => s.done) && (
              <div className="card-glass p-4">
                <div className="text-foreground-muted text-xs uppercase tracking-wider mb-3">Séries anteriores</div>
                <div className="space-y-2">
                  {logs.filter((s) => s.done).map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-foreground-muted">Série {s.set}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-foreground font-mono" style={{ fontFamily: "var(--font-mono)" }}>
                          {s.weight} kg × {s.reps}
                        </span>
                        <span className="text-xs text-foreground-muted">RPE {s.rpe}</span>
                        <Check size={12} className="text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {exercise.notes && (
              <div className="flex gap-2 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-primary text-xs shrink-0 mt-0.5">💡</span>
                <span className="text-foreground-sub text-xs">{exercise.notes}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ExerciseImage({ exerciseId, name }: { exerciseId: string; name: string }) {
  const [visible, setVisible] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const url = exerciseImageUrls[exerciseId];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-border"
      style={{ minHeight: "160px", background: imgLoaded ? "#fff" : "var(--color-surface)" }}
    >
      {visible && url && !imgError ? (
        <>
          {!imgLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <span className="text-foreground-muted text-[10px]">Carregando…</span>
            </div>
          )}
          <img
            src={url}
            alt={`Demonstração: ${name}`}
            className={`w-full object-contain transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ maxHeight: "240px" }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {imgLoaded && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/40 text-[9px] text-white/60">
              wger.de
            </div>
          )}
        </>
      ) : visible && (!url || imgError) ? (
        <div className="flex items-center justify-center h-24 text-foreground-muted text-xs">
          Demonstração não disponível
        </div>
      ) : (
        <div className="flex items-center justify-center h-16 text-foreground-muted text-xs">
          Demonstração oculta
        </div>
      )}

      <button
        onClick={() => setVisible((v) => !v)}
        className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white/70 hover:text-white text-[10px] transition-colors border border-white/10"
      >
        {visible ? <EyeOff size={11} /> : <Eye size={11} />}
        {visible ? "Ocultar" : "Ver demo"}
      </button>
    </div>
  );
}
