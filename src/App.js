import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Chat from './panels/Chat';
import Users from './panels/Users';

import io from "socket.io-client";

let socket;

const App = () => {
	const [activePanel, setActivePanel] = useState('chat');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    const activeBtnColor = '#069EEF';
    const noActiveBtnColor = '#C4C4C4';
	const [colorIco, setColorIco] = useState(noActiveBtnColor); //цвет кнопки (по умолчанию неактивен)
	const [inputValue, setInputValue] = useState('');  //текст сообщения из поля ввода
	const [countUsers, setCountUsers] = useState(0); //кол-во человек онлайн в чате
	
	const lastElemSms = useRef(); //для прокрутки к последнему сообщению в чате
    
    //переменные для сокета
    const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const ENDPOINT = 'https://test-chat-vk-mini.herokuapp.com'; //Сервер NODE развернут на Heroku.com


    useEffect(() => {
        
        //Подключаемся к Сокетам
	    socket = io(ENDPOINT);

        //Подключаемся к VK API
        bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);

			console.log('user = ', user);

            var room = '1'; //айди чата
			var name = user.first_name + ' ' + user.last_name; //имя пользователя
			var ava = user.photo_100; //аватарка пользователя

			setRoom(room);
	        setName(name);

			//подключаемся к чату
		    socket.emit('join', { name, ava, room }, (error) => {
		      if(error) {
		        alert(error);
		      }else{
		        
		        console.log('Подключились к комнате');
		        setPopout(null); //убираем прелоадер

		      }
		    });
	        
		}
		fetchData();

	}, [ENDPOINT]);


	useEffect(() => {

		//ловим новые сообщения в чате
	    socket.on('message', message => {
	      
          //время получения сообщения

	      setMessages(msgs => [ ...msgs, message ]);
	      console.log('Пришло сообщение = ', message);

	      //скролим до последнего сообщения
		  lastElemSms.current.scrollIntoView(); 

	    });
	    
	    //ловим пользователей в чате
	    socket.on("roomData", ({ users }) => {
	      
	      setUsers(checkDouble(users)); //исключаем дубликаты (если c 2-х и более устройств)
	      setCountUsers(users.length);

	    });

	}, []);


    //Нажатие на кнопку: "Отправить сообщение"
	const sendMsg = e => {
        event.preventDefault();

        //если кнопка активна
        if(colorIco == activeBtnColor){

            //Отправляем сообщение в сокет
            socket.emit('sendMessage', inputValue, getTime(), () => setMessage(''));
			console.log('Отправили сообщение = ', inputValue);

            setInputValue(''); //очищаем поле ввода
            setColorIco(noActiveBtnColor); //делаем кнопку неактивной
        }

	};


	//Ловим изменения в поле для ввода сообщения
	const changeInput = e => {
        
        //ловим текст из поля ввода
        setInputValue(e.target.value); 

        //если в поле введены символы
        if(e.target.value.length > 0) setColorIco(activeBtnColor); //делаем кнопку активной
        else setColorIco(noActiveBtnColor); //делаем кнопку неактивной

	};


	//Ловим нажатие Enter на клавиатуре
	const onKeyDown = e => {
	    if (e.key === 'Enter') {
	       sendMsg(null); //Отправляем сообщение
	    }
	};


	//Исключаем дубликаты из массива юзеров онлайн
	//если юзер зашел на 2-х и более устройствах с одного профиля
	const checkDouble = users => {

        var used = {};
		var filtered = users.filter(function(obj) {
		    return obj.name in used ? 0:(used[obj.name]=1);
		});

		return filtered;
	};


	//Получаем текущее время GMT+0 в секундах
	const getTime = () => {
        const date = new Date();
		return Math.round((date.getTime() + date.getTimezoneOffset()*60*1000)/1000);
	};


	//Функция перехода на другое окно
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
    

    //Рисуем интерфейс чата
	return (
		<View activePanel={activePanel} popout={popout}>	
			<Chat id='chat' lastElem={lastElemSms} countUsers={users.length} messages={messages} fetchedUser={fetchedUser} go={go} goMsg={sendMsg} goInput={changeInput} colorIco={colorIco} inputValue={inputValue} keyDown={onKeyDown} />
		    <Users id='users' go={go} usersOnline={users} />
		</View>
	);

}

export default App;