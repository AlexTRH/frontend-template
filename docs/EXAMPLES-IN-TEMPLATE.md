# Что уже есть в шаблоне (примеры по темам)

Краткий указатель: где смотреть примеры архитектуры, конфигов, переводов, темы, констант, енумов, компонентов, страниц, API, env, картинок и иконок.

---

## Карта: задача → пример

| Задача                                          | Где смотреть                                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Динамический роут (`/items/:id`)                | `pages/item-detail/`, `app/providers/router/ui/AppRouter.tsx`                                                                   |
| Список с поиском и фильтром                     | `pages/items/ui/page.tsx`                                                                                                       |
| Сортируемая таблица (клик по заголовку)         | `pages/items/ui/page.tsx` (sortBy, sortOrder, SortHeader)                                                                       |
| Экспорт в CSV                                   | `pages/items/ui/page.tsx` (handleExportCsv, escapeCsvCell)                                                                      |
| Polling (refetchInterval)                       | `entities/item/hooks/use-items-query.ts` (options.refetchInterval), Items page «Обновлено N с назад»                            |
| Copy to clipboard                               | `pages/item-detail/ui/page.tsx` (copyId, navigator.clipboard.writeText + toast)                                                 |
| Предупреждение при уходе с несохранённой формой | `features/edit-item/EditItemModal.tsx` (formState.isDirty, AlertDialog «Отменить изменения?»)                                   |
| Загрузка файла (FormData, MSW)                  | `pages/settings/ui/page.tsx` (file input, apiClient.post('/upload', formData)), `mocks/handlers.ts` POST /api/upload            |
| График (Recharts)                               | `pages/dashboard/ui/page.tsx` (BarChart по статусам items), зависимость `recharts`                                              |
| Массовое удаление (чекбоксы, Delete selected)   | `pages/items/ui/page.tsx` (selectedIds, useDeleteItemsMutation), `entities/item/api/delete-items.ts`, MSW DELETE /api/items/:id |
| Форма с валидацией (Zod + i18n)                 | `features/create-item/CreateItemModal.tsx`, `features/auth/model/schema.ts`                                                     |
| Модалка с формой                                | `features/create-item/CreateItemModal.tsx` (Dialog + Form)                                                                      |
| Подтверждение (да/нет)                          | `shared/ui/confirmation-window-trigger.tsx`, страница Settings                                                                  |
| Защищённый роут (auth)                          | `app/providers/router/ui/RequireAuth.tsx`                                                                                       |
| Запрос списка (useQuery)                        | `entities/item/hooks/use-items-query.ts`, `entities/item/api/fetch-items.ts`                                                    |
| Мутация (create, login)                         | `features/create-item/hooks/use-create-item-mutation.ts`, `features/auth/hooks/use-login-mutation.ts`                           |
| Пустое состояние (empty state)                  | `shared/ui/empty-state.tsx`, использование на Items/Dashboard                                                                   |
| Пагинация                                       | `pages/items/ui/page.tsx` (логика), константы в `shared/constants/pagination.ts`                                                |
| Переключатель темы/языка                        | `features/theme-toggle/`, `shared/ui/language-switcher.tsx`                                                                     |
| Layout + sidebar + mobile menu                  | `widgets/layouts/main-layout/`, `nav-items.ts`                                                                                  |
| Справочник UI-компонентов (dev)                 | `pages/components/`, страница «Компоненты» в сайдбаре                                                                           |
| Структура FSD и импорты                         | `docs/STRUCTURE.md`                                                                                                             |

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
- **shadcn/ui:** `components.json` — алиасы и путь к стилям (ориентация на reference-проект comet-release)

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

- **Централизованные константы (как в comet-release):** `src/shared/constants/` — `pagination.ts` (DEFAULT_PAGINATION_OFFSET, DEFAULT_PAGINATION_LIMIT), `query-key.ts` (QUERY_KEYS), `form.ts` (NO_DATA_VALUE), `validation.ts` (VALIDATION), `storage.ts` (STORAGE_KEYS: AUTH, THEME), реэкспорт из `index.ts`. Auth store использует `STORAGE_KEYS.AUTH` из `@shared/constants`.
- **Разрозненные примеры:** `ITEMS_QUERY_KEY` в `src/entities/item/api/fetch-items.ts` (использует QUERY_KEYS), `HYDRATE_TIMEOUT_MS` в `RequireAuth.tsx`, `LOCALES` в `src/shared/ui/language-switcher.tsx`
- **Маршруты:** `RoutePath`, `AppRoutes` в `src/shared/config/router/routePath.ts`

---

## Енумы

- **Маршруты:** `AppRoutes` в `src/shared/config/router/routePath.ts` (DASHBOARD, ITEMS, SETTINGS, LOGIN, NOT_FOUND)
- **Layout:** `RouteLayout` в `src/app/providers/router/config/routeConfig.tsx`
- **Статус сущности:** `ItemStatus` в `src/entities/item/model/types.ts` (active, draft, archived)

---

## Компоненты (UI)

- **shared/ui:** `button` (и `buttonVariants`), `input`, `label`, `form` (FormField, FormMessage и т.д.), `dialog` (включая DialogClose), `card`, `table`, `breadcrumbs`, `dropdown-menu`, `page-loader`, `skeleton`, `table-skeleton`, `card-skeleton`, `errors/error`, `empty-state` (иконка + заголовок + опционально описание и кнопка), `sonner` (Toaster), `language-switcher`, `spinner`
- **Модалки (несколько вариантов, как в comet-release):**
    - **Dialog** — базовая модалка Radix: `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogTrigger`, `DialogClose`. Пример: `features/create-item/CreateItemModal.tsx` (форма создания через Dialog + Trigger).
    - **ModalWindowTrigger** — готовая обёртка с кнопкой, заголовком, описанием, Cancel/Submit: `@shared/ui/modal`. Удобно для форм в модалке (scrollable, formId, isPending). Пример использования — см. reference comet-release: `CreateRequestModal`, `CreatePositionModal`.
    - **AlertDialog** — `@shared/ui/alert-dialog` для подтверждений (да/нет без закрытия по клику снаружи).
    - **ConfirmationWindowTrigger** — обёртка над AlertDialog с кнопкой, вопросом, Cancel/Confirm. Пример: страница Settings (кнопка «Open confirmation»).
