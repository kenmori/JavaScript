import React from 'react';
import { Dropdown, Header, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const MenuBar = () => {
  return (
    <Menu>
      <Menu.Item header>
        <Header as='h1'>Resily</Header>
      </Menu.Item>
      <Dropdown item text='OKR'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='align left'/>
            <NavLink to='/progress'>進捗</NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown item text='アラインメント'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='edit'/>
            <NavLink to='/okr/setting'>OKR 設定</NavLink>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default MenuBar;
