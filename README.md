# Frontend Template

Шаблон фронтенда для внутренних проектов. Цель — чтобы **стажёры и бэкендеры**, не знающие фронт, могли сразу писать код, брать за основу и не тратить время на настройку.

## Стек

**React 19** · **TypeScript** · **Vite** · **Tailwind CSS** · **shadcn/ui** (Radix) · **TanStack Query** · **Zustand** · **React Hook Form** + **Zod** · **axios** · **i18next** · **Sonner** (toast). Тесты: **Vitest**, **Playwright**. Моки в dev: **MSW**.

## Что внутри (целевой костяк)

- **Архитектура** — FSD из коробки, правильная структура папок и импортов
- **Конфиги** — Vite, TypeScript, ESLint, Prettier, path aliases
- **Примеры API** — axios-клиент, типизированные запросы, interceptors (auth и т.д.)
- **i18n** — подключённый и с примерами строк
- **UI** — единая дизайн-система: модалки, кнопки, формы, таблицы и т.д., чтобы внутренние проекты выглядели одинаково
- **Примеры для новичков** — пример страницы, сущности, фичи, формы, вызова API, чтобы можно было копировать и менять под задачу

## Для кого

- Стажёры и джуны — готовый скелет, не нужно с нуля собирать проект
- Бэкендеры — привычный подход (слои, типы, API-слой), можно быстро ориентироваться
- Внутренние проекты — одна база по архитектуре и дизайну, проще объединять и поддерживать

## Как пользоваться

**Установка** — на выбор npm или yarn:

```bash
npm install   # или  yarn
npm run dev   # или  yarn dev
```

**Первый запуск (для новичка):** открой приложение в браузере — попадёшь на страницу входа. Можно:

- нажать **«Демо-вход»** — сразу попадёшь в приложение и сможешь посмотреть дашборд, список Items, создать элемент, переключить тему и язык;
- или ввести любой email и пароль (от 6 символов) и нажать «Войти» — моки позволят войти без бэкенда (если в `.env` указано `VITE_USE_MSW=true`).

После входа доступны: Dashboard, страница Items (поиск, фильтр, пагинация, создание), переключатель темы и языка в header, выход через меню профиля. В dev в сайдбаре также показывается страница **«Компоненты»** — справочник по UI-компонентам (в продакшене её можно скрыть).

Остальные скрипты: `build`, `lint`, `lint:fix`, `format`, `preview`, `test:unit` (Vitest), `test:e2e` (Playwright; при прогоне сам поднимает dev-сервер). В репозитории один lock-файл — `package-lock.json` (npm). После клона выполни `npm install`; при желании можно использовать yarn (`yarn` создаст `yarn.lock` в своём проекте).

1. **Быстрый старт** — в `docs/QUICKSTART.md`: установка, первый запуск, что посмотреть.
2. **Где что искать** — в `docs/EXAMPLES-IN-TEMPLATE.md`: указатель по темам (архитектура, конфиги, переводы, тема, константы, енумы, компоненты, страницы, API, env, картинки, иконки, хуки) и карта «задача → пример».
3. **Эталон структуры (FSD)** — в `docs/STRUCTURE.md`: дерево слоёв, правила импортов, где что класть.
4. **Какой компонент когда использовать** — в `docs/WHICH-COMPONENT-WHEN.md`: формы, кнопки, модалки, таблицы, хуки и т.д.
5. **Паттерны UI** — в `docs/UI-PATTERNS.md`: Empty/Loading/Error, когда Dialog/Sheet/AlertDialog, Create vs Edit.
6. Примеры: страницы `pages/dashboard`, `pages/items`, `pages/settings`, `pages/login`, сущность `entities/item`, фичи `features/create-item`, `features/auth`, `features/theme-toggle` (форма с Zod, модалка, вызов API).

## Что уже есть в костяке

- **app**: main, providers (Router, Theme, Query, ErrorBoundary, i18n), роутер с конфигом
- **shared**: axios-клиент (`api/client.ts`, interceptors: token, 401/403/5xx + toast), path aliases, типы, store/auth (Zustand + persist), константы, i18n (en/ru), UI (Button, Input, Label, Form, Dialog, Card, Table, PageLoader, Error, Toaster и др.)
- **widgets/layouts/main-layout**: сайдбар (Dashboard, Items, Settings), header (тема + язык + user menu), `<Outlet />`
- **entities/item**, **entities/user**: типы, API, хуки (например `useItemsQuery`)
- **features/create-item**, **features/auth**, **features/theme-toggle**: модалка создания, логин/демо-вход, переключатель темы; валидация форм через Zod с переводами (`getLoginSchema(t)`, `getCreateItemSchema(t)`)
- **pages**: **Dashboard**, **Items** (таблица, поиск, фильтр, пагинация, ссылки на деталь), **Item detail** (`/items/:id`), **Settings**, **Login** (форма + демо-вход), **Компоненты** (dev), not-found
- **i18n**: тексты в `common`, `dashboard`, `items`, `login`, `settings`, `validation` (en + ru)
- **MSW**: при `VITE_USE_MSW=true` — список items, создание, логин без бэкенда

