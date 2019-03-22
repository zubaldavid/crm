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
  { label: 'Boa', value: '4' },
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
      fields: {},
      errors: {},
      showTable: false,
      showForm: true,
      vendors: [],
      quoters: [],
      newAgency: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleAddUser = (e) => {
    e.preventDefault();
    if(this.validateForm()) {
      //let fields = this.state.fields;
      fetch('/api/users', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          newFirst: this.state.newFirst,
          newLast : this.state.newLast,
          newEmail:this.state.newEmail,
          newPassword: this.state.newPassword
        })
      })
      let fields = {};
      fields["newFirst"] = "";
      fields["newLast"] = "";
      fields["newEmail"] = "";
      fields["newPassword"] = "";
      setTimeout(() => {
        this.setState({fields: fields, showComplete:true})
      }, 2500);
      // Prop used to show Users table
      this.props.showTableAgain();
    }
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
    const style = {
        form : { left: '15%', height:'80%', width: '80%'},
        button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
        popup: { height: '65px', width: '600px' }
    };
    return (
      <div>
      <Popup style={style.popup} position='bottom left' trigger={<Button icon='plus' content='New Vendor'/>} on='click'>
        <Grid divided columns='equal'>
         <Grid.Column>
            <Input fluid placeholder='...'
            name='newAgency'
            value={this.state.newAgency}
            onChange={this.handleInputChange}
            />
         </Grid.Column>
         <Grid.Column>
            <Button >Submit</Button>
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
             <label>Vendor</label>
             <Select fluid placeholder='Vendor'
               name='vendor'
               options={vendors}
             />
           </Form.Field>
         </Form.Group>

         <Form.Group>
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
             <Select
             compact
             options={paymentMethod}
             defaultValue= 'Credit Line'/>
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
        <Button primary>
           <Icon name='arrow up'/>
               Submit
           </Button>
        </Grid>
      </div>
    )
  }
}

export default NewPaymentForm
