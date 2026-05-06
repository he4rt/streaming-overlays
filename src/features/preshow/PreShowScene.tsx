import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ChatHighlight } from "@/shared/chat/ChatHighlight";
import { GuestLowerThird } from "@/shared/components/GuestLowerThird";
import { ScheduleLowerThird } from "@/shared/components/ScheduleLowerThird";
import { QuestionLowerThird } from "@/shared/components/QuestionLowerThird";
import { PreShowV2 } from "./PreShowV2";

export function PreShowScene() {
  const t = useOverlayConfig();
  return (
    <Stage>
      <PreShowV2 config={t} />
      <ChatHighlight accent={t.laravel.accent} />
      <GuestLowerThird accent={t.laravel.accent} />
      <ScheduleLowerThird accent={t.laravel.accent} />
      <QuestionLowerThird accent={t.laravel.accent} />
    </Stage>
  );
}
