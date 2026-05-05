# Preview ao vivo do OBS no /admin

O painel `/admin` exibe um preview WebRTC da cena ativa do OBS via WHIP/WHEP, usando MediaMTX como servidor local.

## Stack

```
                  ┌─→ WHEP → /admin (preview <video>)
OBS → WHIP → MediaMTX
                  └─→ RTMP → Twitch (relay automático)
```

OBS publica uma única vez (em WHIP). MediaMTX serve o preview local **e** republica pra Twitch via ffmpeg interno (`runOnReady`). Latência sub-segundo no preview; relay sem re-encode de vídeo (só áudio Opus→AAC).

## 0. Configurar `.env`

```bash
cp .env.example .env
```

Variáveis:
- `RELAY_TWITCH=0` (default) — só preview local, **não** empurra pra Twitch
- `RELAY_TWITCH=1` — habilita o relay automático
- `TWITCH_STREAM_KEY=...` — só lido quando `RELAY_TWITCH=1`. Pega em Twitch Creator Dashboard → Settings → Stream → Primary Stream Key

Quando trocar o flag, faz `docker compose restart mediamtx` (ou `make env-restart`).

## 1. Subir o MediaMTX

```bash
docker compose up -d mediamtx
```

Expõe:
- `:8889/tcp` — WHIP ingest + WHEP playback (HTTP/SDP)
- `:8189/udp` — ICE/RTP do WebRTC

Logs: `docker compose logs -f mediamtx`.

## 2. Configurar o OBS

Requer **OBS 30.1+** (saída WHIP nativa).

Settings → **Stream**:
- **Service**: WHIP
- **Server**: `http://localhost:8889/heart/whip`
- **Bearer Token**: deixar em branco

Settings → **Output** (Advanced recomendado):
- Encoder: NVENC / x264 / VAAPI (o que tiver)
- **Bitrate**: 4000–8000 kbps (rede local, pode mandar bem)
- **Keyframe Interval**: 1s (importante pra latência baixa em WebRTC)
- **Profile**: baseline ou main (compat com browsers)
- **Tune**: zerolatency (se x264)

Clique **Start Streaming**. O preview aparece no `/admin` em ~1–2s.

## 3. Configuração opcional do cliente

O componente lê `VITE_WHEP_URL` (default: `http://localhost:8889/heart/whep`).

Pra acessar de outro device da rede, criar `.env.local`:

```env
VITE_WHEP_URL=http://192.168.0.10:8889/heart/whep
```

E adicionar o IP em `MTX_WEBRTCADDITIONALHOSTS` no `docker-compose.yml` (separado por vírgula).

## Troubleshooting

- **"AGUARDANDO OBS"** — MediaMTX está vivo mas OBS não publicou ainda. Confirme que apertou "Start Streaming".
- **Conecta mas vídeo preto** — keyframe interval no OBS provavelmente alto demais. Baixe pra 1s.
- **Erro CORS** — MediaMTX libera origin `*` por padrão. Se mudou config, garanta `webrtcAllowOrigin: "*"`.
- **Acesso de outro host** — adicione o IP em `webrtcAdditionalHosts` no `mediamtx.yml`, senão o ICE só anuncia 127.0.0.1.
- **Não chega na Twitch** — confira `docker compose logs mediamtx | grep ffmpeg`. Erros comuns: chave errada (`Server returned 403`), bitrate alto demais, codec de áudio incompatível.
- **Quero pausar/retomar o relay pra Twitch** — troca `RELAY_TWITCH` no `.env` (0 ou 1) e roda `make env-restart`. O preview local continua funcionando independente do flag.
