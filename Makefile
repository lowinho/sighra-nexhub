# ─────────────────────────────────────────────────────────────
# Makefile — atalhos para o Journey Service
# Uso: make <comando>
# ─────────────────────────────────────────────────────────────

.PHONY: help dev dev-down dev-logs \
        prod prod-down prod-logs \
        docker-rebuild sim-reset sim-reset-db lint clean

## Mostra esta ajuda
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

# ── Desenvolvimento ───────────────────────────────────────
dev: ## Inicia o serviço em modo desenvolvimento (hot-reload)
	docker compose -f docker-compose.dev.yml up --build

dev-down: ## Para e remove containers de dev
	docker compose -f docker-compose.dev.yml down

dev-logs: ## Exibe logs do ambiente de dev
	docker compose -f docker-compose.dev.yml logs -f

# ── Produção ──────────────────────────────────────────────
prod: ## Inicia o serviço em modo produção
	docker compose up -d --build

prod-down: ## Para e remove containers de produção
	docker compose down

prod-logs: ## Exibe logs de produção
	docker compose logs -f

# ── Utilitários Docker ────────────────────────────────────
docker-rebuild: ## Reconstrói a imagem sem cache
	docker compose down
	docker compose build --no-cache
	docker compose up -d

# ── Simulação ─────────────────────────────────────────────
sim-reset: ## Reseta apenas o estado da simulação
	ts-node -r tsconfig-paths/register src/simulation/simulation.reset.ts

sim-reset-db: ## Reseta estado da simulação + limpa o banco
	ts-node -r tsconfig-paths/register src/simulation/simulation.reset.ts --db

# ── Utilitários ───────────────────────────────────────────
lint: ## Verifica erros de tipagem
	npm run lint

clean: ## Remove dist/ e simulation_state.json
	rm -rf dist
	rm -f simulation/simulation_state.json
	@echo "✅ Ambiente limpo"