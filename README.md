Начало работы   (https://jestjs.io/ru/docs/getting-started)
Установите Jest с помощью yarn:

yarn add --dev jest
Или npm:
npm install --save-dev jest


function sum(a, b) {
  return a + b;
}
module.exports = sum;

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


Добавьте следующий раздел в package.json:
{
  "scripts": {
    "test": "jest"
  }
}
Наконец, запустите yarn test или npm run test и Jest выведет это сообщение:

PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)


Запуск из командной строки#
Вы можете запустить Jest прямо из командной строки (если он глобально доступен в PATH, например yarn global add jest или npm install jest --global) с множеством полезных опций.

Вот так можно запустить Jest для проверки файлов совпадающих с my-test, используя config.json в качестве файла конфигурации и для отображения нативного уведомления ОС после завершения:

jest my-test --notify --config=config.json

--------------------------------------------------


Использование сопоставлений (https://jestjs.io/ru/docs/using-matchers)


Стандартные сопоставления#

toBe использует Object.is для проверки точного совпадения. Если же вам нужно проверить значение объекта, воспользуйтесь toEqual:

test('присваивание объекту', () => {
  const data = {один: 1};
  data['два'] = 2;
  expect(data).toEqual({один: 1, два: 2});
});
toEqual рекурсивно проверяет каждое поле объекта или массива.

Вы также можете протестировать на противоположность вычислителю:

test('сложение положительных чисел не равно нулю', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});


Правдивость#

При тестировании иногда необходимо различать undefined, null и false, но в некоторых ситуациях это не требуется. Jest содержит вспомогательные функции позволяющие явно указывать, что вам нужно.

toBeNull соответствует только null
toUndefined соответствует только undefined
toBeDefined является противоположностью toBeUndefined
toBeTruthy соответствует всему, что if инструкция рассматривает как true
toBeFalsy соответствует всему, что if инструкция рассматривает как false
Например:

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('ноль', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
Следует использовать вычислитель, который наиболее точно отражает то, что код должен делать.


Числа#

Большинство способов сравнения чисел имеют эквивалентные вычислители.

test('два плюс два', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe и toEqual эквивалентны по отношению к числам
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
Для проверки равенства чисел с плавающей запятой, используйте toBeCloseTo вместо toEqual потому, что вы не хотите, чтобы тест полагался на небольшую ошибку округления.

test('сложение чисел с плавающей запятой', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);         Это не будет работать из-за ошибки округления
  expect(value).toBeCloseTo(0.3); // А это сработает.
});


Строки#

Для сопоставления строк с регулярными выражениями, используйте toMatch:

test('в команде нет места Я', () => {
  expect('команда').not.toMatch(/Я/);
});

test('но есть "ася" в Васе', () => {
  expect('Вася').toMatch(/ася/);
});


Массивы и перебираемые объекты#

Вы можете проверить, содержит ли массив или итерируемый объект конкретное значение, используя toContain:

const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});


Исключения#

Для проверки возврата ошибки конкретной функцией при её вызове, используйте toThrow.

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});


Other#
(https://jestjs.io/ru/docs/expect)
Методы#
expect(value)
expect.extend(matchers)
expect.anything()
expect.any(constructor)
expect.arrayContaining(array)
expect.assertions(number)
expect.hasAssertions()
expect.not.arrayContaining(array)
expect.not.objectContaining(object)
expect.not.stringContaining(string)
expect.not.stringMatching(string | regexp)
expect.objectContaining(object)
expect.stringContaining(string)
expect.stringMatching(string | regexp)
expect.addSnapshotSerializer(serializer)
.not
.resolves
.rejects
.toBe(value)
.toHaveBeenCalled()
.toHaveBeenCalledTimes(number)
.toHaveBeenCalledWith(arg1, arg2, ...)
.toHaveBeenLastCalledWith(arg1, arg2, ...)
.toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
.toHaveReturned()
.toHaveReturnedTimes(number)
.toHaveReturnedWith(value)
.toHaveLastReturnedWith(value)
.toHaveNthReturnedWith(nthCall, value)
.toHaveLength(number)
.toHaveProperty(keyPath, value?)
.toBeCloseTo(number, numDigits?)
.toBeDefined()
.toBeFalsy()
.toBeGreaterThan(number | bigint)
.toBeGreaterThanOrEqual(number | bigint)
.toBeLessThan(number | bigint)
.toBeLessThanOrEqual(number | bigint)
.toBeInstanceOf(Class)
.toBeNull()
.toBeTruthy()
.toBeUndefined()
.toBeNaN()
.toContain(item)
.toContainEqual(item)
.toEqual(value)
.toMatch(regexp | string)
.toMatchObject(object)
.toMatchSnapshot(propertyMatchers?, hint?)
.toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
.toStrictEqual(value)
.toThrow(error?)
.toThrowErrorMatchingSnapshot(hint?)
.toThrowErrorMatchingInlineSnapshot(inlineSnapshot)
Справка#
expect(value)#
Функция expect используется каждый раз, когда вы хотите проверить значение. Однако, вам редко придется вызывать expect саму по себе. Вместо этого вы будете использовать expect вместе с функцией-проверкой для утверждения чего-либо о значении.

Это легче понять на примере. Скажем, у вас есть метод bestLaCroixFlavor(), который должен возвращать строку «грейпфрут». Вот как можно это протестировать:

test('лучший вкус это грейпфрут', () => {
  expect(bestLaCroixFlavor()).toBe('грейпфрут');
});
В данном случае для проверки значения используется функция toBe. Существует множество подобных функций, которые помогут вам тестировать различные вещи. Их список приведён ниже.

Аргументом для функции expect должно быть значение, которое возвращает ваш код, а в функцию проверки необходимо передавать ожидаемое верное значение. Если их перепутать местами, то тесты будут продолжать работать, а вот сообщения об ошибках в тестах будут выглядеть странно.