import React, { Component } from 'react';
import NewQuoteForm from './forms/NewQuoteForm';
import QuoteForm from './forms/QuoteForm';
import NewPaymentForm from './forms/NewPaymentForm'
import BilledForm from './forms/BilledForm';
import PropTypes from 'prop-types';
import {
  Button,
  Header,
  Grid,
  Icon,
  Input,
  Message,
  Modal,
  Rail,
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
      duration: 800,
      errors: [],

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

  updateBidsTable = (page) => {
    console.log("Page to update:", page);
    this.props.updateBidsList(page);
  }

  handleErrors = (errors) => {
      this.setState({ showMessage: true , errors: errors })
  }

  handleMessage = (newMessage) => {
    console.log("We got to handle message: ", newMessage );
    this.setState({ showMessage: true , message: newMessage });
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
    const {errors, message, animation, duration, showMessage, quoteAction, paymentAction, open} = this.state
    return (
      <div>
      <Modal
          style={style.modal}
          trigger={this.showTrigger()}
          closeIcon
          >
          <Modal.Header style={style.head}>{this.props.header}</Modal.Header>
          <Transition visible={showMessage} animation={animation} duration={duration}>
          <Rail position='right'>
            <Message hidden={!this.state.message} style={{width: '80%'}} size='small' color='green'>
              <Header as='h4' textAlign='center'> {message} </Header>
             </Message>
             {errors.map(e =>
               <Message color='red' size='mini'> *{e.msg}</Message>
             )}
          </Rail>
          </Transition>
           <Modal.Content>
             {  this.state.showQuote && <NewQuoteForm id={this.props.id} form={'quote'}
                tableAgency={this.props.tableAgency}
                tablePOC={this.props.tablePOC}
                tableRev={this.props.tableRev}
                tableEmployee={this.props.tableEmployee}
                tableStatus={this.props.tableStatus}
                type={quoteAction}
                extended={this.props.cost}
                confirmation={this.handleMessage}
                error={this.handleErrors}
                costExtention={this.props.costExtention}
                tableBuyer={this.props.buyer}
                updateBidsTable={this.updateBidsTable}
                closeModal={this.close}
                />
              }
             { this.state.showPayment && <NewPaymentForm
               id={this.props.id}
               confirmation={this.handleMessage}
               error={this.handleErrors} form={'payment'}
               closeModal={this.close}
              />}
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
