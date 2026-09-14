// Задание 1. Статусы (15 минут)
//
// 1. Опишите Status как объединение литералов.
// 2. Реализуйте statusMessage через switch — по одному сообщению на вариант.
// 3. Закройте switch функцией assertNever, чтобы забытый вариант
//    становился ошибкой компиляции.
// 4. Добавьте в Status вариант "cancelled" и почините то, что сломается.

export type Status = "idle" | "loading" | "success" | "error" | "cancelled";

export function assertNever(value: never): never {
    throw new Error("Необработанный вариант: " + JSON.stringify(value));
}

export function statusMessage(status: Status): string {
    switch(status) {
        case "idle": return "Пусто";
        case "loading": return "Загрузка...";
        case "success": return "Успех!!!";
        case "error": return "Некая ошибка";
        case "cancelled": return "Откланено";
        default: assertNever; return "Неизвестный статус";
    }
}
