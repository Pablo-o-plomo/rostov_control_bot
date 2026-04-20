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
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
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
- `POST /auth/telegram/start`
- `GET /auth/telegram/status?token=...`

При недоступности API применяются безопасные fallback-данные для неразрывной работы интерфейса.

Логин поддерживает demo-вход: если backend auth недоступен, можно войти парой из `NEXT_PUBLIC_DEMO_EMAIL` / `NEXT_PUBLIC_DEMO_PASSWORD`.


Telegram вход: кнопка на странице логина открывает бота по deep-link и ожидает подтверждение с polling статуса.


Если `NEXT_PUBLIC_API_BASE_URL` не задан, frontend использует относительный `/api` на текущем домене.
