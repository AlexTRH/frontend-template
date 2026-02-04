# Какой компонент когда использовать

Краткий гайд по выбору UI-компонентов и хуков в шаблоне.

---

## Формы и ввод

| Задача                                        | Компонент                                                                  | Где смотреть                                      |
| --------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| Однострочный текст (email, имя, поиск)        | `Input`                                                                    | `@shared/ui/input`, страница Items (поиск), Login |
| Многострочный текст (описание, комментарий)   | `Textarea`                                                                 | `@shared/ui/textarea`                             |
| Выбор одного значения из списка (статус, тип) | `Select` + `SelectTrigger`, `SelectContent`, `SelectItem`                  | `@shared/ui/select`, Create Item (поле статуса)   |
| Чекбокс / переключатель вкл/выкл              | `Switch`                                                                   | `@shared/ui/switch`, Settings (уведомления)       |
| Группа полей, валидация, ошибки               | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` | `@shared/ui/form`, Login, Create Item             |
| Валидация схемы                               | Zod + `getXxxSchema(t)` с i18n                                             | `features/*/model/schema.ts`                      |

---

## Кнопки и действия

| Задача                                                    | Компонент                                     | Где смотреть                                                |
| --------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| Обычная кнопка (primary, secondary, outline, destructive) | `Button`, `buttonVariants`                    | `@shared/ui/button`                                         |
| Выпадающее меню (действия по клику)                       | `DropdownMenu`                                | `@shared/ui/dropdown-menu`, user menu в header              |
| Подсказка при наведении                                   | `Tooltip`, `TooltipTrigger`, `TooltipContent` | `@shared/ui/tooltip`, Settings (кнопка «Hover for tooltip») |

---

## Модалки и панели

| Задача                                          | Компонент                                     | Где смотреть                                                                  |
| ----------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------- |
| Форма в модалке (создание, редактирование)      | `Dialog` или `ModalWindowTrigger`             | `@shared/ui/dialog`, `@shared/ui/modal`, Create Item                          |
| Подтверждение «Да / Нет» (удаление, выход)      | `ConfirmationWindowTrigger` или `AlertDialog` | `@shared/ui/confirmation-window-trigger`, `@shared/ui/alert-dialog`, Settings |
| Боковая выезжающая панель (фильтры, детали)     | `Sheet`, `SheetTrigger`, `SheetContent`       | `@shared/ui/sheet`, Settings («Open side panel»)                              |
| Всплывающий блок без модалки (календарь, пикер) | `Popover`, `PopoverTrigger`, `PopoverContent` | `@shared/ui/popover`                                                          |

---

## Списки и таблицы

| Задача                        | Компонент                                                                 | Где смотреть                                |
| ----------------------------- | ------------------------------------------------------------------------- | ------------------------------------------- |
| Таблица                       | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` | `@shared/ui/table`, страница Items          |
| Скелетон таблицы              | `TableSkeleton`                                                           | `@shared/ui/table-skeleton`                 |
| Карточка блока                | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`       | `@shared/ui/card`                           |
| Метка статуса (active, draft) | `Badge`                                                                   | `@shared/ui/badge`, Items (колонка статуса) |

---

## Навигация и структура

| Задача                            | Компонент                                        | Где смотреть                |
| --------------------------------- | ------------------------------------------------ | --------------------------- |
| Хлебные крошки                    | `Breadcrumbs`                                    | `@shared/ui/breadcrumbs`    |
| Вкладки (General / Notifications) | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `@shared/ui/tabs`, Settings |
| Разделитель между блоками         | `Separator`                                      | `@shared/ui/separator`      |
| Область с кастомным скроллом      | `ScrollArea`, `ScrollBar`                        | `@shared/ui/scroll-area`    |

---

## Состояние и загрузка

| Задача                      | Компонент                                   | Где смотреть                                       |
| --------------------------- | ------------------------------------------- | -------------------------------------------------- |
| Лоадер всей страницы        | `PageLoader`                                | `@shared/ui/page-loader`                           |
| Спиннер внутри кнопки/блока | `Spinner`                                   | `@shared/ui/spinner`                               |
| Скелетон                    | `Skeleton`, `CardSkeleton`, `TableSkeleton` | `@shared/ui/skeleton`, `@shared/ui/table-skeleton` |
| Ошибка (страница или блок)  | `Error` из `@shared/ui/errors`              | Error Boundary                                     |

---

## Хуки

| Задача                                            | Хук                                  | Где смотреть                                          |
| ------------------------------------------------- | ------------------------------------ | ----------------------------------------------------- |
| Поиск/фильтр без запроса на каждый символ         | `useDebounce(value, delay)`          | `@shared/hooks`, страница Items (поиск)               |
| Сохранить значение в localStorage (настройки, UI) | `useLocalStorage(key, defaultValue)` | `@shared/hooks`, Settings (переключатель уведомлений) |
| Адаптив (мобилка / десктоп)                       | `useIsMobile()`                      | `@shared/hooks`                                       |

---

## Константы и типы

- Маршруты: `RoutePath`, `AppRoutes` в `@shared/config/router`
- Пагинация: `DEFAULT_PAGINATION_LIMIT`, `DEFAULT_PAGINATION_OFFSET` в `@shared/constants`
- Query keys: `QUERY_KEYS` в `@shared/constants`
- Валидация: `VALIDATION` в `@shared/constants` (fallback-сообщения)

Иконки: `lucide-react`. Стили: утилита `cn()` из `@shared/lib/ui/cn`.
