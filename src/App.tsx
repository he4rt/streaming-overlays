import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "@/hooks/ChatProvider";
import { ObsProvider } from "@/hooks/ObsProvider";
import { ScreenShareScene } from "@/features/screen-share/ScreenShareScene";
import { StartingScene } from "@/features/starting/StartingScene";
import { PreShowScene } from "@/features/preshow/PreShowScene";
import { AdminPanel } from "@/features/admin/AdminPanel";
import { SceneOrchestrator } from "@/features/scene-orchestrator/SceneOrchestrator";
import { DevMode } from "@/features/dev/DevMode";

export function App() {
  return (
    <BrowserRouter>
      <ObsProvider>
        <ChatProvider>
          <Routes>
            {/* OBS aponta para esta rota — troca de cena com transição */}
            <Route path="/" element={<SceneOrchestrator />} />

            {/* Rotas individuais para Browser Sources separados / dev */}
            <Route path="/preshow" element={<PreShowScene />} />
            <Route path="/starting" element={<StartingScene />} />
            <Route path="/screen-share" element={<ScreenShareScene />} />

            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/dev" element={<DevMode />} />
          </Routes>
        </ChatProvider>
      </ObsProvider>
    </BrowserRouter>
  );
}
