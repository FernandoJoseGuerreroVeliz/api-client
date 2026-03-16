COMPOSE = docker compose -f docker/docker-compose.yml --env-file api-access/.env

# ──────────────────────────────────────────────
#  General
# ──────────────────────────────────────────────

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

# ──────────────────────────────────────────────
#  api-access
# ──────────────────────────────────────────────

rebuild-access:
	$(COMPOSE) up -d --build api-access

restart-access:
	$(COMPOSE) restart api-access

logs-access:
	$(COMPOSE) logs -f api-access

# ──────────────────────────────────────────────
#  Helpers para futuros servicios
#  Añadir: rebuild-<servicio>, restart-<servicio>, logs-<servicio>
# ──────────────────────────────────────────────

rebuild-all:
	$(COMPOSE) up -d --build

.PHONY: up down logs ps rebuild-access restart-access logs-access rebuild-all
