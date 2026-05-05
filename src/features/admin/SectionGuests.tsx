import type { TweakConfig, Guest } from "@/shared/types";
import { guestAvatarUrl } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionGuests({ config, update }: SectionProps) {
  const { guests, activeSpeakerId, lowerThird } = config;

  const setGuest = (idx: number, patch: Partial<Guest>) => {
    const next = guests.map((g, i) => (i === idx ? { ...g, ...patch } : g));
    update("guests", next);
  };

  const addGuest = () => {
    const id = `guest-${Date.now().toString(36)}`;
    update("guests", [...guests, { id, name: "Novo convidado", talk: "", githubHandle: "" }]);
  };

  const removeGuest = (idx: number) => {
    const removed = guests[idx];
    update("guests", guests.filter((_, i) => i !== idx));
    if (removed && activeSpeakerId === removed.id) {
      update("activeSpeakerId", null);
    }
    if (removed && lowerThird?.kind === "guest" && lowerThird.guestId === removed.id) {
      update("lowerThird", null);
    }
  };

  const triggerLT = (g: Guest) => {
    update("lowerThird", { kind: "guest", guestId: g.id });
  };

  const isActiveLT = (g: Guest) =>
    lowerThird?.kind === "guest" && lowerThird.guestId === g.id;

  return (
    <div className="flex flex-col gap-4">
      {/* speaker ativo (câmera) */}
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          NA CÂMERA
        </legend>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 text-xs text-white/60">
            Speaker que aparece no nameplate do Screen Share
            <select
              value={activeSpeakerId ?? ""}
              onChange={(e) => update("activeSpeakerId", e.target.value || null)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
            >
              <option value="">— ninguém —</option>
              {guests.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} {g.talk ? `· ${g.talk}` : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      {/* lista de guests */}
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          CONVIDADOS · {guests.length}
        </legend>
        <div className="flex flex-col gap-3">
          {guests.length === 0 && (
            <p className="text-xs text-white/40">Nenhum convidado cadastrado.</p>
          )}
          {guests.map((g, idx) => (
            <GuestCard
              key={g.id}
              guest={g}
              isActiveLT={isActiveLT(g)}
              onChange={(patch) => setGuest(idx, patch)}
              onRemove={() => removeGuest(idx)}
              onTrigger={() => triggerLT(g)}
            />
          ))}
          <button
            type="button"
            onClick={addGuest}
            className="rounded-lg border border-dashed border-white/15 px-3 py-2 font-body text-xs font-bold text-white/55 transition hover:border-accent hover:text-accent"
          >
            + adicionar convidado
          </button>
        </div>
      </fieldset>
    </div>
  );
}

function GuestCard({
  guest,
  isActiveLT,
  onChange,
  onRemove,
  onTrigger,
}: {
  guest: Guest;
  isActiveLT: boolean;
  onChange: (patch: Partial<Guest>) => void;
  onRemove: () => void;
  onTrigger: () => void;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/3 p-3">
      <div className="flex items-start gap-3">
        {/* avatar preview */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-black/30">
          {guest.githubHandle ? (
            <img
              src={guestAvatarUrl(guest.githubHandle)}
              alt={guest.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
              }}
            />
          ) : (
            <span className="text-[10px] text-white/30">sem avatar</span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Nome"
              value={guest.name}
              onChange={(v) => onChange({ name: v })}
            />
            <Input
              label="GitHub handle"
              value={guest.githubHandle}
              placeholder="nunomaduro"
              onChange={(v) => onChange({ githubHandle: v.replace(/^@/, "").trim() })}
            />
          </div>
          <Input
            label="Palestra"
            value={guest.talk}
            placeholder="Strict AI Engineering"
            onChange={(v) => onChange({ talk: v })}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTrigger}
              disabled={isActiveLT}
              className={`rounded-md px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wider transition ${
                isActiveLT
                  ? "bg-accent/30 text-accent"
                  : "bg-accent/15 text-accent hover:bg-accent/25"
              }`}
            >
              {isActiveLT ? "▶ no ar" : "Destacar na overlay"}
            </button>
            <span className="font-body text-[10px] text-white/30">
              id: {guest.id}
            </span>
            <button
              type="button"
              onClick={onRemove}
              className="ml-auto rounded-md border border-red-500/20 px-2 py-1 font-body text-[10px] font-bold text-red-400 transition hover:bg-red-500/10"
            >
              remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-white/40">
      {label}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-accent"
      />
    </label>
  );
}
