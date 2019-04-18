import React, { Component } from 'react';
import {dateFormat} from '../Formats';
import PropTypes from 'prop-types';
import MainModal from './MainModal';
import {
  Dimmer,
  Icon,
  Loader,
  Modal,
  Table,
} from 'semantic-ui-react'

const headers = [
  'Inv', 'Vendor', 'Date Ordered', 'Date Delivered',
  'Subtotal', 'Shipping', 'Taxes', 'Total','Pay Method', 'Status', 'Notes',
]

function TableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        {headers.map(header =>
          <Table.HeaderCell>{header}</Table.HeaderCell>
        )}
      </Table.Row>
    </Table.Header>
  )
}

class PaymentsTableModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
    };
  }

  getPaymentsList (invoice) {
    let url = ('/api/quote/payments/inv/?invoice=' + invoice);
    console.log('Payment url:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({payments:data});
      console.log("payments", this.state.payments);
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 700); // simulates loading of data
    this.getPaymentsList(this.props.invoice);
    console.log('Payments Modal Table did mount.');
  }

  render () {
    const {payments} = this.state;
   const style = {
     modal : {marginTop: '.5%', height: '80%', width: '60%'},
     button: {float:'right'},
     head: { textAlign: 'center'}
   };

   return (
     <Modal style={style.modal} trigger={<Icon hover name='bars'/> }>
       <Modal.Header style={style.head}> PAYMENT(S) FOR INV: {this.props.invoice}</Modal.Header>
       <Modal.Content>
          <MainModal  button={'true'} buttonName={'New Payment'} header={'NEW PAYMENT'}/>
          <br/>
          <br/>
         <Table compact size='small'>
           <TableHeader/>
           {this.state.loading &&<Dimmer active>
             <Loader/>
           </Dimmer> }
               {payments.map(q =>
                 <Table.Row key={q.id}>
                   <Table.Cell>{q.invoice}</Table.Cell>
                   <Table.Cell>{q.vendor}</Table.Cell>
                   <Table.Cell>{dateFormat(q.date_ordered)}</Table.Cell>
                   <Table.Cell>{dateFormat(q.date_delivered)}</Table.Cell>
                   <Table.Cell>{q.subtotal}</Table.Cell>
                   <Table.Cell>{q.shipping}</Table.Cell>
                   <Table.Cell>{q.taxes}</Table.Cell>
                   <Table.Cell>{q.total}</Table.Cell>
                   <Table.Cell>{q.payment_method}</Table.Cell>
                   <Table.Cell>{q.status}</Table.Cell>
                   <Table.Cell>{q.comment}</Table.Cell>
                   <Table.Cell><MainModal icon={'true'} id={q.id} header={'EDIT PAYMENT'}/></Table.Cell>
                 </Table.Row>
               )}
         </Table>
        </Modal.Content>
       </Modal>
   )
 }
}

PaymentsTableModal.propTypes = {
  invoice: PropTypes.String,
}

export default PaymentsTableModal;
