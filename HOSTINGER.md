# Hostinger Shared Hosting / Web Apps

Use Hostinger Web Apps with these hPanel values:

| hPanel field | Value |
| --- | --- |
| Node.js version | `22` |
| Project/root directory | Repository root (directory containing `package.json`) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Entry file | `dist/main.js` |

Hostinger installs dependencies and runs build automatically. Do not manually run `npm run dev`, `npm run build`, or Prisma generation. `npm run build` runs `prebuild`, which runs existing provider-aware `npm run db:generate` before TypeScript/tsup build.

## Environment variables

Set in hPanel:

- `DATABASE_PROVIDER=mysql`
- `DATABASE_CONNECTION_URI=mysql://USER:PASSWORD@HOST:3306/DATABASE`
- `AUTHENTICATION_API_KEY=` strong random secret
- `SERVER_URL=https://your-domain.example`
- `CORS_ORIGIN=https://your-domain.example`

For Hostinger MySQL, `DATABASE_CONNECTION_URI` hostname must be database host shown in hPanel, not `localhost`, `127.0.0.1`, or Docker service name. Hostinger supplies `PORT`; do not set it. Runtime uses `PORT`, then `SERVER_PORT`, then `8080`.

Do not use bare `npx prisma generate`: repository has no `prisma/schema.prisma`. Build selects `prisma/mysql-schema.prisma` from `DATABASE_PROVIDER`.

## Database bootstrap

Schema migration/bootstrap is separate from build and startup. Apply approved migrations against target database before first deployment; build/start does not run migrations automatically.

## Shared-hosting limitation

Web Apps sleep after inactivity. They are unreliable for persistent Baileys connections, WebSockets, workers, and local session files. Use Hostinger VPS for production Evolution API workloads.

## Prisma troubleshooting

Missing Prisma model exports or `Prisma.sql` means generated client does not match selected schema. Confirm hPanel has `DATABASE_PROVIDER=mysql`, redeploy so automatic `prebuild` regenerates client, and do not run bare Prisma generation.
