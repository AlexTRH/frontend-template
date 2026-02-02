# Быстрый старт

Краткие шаги, как добавить свою страницу, сущность и API в этом шаблоне. Для новичков — копируй структуру и подставляй свои имена.

---

## 0. Первый запуск (посмотреть приложение)

После `npm run dev` открой приложение в браузере. Откроется страница входа:

- **«Демо-вход»** — один клик, сразу попадаешь в приложение (Dashboard, Items, тема, язык, создание элемента). Удобно, чтобы быстро посмотреть, как всё устроено.
- **Логин по форме** — любой email + пароль от 6 символов; при включённых моках (`VITE_USE_MSW=true` в `.env`) вход пройдёт без бэкенда.

После входа можно походить по страницам, открыть Items, создать элемент, переключить тему/язык, выйти через меню профиля в header.

---

## 1. Добавить новую страницу

1. **Маршрут** — в `src/shared/config/router/routePath.ts`:
    - добавить в enum `AppRoutes` значение, например `PRODUCTS = 'products'`;
    - в `RoutePath` добавить путь, например `[AppRoutes.PRODUCTS]: '/products'`.

2. **Страница** — папка `src/pages/products/`:
    - `index.ts` — `export { ProductsPage } from './ui/page'`;
    - `ui/page.tsx` — компонент страницы (заголовок, контент).

3. **Роутер** — в `src/app/providers/router/config/routeConfig.tsx`:
    - импортировать `ProductsPage`;
    - добавить в `routeConfig`: `[AppRoutes.PRODUCTS]: { path: RoutePath[AppRoutes.PRODUCTS], element: <ProductsPage />, layout: RouteLayout.DEFAULT }`.

4. **Сайдбар** — в `src/widgets/layouts/main-layout/ui/nav-items.ts`:
    - добавить пункт в массив `navItems` с `to`, `route`, `icon`.

5. **i18n** — в `src/shared/config/i18n/locales/en.json` и `ru.json`:
    - добавить ключи для заголовка и навигации (например `common.nav.products`).

После этого страница будет доступна по `/products` и появится в сайдбаре.

---

## 2. Добавить новую сущность (entity)

Пример: сущность **Product**.

1. **Типы** — `src/entities/product/model/types.ts`:
    - описать тип (например `Product { id, name, price }`).

2. **Barrel** — `src/entities/product/model/index.ts`:
    - `export type { Product } from './types'`.

3. **API** — `src/entities/product/api/`:
    - функция запроса (например `fetchProducts()`), константа для query key (например `PRODUCTS_QUERY_KEY`).
    - в `index.ts` реэкспорт.

4. **Хуки** — `src/entities/product/hooks/use-products-query.ts`:
    - `useQuery` с `queryKey` и `queryFn`, вызывающей функцию из api.

5. **Корневой index** — `src/entities/product/index.ts`:
    - реэкспорт из `model`, `api`, `hooks`.

Дальше на странице импортируешь `useProductsQuery` из `@entities/product` и используешь данные.

---

## 3. Добавить новый API endpoint

1. **Клиент** — все запросы идут через `src/shared/api/client.ts` (один axios-инстанс). Дополнительные заголовки/auth — в interceptors.

2. **Функция запроса** — в слайсе (entity или feature) создаёшь функцию, например:

    ```ts
    export async function fetchProduct(id: string): Promise<Product> {
        const { data } = await apiClient.get<Product>(`/products/${id}`)
        return data
    }
    ```

    Типы ответа — из `entities/product/model/types.ts`.

3. **Моки (MSW)** — при разработке без бэкенда в `src/mocks/handlers.ts` добавить handler, например:
    - `http.get('/api/products', () => HttpResponse.json([...]))`
      Включение моков — переменная `VITE_USE_MSW=true` в `.env`.

4. **Ошибки API** — в `src/shared/api/client.ts` в response interceptor уже обрабатываются 401 (очистка токена), 403 и 5xx (toast). Для своей логики можно проверять `axiosError.response?.status` и показывать toast или редирект.

---

## 4. Добавить форму с валидацией (Zod)

1. **Схема** — в feature или entity, например `src/features/create-product/model/schema.ts`:
    - `z.object({ name: z.string().min(1), price: z.number().positive() })`;
    - тип: `type CreateProductFormValue = z.infer<typeof createProductSchema>`.

2. **Форма** — в компоненте:
    - схему лучше строить с переводами: `getCreateProductSchema((key, opts) => t(key, opts))` (см. `features/create-item/model/schema.ts`, `features/auth/model/schema.ts`); ключи в `locales`: `validation.required`, `validation.email`, `validation.minLength`, `validation.maxLength`;
    - `useForm({ resolver: zodResolver(schema), defaultValues: { ... } })`;
    - поля через `FormField`, `FormControl`, `FormMessage` из `@shared/ui/form`;
    - `handleSubmit` вызывает мутацию (например `createProductMutation.mutate(values)`).

3. **Мутация** — хук с `useMutation`, внутри вызов API (например `apiClient.post('/products', payload)`), в `onSuccess` — инвалидация нужных query (например `invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })`).

Пример целиком — смотри `features/create-item` (схема, модалка, мутация).

---

## 5. Структура папок (FSD)

- **app** — инициализация, провайдеры, роутер, глобальные стили.
- **pages** — страницы; только композиция из widgets/features, без бизнес-логики.
- **widgets** — крупные блоки (layout, header, sidebar).
- **features** — действия пользователя (создать, отфильтровать, переключить тему).
- **entities** — бизнес-сущности (типы, API, хуки по данным).
- **shared** — UI-компоненты, утилиты, конфиги, i18n.

Импорты только «вниз»: shared ← entities ← features ← widgets ← pages ← app.

---

## 6. Полезные команды

- `npm run dev` — запуск в dev с hot reload.
- `npm run build` — сборка.
- `npm run lint` / `npm run lint:fix` — проверка и автофикс кода.
- `npm run test:unit` — юнит-тесты (пример — `src/features/create-item/model/schema.test.ts`).
- `npm run test:e2e` — E2E (Playwright); перед запуском поднимается dev-сервер. Пример — `e2e/demo.spec.ts` (демо-вход → дашборд).
- Pre-commit (husky + lint-staged) запускает lint и format по staged-файлам.

Если что-то непонятно — смотри существующие слайсы: `entities/item`, `features/create-item`, `pages/dashboard`, `pages/items`.
