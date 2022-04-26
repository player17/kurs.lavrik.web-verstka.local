### node.js cmd 
> `https://www.npmjs.com/` все пакеты npm

> `npm` пакетный менеджер для node.js

> `cd /d d:\OpenServer20220222\domains\kurs.lavrik.web-verstka.local` 
смена директории

> `npm ls` список установленых модулей
> `npm ls --depth=1`
> `npm ls --depth=0 -g`

> `npm init -y` инициализация package.json файла 
> с конфигами проекта, `-y` тихий режим

### Установка и удаление пакетов/модулей
> `npm i jquery` пример установки jquery

> `npm r jquery` пример удаления jquery

> `npm i gulp -D` установка в рамках dev разработки, 
> в package.json файле директория devDependencies

> `npm i gulp-cli -g` установка глобально

> `npm i gulp-webpack -g`

> `npm i del -D` модуль для удаления папок и файлов

> `npm i gulp-concat -D` модуль для объединения файлов

> `npm i gulp-autoprefixer -D` модуль для генерации префиксов (кросбраузерность)

> `npm i gulp-clean-css -D` минификация css

> `npm i gulp-sourcemaps -D` карта минифицированого кода

> `npm i browser-sync -D` модуль отслеживания изменений в реальном времени

> `npm i gulp-if -D` модуль для различных режимов запуска
> 
> `npm i gulp-webp -D` модуль для сжатия картинок

### Конфигурация gulp
> `npm i` стартует установку всех пакетов из `package.json`
> `package-lock.json` содержит список всех зависимостей пакетов (не обязателен, но желателен, для послной совместимости всех пакетов между собой)
> `gulpfile.js` файл конфигурации в корень проекта 
> (запускается командой `gulp` в cmd)
> > `gulp build` пример простой команды, запуска проекта ч/з `gulp.task('build', ...)`
> > сконфигрурированной в `gulpfile.js`

> `gulp build` запуск проекта на продуктив

> `package.json` раздел `script` пишем скрипты запуска
> > `npm run dev` запуск gulp watch настроеной в gulpfile.js 

### Start project
> `npm run dev` запуск в режиме разработчика ч/з npm package.json[scripts]
> `npm run build` запуск в режиме продукта ч/з npm package.json[scripts]
> `gulp build --dev --concat --sync --clean` запуск ч/з gulp gulpfile.js

