import { BrowserRouter, Routes, Route } from "react-router-dom";

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-bg-deep text-white font-heading text-4xl">
      {name}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder name="Heart Talks Overlay" />} />
        <Route path="/starting" element={<Placeholder name="Starting" />} />
        <Route path="/two-cams" element={<Placeholder name="Two Cams" />} />
        <Route path="/screen-share" element={<Placeholder name="Screen Share" />} />
        <Route path="/brb" element={<Placeholder name="BRB" />} />
        <Route path="/question" element={<Placeholder name="Question" />} />
        <Route path="/poll" element={<Placeholder name="Poll" />} />
        <Route path="/quote" element={<Placeholder name="Quote" />} />
        <Route path="/ending" element={<Placeholder name="Ending" />} />
      </Routes>
    </BrowserRouter>
  );
}
