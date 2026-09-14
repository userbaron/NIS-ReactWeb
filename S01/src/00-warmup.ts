// Задание 0. Разминка (10 минут)
//
// В каждой строке ниже ошибка типизации. Исправьте так, чтобы
//     npm run warmup
// не выдавал ни одной ошибки, а код остался осмысленным.
//
// Нельзя: any, as, ! и @ts-ignore. Менять можно и типы, и сам код.

// 1
let count: number = 42;

// 2
const ids: number[] = [1, 2, 3];

// 3
function len(x: string | null) {
    return x?.length;
}

// 4
const user: { name: string; age?: number | null } = { name: "Аня", age: null };

// 5
function first(xs: string[]): string | undefined {
    if (xs.length != 0) {
        return xs[0];
    }
}

// 6
const label: "on" | "off" = "on";

// 7
function area(width: number, height: number): number {
    const value = width * height;
    return value;
}

export { count, ids, len, user, first, label, area };