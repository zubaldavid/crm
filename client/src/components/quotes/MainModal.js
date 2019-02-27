import React, { Component } from 'react';
import NewQuoteForm from './forms/NewQuoteForm';
import NewPaymentForm from './forms/NewPaymentForm'
import BilledForm from './forms/BilledForm';
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
    <Icon name='edit'/>
  )
}

class MainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuote: true, showPayment: true, showBilled: true,
    };
  }

  openQuoteForm = () => {
    this.setState(state => ({
      showQuote: true, showPayment: false, showBilled:false
    }));
  }

  openPaymentForm = () => {
    this.setState(state => ({
      showQuote: false, showPayment: true,showBilled: false
    }));
  }

  openBilledForm = () => {
    this.setState(state => ({
      showQuote: false,  showPayment: false, showBilled: true
    }));
  }

  displayForm (header) {
    switch(header) {
      case 'NEW QUOTE':
        return this.openQuoteForm();
        break;
      case 'EDIT QUOTE':
        return this.openQuoteForm();
        break;
      case 'NEW PAYMENT':
        return this.openPaymentForm();
        break;
      case 'EDIT PAYMENT':
        return this.openPaymentForm();
        break;
      case 'EDIT BILLED':
        return this.openBilledForm();
        break;
      default:
  }
}

  showTrigger = () => {
    if (this.props.button === 'true')  return buttonTrigger(this.props.buttonName);
    if (this.props.icon === 'true')  return iconTrigger();
  }

  componentDidMount () {
    this.displayForm(this.props.header);
    this.showTrigger();
    console.log('New Item modal did mount.');
  }

  render() {
    return (
      <Modal style={style.modal} trigger={this.showTrigger()} closeIcon>
        <Modal.Header style={style.head}>{this.props.header}</Modal.Header>
         <Modal.Content>
          { this.state.showQuote && <NewQuoteForm id={this.props.id} form={'quote'} type={'new'} />}
          { this.state.showPayment && <NewPaymentForm id={this.props.id} form={'payemnt'} type={'new'}/>}
          { this.state.showBilled && <BilledForm invoice={this.props.invoice} form={'billed'}/>}
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
  id: PropTypes.string,
  invoice: PropTypes.string
}

export default MainModal;
