import React, { Component } from 'react';
import UsersTable from './UsersTable'
import AddNewUser from './AddNewUser'
import {
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react'

class UsersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showTable: true,
      addButton: true,
    };
  }

  componentDidMount() {
    console.log('User Modal did mount.');
  }

  openForm = () => {
    this.setState({
      showForm: true,
      showTable: false,
      showAddButton: false
    });
  }

  render() {
    const style = {
      modal : { marginTop: '.5%', height: '80%', width: '60%'},
      button : { marginLeft: '5%', float:'left'},
      addButton : {float:'right'},
      head : { alignItems: 'center'}
    };
    return (
      <Modal style={style.modal} trigger={<Button style={style.button}> <Icon name='user'/> Users </Button>}>
        <Modal.Header syle={style.head}>AVIATE USERS
          <Button primary onClick={this.openForm} style={style.addButton} >
             <Icon name='plus'/> Add User
          </Button>

        </Modal.Header>
         <Modal.Content>
          { this.state.showTable && <UsersTable/> }
          { this.state.showForm && <AddNewUser/> }
         </Modal.Content>
      </Modal>
    )
  }
}

export default UsersModal
