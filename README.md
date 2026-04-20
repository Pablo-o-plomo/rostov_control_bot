# Rostov Control Bot Frontend

Интерфейс бухгалтера для еженедельного контроля ресторанов на Next.js 14 (App Router, TypeScript, Tailwind CSS).

## Запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## ENV

Создайте `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_DEMO_EMAIL=demo@company.com
NEXT_PUBLIC_DEMO_PASSWORD=demo1234
```

## Используемые backend endpoints

- `POST /auth/login`
- `GET /restaurants`
- `GET /restaurants/:id/weeks`
- `GET /weeks`
- `GET /weeks/:id/blocks`
- `GET /weeks/:id/metrics`
- `PUT /weeks/:id/metrics`
- `GET /issues`
- `GET /issues/:id`
- `POST /issues/:id/analysis`
- `GET /tasks`
- `PATCH /tasks/:id/status`
- `GET /prices`
- `POST /prices`

При недоступности API применяются безопасные fallback-данные для неразрывной работы интерфейса.

Логин поддерживает demo-вход: если backend auth недоступен, можно войти парой из `NEXT_PUBLIC_DEMO_EMAIL` / `NEXT_PUBLIC_DEMO_PASSWORD`.
