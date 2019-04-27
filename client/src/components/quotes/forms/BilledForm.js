import React, { Component } from 'react';
import {dateFormat, numberFormat} from '../../Formats';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Popup,
} from 'semantic-ui-react'

const disabledFields1 = [ 'Invoice', 'Agency', 'POC', 'Description',]
const disabledFields2 = ['Buyer', 'Employee', 'Cost']
const locationFields = ['Zip_Code', 'Tax_District', 'Delivery_City', 'Tracking_Number' ]
const netEvents = ['NFTFreight', 'NTOther', 'NTLabor', 'NTResell', 'NTFederal', 'NTLumber' ]
const billing = ['Taxable','Subtotal','Sales_Tax', 'Total']
const final = ['Received_Amount', 'Balance']

class BilledForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      bills: {},
      showTable: false,showForm: true,
      dateBilled: null, dateDelivered: null, receivedDate: null,
      receivedAmount:0, balance: 0, profit: 0, error:false,
      ntEvents : [
        {title: 'NFTFreight', count: 0.0},
        {title: 'NTOther', count: 0.0},
        {title: 'NTLabor', count: 0.0},
        {title: 'NTResell', count:0.0},
        {title: 'NTFederal', count: 0.0},
        {title: 'NTLumber', count: 0.0},
        {title: 'Taxable', count: 0.0},
        {title: 'SalesTax', count: 0.0},
      ],
    };
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleBalance = () => {
    // let fields = this.state.fields;
    // fields[e.target.name] = e.target.value;
    // this.setState({fields});
    this.setState({balance: parseFloat(this.state.fields.receivedAmount - parseFloat(this.state.ntEvents.reduce((sum, i) => (sum+= i.count ), 0.0))).toFixed(2) });
    console.log("Balance:",this.state.balance);
    this.setState({profit: parseFloat(this.state.fields.receivedAmount - this.state.fields.cost).toFixed(2) });
    console.log("Profit:",this.state.profit);
    this.setState({margin: parseFloat(Math.abs(this.state.profit) / this.state.fields.receivedAmount * 100).toFixed(2) });
    console.log("Margin:",this.state.margin);
    if( this.state.balance < 0)  {
      console.log("What is the state of the balance:", this.state.balance);
      console.log("What is the state of the rec amount:", this.state.fields.receivedAmount);
      this.setState({error: true});
      console.log("What is the state of the error:", this.state.error);
    }

  }

  handleNetEvents = (index, val ) => {
    this.setState({
      ntEvents: this.state.ntEvents.map((node, i) => (
        i === index ? {...node, count: parseFloat(val)} : node
      ))
    })
    console.log("what is the index:", index);
    console.log("what is the val:", val);
    this.setState({balance: parseFloat(this.state.fields.receivedAmount - this.state.ntEvents.reduce((sum, i) => (sum+= i.count ), 0.0)).toFixed(2) });
    console.log("Balance:",this.state.balance);
    this.setState({profit: parseFloat(this.state.fields.receivedAmount - this.state.fields.cost).toFixed(2) });
    console.log("Profit:",this.state.profit);
    this.setState({margin: parseFloat(Math.abs(this.state.profit) / this.state.fields.receivedAmount * 100).toFixed(2) });
    console.log("Margin:",this.state.margin);
  }

  handleDateBilled = (dateBilled) => {this.setState({dateBilled});}
  handleDateDelivered = (dateDelivered) => {this.setState({dateDelivered});}
  handleReceivedDate = (receivedDate) => {this.setState({receivedDate});}

  editBill = () => {
    let url = ('api/quote/open_bids/edit/');
    fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

        dueDate: this.state.dueDate, dueTime: this.state.fields.time, dateSent: this.state.dateSent,
        datePO: this.state.datePO, poNumber: this.state.fields.po_number, buyer: this.state.buyer,
        orderPO: this.state.dateOrderPO, cost: this.state.fields.cost, expDelivery: this.state.expDelivery,
        transferToBill: this.state.billingTransfer, comments: this.state.fields.comments
      })
    })
    const message = "You have modified quote: " + this.state.fields.quote_number;
    this.props.confirmation(message);
    this.props.updateBidsTable(1);
  };

  getSingleBill = (invoice) => {
    let url = ('/api/quote/billed_bids/invoice/?invoice=' + invoice);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({bills:data});
      console.log("All Bills:", this.state.bills);
      this.state.fields.invoice = this.state.bills[0].invoice;
      this.state.fields.agency = this.state.bills[0].agency;
      this.state.fields.point_of_contact = this.state.bills[0].point_of_contact;
      this.state.fields.description = this.state.bills[0].description;
      this.state.fields.poNumber = this.state.bills[0].po_number;
      this.state.fields.employee = this.state.bills[0].employee;
      this.state.fields.cost = this.state.bills[0].cost;
      this.state.fields.taxDistrict = this.state.bills[0].tax_district;
      this.state.fields.taxRate = this.state.bills[0].tax_rate;
    //  Bill Edit
      this.state.ntEvents[0].count = this.state.bills[0].nft_freight.slice(1);
      this.state.ntEvents[1].count = this.state.bills[0].nt_other.slice(1);
      this.state.ntEvents[2].count = this.state.bills[0].nt_labor.slice(1);
      this.state.ntEvents[3].count = this.state.bills[0].nt_resell.slice(1);
      this.state.ntEvents[4].count = this.state.bills[0].nt_federal.slice(1);
      this.state.ntEvents[5].count = this.state.bills[0].nt_lumber.slice(1);
      this.state.ntEvents[6].count = parseFloat(this.state.bills[0].taxable.slice(1));
      this.state.ntEvents[7].count = parseFloat(this.state.bills[0].sales_tax.slice(1));
      console.log("NtEvents", this.state.ntEvents);
      this.state.fields.zipCode = this.state.bills[0].zipcode;
      this.state.fields.deliveryCity = this.state.bills[0].delivery_city;
      this.state.fields.trackingNum = this.state.bills[0].tracking_number;
      this.state.fields.receivedAmount = this.state.bills[0].received_amount.slice(1);
    //  this.state.balance = this.state.bills[0].bill_balance.slice(1);
      this.handleDateBilled(this.state.bills[0].date_billed);
    });
  }

  componentDidMount () {
     this.getSingleBill(this.props.invoice);
     this.handleBalance();
  }

  render () {
    const {ntEvents, dateBilled, value, dateDelivered, receivedDate} = this.state;
    return (
      <Grid.Row centered>
          <Form style={style.form} onSubmit={this.submitForm}>

           <Form.Group>
             <Form.Field disabled width={2}>
               <label>Invoice</label>
               <Input  name='invoice' placeholder='Invoice' value={this.state.fields.invoice} onChange={this.handleInputChange} />
             </Form.Field>
             <Form.Field disabled width={5}>
               <label>Agency</label>
               <Input  fluid placeholder='Agency' name='agency'  value={this.state.fields.agency}  onChange={this.handleInputChange} />
             </Form.Field>
             <Form.Field disabled width={6}>
               <label>Point of Contact</label>
               <Input name='point_of_contact' placeholder='Point of Contact' value={this.state.fields.point_of_contact}  onChange={this.handleInputChange} />
             </Form.Field>
             <Form.Field disabled width={7}>
               <label>Description</label>
               <Input readOnly fluid placeholder='Description' name='description' value={this.state.fields.description} onChange={this.handleInputChange} />
             </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field disabled width={5}>
              <label>PO Number</label>
              <Input readOnly name='poNumber' placeholder='PO Number' value={this.state.fields.poNumber} onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field disabled width={5}>
              <label>Employee</label>
              <Input readOnly fluid placeholder='Agency' name='employee'  value={this.state.fields.employee}  onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field disabled required width={6}>
              <label>Cost</label>
              <Input readOnly  icon='dollar' iconPosition='left' name='cost' placeholder='Point of Contact' value={numberFormat(this.state.fields.cost)} onChange={this.handleInputChange} />
            </Form.Field>
             <Form.Field readOnly width={5}>
               <label>Date Billed</label>
               <DatePicker name='received_date' selected={dateBilled} onChange={this.handleDateBilled} />
             </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field  width={3}>
              <label>Zip Code</label>
              <Input name='zipCode' placeholder='Zip code' value={this.state.fields.zipCode} onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field  width={4}>
              <label>Tax District</label>
              <Input fluid placeholder='Tax District' name='taxDistrict'  value={this.state.fields.taxDistrict}  onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field width={3}>
              <label>Tax Rate</label>
              <Input icon='percent' iconPosition='right' placeholder='Tax Rate' name='taxRate' value={this.state.fields.taxRate} />
            </Form.Field>
            <Form.Field  required width={6}>
              <label>Delivery City</label>
              <Input name='deliveryCity' placeholder='Delivery City' value={this.state.fields.deliveryCity} onChange={this.handleInputChange} />
            </Form.Field>
            <Form.Field required width={6}>
              <label>Tracking Number</label>
              <Input name='trackingNum' placeholder='Tracking Number' value={this.state.fields.trackingNum} onChange={this.handleInputChange} />
            </Form.Field>
          </Form.Group>

          <Form.Group>
             <NetEvents ntEvents={this.state.ntEvents} onChange={this.handleNetEvents}/>
          </Form.Group>

          <Form.Group>
            <Form.Field width={3}>
             <label>Subtotal</label>
             <Input readOnly icon='dollar' iconPosition='left' placeholder='Subtotal' name='subTotal' value={parseFloat(this.state.ntEvents.slice(0,7).reduce((sum, i) => (sum+= i.count ), 0.0)).toFixed(2)} />
            </Form.Field>
            <Form.Field required width={3}>
             <label>Sales Tax</label>
             <Input icon='dollar' iconPosition='left' placeholder='Sales Tax' type='number' pattern='[0-9]+([\.][0-9]+)?' name='salesTax' value={this.state.ntEvents[7].count } onChange={e => this.handleNetEvents(7, parseFloat(e.target.value) || 0.0)}/>
            </Form.Field>
            <Form.Field width={5}>
             <label>Total Bill</label>
             <Input icon='dollar' iconPosition='left' placeholder='Total Bill' name='totalBill' value={parseFloat(this.state.ntEvents.reduce((sum, i) => (sum+= i.count ), 0.0)).toFixed(2)} onChange={this.handleBalance} />
            </Form.Field>
            <Form.Field  width={3}>
              <label>Due Date</label>
              <DatePicker selected={dateBilled} onChange={this.handleDateBilled}/></Form.Field>
            <Form.Field required width={3}>
              <label>Date Delivered</label>
              <DatePicker selected={dateDelivered} onChange={this.handleDateDelivered}/></Form.Field>
            <Form.Field required width={3}>
              <label> $ Received Date</label>
              <DatePicker selected={receivedDate} onChange={this.handleReceivedDate}/></Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field required width={5}>
              <label>Received Amount</label>
              <Input icon='dollar' iconPosition='left' placeholder='Received' name='receivedAmount' value={this.state.fields.receivedAmount} onChange={this.handleBalance}/>
            </Form.Field>
            <Form.Field error={this.state.error} width={5}>
              <label>Balance</label>
              <Input readOnly icon='dollar' iconPosition='left' placeholder='Balance' name='salesTax' value={this.state.balance}/>
            </Form.Field>
            <Form.Field width={5}>
              <label>Profit</label>
              <Input readOnly icon='dollar' iconPosition='left' placeholder='Received' name='receivedAmount' value={this.state.profit} onChange={this.handleBalance}/>
            </Form.Field>
            <Form.Field width={3}>
              <label>Profit Margin</label>
              <Input readOnly icon='percent' iconPosition='right' placeholder='Profit' name='profit' value={this.state.margin} />
            </Form.Field>
          </Form.Group>
       </Form>
       <br/>
       <br/>
       <Grid centered>
          <Button primary >
             <Icon name='arrow up'/> Submit
          </Button>
      </Grid>
    </Grid.Row>
    )
  }
}

const NetEvents = ({ntEvents, onChange}) => (
<React.Fragment>

  { ntEvents.slice(0,7).map((net, i) => (
    <Form.Field required width={3}>
      <label>{net.title}</label>
      <Input
        icon='dollar'
        iconPosition='left'
        type='number'
        pattern='[0-9]+([\.][0-9]+)?'
        fluid placeholder={net.title}
        name={net.title}
        value={parseFloat(net.count)}
        onChange={e => onChange(i, parseFloat(e.target.value).toFixed(2) || 0.00)}
      />
    </Form.Field>
  ))}
</React.Fragment>
)

BilledForm.propTypes = {
  invoice: PropTypes.string
}

const style = {
    form : { left: '5%', height:'80%', width: '90%'},
}

export default BilledForm;
