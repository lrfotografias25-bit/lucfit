import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import LoginScreen from "./components/LoginScreen";
import StudentDashboard from "./components/StudentDashboard";
import TrainerDashboard from "./components/TrainerDashboard";

type View = "landing" | "login" | "student" | "trainer";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  return (
    <div className="h-full">
      {view === "landing" && (
        <LandingPage
          onEnterStudent={() => setView("student")}
          onEnterTrainer={() => setView("trainer")}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />
      )}
      {view === "student" && (
        <StudentDashboard
          onLogout={() => setView("landing")}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />
      )}
      {view === "trainer" && (
        <TrainerDashboard
          onLogout={() => setView("landing")}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />
      )}
    </div>
  );
}
