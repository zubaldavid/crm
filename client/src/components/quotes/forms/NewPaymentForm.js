import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Message,
  Popup,
} from 'semantic-ui-react'

const status = [
  { label: 'Deposit', value: 'deposit' },
  { label: 'Paid In Full', value: 'full' },
  { label: 'Pending ', value: 'pending' },
]

const paymentMethod = [
  { label: 'Credit Line', value: '1' },
  { label: 'Cap1', value: '2' },
  { label: 'Mech', value: '3' },
  { label: 'BOA', value: '4' },
]

class NewPaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},  errors: [], showTable: false,showForm: true,vendors: [], quoters: [],
      newVendor: '', vendor: '' , payment: '', status:'', ordered: 0, delivered: 0, total:0,
      fullBill : [
        {title: 'Subtotal', count: 0},
        {title: 'Shipping', count: 0},
        {title: 'Taxes', count: 0},
      ],
    };
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleBill = (index, val ) => {
    this.setState({
      fullBill: this.state.fullBill.map((node, i) => (
        i === index ? {...node, count: val} : node
      ))
    })
    // Set to total value state
    this.findTotal(this.state.total);
  }

 findTotal = (total) => {
    this.setState({
      total: this.state.fullBill.reduce((sum, i) => (
           sum+= i.count
     ), 0)
   });
 }

 // Handle select handlers
 handleVendor = (vendor) => {this.setState({vendor})};
 handlePayment  = (payment) => {this.setState({payment})};
 handleStatus  = (status) => {this.setState({status})};

 handleOrdered = (ordered) => {this.setState({ordered})};
 handleDelivered = (delivered) => {this.setState({delivered})};

 //Add new agency to the dropdown
 addVendor = (e) => {
   e.preventDefault();
   fetch('api/dropdowns/postAgency', {
     method: 'post',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({ newAgency : this.state.fields.newAgency })
   })
   console.log(this.state.fields.newAgency);
   let fields = {};
   const message = "You have added a new agency: " + this.state.fields.newAgency;
   this.props.confirmation(message);
   fields[e.target.name] = '';
   this.setState({fields});
   this.getVendors();
 };

  handleSubmit = (errors) => {
    fetch('/api/quote/payments/create', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        invoice: this.state.fields.invoice, vendor: this.state.vendor.value,
        ordered: this.state.ordered, delivered: this.state.delivered,
        payment: this.state.payment.label, status: this.state.status.label,
        subtotal: this.state.fullBill[0].count, shipping: this.state.fullBill[1].count,
        taxes: this.state.fullBill[2].count, total: this.state.fullBill.reduce((sum, i) => ( sum+= i.count), 0),
        comments: this.state.fields.comments
      })
    })
    .then(data => {
        console.log(JSON.stringify(data));
        console.log("Data field with then:", data);
    })
    .catch(err => {
      console.error(err);
      console.log(err);
      this.setState({errors:err});
      console.log("What are the errors:", errors);
    })

    let fields = {};
    fields["invoice"] = "";
    fields["quote"] = "";
    fields["comments"] = "";
    this.setState({fields, vendor: '', ordered: '', delivered: '', status: ''});
    const message = "You have added a new payment to invoice: " + this.state.fields.invoice;
    this.props.confirmation(message);
  }

  getVendors = () => {
    fetch('/api/dropdowns/vendors')
    .then(res => res.json())
    .then(res => {
      let tempVendors = res.map(r => ({label: r.vendors, value: r.vendors}));
      this.setState({vendors: tempVendors});
      console.log("vendors", this.state.vendors);
    })
  }

  componentDidMount () {
    this.getVendors();
    console.log('New Payment Form is mounted');
  }

  render() {
    const {vendors, quoters} = this.state;
    return (
      <div>
      {this.state.errors.map(err => (
        <Message color='red'>{err}</Message>
      ))}
      <Popup style={style.popup} position='bottom left' trigger={<Button icon='plus' content='New Vendor'/>} on='click'>
        <Grid divided columns='equal'>
         <Grid.Column>
            <Input fluid placeholder='...' name='newVendor' value={this.state.fields.newVendor} onChange={this.handleInputChange} />
         </Grid.Column>
         <Grid.Column>
            <Button disabled={!this.state.fields.newVendor} onClick={this.addVendor}>Submit</Button>
         </Grid.Column>
        </Grid>
      </Popup>
      <br/>
      <br/>
      <br/>
      <Grid.Row centered>
        <Form style={style.form}>
         <Form.Group>
           <Form.Field required width={5}>
             <label>Invoice</label>
             <Input fluid placeholder='Invoice' name='invoice' value={this.state.fields.invoice} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field width={6}>
             <label>Quote Number</label>
             <Input fluid placeholder='Quote Number' name='quote' value={this.state.quote} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field required width={5}>
             <label>Vendor</label>
             <Select fluid placeholder='Vendor' name='vendor' options={vendors} value={this.vendor} onChange={this.handleVendor}/>
           </Form.Field>
         </Form.Group>

         <Form.Group>
         <Form.Field required width={3}>
           <label>Date Ordered</label>
           <DatePicker selected={this.state.ordered}  onChange={this.handleOrdered}/>
         </Form.Field>
         <Form.Field required width={3}>
           <label>Date Delivered</label>
           <DatePicker selected={this.state.delivered}  onChange={this.handleDelivered} />
         </Form.Field>
         <Form.Field required  width={5}>
           <label>Payment Method</label>
           <Select compact options={paymentMethod} value={this.payment} onChange={this.handlePayment}/>
         </Form.Field>
         <Form.Field required width={5}>
           <label>Status</label>
            <Select compact options={status} value={this.status} onChange={this.handleStatus} />
         </Form.Field>
         </Form.Group>

         <Form.Group>
           <Form.Field width={2}> </Form.Field>
           <BillingStatement fullBill={this.state.fullBill} onChange={this.handleBill}/>
           <Form.Field width={3}>
             <label>Total</label>
             <Input readOnly fluid icon='dollar' iconPosition='left' placeholder='Total' type='number'
             name='quote'
             value={this.state.fullBill.reduce((sum, i) => ( sum+= i.count ), 0)}
             onChange={this.handleTotal}
             />
           </Form.Field>
         </Form.Group>
          <Form.TextArea
              label='Comments' placeholder='Comments' name='comments' value={this.state.fields.comments} onChange={this.handleInputChange}
          />
        </Form>
        </Grid.Row>
        <br/>
        <br/>
        <Grid centered>
        <Button disabled={!this.state.fields.invoice} primary onClick={this.handleSubmit}> <Icon name='arrow up'/> Submit </Button>
        </Grid>
      </div>
    )
  }
}

const BillingStatement = ({fullBill, onChange}) => (
<React.Fragment>
  { fullBill.map((fullBill, i) => (
    <Form.Field required width={3}>
      <label>{fullBill.title}</label>
      <Input
        icon='dollar'
        iconPosition='left'
        fluid placeholder={fullBill.title}
        type='text'
        name={fullBill.title}
        value={fullBill.count}
        onChange={e => onChange(i, parseInt(e.target.value) || 0)}
      />
    </Form.Field>
  ))}
</React.Fragment>
)


const style = {
  form : { left: '10%', height:'80%', width: '80%'},
  button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
  popup: { height: '65px', width: '600px' }
};

export default NewPaymentForm
