import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Form,
  Grid,
  Input,
  Popup,
  Select
} from 'semantic-ui-react'

const status = [
  { key: 'none', text: ' ', value: 'none' },
  { key: 'deposit', text: 'Deposit', value: 'deposit' },
  { key: 'full', text: 'Paid In Full', value: 'full' },
  { key: 'pending', text: 'Pending ', value: 'pending' },
]

const paymentMethod = [
  { key: '0', text: '', value: '0' },
  { key: '1', text: 'Credit Line', value: '1' },
  { key: '2', text: 'Cap1', value: '2' },
  { key: '3', text: 'Mech', value: '3' },
  { key: '4', text: 'Boa', value: '4' },
]

const employee = [
  { key: 'none', text: '', value: 'none' },
  { key: '2', text: 'Sergio', value: 'sergio' },
  { key: '3', text: 'Tiffany', value: 'tiffany' },
  { key: '4', text: 'Nadia', value: 'nadia' },
  { key: '5', text: 'Aaron', value: 'aaron' },
]

function getQuoteNumber () {
  var today = new Date();
  var julday = Math.Floor((today.valueOf() / (1000 * 60 * 60 * 24)) - 0.5) + 2440588;
  return julday;
  console.log("today:" + today);
}

class NewPaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      fields: {},
      errors: {},
      showTable: false,
      showForm: true,
      vendors: [],

    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
      console.log('Add New Quote did mount.');
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  getVendorsList = () => {
    fetch('/api/miscel')
    .then(res => res.json())
    .then(data => {
      this.setState({vendors:data});
      console.log("state", this.state.vendors)
    })
  }

  render() {
    const style = {
        form : { left: '15%', height:'80%', width: '80%'},
        button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
        popup: { height: '65px', width: '600px' }
    };
    return (
      <div>
      <Button onClick={this.getQuoteNumber}>Get Julian</Button>
      <Popup style={style.popup} position='bottom left' trigger={<Button icon='plus' content='New Agency'/>} on='click'>
        <Grid divided columns='equal'>
         <Grid.Column>
            <Input fluid placeholder='...'/>
         </Grid.Column>
         <Grid.Column>
            <Button>Submit</Button>
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
             <Input fluid placeholder='Invoice' />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Quote Number</label>
             <Input fluid placeholder='Quote Number' />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Agency</label>
             <Input fluid placeholder='Agency' />
           </Form.Field>
         </Form.Group>

         <Form.Group>
         <Form.Field required width={7}>
           <label>Employee</label>
            <Select compact options={employee} defaultValue= ''/>
         </Form.Field>
         <Form.Field required width={5}>
           <label>Date Ordered</label>
           <DatePicker
            type='date'
            name='received_date'
            value={this.state.fields.received_date}
            selected={this.state.startDate}
            onChange={this.handleInputChange}
          />
         </Form.Field>
         <Form.Field required width={5}>
           <label>Date Delivered</label>
           <DatePicker
            type='date'
            name='received_date'
            value={this.state.fields.received_date}
            selected={this.state.startDate}
            onChange={this.handleInputChange}
          />
         </Form.Field>
         </Form.Group>

         <Form.Group>
           <Form.Field required width={3}>
             <label>Sub Total</label>
             <Input fluid placeholder='Description' />
           </Form.Field>
           <Form.Field required options={status} width={3}>
             <label>Shipping</label>
             <Input fluid placeholder='Shipping' />
           </Form.Field>
           <Form.Field required width={3}>
             <label>Taxes</label>
             <Input fluid placeholder='Taxes' />
           </Form.Field>
           <Form.Field required width={3}>
             <label>Total</label>
             <Input fluid placeholder='Total' />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required  width={5}>
             <label>Payment Method</label>
             <Select compact options={paymentMethod} defaultValue= 'Credit Line'/>
           </Form.Field>
           <Form.Field width={5}>
             <label>Status</label>
              <Select compact options={status} defaultValue= 'Pending'/>
           </Form.Field>
         </Form.Group>
        </Form>
        </Grid.Row>
      </div>
    )
  }
}

export default NewPaymentForm
