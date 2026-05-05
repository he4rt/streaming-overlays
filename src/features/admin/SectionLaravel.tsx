import type { TweakConfig, LaravelConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (key: keyof TweakConfig, value: TweakConfig[keyof TweakConfig]) => void;
}

export function SectionLaravel({ config, update }: SectionProps) {
  const L = config.laravel;
  const setL = (patch: Partial<LaravelConfig>) =>
    update("laravel", { ...L, ...patch });

  return (
    <div className="flex flex-col gap-4">
      {/* ── Variants ── */}
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          VARIANTES DAS CENAS LARAVEL
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Starting"
            value={config.startingVariant}
            onChange={(v) => update("startingVariant", v)}
            options={[
              ["v1", "V1 · Splash circular"],
              ["v2", "V2 · Neon grid"],
              ["v3", "V3 · Poster + portraits"],
              ["v4", "V4 · Tipografia + marquee"],
              ["v5", "V5 · Laravel graffiti"],
            ]}
          />
          <Select
            label="Screen Share"
            value={config.screenShareVariant}
            onChange={(v) => update("screenShareVariant", v)}
            options={[
              ["v1", "V1 · Clássico"],
              ["v2", "V2 · Laravel graffiti"],
            ]}
          />
          <Select
            label="Screen Share Aspect (V2)"
            value={config.screenShareAspect}
            onChange={(v) => update("screenShareAspect", v as TweakConfig["screenShareAspect"])}
            options={[
              ["16:9", "16:9 · 1080p / 1440p / 4K"],
              ["16:10", "16:10 · MacBook"],
            ]}
          />
          <Select
            label="Pre-Show"
            value={config.preshowVariant}
            onChange={(v) => update("preshowVariant", v)}
            options={[
              ["v1", "V1 · Câmera + agenda"],
              ["v2", "V2 · Laravel graffiti"],
            ]}
          />
        </div>
      </fieldset>

      {/* ── Branding ── */}
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          BRANDING
        </legend>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Cor de destaque"
              type="color"
              value={L.accent}
              onChange={(v) => setL({ accent: v })}
            />
            <Field
              label="Tags do rodapé (separadas por · ou vírgula)"
              value={L.tags.join(" · ")}
              onChange={(v) =>
                setL({
                  tags: v
                    .split(/[·,]/)
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Background (default)"
              value={L.bgImage}
              onChange={(v) => setL({ bgImage: v })}
              placeholder="/laravel-bg.png"
            />
            <Field
              label="Background do Pre-Show"
              value={L.preshowBgImage}
              onChange={(v) => setL({ preshowBgImage: v })}
              placeholder="/preshow-bg.png"
            />
          </div>
        </div>
      </fieldset>

      {/* ── Chat ── */}
      <fieldset className="rounded-xl border border-white/10 p-4">
        <legend className="px-2 font-heading text-sm tracking-wider text-accent">
          CHAT (LARAVELCHAT)
        </legend>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Field
              label="Título"
              value={L.chatTitle}
              onChange={(v) => setL({ chatTitle: v })}
            />
            <Field
              label="Subtítulo"
              value={L.chatSubtitle}
              onChange={(v) => setL({ chatSubtitle: v })}
            />
            <Field
              label="Live pill"
              value={L.chatLivePill}
              onChange={(v) => setL({ chatLivePill: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Footer esquerdo (hashtag)"
              value={L.chatFooterLeft}
              onChange={(v) => setL({ chatFooterLeft: v })}
            />
            <Field
              label="Footer direito (handle)"
              value={L.chatFooterRight}
              onChange={(v) => setL({ chatFooterRight: v })}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-white/60">
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-white/60">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-accent"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
