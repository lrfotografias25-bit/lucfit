import { useState } from "react";
import { Search, X } from "lucide-react";
import { exerciseLibrary, exerciseImageUrls } from "../data/mockData";

const muscleGroups = ["Todos", "Peito", "Costas", "Ombros", "Bíceps", "Tríceps", "Quadríceps", "Posteriores", "Glúteos", "Abdômen"];
const equipmentList = ["Todos", "Barra", "Halteres", "Máquina", "Cabo", "Peso corporal"];
const levelList = ["Todos", "Iniciante", "Intermediário", "Avançado"];

const levelStyle: Record<string, { color: string; bg: string }> = {
  Iniciante: { color: "var(--color-success)", bg: "var(--color-success-muted)" },
  Intermediário: { color: "var(--color-warning)", bg: "var(--color-warning-muted)" },
  Avançado: { color: "var(--color-danger)", bg: "var(--color-danger-muted)" },
};

export default function ExerciseLibrary() {
  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("Todos");
  const [equipment, setEquipment] = useState("Todos");
  const [level, setLevel] = useState("Todos");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = exerciseLibrary.filter((ex) => {
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchMuscle = muscle === "Todos" || ex.group === muscle;
    const matchEquip = equipment === "Todos" || ex.equipment === equipment;
    const matchLevel = level === "Todos" || ex.level === level;
    return matchSearch && matchMuscle && matchEquip && matchLevel;
  });

  return (
    <div className="p-5 max-w-2xl mx-auto space-y-4">
      <div className="pt-2">
        <h1 className="text-xl font-semibold text-foreground">Biblioteca de exercícios</h1>
        <p className="text-foreground-sub text-sm mt-0.5">{exerciseLibrary.length} exercícios disponíveis</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar exercício..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm placeholder-foreground-muted focus:outline-none focus:border-primary/40 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Muscle filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {muscleGroups.map((g) => (
          <button
            key={g}
            onClick={() => setMuscle(g)}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              muscle === g
                ? "bg-primary text-white"
                : "bg-card border border-border text-foreground-sub hover:text-foreground"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Equipment + Level filter */}
      <div className="flex gap-2 flex-wrap">
        {equipmentList.map((e) => (
          <button
            key={e}
            onClick={() => setEquipment(e)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
              equipment === e
                ? "bg-primary/12 text-primary border border-primary/25"
                : "bg-card border border-border text-foreground-muted hover:text-foreground-sub"
            }`}
          >
            {e}
          </button>
        ))}
        {levelList.filter((l) => l !== "Todos").map((l) => (
          <button
            key={l}
            onClick={() => setLevel(level === l ? "Todos" : l)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all border ${
              level === l ? "text-white border-transparent" : "bg-card border-border text-foreground-muted hover:text-foreground-sub"
            }`}
            style={level === l ? { background: levelStyle[l]?.color, borderColor: "transparent" } : {}}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="text-xs text-foreground-muted">{filtered.length} exercícios encontrados</div>

      {/* Exercise list */}
      <div className="space-y-2">
        {filtered.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setSelected(selected === ex.id ? null : ex.id)}
            className={`w-full text-left card-glass p-4 transition-all ${selected === ex.id ? "border-primary/25 bg-primary/5" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-foreground text-sm font-medium">{ex.name}</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-border text-foreground-sub">{ex.group}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-border text-foreground-sub">{ex.equipment}</span>
                </div>
                {selected === ex.id && (
                  <div className="mt-3 space-y-3 animate-slide-up">
                    <ExerciseGifPanel exerciseId={ex.id} name={ex.name} />
                    <div className="text-xs text-foreground-muted">Músculos:</div>
                    <div className="flex flex-wrap gap-1">
                      {ex.muscles.map((m) => (
                        <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">{m}</span>
                      ))}
                    </div>
                    <button className="mt-1 px-4 py-2 rounded-xl gradient-primary text-white text-xs font-bold">
                      + Adicionar ao treino
                    </button>
                  </div>
                )}
              </div>
              <span
                className="text-[10px] font-medium px-2 py-1 rounded-lg shrink-0 mt-0.5"
                style={{
                  color: levelStyle[ex.level]?.color,
                  background: levelStyle[ex.level]?.bg,
                }}
              >
                {ex.level}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExerciseGifPanel({ exerciseId, name }: { exerciseId: string; name: string }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const url = exerciseImageUrls[exerciseId];

  if (!url || imgError) {
    return (
      <div className="rounded-xl bg-surface border border-border flex items-center justify-center py-6">
        <span className="text-foreground-muted text-xs">Demonstração não disponível</span>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden border border-border relative"
      style={{ background: imgLoaded ? "#fff" : "var(--color-surface)", minHeight: "140px" }}
    >
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
      <img
        src={url}
        alt={`Demonstração: ${name}`}
        className={`w-full object-contain transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ maxHeight: "200px" }}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
