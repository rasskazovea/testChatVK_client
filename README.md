# testChatVK_client
For company Luna Apps

Как запускать проект локально для тестирования:
 
1. Для начала устанавливаем и запускаем сервер отсюда: https://github.com/rasskazovea/testChatVK_server
   * Но можно этот пункт не делать, т.к. сейчас сервер развернут и запущен на облаке Heroku.com - поэтому будет работать без его установки
2. Далее прописываем путь данной папки testChatVK_client с клиентом у себя в консоле ПК
3. Затем выполняем команду для установки всех необходимых модулей: npm install
4. После запускаем локальное тестирование командой: npm start
5. Чтобы локалально все работало прописываем ссылку в приложении VK: https://localhost:10888


Как собрать приложение для размещения его на сервере и тестирования уже с телефона:

1. Выполняем команду в косоли для сборки проекта: npm run build
2. После этого все файлы проекта будут находится в папке build
3. Из папки build переносим все файлы, кроме папки static на хостинг в отдельную папку любую
4. Папку static переносим в корневую папку хостинга
5. Копируем ссылку к файлу build/index.html и прописываем её в настройках приложения


СВОБОДНОЕ ОПИСАНИЕ ТОГО, КАК Я СОЗДАВАЛ ЭТОТ ЧАТ:

Мне пришлось с нуля познакомиться с React, VKUI, Socket и Node, так как до этого я разрабатывал игры и использовал там совсем другие движки. 
Было потрачено в сумме 3 полных дня, чтобы во всем разобраться и написать данный чат.
Я учитывал все возможные моменты, такие как: 
1. Скрол сообщений, когда их много и появляется новое сообщение мы всегда видим последнее
2. Изменение цвета кнопки "Отправить сообщение", когда строка ввода сообщения заполнена
3. Отображение списка пользователей онлайн при нажатии на количество человек в чате
4. Исключение дубликатов из списка онлайн, если человек открыл чат с нескольких устройств
5. Вывод времени отправки сообщения - для юзера время переводится под его часовй пояс

За 3 суток много изучил нового, но с фронтом явно намного легче справляюсь и быстрее понимаю, чем с бэком, так с бэком мало работал раньше, но работал и работаю.
Много времени потратил на развертывание сервера NODE JS на своем хостинге, не мог долго настроить порты, в итоге развернул сервер на облаке Heroku.com
Есть минус размещения сервера на Heroku.com - каждые минут 5-10 сервер на 30 секунд висит. Буду переносить на свой хостинг обязательно. 

С бэком и сервером на NODE нужно еще разобраться, но в остльном освоил библиотеки, приемы работы с ними и теперь имею представление, как создавать VK Mini Apps.

ОЧЕНЬ ХОЧУ ЗАНИМАТЬСЯ И ИЗУЧАТЬ ДАЛЬШЕ РАЗРАБОТКУ VK MINI APPS!
МНЕ ЭТО ЖУТКО ИНТЕРЕСНО! ОСОБЕННО В КОМАНДЕ LUNA APPS!
БУДУ ОЧЕНЬ РАД! СПАСИБО ЗА ВНИМАНИЕ!
