export function PollIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M3 21h18" />
      <path d="M6 18V10" />
      <path d="M12 18V4" />
      <path d="M18 18v-7" />
    </svg>
  );
}
