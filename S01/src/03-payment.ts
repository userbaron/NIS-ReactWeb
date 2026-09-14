// Задание 3. Платежи (20 минут)
//
// 1. Реализуйте describePayment: switch по метке kind.
// 2. Закройте switch проверкой полноты через never.
// 3. Реализуйте total — сумма только наличных платежей.
// 4. Добавьте четвёртый вариант оплаты и посмотрите, где компилятор
//    покажет незакрытые места.

export type Payment =
    | { kind: "card"; last4: string }
    | { kind: "cash"; amount: number }
    | { kind: "transfer"; iban: string }
    | { kind: "gold"; kg: number};

export function describePayment(payment: Payment): string {
    switch (payment.kind) {
        case "card": return `Оплата картой: ${payment.last4}`;
        case "cash": return `Оплата наличными: ${payment.amount}`;
        case "transfer": return `Перевод: ${payment.iban}`;
        case "gold": return `Занос золотом: ${payment.kg}`;
        default: const exhaustiveCheck: never = payment; return exhaustiveCheck;
    }
}

export function total(payments: Payment[]): number {
    let sum = 0;
    for (const payment of payments) {
        if (payment.kind === "cash") {
            sum += payment.amount;
        }
    }
    return sum;
}
