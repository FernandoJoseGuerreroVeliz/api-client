COMPOSE     = docker compose -f docker/docker-compose.yml     --env-file api-access/.env
COMPOSE_DEV = docker compose -f docker/docker-compose.dev.yml --env-file api-access/.env

# ============================================
# MAKEFILE - Microservicios PATA
# ============================================
.PHONY: help
help: ## Muestra esta ayuda
	@echo "📚 Comandos Disponibles:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-35s\033[0m %s\n", $$1, $$2}'

# ============================================
# DOCKER - SERVICIOS
# ============================================
up: ## Levantar todos los servicios en producción
	$(COMPOSE) up -d

up-dev: ## Levantar todos los servicios en desarrollo (background)
	$(COMPOSE_DEV) up -d

up-dev-logs: ## Levantar en desarrollo con logs visibles (hot-reload)
	$(COMPOSE_DEV) up

down: ## Bajar todos los servicios
	$(COMPOSE) down

down-dev: ## Bajar todos los servicios (desarrollo)
	$(COMPOSE_DEV) down

down-v: ## Bajar servicios y eliminar volúmenes (⚠️ ELIMINA DATOS)
	$(COMPOSE) down -v

rebuild: ## Reconstruir y levantar todos los servicios
	$(COMPOSE) up -d --build

rebuild-dev: ## Rebuild completo en desarrollo
	$(COMPOSE_DEV) down
	$(COMPOSE_DEV) up -d --build

rebuild-dev-clean: ## Clean total + rebuild desde cero (sin cache)
	$(COMPOSE_DEV) down
	$(COMPOSE_DEV) build --no-cache
	$(COMPOSE_DEV) up -d

logs: ## Ver logs de todos los servicios
	$(COMPOSE) logs -f

logs-dev: ## Ver logs en modo desarrollo
	$(COMPOSE_DEV) logs -f

ps: ## Ver estado de los servicios
	$(COMPOSE) ps

# ============================================
# DOCKER - API ACCESS
# ============================================
rebuild-access: ## [ACCESS] Rebuild y levantar api-access
	$(COMPOSE) up -d --build api-access

rebuild-access-dev: ## [ACCESS] Rebuild api-access en desarrollo
	$(COMPOSE_DEV) up -d --build api-access

restart-access: ## [ACCESS] Restart api-access sin rebuild
	$(COMPOSE) restart api-access

logs-access: ## [ACCESS] Ver logs de api-access
	$(COMPOSE) logs -f api-access

logs-access-dev: ## [ACCESS] Ver logs de api-access (desarrollo)
	$(COMPOSE_DEV) logs -f api-access

# ============================================
# MIGRACIONES - API ACCESS
# ============================================
access-migrate-dev: ## [ACCESS] Crear y aplicar migración en desarrollo
	cd api-access && npx prisma migrate dev

access-migrate-create: ## [ACCESS] Crear migración sin aplicar (usar: make access-migrate-create NAME=add_users)
	@test -n "$(NAME)" || (echo "❌ Error: Especifica NAME=nombre_migracion" && exit 1)
	cd api-access && npx prisma migrate dev --create-only --name $(NAME)
	@echo "✅ Migración creada. Revisa el archivo SQL en api-access/prisma/migrations/"

access-migrate-deploy: ## [ACCESS] Aplicar migraciones en producción
	cd api-access && npx prisma migrate deploy

access-migrate-reset: ## [ACCESS] Resetear BD y aplicar todas las migraciones (⚠️ ELIMINA DATOS)
	cd api-access && npx prisma migrate reset --force

access-migrate-status: ## [ACCESS] Ver estado de las migraciones
	cd api-access && npx prisma migrate status

access-generate: ## [ACCESS] Generar Prisma Client
	cd api-access && npx prisma generate

access-studio: ## [ACCESS] Abrir Prisma Studio
	cd api-access && npx prisma studio

access-seed: ## [ACCESS] Ejecutar seed
	cd api-access && npx prisma db seed

# ============================================
# MIGRACIONES - TODOS LOS SERVICIOS
# ============================================
migrate-all-dev: access-migrate-dev ## Crear y aplicar migraciones en TODOS los servicios (desarrollo)

migrate-all-deploy: access-migrate-deploy ## Aplicar migraciones en TODOS los servicios (producción)

migrate-all-status: ## Ver estado de migraciones en TODOS los servicios
	@echo "📊 Estado de migraciones:"
	@echo ""
	@echo "🔐 API ACCESS:"
	@cd api-access && npx prisma migrate status

generate-all: access-generate ## Generar Prisma Client en TODOS los servicios

# ============================================
# DESARROLLO LOCAL (sin Docker)
# ============================================
dev-access: ## Ejecutar API Access en modo desarrollo (fuera de Docker)
	cd api-access && npm run start:dev

install-all: ## Instalar dependencias en todos los microservicios
	cd api-access && npm install

# ============================================
# LIMPIEZA
# ============================================
clean: ## Limpiar recursos de Docker no utilizados
	docker system prune -f

clean-all: ## Limpieza profunda de Docker (⚠️ CUIDADO)
	docker system prune -a -f --volumes

# ============================================
# TESTING
# ============================================
test-access: ## Ejecutar tests del API Access
	cd api-access && npm test

test-all: test-access ## Ejecutar tests en todos los servicios

# ============================================
# UTILIDADES
# ============================================
.PHONY: full-reset
full-reset: ## Reset completo de migraciones y BD (⚠️ ELIMINA TODO)
	@echo "🧹 Eliminando migraciones locales..."
	rm -rf api-access/prisma/migrations/*
	@echo "♻️  Reiniciando base de datos para api-access..."
	cd api-access && npx prisma migrate reset --force
	@echo "🚀 Generando nuevas migraciones..."
	cd api-access && npx prisma migrate dev --name init
	@echo "✅ Reset completo finalizado"
