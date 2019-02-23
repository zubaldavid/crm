import React, { Component } from 'react';
import NewQuoteForm from './forms/NewQuoteForm';
import NewPaymentForm from './forms/NewPaymentForm';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react'

function buttonTrigger (buttonName) {
  return (
    <Button primary style={style.button}>
          <Icon name='plus'/> {buttonName}
    </Button>
  )
}

function iconTrigger () {
  return (
    <Icon hover name='edit'/>
  )
}

class MainModal extends Component {
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

  displayForm () {
    if (this.props.header === 'NEW QUOTE' || this.props.header === 'EDIT QUOTE')
      this.openQuoteForm();
    if (this.props.header === 'NEW PAYMENT' || this.props.header === 'EDIT PAYMENT')
      this.openPaymentForm();
  }

  showTrigger () {
    if (this.props.button === 'true')  return buttonTrigger(this.props.buttonName);
    if (this.props.icon === 'true')  return iconTrigger();
  }

  componentDidMount () {
    this.displayForm();
    this.showTrigger();
    console.log('New Item modal did mount.');
  }

  render() {
    return (
      <Modal style={style.modal} trigger={this.showTrigger()}>
        <Modal.Header style={style.head}>{this.props.header}</Modal.Header>
         <Modal.Content>
          { this.state.showQuote && <NewQuoteForm edit={'new quote'}/>}
          { this.state.showPayment && <NewPaymentForm />}
         </Modal.Content>
      </Modal>

    )
  }
}

const style = {
  modal : {marginTop: '.5%', height: '80%', width: '60%'},
  button: {float:'right'},
  head: { alignItems: 'center'}
};

MainModal.propTypes = {
  button : PropTypes.string,
  buttonName: PropTypes.string,
  header: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string
}

export default MainModal;
