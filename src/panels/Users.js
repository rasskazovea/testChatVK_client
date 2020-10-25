import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Link from '@vkontakte/vkui/dist/components/Link/Link';

import './Users.css';

const osName = platform();

const Users = ({ id, go, usersOnline }) => (
	<Panel id={id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={go} data-to="chat">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
		Онлайн в чате
		</PanelHeader>
        
		<UsersList usersOnline={usersOnline}/>

	</Panel>
);


//Отрисовка списка юзеров
const UsersList = ({ usersOnline }) => (

    <div>
        {usersOnline.map((user, i) => 
        
            <Cell key={i}
            before={ <Avatar size={48} src={user.ava} /> }
            description=''>  
            <Link>{user.name}</Link>
            </Cell>

        )}
    </div>

);


Users.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Users;
