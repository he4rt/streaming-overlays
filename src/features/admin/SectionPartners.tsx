import { useState } from "react";
import type { TweakConfig } from "@/shared/types";

interface SectionProps {
  config: TweakConfig;
  update: (
    key: keyof TweakConfig,
    value: TweakConfig[keyof TweakConfig],
  ) => void;
}

export function SectionPartners({ config, update }: SectionProps) {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [monochrome, setMonochrome] = useState(false);

  const partners = config.partners ?? [];

  function add() {
    const trimmedName = name.trim();
    const trimmedUrl = logoUrl.trim();
    if (!trimmedName || !trimmedUrl) return;
    update("partners", [
      ...partners,
      { name: trimmedName, logoUrl: trimmedUrl, monochrome },
    ]);
    setName("");
    setLogoUrl("");
    setMonochrome(false);
  }

  function remove(index: number) {
    update(
      "partners",
      partners.filter((_, i) => i !== index),
    );
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...partners];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target]!, next[index]!];
    update("partners", next);
  }

  return (
    <fieldset
      style={{
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        padding: 16,
      }}
    >
      <legend
        style={{
          padding: "0 8px",
          fontFamily: "var(--font-heading, sans-serif)",
          fontSize: 14,
          letterSpacing: "0.1em",
          color: "var(--color-accent, #A855F7)",
        }}
      >
        PARCEIROS
      </legend>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {partners.length === 0 && (
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              margin: 0,
            }}
          >
            Nenhum parceiro adicionado
          </p>
        )}

        {partners.map((partner, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              padding: "8px 12px",
            }}
          >
            <div
              style={{
                width: 64,
                height: 40,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: 6,
                background: "rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                style={{
                  maxHeight: 40,
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, overflow: "hidden" }}>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {partner.name}
              </span>
              {partner.monochrome && (
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "rgba(168,85,247,0.7)",
                    border: "1px solid rgba(168,85,247,0.3)",
                    borderRadius: 4,
                    padding: "1px 4px",
                  }}
                >
                  B&W
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {([-1, 1] as const).map((dir) => {
                const disabled =
                  dir === -1 ? i === 0 : i === partners.length - 1;
                return (
                  <button
                    key={dir}
                    onClick={() => move(i, dir)}
                    disabled={disabled}
                    title={dir === -1 ? "Mover para cima" : "Mover para baixo"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: disabled ? "default" : "pointer",
                      padding: "4px 6px",
                      borderRadius: 4,
                      fontSize: 12,
                      color: "rgba(255,255,255,0.3)",
                      opacity: disabled ? 0.2 : 1,
                    }}
                  >
                    {dir === -1 ? "↑" : "↓"}
                  </button>
                );
              })}
              <button
                onClick={() => remove(i)}
                title="Remover"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 6px",
                  borderRadius: 4,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            ADICIONAR
          </p>

          {[
            {
              label: "Nome",
              value: name,
              onChange: setName,
              placeholder: "He4rt Developers",
              type: "text",
            },
            {
              label: "URL da Logo",
              value: logoUrl,
              onChange: setLogoUrl,
              placeholder: "https://...",
              type: "url",
            },
          ].map(({ label, value, onChange, placeholder, type }) => (
            <label
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {label}
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  padding: "8px 12px",
                  fontSize: 14,
                  color: "white",
                  outline: "none",
                }}
              />
            </label>
          ))}

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={monochrome}
              onChange={(e) => setMonochrome(e.target.checked)}
              style={{ accentColor: "var(--color-accent, #A855F7)", width: 14, height: 14 }}
            />
            Forçar branco (PNG/SVG transparente)
          </label>

          <button
            onClick={add}
            disabled={!name.trim() || !logoUrl.trim()}
            style={{
              marginTop: 4,
              borderRadius: 8,
              border: "none",
              background: "rgba(168,85,247,0.2)",
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--color-accent, #A855F7)",
              cursor: !name.trim() || !logoUrl.trim() ? "default" : "pointer",
              opacity: !name.trim() || !logoUrl.trim() ? 0.3 : 1,
            }}
          >
            + Adicionar parceiro
          </button>
        </div>
      </div>
    </fieldset>
  );
}
