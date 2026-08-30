ui:
	cd apps/ui && bun run dev

api:
	cd apps/api && bun run dev

db-gen:
	bun run db:generate

db-mig:
	bun run db:migrate