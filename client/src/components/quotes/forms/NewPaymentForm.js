import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Popup,
} from 'semantic-ui-react'

const status = [
  { label: ' ', value: 'none' },
  { label: 'Deposit', value: 'deposit' },
  { label: 'Paid In Full', value: 'full' },
  { label: 'Pending ', value: 'pending' },
]

const paymentMethod = [
  { label: '', value: '0' },
  { label: 'Credit Line', value: '1' },
  { label: 'Cap1', value: '2' },
  { label: 'Mech', value: '3' },
  { label: 'BOA', value: '4' },
]


class NewPaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},  errors: {}, showTable: false,showForm: true,vendors: [], quoters: [],
      newVendor: '', vendor: '' , payment: '', status:'',
      received: 0, delivered: 0, total:0,
    };
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
    const add = 0;
    add += this.state.fields.subtotal;
    add += this.state.fields.shipping;
    add += this.state.fields.taxes;
    this.setState({total:add});
  }

 // Handle select handlers
 handleVendor = (vendor) => {this.setState({vendor})};
 handleReceived = () => ({});
 handleDelivered = () => ({});

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
 };

  handleAddUser = (e) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

      })
    })
  }

  postNewVendor = (e) => {
    fetch('/api/dropdowns/vendors', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        newAgency: this.state.newAgency,
      })
    })
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
      <Popup style={style.popup} position='bottom left' trigger={<Button icon='plus' content='New Vendor'/>} on='click'>
        <Grid divided columns='equal'>
         <Grid.Column>
            <Input fluid placeholder='...' name='newVendor' value={this.state.newVendor} onChange={this.handleInputChange} />
         </Grid.Column>
         <Grid.Column>
            <Button disabled={!this.state.newVendor} onClick={this.addVendor}>Submit</Button>
         </Grid.Column>
        </Grid>
      </Popup>
      <br/>
      <br/>
      <Grid.Row centered>
        <Form style={style.form}>
         <Form.Group>
           <Form.Field required width={5}>
             <label>Invoice</label>
             <Input fluid placeholder='Invoice' name='invoice' value={this.state.fields.invoice} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field required width={5}>
             <label>Quote Number</label>
             <Input fluid placeholder='Quote Number' name='quote' value={this.state.quote} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field required width={5}>
             <label>Vendor</label>
             <Select fluid placeholder='Vendor' name='vendor' options={vendors} />
           </Form.Field>
         </Form.Group>

         <Form.Group>
         <Form.Field width={3}> </Form.Field>
         <Form.Field required width={5}>
           <label>Date Ordered</label>
           <DatePicker selected={this.state.received_date}  onChange={this.handleReceived}/>
         </Form.Field>
         <Form.Field required width={5}>
           <label>Date Delivered</label>
           <DatePicker selected={this.state.date_delivered}  onChange={this.handleDelivered} />
         </Form.Field>
         </Form.Group>

         <Form.Group>
         <Form.Field width={2}> </Form.Field>
           <Form.Field required width={3}>
             <label>SubTotal</label>
             <Input fluid placeholder='Subtotal' type='number' name='subtotal' value={this.state.fields.subtotal} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field required options={status} width={3}>
             <label>Shipping</label>
             <Input fluid placeholder='Shipping' type='number' name='shipping' value={this.state.fields.shipping} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field required width={3}>
             <label>Taxes</label>
             <Input fluid placeholder='Taxes' type='number' name='taxes' value={this.state.fields.taxes} onChange={this.handleInputChange}/>
           </Form.Field>
           <Form.Field  required width={3}>
             <label>Total</label>
             <Input readOnly fluid placeholder='Total' type='number' name='quote' value={this.state.total} onChange={this.handleTotal}/>
           </Form.Field>
         </Form.Group>

         <Form.Group >
          <Form.Field width={3}> </Form.Field>
           <Form.Field required  width={5}>
             <label>Payment Method</label>
             <Select compact options={paymentMethod} defaultValue={{label:'Credt Line' , value:'Credt Line'}}/>
           </Form.Field>
           <Form.Field width={5}>
             <label>Status</label>
              <Select
              compact
              options={status}
              defaultValue= 'Pending'/>
           </Form.Field>
         </Form.Group>
        </Form>
        </Grid.Row>
        <br/>
        <br/>
        <Grid centered>
        <Button primary> <Icon name='arrow up'/> Submit </Button>
        </Grid>
      </div>
    )
  }
}

const style = {
  form : { left: '10%', height:'80%', width: '80%'},
  button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
  popup: { height: '65px', width: '600px' }
};

export default NewPaymentForm
