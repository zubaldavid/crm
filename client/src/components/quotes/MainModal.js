import React, { Component } from 'react';
import NewQuoteForm from './forms/NewQuoteForm';
import QuoteForm from './forms/QuoteForm';
import NewPaymentForm from './forms/NewPaymentForm'
import BilledForm from './forms/BilledForm';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Input,
  Message,
  Modal,
  Select,
  Transition
} from 'semantic-ui-react'

function buttonTrigger (buttonName) {
  return (
    <Button primary style={style.button}>
          <Icon name='plus'/> {buttonName}
    </Button>
  )
}
// { this.state.showQuote && <NewQuoteForm id={this.props.id} form={'quote'} new={'true'} edit={'true'}/>}
// { this.state.showPayment && <NewPaymentForm id={this.props.id} form={'payemnt'} type={'new'}/>}
// { this.state.showBilled && <BilledForm invoice={this.props.invoice} form={'billed'}/>}
function iconTrigger () {
  return ( <Icon name='edit'/> )
}

class MainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuote: true,
      quoteAction: "new",
      showPayment: true,
      paymentAction: "new",
      showBilled: true,
      showMessage: false,
      message: '',
      animation: 'fade',
      duration: 800
    };
  }

  openQuoteForm = (type) => {
    this.setState(state => ({
      showQuote: true, showPayment: false, showBilled:false, quoteAction: type,
    }));
  }

  openPaymentForm = (type) => {
    this.setState(state => ({
      showQuote: false, showPayment: true,showBilled: false, paymentAction: type,
    }));
  }

  openBilledForm = () => {
    this.setState(state => ({
      showQuote: false,  showPayment: false, showBilled: true
    }));
  }

  handleMessage = (newMessage) => {
    console.log("We got to handle message: ", newMessage );
    this.setState({showMessage: true , message: newMessage});
     setTimeout(() => {
       this.setState({showMessage: false});
     }, 3000);
  }

  displayForm (header) {
    switch(header) {
      case 'NEW QUOTE':
        return this.openQuoteForm("new");
        break;
      case 'EDIT QUOTE':
        return this.openQuoteForm("edit");
        break;
      case 'NEW PAYMENT':
        return this.openPaymentForm("new");
        break;
      case 'EDIT PAYMENT':
        return this.openPaymentForm("edit");
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
    const { message, animation, duration, showMessage, quoteAction, paymentAction } = this.state
    return (
      <div>
      <Modal style={style.modal} trigger={this.showTrigger()} closeIcon>
          <Modal.Header style={style.head}>{this.props.header}</Modal.Header>
            <Transition visible={showMessage}animation={animation} duration={duration}>
            <Message color='green'>{message}</Message>
            </Transition>
           <Modal.Content>
             { this.state.showQuote && <NewQuoteForm id={this.props.id} form={'quote'} type={quoteAction} confirmation={this.handleMessage} />}
             { this.state.showNewPayment && <NewPaymentForm id={this.props.id} form={'payment'} type={paymentAction}/>}
             { this.state.showBilled && <BilledForm invoice={this.props.invoice} form={'billed'}/>}
           </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const style = {
  modal : {marginTop: '.5%', height: '80%', width: '60%'},
  addNew : {width:'60%', float: 'right'},
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
