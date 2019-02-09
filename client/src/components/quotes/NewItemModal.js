import React, { Component } from 'react';
import NewQuoteForm from './NewQuoteForm';
import NewPaymentForm from './NewPaymentForm';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Icon,
  Modal,
} from 'semantic-ui-react'

class NewItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuote: true,
      showPayment: true,
    };
    this.openQuoteForm = this.openQuoteForm.bind(this);
    this.openPaymentForm = this.openPaymentForm.bind(this);
  }

  openQuoteForm () {
    this.setState(state => ({
      showQuote: true,
      showPayment: false,
    }));
  }

  openPaymentForm () {
    this.setState(state => ({
      showQuote: false,
      showPayment: true,
    }));
  }

  componentDidMount () {
    if(this.props.buttonName == 'New Quote') {
      this.openQuoteForm();
    } else { this.openPaymentForm(); }
    console.log('New Item modal did mount.');
  }

  render() {
    const style = {
      modal : {marginTop: '.5%', height: '80%', width: '60%'},
      button: {float:'right'},
      head: { alignItems: 'center'}
    };
    return (
      <Modal style={style.modal} trigger={<Button onClick={this.determineForm} primary style={style.button}>
            <Icon name='plus'/> {this.props.buttonName} </Button>}>
        <Modal.Header syle={style.head}>{this.props.header}</Modal.Header>
         <Modal.Content>
          { this.state.showQuote &&<NewQuoteForm edit={'new'}/>}
          { this.state.showPayment &&<NewPaymentForm/>}
         </Modal.Content>
      </Modal>
    )
  }
}

NewItemModal.propTypes = {
  buttonName: PropTypes.string.required,
  header: PropTypes.string
}

export default NewItemModal
