[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# Mesto-react 🗺
Frontend и Backend сервиса картинок, который позволяет пользователям платформы делиться изображениями и фотографиями, отмечать понравившиеся.  
[Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?type=design&node-id=28212-155&mode=design&t=2OYRXx1strboqa9m-0) 


## Реализовано в проекте ✍

* вёрстка компонентов JSX React;
* асинхронные запросы к API;
* браузерная валидация введенных пользователем данных;
* регистрация и аутентификация пользователя, авторизация по токену;
* роуты для авторизованных и неавторизованных пользователей;
* редактирование данных пользователем, добавление и удаление карточек;
* счетчик лайков;
* валидация перед записью в БД схемой и моделью Mongoose;
* безопасность защищена модулем обработки HTTP-заголовков и лимитом запросов к серверу;
* логирование;
* структура проекта по BEM; 

## Технологии 🛠

  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongoose/mongoose-original.svg" title="Mongoose" alt="Mongoose" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="MongoDB" alt="MongoDB" width="40" height="40"/>&nbsp;

## Инструкция по запуску 🏁

1. Склонируйте этот репозиторий:

  ``
  git clone https://github.com/TanyaSimonova/react-mesto-api-full-gha.git
  ``

2. Поочередно зайдите в папки frontend и backend и установите зависимости:
   
``
npm install
``
 
4. Затем в каждой папке создайте файл .env и скопируйте в него содержимое .env.example, сохраните обновление;
5. Убедитесь, что MongoDB в рабочем состоянии;


6. В папке backend запустите локальный сервер:

``
npm run dev
``

6. В папке frontend запустите:

``
npm run start
``

## Системные требования ⚙

- Node.js версии 18.16.0  

- MongoDB версии 4.4.14 (любая мажорная 4.4.х)



