import React from 'react';
import { navigate } from '@reach/router';
import './NavBar.less'
import { Menu as MenuAntd, Dropdown } from 'antd';
import { Avatar } from '../utils';
import api from '../../api';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
        };
        this.updateAccount = this.updateAccount.bind(this);
    }

    componentDidMount() {
        this.updateAccount();
        // TODO: use account as a global context
        this.interval = setInterval(() => this.updateAccount(), 200);
    }

    async updateAccount() {
        const { publicKey } = api.account.isLogged();
        const account = await api.account.get(publicKey);
        this.setState({ account: account});
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        const menu = (
            <MenuAntd onClick={() => navigate('/account_edition')}>
                <MenuAntd.Item key="1">
                    Editar Perfil
                </MenuAntd.Item>
            </MenuAntd>
        );

        if (!this.state.account.username) {
            return (<></>)
        }

        return (
            <div id="nav-bar-menu">
                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                    <div>
                        <Avatar user={this.state.account}></Avatar>
                    </div>
                </Dropdown>
            </div>
        );
    }

}

const Logo = () => (
    <div id="logo" onClick={() => navigate('/')}>
        Red de Soporte
    </div>
)

const NavBar = () => (
    <div id="nav-bar">
        <Logo></Logo>
        <Menu></Menu>
    </div>
);

export default NavBar
