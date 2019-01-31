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
      showQuote: false,
      showPayment: false,
    };
  }

  openQuoteForm () {
    this.setState({
      showQuote: true,
      showPayment: false,
    });
  }

  openPaymentForm () {
    this.setState({
      showQuote: true,
      showPayment: false,
    });
  }

  compontentDidMount () {
    console.log('New Item modal did mount.');
  }

  render() {
    const style = {
      modal : {marginTop: '.5%', height: '80%', width: '60%'},
      button: {float:'right'},
      head: { alignItems: 'center'}
    };
    return (
      <Modal style={style.modal} trigger={<Button primary style={style.button}>
            <Icon name='plus'/> New Quote </Button>}>
        <Modal.Header syle={style.head}>{this.props.header}</Modal.Header>
         <Modal.Content>
          { this.state.showQuote &&<NewQuoteForm/> }
          { this.state.showPayment &&<NewPaymentForm/> }
         </Modal.Content>
        <br/>
         <Grid centered>
         <Button primary>
            <Icon name='arrow up'/>
                Submit
            </Button>
         </Grid>
      </Modal>
    )
  }
}

NewItemModal.propTypes = {
  showTable: PropTypes.func.required,
  header: PropTypes.string.required
}

export default NewItemModal
