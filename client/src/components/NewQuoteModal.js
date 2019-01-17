import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Modal,
  Select,
  Table
} from 'semantic-ui-react'

class NewQuoteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showTable: true
    };
  }

  openForm = () => {
    this.setState({
      showForm: true,
      showTable: false
    });
  }

  getUsersList = () => {
    fetch('api/users')
    .then(res => res.json())
    .then(res => {
        var usersList = res.map(r => r.first_name);
        this.setState({ usersList});
    });
  };

  compontentDidMount () {
    this.getUsersList();
  }

  render() {
    const style = {
      modal : {
        marginTop: '.5%', height: '80%', width: '60%'
      },
      button: {
        float:'right',
      },
      head: {
        alignItems: 'center'
      }
    };
    return (
      <Modal style={style.modal} trigger={<Button primary style={style.button} >
            <Icon name='plus'/> New Quote </Button>}>
        <Modal.Header syle={style.head}>USERS</Modal.Header>
         <Modal.Content>
          <AddNewQuote/>
         </Modal.Content>
        <br/>
         <Grid centered>
         <Button primary>
            <Icon name='arrow up'/>
                Submit Quote
            </Button>
         </Grid>
      </Modal>
    )
  }
}

class AddNewQuote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  firstName: '', lastName: '', email: '', password: '', usersList: [],
      showTable: false, showForm: true
    };
  }

  handleInputChange = (e) => {
      this.setState({ firstName: e.target.value});
      this.setState({ lastName: e.target.value});
      this.setState({ email: e.target.value});
      this.setState({ password: e.target.value});
  };

  handleAddUser = () => {
    fetch('api/users', {
      method: 'post',
      headers: {'Content-Type': 'aplication.json'},
      body: JSON.stringify({user: this.state.firstName})
    })
    .then(res => res.json())
    .then(res => {
    //  this.getUsersList();
      this.setState({firstName : ''});
    });
  };

  render() {
    const style = {
        form : {
          left: '15%', height:'80%', width: '80%',
      },
        button: {
          flex: 1, flexDirection: 'row', alignItems: 'center'
        }
    };
    return (
      <div>
      <Button primary ><Icon name='plus'/> New Agency</Button>
      <br/>
      <br/>
      <Grid.Row centered>
        <Form style={style.form}>
         <Form.Group>
           <Form.Field required width={5}>
             <label>Quote Number</label>
             <Input fluid placeholder='Quote Number' />
           </Form.Field>
           <Form.Field width={5} options={agency}>
             <label>Agency</label>
             <Input fluid placeholder='Agency' />
           </Form.Field>

           <Form.Field width={5} options={pointOfContact}>
             <label>Point of Contact</label>
             <Input fluid placeholder='Point of Contact' />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field width={6} >
             <label>Solicitation</label>
             <Input fluid placeholder='Solicitation Number' />
           </Form.Field>
           <Form.Field width={2}>
             <label>Revision</label>
             <Input fluid placeholder='Revision' />
           </Form.Field>
           <Form.Field  options={employees} width={7}>
             <label>Employee</label>
             <Input fluid placeholder='Employee' />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={5}>
             <label>Received</label>
             <Input fluid placeholder='Recieved Date' />
           </Form.Field>
           <Form.Field width={5}>
             <label>Description</label>
             <Input fluid placeholder='Description' />
           </Form.Field>
           <Form.Field  options={status} width={5}>
             <label>Status</label>
             <Input fluid placeholder='Status' />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required  width={5}>
             <label>Due Date</label>
             <Input fluid placeholder='Due Date' />
           </Form.Field>
           <Form.Field width={5}>
             <label>Due Time</label>
             <Input fluid placeholder='Due Time' />
           </Form.Field>
           <Form.Field width={5}>
             <label>Date Sent</label>
             <Input fluid placeholder='Date Sent' />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={5}>
             <label>Date PO Received</label>
             <Input fluid placeholder='Date PO Received' />
           </Form.Field>
           <Form.Field width={5}>
             <label>PO Number</label>
             <Input fluid placeholder='PO Number' />
           </Form.Field>
           <Form.Field width={5}>
             <label>Comments</label>
             <Input fluid placeholder='Comments' />
           </Form.Field>
         </Form.Group>

        </Form>
        </Grid.Row>
      </div>
    )
  }
}

const employees = [
  { key: 'm', text: 'David', value: 'David' },
  { key: 'f', text: 'Aaron', value: 'Aaron' },
]

const agency = [
  { key: 'm', text: 'David', value: 'David' },
  { key: 'f', text: 'Aaron', value: 'Aaron' },
]

const pointOfContact = [
  { key: 'm', text: 'David', value: 'David' },
  { key: 'f', text: 'Aaron', value: 'Aaron' },
]

const status = [
  { key: 'b', text: 'Blue', value: 'Blue' },
  { key: 'd', text: 'Dead', value: 'Dead' },
  { key: 'o', text: 'Orange', value: 'Orange' },
  { key: 'p', text: 'Purple', value: 'Purple' },
]

export default NewQuoteModal