Бэкенд не обязателен для запуска: список items без API пока пустой; при добавлении `VITE_API_URL` и endpoint'а `/items` всё подхватится.

**MSW (моки в dev):** в `.env` задай `VITE_USE_MSW=true` — тогда без бэкенда будут работать список и создание items (моки в `src/mocks/`).

**Layout:** общий header (название, переключатель темы, переключатель языка) и контент страниц через `<Outlet />` в `widgets/layouts/main-layout`.

## Переменные окружения (.env)

| Переменная     | Описание                                                                                                                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | Базовый URL API (например `http://localhost:3000/api`). Не задан — запросы идут на `/api` (тот же хост). В dev при `VITE_USE_MSW=true` игнорируется: запросы всегда на тот же хост, чтобы перехватывал MSW. |
| `VITE_USE_MSW` | `true` — включить моки (MSW) в dev: список items, создание, логин работают без бэкенда.                                                                                                                     |

См. `.env.example`. Типы для переменных — в `src/app/types/vite-env.d.ts`.

## Типичные проблемы

- **Белый экран** — проверь консоль. Если ошибка про `mockServiceWorker.js` или MIME type: в `public/` должен лежать `mockServiceWorker.js` (сгенерировать: `npx msw init public/`). Если лоадер крутится бесконечно: подожди до 5 сек или обнови страницу (есть fallback гидрации).
- **Не пускает после логина / редирект на логин** — включи `VITE_USE_MSW=true` в `.env` или используй кнопку «Демо-вход» на странице логина.
- **Запросы не идут / 404 на API** — при включённом MSW в dev `baseURL` принудительно `/api`; при выключенном MSW задай `VITE_API_URL` на твой бэкенд.

## Деплой

В шаблоне два варианта: **Vercel** (облако) и **Docker** (свой сервер или любой хостинг с контейнерами).

### Вариант 1: Vercel

Файл `vercel.json` задаёт сборку Vite и SPA-правила (все пути → `index.html`).

1. Подключи репозиторий к [Vercel](https://vercel.com) (Import Project).
2. Vercel сам подхватит Vite по `package.json`; параметры из `vercel.json`: `buildCommand`, `outputDirectory: "dist"`, rewrites для SPA.
3. В настройках проекта → **Environment Variables** добавь переменную для production:
    - `VITE_API_URL` — URL бэкенда (например `https://api.example.com`).
4. Деплой по push в основную ветку или по кнопке Deploy.

Переменные задаются в панели Vercel; при сборке они подставляются в код как `import.meta.env.VITE_API_URL`.

### Вариант 2: Docker (nginx)

Файлы `Dockerfile` и `nginx.conf` — сборка приложения в образе и раздача статики через Nginx (свой сервер, Kubernetes, любой хостинг с Docker).

1. **Сборка образа** (в корне проекта):

    ```bash
    docker build -t frontend-template .
    ```

    Чтобы задать URL API на этапе сборки:

    ```bash
    docker build --build-arg VITE_API_URL=https://api.example.com -t frontend-template .
    ```

2. **Запуск контейнера**:

    ```bash
    docker run -p 8080:80 frontend-template
    ```

    Приложение будет доступно на `http://localhost:8080`.

3. **Production:** если не передавали `VITE_API_URL` при сборке, нужно либо пересобрать с `--build-arg`, либо настроить прокси в `nginx.conf` (доп. `location /api` с `proxy_pass` на бэкенд) и пересобрать образ.

Схема образа: стадия **builder** (Node) — `npm ci` и `npm run build`; стадия **production** (Alpine + Nginx) — копирование `dist` и конфига Nginx. Nginx отдаёт файлы из `/usr/share/nginx/html` и для любого пути без файла отдаёт `index.html` (SPA).

## Доступность (a11y)

В шаблоне: семантичная разметка, skip link («Перейти к основному контенту») в layout для навигации с клавиатуры, `aria-hidden` у декоративных иконок, фокус на интерактиве. При добавлении своих страниц и форм используй осмысленные `label`, не убирай outline без замены на видимый focus-стиль.
