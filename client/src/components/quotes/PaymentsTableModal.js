import React, { Component } from 'react';
import {dateFormat, numberFormat, removeMoneyFormat} from '../Formats';
import PropTypes from 'prop-types';
import MainModal from './MainModal';
import {
  Dimmer,
  Grid,
  Icon,
  Loader,
  Modal,
  Progress,
  Segment,
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
      payments: [], total: 0, progressValue: 0
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

  getPaymentsTotalBill (invoice) {
    let url = ('/api/quote/payments/gettotal/?invoice=' + invoice);
    console.log('Payment url:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Total from payments:", data[0].sum);
      this.setState({total:data[0].sum});
    });
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 700); // simulates loading of data
    this.getPaymentsTotalBill(this.props.invoice);
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
       <Modal.Header style={style.head}>
       <Grid.Row>
          PAYMENT(S) FOR INV: {this.props.invoice}
         <Segment raised compact  size='mini' style={{width: '15%', float: 'right'}} >Balance: {numberFormat(this.props.cost - removeMoneyFormat(this.state.total)) || 0} </Segment>
       </Grid.Row>
       </Modal.Header>
       <Modal.Content>
          <Progress progress='value' value={removeMoneyFormat(this.state.total)} total={this.props.cost} color='blue' indicating> {numberFormat(this.props.cost)}</Progress>
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
                   <Table.Cell><MainModal icon={'true'} id={q.id} dimmer='false'header={'EDIT PAYMENT'}/></Table.Cell>
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
