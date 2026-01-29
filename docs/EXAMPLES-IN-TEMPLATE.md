# Что уже есть в шаблоне (примеры по темам)

Краткий указатель: где смотреть примеры архитектуры, конфигов, переводов, темы, констант, енумов, компонентов, страниц, API, env, картинок и иконок.

---

## Архитектура (FSD)

- **Слои и папки:** `src/app`, `src/pages`, `src/widgets`, `src/features`, `src/entities`, `src/shared`
- **Роутер и маршруты:** `src/app/providers/router/` (конфиг, RequireAuth, AppRouter)
- **Импорты:** path aliases `@app`, `@shared`, `@entities`, `@features`, `@widgets`, `@pages` в `tsconfig.app.json` и `vite.config.ts`

---

## Конфиги

- **Vite:** `vite.config.ts` (алиасы, react)
- **TypeScript:** `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **ESLint:** `eslint.config.js`
- **Prettier:** `.prettierrc`
- **PostCSS / Tailwind:** `postcss.config.mjs`, стили в `src/app/styles/index.css`
- **Vitest:** `config/vitest/setup.ts`, скрипт `test:unit`
- **Playwright:** `playwright.config.ts`, скрипт `test:e2e`

---

## Переводы (i18n)

- **Подключение:** `src/shared/lib/i18n/index.ts`, провайдер в `src/app/providers/i18n/`
- **Файлы локалей:** `src/shared/config/i18n/locales/en.json`, `ru.json`
- **Использование:** `useTranslation()`, `t('common.title')`, `t('login.login.title')` и т.д. — в страницах, формах, сайдбаре
- **Валидация форм:** ключи `validation.required`, `validation.email`, `validation.minLength`, `validation.maxLength` и функции `getLoginSchema(t)`, `getCreateItemSchema(t)` в фичах

---

## Тема

- **Контекст и провайдер:** `src/shared/contexts/theme/`, `src/app/providers/theme/`
- **Хук:** `useTheme()` из `@shared/contexts/theme`
- **Переключатель:** `src/features/theme-toggle/theme-toggle.tsx`
- **Стили:** CSS-переменные в `src/app/styles/index.css` (например `--background`, `--foreground`)

---

## Константы

- **Разрозненные примеры:** `AUTH_STORAGE_KEY` в `src/shared/store/auth.ts`, `ITEMS_QUERY_KEY` в `src/entities/item/api/fetch-items.ts`, `PAGE_SIZE` в `src/pages/items/ui/page.tsx`, `HYDRATE_TIMEOUT_MS` в `RequireAuth.tsx`, `LOCALES` в `src/shared/ui/language-switcher.tsx`
- **Маршруты как константы:** `RoutePath`, `AppRoutes` в `src/shared/config/router/routePath.ts`
- Для своих констант можно завести `src/shared/config/constants.ts` или слайс-специфичные файлы

---

## Енумы

- **Маршруты:** `AppRoutes` в `src/shared/config/router/routePath.ts` (DASHBOARD, ITEMS, SETTINGS, LOGIN, NOT_FOUND)
- **Layout:** `RouteLayout` в `src/app/providers/router/config/routeConfig.tsx`
- **Статус сущности:** `ItemStatus` в `src/entities/item/model/types.ts` (active, draft, archived)

---

## Компоненты (UI)

- **shared/ui:** `button`, `input`, `label`, `form` (FormField, FormMessage и т.д.), `dialog`, `card`, `table`, `breadcrumbs`, `dropdown-menu`, `page-loader`, `skeleton`, `table-skeleton`, `card-skeleton`, `errors/error`, `sonner` (Toaster), `language-switcher`, `spinner`
- **Иконки:** из `lucide-react` (LayoutDashboard, List, Settings, User, LogOut и т.д.) — примеры в сайдбаре, header, user-menu, страницах
- **Стили:** утилита `cn()` из `@shared/lib/ui/cn` для объединения классов

---

## Страницы (pages)

- **Dashboard:** `src/pages/dashboard/` — приветствие, стат-карточки, таблица недавних, плейсхолдер графика
- **Items:** `src/pages/items/` — таблица, поиск, фильтр по статусу, пагинация, создание элемента
- **Settings:** `src/pages/settings/` — заголовок, карточка «General», «Coming soon»
- **Login:** `src/pages/login/` — форма входа, демо-вход
- **Not found:** `src/pages/not-found/`

---

## API-запросы

- **Клиент:** `src/shared/api/client.ts` — axios-инстанс, baseURL, interceptors (token, 401/403/5xx, toast)
- **Entity:** `src/entities/item/api/fetch-items.ts` — GET, query key, типы
- **Feature:** `src/features/create-item/api/create-item.ts` — POST; `src/features/auth/api/login.ts` — POST логина
- **Хуки:** `useItemsQuery` в `entities/item`, `useCreateItemMutation`, `useLoginMutation` в фичах
- **Моки:** `src/mocks/handlers.ts`, `src/mocks/browser.ts`; при `VITE_USE_MSW=true` перехват запросов

---

## Env

- **Пример и типы:** `.env.example`, `src/app/types/vite-env.d.ts`
- **Использование:** `import.meta.env.VITE_API_URL`, `import.meta.env.VITE_USE_MSW`, `import.meta.env.DEV`
- **Описание переменных:** раздел «Переменные окружения» в README

---

## Картинки

- **Сейчас в шаблоне:** явного примера загрузки картинок из `src` нет
- **Практика:** статику класть в `public/` и ссылаться по корню (например `/favicon.svg`, `/logo.png`); для импорта из `src` в Vite использовать `import img from './image.png'` и использовать `img` как URL
- **Favicon:** пример — `public/favicon.svg`, подключён в `index.html`

---

## Иконки

- **Библиотека:** `lucide-react`
- **Примеры:** сайдбар (LayoutDashboard, List, Settings), header/user-menu (User, ChevronDown, LogOut, Settings), страница Settings (Settings), кнопки и формы по проекту
- **Доступность:** декоративные иконки с `aria-hidden`
