# Эталонная структура (FSD)

Как устроены папки, слои и импорты в шаблоне. Используй как образец для новых фич и страниц.

---

## Дерево слоёв

```
src/
├── app/                    # Инициализация: провайдеры, роутер, стили
│   ├── providers/          # React-провайдеры (router, theme, i18n, query, errorBoundary)
│   ├── styles/             # Глобальные стили, CSS-переменные темы
│   └── types/              # Глобальные типы (vite-env.d.ts)
├── pages/                  # Страницы — композиция виджетов и фич
│   └── {page}/
│       ├── index.ts        # Публичный API (экспорт страницы)
│       └── ui/
│           └── page.tsx     # Разметка страницы
├── widgets/                # Крупные блоки UI (layout, header, sidebar)
│   └── layouts/
│       └── main-layout/
│           ├── index.ts
│           ├── ui/          # Компоненты виджета
│           └── nav-items.ts # Конфиг, общий для sidebar и mobile menu
├── features/               # Действия пользователя (логин, создание айтема, переключатель темы)
│   └── {feature}/
│       ├── index.ts
│       ├── api/            # Запросы, относящиеся к фиче
│       ├── hooks/          # useXxxMutation, useXxx
│       ├── model/          # Схемы валидации (Zod), типы
│       └── ui/              # Модалки, формы, кнопки фичи
├── entities/               # Бизнес-сущности (item, user)
│   └── {entity}/
│       ├── index.ts
│       ├── api/            # fetchXxx, query keys
│       ├── hooks/          # useXxxQuery
│       └── model/           # types.ts
├── shared/                 # Переиспользуемое без привязки к фиче/странице
│   ├── api/                # axios-клиент, interceptors
│   ├── config/             # router, i18n (locales)
│   ├── constants/          # QUERY_KEYS, STORAGE_KEYS, pagination, validation
│   ├── contexts/           # Theme
│   ├── hooks/              # useDebounce, useLocalStorage, useIsMobile
│   ├── lib/                # i18n init, cn()
│   ├── store/              # auth (Zustand)
│   ├── ui/                 # Кнопки, инпуты, карточки, таблицы, модалки
│   └── types/              # Общие типы
└── mocks/                  # MSW handlers, browser (dev)
```

---

## Правила импортов (FSD)

- **Слой может импортировать только из слоёв ниже.**  
  Ниже = левее в списке: `app` → `pages` → `widgets` → `features` → `entities` → `shared`.

- **Shared** — основа: сюда кладём всё, что не привязано к одной фиче/странице. Импортируется отовсюду.

- **Entities** — типы и API сущностей (item, user). Импортируются из `pages`, `widgets`, `features`.

- **Features** — действия: логин, создание айтема, переключатель темы. Импортируются из `pages`, `widgets`.

- **Widgets** — сборка блоков (layout, sidebar, header). Импортируются из `app` (роутер) и из `pages`.

- **Pages** — только композиция: импортируют `entities`, `features`, `widgets`, `shared`. Не содержат бизнес-логику, только сборка.

- **App** — провайдеры, роутер, стили. Импортирует `widgets`, `pages`, `shared`.

Используй алиасы: `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared` (см. `tsconfig.app.json`, `vite.config.ts`).

---

## Где что класть

| Нужно                           | Слой                                  | Пример                                       |
| ------------------------------- | ------------------------------------- | -------------------------------------------- |
| Тип/модель сущности             | entities/{entity}/model               | `Item`, `ItemStatus` в `entities/item/model` |
| Запрос списка/одного            | entities/{entity}/api                 | `fetchItems`, `ITEMS_QUERY_KEY`              |
| Хук запроса (useQuery)          | entities/{entity}/hooks               | `useItemsQuery`                              |
| Запрос действия (login, create) | features/{feature}/api                | `login`, `createItem`                        |
| Хук мутации                     | features/{feature}/hooks              | `useLoginMutation`, `useCreateItemMutation`  |
| Схема валидации формы           | features/{feature}/model              | `getLoginSchema`, `createItemSchema`         |
| Модалка/форма фичи              | features/{feature}/ui или корень фичи | `CreateItemModal`                            |
| Страница                        | pages/{page}/ui/page.tsx              | `DashboardPage`, `ItemsPage`                 |
| Layout, header, sidebar         | widgets/layouts                       | `MainLayout`, `Sidebar`, `Header`            |
| Кнопка, инпут, карточка         | shared/ui                             | `Button`, `Input`, `Card`                    |
| Константы, ключи                | shared/constants                      | `QUERY_KEYS`, `STORAGE_KEYS`                 |
| Роуты, пути                     | shared/config/router                  | `RoutePath`, `AppRoutes`                     |
| Локали                          | shared/config/i18n/locales            | `en.json`, `ru.json`                         |

---

## Публичный API слайсов

Каждый слайс (entity, feature, widget, page) экспортирует наружу только нужное через **index.ts**:

- **entities/item:** типы `Item`, `ItemStatus`, хук `useItemsQuery`, константа `ITEMS_QUERY_KEY`.
- **features/create-item:** `CreateItemModal`, `useCreateItemMutation` (остальное внутреннее).
- **pages/items:** `ItemsPage` (или как назван компонент страницы).

Внутри слайса можно импортировать из своих папок без ограничений; снаружи — только через индекс.

---

## Дополнительно

- **Маршруты:** добавление страницы = запись в `routePath.ts` (enum + path), элемент в `routeConfig.tsx`, `<Route>` в `AppRouter.tsx`.
- **Локали:** ключи в `shared/config/i18n/locales`; в коде — `t('section.key')`.
- **Тесты:** unit рядом с кодом (`*.test.ts`) или в `__tests__`; e2e в `e2e/`.

См. также: `docs/EXAMPLES-IN-TEMPLATE.md` (где искать примеры), `docs/WHICH-COMPONENT-WHEN.md` (какой UI-компонент когда использовать).
