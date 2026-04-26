import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TwoCamsScene } from "@/features/two-cams/TwoCamsScene";
import { ScreenShareScene } from "@/features/screen-share/ScreenShareScene";
import { StartingScene } from "@/features/starting/StartingScene";
import { EndingScene } from "@/features/ending/EndingScene";
import { BrbScene } from "@/features/brb/BrbScene";
import { QuestionScene } from "@/features/question/QuestionScene";
import { PollScene } from "@/features/poll/PollScene";
import { QuoteScene } from "@/features/quote/QuoteScene";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TwoCamsScene />} />
        <Route path="/two-cams" element={<TwoCamsScene />} />
        <Route path="/screen-share" element={<ScreenShareScene />} />
        <Route path="/starting" element={<StartingScene />} />
        <Route path="/ending" element={<EndingScene />} />
        <Route path="/brb" element={<BrbScene />} />
        <Route path="/question" element={<QuestionScene />} />
        <Route path="/poll" element={<PollScene />} />
        <Route path="/quote" element={<QuoteScene />} />
      </Routes>
    </BrowserRouter>
  );
}
