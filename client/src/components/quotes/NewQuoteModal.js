import React, { Component } from 'react';
import NewQuoteForm from './NewQuoteForm'
import {
  Button,
  Grid,
  Icon,
  Modal,
} from 'semantic-ui-react'

class NewQuoteModal extends Component {
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
    console.log('New quote modal did mount.');
  }

  render() {
    const style = {
      modal : {marginTop: '.5%', height: '80%', width: '60%'},
      button: {float:'right'},
      head: { alignItems: 'center'}
    };
    return (
      <Modal style={style.modal} trigger={<Button primary style={style.button} >
            <Icon name='plus'/> New Quote </Button>}>
        <Modal.Header syle={style.head}>NEW QUOTE</Modal.Header>
         <Modal.Content>
          <NewQuoteForm/>
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

export default NewQuoteModal
