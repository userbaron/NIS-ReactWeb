// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    let describe: string = ``;
    describe += `Пользователя зовут ${user.name}. `
    if ('age' in user) {
        describe += `Пользователю ${user?.age} лет. `
    }
    if (user.hobbies.length == 0) {
        describe += `У пользователя нет хоббию. `
    }
    else {
        describe += `Хобби пользователя: ${user.hobbies}. `
    }
    if ('email' in user.contact) {
        describe += `Email пользователя - ${user.contact.email}. `;
    }
    if ('phone' in user.contact) {
        describe += `Email пользователя - ${user.contact.phone}. `;
    }
    return describe;
}
