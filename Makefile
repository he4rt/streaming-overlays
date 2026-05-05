.PHONY: env-up env-down env-logs env-restart

env-up:
	@test -f .env || (echo "[!] .env não existe. Copia .env.example pra .env e coloca TWITCH_STREAM_KEY"; exit 1)
	docker compose up -d
	@echo ""
	@echo "MediaMTX up:"
	@echo "  WHIP ingest (OBS):     http://localhost:8889/heart/whip"
	@echo "  WHEP playback (admin): http://localhost:8889/heart/whep"
	@grep -q '^RELAY_TWITCH=1' .env && echo "  Relay Twitch: ON (republica quando OBS publicar)" || echo "  Relay Twitch: OFF (set RELAY_TWITCH=1 em .env pra habilitar)"

env-down:
	docker compose down

env-logs:
	docker compose logs -f

env-restart:
	docker compose restart
