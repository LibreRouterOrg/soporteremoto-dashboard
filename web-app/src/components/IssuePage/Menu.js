import React from 'react';
import { Menu as MenuAntd, Dropdown, Button, Icon } from 'antd';

export function Menu({ status, onChange }) {
    const menu = (
        <MenuAntd onClick={onChange}>
            <MenuAntd.Item key="1">
                {status === 'open' ? 'Marcar como Resuelto' : 'Reabrir'}
            </MenuAntd.Item>
        </MenuAntd>
    );

    return (
        <div>
            <Dropdown overlay={menu}>
                <Button className='action-trigger' size='small'>
                    <Icon type='ellipsis'></Icon>
                </Button>
            </Dropdown>
        </div>
    );
}
