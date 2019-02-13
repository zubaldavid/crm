import React, { Component } from 'react';
import NewQuoteForm from './NewQuoteForm';
import NewPaymentForm from './NewPaymentForm';
import PropTypes from 'prop-types';
import {
  Icon,
  Modal,
} from 'semantic-ui-react'

class EditFileModal extends Component {
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
    if(this.props.header === 'quote') {
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
      <Modal style={style.modal} trigger={<Icon hover name='edit'/> }>
        <Modal.Header syle={style.head}>{this.props.header}</Modal.Header>
         <Modal.Content>
          { this.state.showQuote &&<NewQuoteForm id={this.props.id} edit={'true'}/>}
          { this.state.showPayment &&<NewPaymentForm/>}
         </Modal.Content>
      </Modal>
    )
  }
}

EditFileModal.propTypes = {
  header: PropTypes.string,
  id: PropTypes.string
}

export default EditFileModal;
