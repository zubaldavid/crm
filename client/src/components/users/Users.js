import React, { Component } from 'react';
import AddNewUser from './AddNewUser'
import UsersTable from './UsersTable';
import {
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react'


function buttonTrigger () {
  return (
    <Button style={style.button}>
      <Icon name='user'/> Users
    </Button>
  )
}

function iconTrigger () {
  return ( <Icon name='edit'/> )
}

class UsersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,  showTable: true, id:0
    };
  }

  openForm = () => {
    this.setState({
      showForm: true, showTable: false,
    });
  }

  closeForm = () => {
    this.setState({
      showForm: false, showTable:true
    });
  }

  editUser = (id) => {
    this.setState({
        showForm: true, showTable: false, id:id,
    });
  }

  showTrigger = () => {
    if (this.props.button === 'true')  return buttonTrigger();
    if (this.props.icon === 'true')  return iconTrigger();
  }

  componentDidMount() {
    this.showTrigger();
    console.log('User Modal did mount.');
  }

  render() {
    return (
      <Modal style={style.modal} trigger={this.showTrigger()} closeIcon>
        <Modal.Header syle={style.head}>AVIATE USERS
          <Button primary onClick={this.openForm} style={style.addButton} >
             <Icon name='plus'/> Add User
          </Button>
        </Modal.Header>
         <Modal.Content>
          { this.state.showTable && <UsersTable editUser={this.editUser}/> }
          { this.state.showForm && <AddNewUser id={this.state.id} showTableAgain={this.closeForm}/> }
         </Modal.Content>
      </Modal>
    )
  }
}

const style = {
  modal : { marginTop: '.5%', height: '80%', width: '60%'},
  button : { marginLeft: '5%', float:'left'},
  addButton : {float:'right'},
  head : { alignItems: 'center'}
};

export default UsersModal