- **Формы и ввод:** `Input`, `Textarea` (`@shared/ui/textarea`), `Select` + `SelectTrigger`/`SelectContent`/`SelectItem` (`@shared/ui/select`), `Switch` (`@shared/ui/switch`). Пример Select — Create Item (поле статуса); Switch — Settings (уведомления).
- **Остальное UI:** `Badge` (метки статуса), `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`, `Separator`, `Sheet` (боковая панель), `Tooltip`/`TooltipTrigger`/`TooltipContent`, `ScrollArea`/`ScrollBar`, `Popover`/`PopoverTrigger`/`PopoverContent`. Примеры: Badge — Items (колонка статуса); Tabs и Switch — Settings; Sheet и Tooltip — Settings (кнопки «Open side panel», «Hover for tooltip»).
- **Иконки:** из `lucide-react` (LayoutDashboard, List, Settings, User, LogOut и т.д.) — примеры в сайдбаре, header, user-menu, страницах.
- **Стили:** утилита `cn()` из `@shared/lib/ui/cn`; классы `.max-h-modal`, `.no-scrollbar` в `src/app/styles/index.css` для модалок с прокруткой; переменные темы `--popover`, `--popover-foreground`, `--error`, `--success`, `--sidebar`, `--sidebar-foreground` в `src/app/styles/index.css`.
- **Гайд «какой компонент когда»:** `docs/WHICH-COMPONENT-WHEN.md`.

---

## Страницы (pages)

- **Dashboard:** `src/pages/dashboard/` — приветствие, стат-карточки, таблица недавних, плейсхолдер графика
- **Items:** `src/pages/items/` — таблица, поиск, фильтр по статусу, пагинация, создание элемента, ссылки на деталь
- **Item detail:** `src/pages/item-detail/` — динамический роут `/items/:id`, useParams, одна сущность, EmptyState при «не найден»
- **Settings:** `src/pages/settings/` — заголовок, карточка «General», «Coming soon», пример **ConfirmationWindowTrigger** (кнопка «Open confirmation»)
- **Login:** `src/pages/login/` — форма входа, демо-вход
- **Not found:** `src/pages/not-found/`

---

## Хуки (shared/hooks)

- **useDebounce(value, delay)** — отложенное обновление значения (поиск, фильтр). Пример: страница Items (поиск с задержкой 300 ms).
- **useLocalStorage(key, defaultValue)** — значение в localStorage с типизированным setter. Пример: Settings (переключатель «Email notifications»).
- **useIsMobile()** — `true`, если ширина &lt; 768px (адаптив).

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

## Тесты

- **Unit:** Vitest + Testing Library; скрипт `test:unit`. Примеры: `src/features/create-item/model/schema.test.ts` (схема создания айтема), `src/features/auth/model/schema.test.ts` (схема логина). Setup: `config/vitest/setup.ts`.
- **E2E:** Playwright; скрипт `test:e2e`. Сценарии в `e2e/demo.spec.ts`: демо-логин, переход на Items/Settings, выход. Конфиг: `playwright.config.ts` (запуск dev-сервера при прогоне).

---

## Картинки

- **В шаблоне:** статика в `public/` — `favicon.svg` (подключён в `index.html`), `logo-small.svg`, `google-icon.svg` (примеры из reference comet-release; можно использовать в логотипе или кнопке «Войти через Google»).
- **Практика:** статику класть в `public/` и ссылаться по корню (например `/favicon.svg`, `/logo-small.svg`); для импорта из `src` в Vite — `import img from './image.png'` и использовать `img` как URL.

---

## Иконки

- **Библиотека:** `lucide-react`
- **Примеры:** сайдбар (LayoutDashboard, List, Settings), header/user-menu (User, ChevronDown, LogOut, Settings), страница Settings (Settings), кнопки и формы по проекту
- **Доступность:** декоративные иконки с `aria-hidden`

---

## Типичные ошибки

| Ошибка                                                                 | Как избежать                                                                                                                  |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Импорт слоя «вверх»** (например, `shared` импортирует из `features`) | Соблюдать FSD: слой импортирует только из слоёв ниже. См. `docs/STRUCTURE.md`.                                                |
| **Дублирование логики в page** (запросы, фильтры прямо в page.tsx)     | Выносить в entity/feature: `useItemsQuery`, `useCreateItemMutation`, константы в `shared/constants`. Page только собирает UI. |
| **Хардкод строк в UI**                                                 | Все пользовательские строки — в i18n (`t('section.key')`), в т.ч. placeholder, aria-label, сообщения об ошибках.              |
| **Редирект на логин до гидрации**                                      | В `RequireAuth` не редиректить, пока `_hasHydrated === false` (Zustand persist восстанавливает user асинхронно).              |
| **Пустой список без empty state**                                      | Использовать `EmptyState` (иконка + заголовок), не просто текст.                                                              |
| **Форма без маппинга ошибок API**                                      | При 422/400 маппить ответ бэкенда в `form.setError` через хелпер (типизированные ошибки API).                                 |
