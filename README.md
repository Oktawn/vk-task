# Тестовое задание на Fronted developer

## Задание 1

Необходимо получить с сервера и отобразить список элементов. Список должен поддерживать бесконечный плавный скролл, постепенную подгрузку элементов, локальное удаление и редактирование.

Стек:

```
TS
React + MobX
Vite
Jest + RTL
```

Взял [Сat Api](https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t)

Пример получения первой страницы

```
curl "https://api.thecatapi.com/v1/images/search?limit=10&page=0"
```

Отображение Первоначальной страницы

<img alt="start Page" src="./img/startPage.png" wight="512px
" height="512px">

Изменение имени

<img alt="start Page" src="./img/changeName.png" >

Отображение нового имени и удаление второй карточки

<img alt="start Page" src="./img/deleteCat.png" >

## Задание 2

Написать реализация [**EventEmitter**](https://github.com/Oktawn/vk-task/blob/main/src/EventEmitter.ts)

у **EventEmitter** должны быть реализованы следующие методы:

- метод `on`:  
  позволяет регистрировать несколько обработчиков на одно событие

```ts
on(eventName: Key, listener: Listener)
```

```ts
newEmitter = new EventEmitter();
const eventName = "test emit";
const listener1 = (data: any) => {
  console.log(data);
};
newEmitter.on(eventName, listener1);
```

- метод `emit`:  
  вызывает все обработчики зарегистрированные на это событие

```ts
 emit(eventName: Key, data?: any)
```

```ts
newEmitter = new EventEmitter();
const eventName = "test emit";
const listener1 = (data: any) => {
  console.log(data);
};
const listener2 = function () {
  console.log("twice event");
};

newEmitter.on(eventName, listener1);
newEmitter.on(eventName, listener2);
newEmitter.emit(eventName, "test data");

//output
test data
test twice

```

- метод `off`:  
  удаляет конкретный обработчик из события

```ts
 off(eventName: Key, listener: Listener)
```

```ts
newEmitter = new EventEmitter();
const listener1 = () => {
  console.log("list 1");
};
const listener2 = () => {
  console.log("list 2");
};

newEmitter.on(eventName, listener1);
newEmitter.on(eventName, listener2);

newEmitter.off(eventName, listener2);
console.log(newEmitter['events'][eventName]);

//output
 [ [Function: listener1] ]
```
