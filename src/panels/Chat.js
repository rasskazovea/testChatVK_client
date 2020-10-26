import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';

import Icon48WritebarSend from '@vkontakte/icons/dist/48/writebar_send';
import { Input, Header, Counter, FixedLayout, RichCell, Link, PanelHeaderContent } from '@vkontakte/vkui';


//Отрисовка всех элементов окна чата
const Chat = ({ id, lastElem, countUsers, messages, go, goMsg, fetchedUser, goInput, colorIco, inputValue, keyDown }) => (

    <Panel id={id}>
        
        <PanelHeader>
            <PanelHeaderContent status={ <Link onClick={go} data-to="users">{formatTextCount(countUsers, ['человек', 'человека', 'человек'])} онлайн</Link> }>
            Чат Luna Apps
            </PanelHeaderContent>
        </PanelHeader>

        <Sms messages={messages}/>
        <div ref={lastElem} style={{ height: 65 }}/>

        <FixedLayout vertical="bottom" >
            <Div style={{background: 'white', height:46, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                <Input type="text" value={inputValue} style={{ width: window.innerWidth-70 }} onChange={goInput} onKeyDown={keyDown} placeholder="Ваше сообщение" />
                <Icon48WritebarSend width={48} height={48} fill={colorIco} onClick={goMsg} />

            </Div>
        </FixedLayout>

    </Panel>
);


//Отрисовка сообщения от пользователя в чате
const Sms = ({ messages }) => (
    
    <div>
        {messages.map((message, i) => 

            <RichCell 
                key={i}
                disabled
                multiline
                before={ <Avatar size={48} src={message.ava} /> }
                text={message.text}
                caption={convertTime(message.time)}
            >
            <Link>{message.user}</Link>
            </RichCell>

        )}
    </div>

);


//Форматируем строку вывода кол-ва человека
const formatTextCount = (n, text_forms) => {
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return n+' '+text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return n+' '+text_forms[1]; }
    if (n1 == 1) { return n+' '+text_forms[0]; }
    return n+' '+text_forms[2];
};


//Конвертируем время в часовой пояс юзера
const convertTime = time => {
    
    const date = new Date(); //текущая дата и время
    const date_offset = time - date.getTimezoneOffset()*60; //unix время с учетом часового пояса в секундах
    var date_msg = new Date(date_offset*1000); //время unix преобразованное в формат даты

    var hours = ("0" + date_msg.getHours()).slice(-2); //часы
    var minutes = ("0" + date_msg.getMinutes()).slice(-2); //минуты

    return hours+':'+minutes;
};


Chat.propTypes = {
    id: PropTypes.string.isRequired,
    goMsg: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_100: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string
    }),
};

export default Chat;