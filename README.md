# DailyPlanner

Задание:
Сделать SPA веб-приложение. Функции приложения:

1. Авторизация (email + пароль). Разрешать вход для двух пользователей: user1@some.com и user2@some.com. Пароль такой же, как логин.
2. Ведение расписания доступа. На экране показать данные о 7 днях недели в формате:
   [Понедельник 00:00 24:00]---
   [Воскресенье 00:00 24:00]
3. Авторизованный пользователь может менять значение времени для каждого дня. Число не нужно, считаем, что это абстрактный понедельник, вторник и т.д.
4. Сделать HTTP-метод доступным без авторизации. Если запрос к методу приходит в разрешенное в пункте 2 время, то возвращать успешный ответ; если в неразрешенное — то неуспешный.

Понятно, что в постановке задачи есть неточности. Реализовать как получится. Неточности обсудим при разборе решения.

# 📝 Daily Planner

Простое SPA-приложение для управления доступом по времени с авторизацией.

## 🚀 Функционал

- 🔐 **Авторизация** (email + пароль)
- 📅 **Ведение расписания** (установка временных интервалов для каждого дня недели)
- ✅ **Проверка доступа** (разрешение или запрет на основе установленного расписания)

## 📦 Установка и запуск

### 1️⃣ Клонирование репозитория

### 2️⃣ Установка зависимостей

### 3️⃣ Запуск проекта (фронтенд + бэкенд одновременно)

## В корневой папке проекта вызвать скрипт npm start

## 🔐 Авторизация

Доступ разрешён только для пользователей:

- **Логин:** `user1@some.com`, **Пароль:** `user1@some.com`
- **Логин:** `user2@some.com`, **Пароль:** `user2@some.com`
- 🕶 **Гостевой режим** (автоматическая генерация токена гостя)

Такой подход небезопасен и непрактичен, но в условиях отсутствия БД и сжатых сроков на MVP
предлагаю такое решение.

---

Как происходит обновление данных: в рантайме на сервере изменяются значения переменной.
При обновлении страницы все изменения остаются и динамически подтягиваются, но при рестарте сервера
все значения сбросятся на дефолтные. Это следствие отсутсвия БД либо редиса.
Выполнено на реакте для экономии времени на тестовое задание.

## 🛠 Технологии

- **Backend:** Node.js, Express, JWT
- **Frontend:** React, TypeScript
- **Сессии:** Express-session

---

## 🏗 Структура проекта

```
/daily-planner
├── /client  # Фронтенд (React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── /server  # Бэкенд (Express)
│   ├── server.js
│   └── ...
│
├── README.md  # Описание проекта
└── package.json  # Общие зависимости
```
