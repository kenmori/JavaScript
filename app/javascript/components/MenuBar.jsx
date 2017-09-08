import React, {Component} from 'react';
import {Input, Dropdown, Header, Icon, Menu, Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

export default class MenuBar extends Component {

  // TODO:
  //仮ユーザーデータ。
  get usersOption() {
    return(
      [
        {key: '堀江', value: '堀江', text: '堀江'},
        {key: '篠原', value: '篠原', text: '篠原'},
        {key: '岩田', value: '岩田', text: '岩田'},
        {key: 'zheng', value: 'zheng', text: 'zheng'},
      ]
    )
  }

  // TODO:
  //期間。
  get periodsOption() {
    return(
      [
        {key: '2017 1Q', value: '2017 1Q', text: '2017 1Q'},
        {key: '2017 2Q', value: '2017 2Q', text: '2017 2Q'},
        {key: '2017 3Q', value: '2017 3Q', text: '2017 3Q'},
        {key: '2017 4Q', value: '2017 4Q', text: '2017 4Q'},
      ]
    )
  }

  get settingsTrigger() {
    return (
      <span>
        <Icon name='setting'/>
      </span>
    )
  }

  get userTrigger() {
    let loginUser = '堀江'; //TODO: 仮データ
    return (
      <span>
        <Icon name='user'/> {loginUser}
      </span>
    )
  }

  render() {
    return (
      <div className='menu-bar'>
        <Menu secondary>
          <Menu.Item header>
            <Header as='h1'><Image src='/assets/logo.png' href='/'/></Header>
          </Menu.Item>
          <div className='users'>
            <Dropdown placeholder='ユーザを選択してください。' search selection options={this.usersOption} className='full-width'/>
          </div>
          <div className='periods'>
            <Dropdown scrolling options={this.periodsOption} defaultValue={this.periodsOption[0].value} className='full-width'/>
          </div>
          <Menu.Menu position='right' className='right-menu'>
            <Dropdown trigger={this.settingsTrigger} className='settings'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name='align left'/>
                  <NavLink to='/progress'>進捗</NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name='edit'/>
                  <NavLink to='/okr/setting'>OKR 設定</NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown trigger={this.userTrigger}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink to='/settings'>設定</NavLink>
                </Dropdown.Item>
                <Dropdown.Item as='a' href='https://help.resily.com/' target='_blank'>
                  ヘルプ
                </Dropdown.Item>
                <Dropdown.Item onClick={this.props.signOut.bind(this)}>
                  logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
