import { Stage } from "@/features/stage/Stage";
import { useOverlayConfig } from "@/hooks/useOverlayConfig";
import { ChatHighlight } from "@/shared/chat/ChatHighlight";
import { GuestLowerThird } from "@/shared/components/GuestLowerThird";
import { ScheduleLowerThird } from "@/shared/components/ScheduleLowerThird";

export function LowerThirdsScene() {
  const t = useOverlayConfig();

  return (
    <Stage background="transparent">
      <ChatHighlight accent={t.laravel.accent} />
      <GuestLowerThird accent={t.laravel.accent} />
      <ScheduleLowerThird accent={t.laravel.accent} />
    </Stage>
  );
}
