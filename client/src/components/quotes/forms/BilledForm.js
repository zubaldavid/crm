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
    };
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleDateBilled = (dateBilled) => {this.setState({dateBilled});}
  handleDateDelivered = (dateDelivered) => {this.setState({dateDelivered});}
  handleReceivedDate = (receivedDate) => {this.setState({receivedDate});}

  getSingleBill = (invoice) => {
    let url = ('/api/quote/billed_bids/invoice/?invoice=' + invoice);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({bills:data});
      console.log("All Bills:", this.state.bills);
      this.state.fields.invoice = this.state.bills[0].invoice;
      console.log("Practice Invoice:",this.state.bills[0].invoice );
      console.log("Field Invoice:",this.state.fields.invoice);
      this.state.fields.agency = this.state.bills[0].agency;
      this.state.fields.point_of_contact = this.state.bills[0].point_of_contact;
      this.state.fields.description = this.state.bills[0].description;
      this.state.fields.poNumber = this.state.bills[0].po_number;
      this.state.fields.employee = this.state.bills[0].employee;
      this.state.fields.cost = this.state.bills[0].cost;
      this.handleDateBilled(this.state.bills[0].date_billed);
    });
  }

  componentDidMount () {
     this.getSingleBill(this.props.invoice);
  }

  render () {
    const {dateBilled, value, dateDelivered, receivedDate} = this.state;
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
               <DatePicker type='date' name='received_date' selected={dateBilled} onChange={this.handleDateBilled} />
             </Form.Field>
          </Form.Group>

          <Form.Group>
             {locationFields.map((field) => {
             let value = `this.state.field.${field}`
             return (
             <Form.Field width={5}>
             <label>{field}</label>
             <Input type='text'
              placeholder={field}
              name={field}
              value={value.value}
              onChange={this.handleInputChange}
              /></Form.Field> )})}
          </Form.Group>

          <Form.Group>
             {netEvents.map((field) => {
             let value = `this.state.field.${field}`
             return (
             <Form.Field width={4}>
             <label>{field}</label>
             <Input
             icon='dollar'
             iconPosition='left
             placeholder={field}
             name={field}
             value={value.value}
             onChange={this.handleInputChange}
             /></Form.Field> )})}
          </Form.Group>

          <Form.Group>
             {billing.map((field) => {
             let value = `this.state.field.${field}`
             return (
             <Form.Field width={4}>
             <label>{field}</label>
             <Input
              iconPosition='left
              type='text'
              icon='dollar'
              placeholder={field}
              name={field}
              value={value.value}
              onChange={this.handleInputChange}
              /></Form.Field> )})}
          </Form.Group>

          <Form.Group>
              <Form.Field width={5}>
                <label>Date Delivered</label>
                <DatePicker type='date'
                selected={dateDelivered}
                onChange={this.handleDateDelivered}
              /></Form.Field>
              <Form.Field  width={5}>
                <label>Due Date</label>
                <DatePicker type='date'
                name='received_date'
                selected={dateBilled}
                onChange={this.handleDateBilled}
              /></Form.Field>
              <Form.Field  width={5}>
                <label>Received Date</label>
                <DatePicker type='date'
                selected={receivedDate}
                onChange={this.handleReceivedDate}
              /></Form.Field>
          </Form.Group>

          <Grid.Row centered>
            <Form.Group>
              {final.map((field) => {
              let value = `this.state.field.${field}`
              return (
              <Form.Field width={6}>
              <label>{field}</label>
              <Input type='text'
               icon='dollar'
               iconPosition='left'
               placeholder={field}
               name={field}
               value={value.value}
               onChange={this.handleInputChange}
              /></Form.Field> )})}
            </Form.Group>
          </Grid.Row>
       </Form>
       <br/>
       <Grid centered>
          <Button primary >
             <Icon name='arrow up'/> Submit
          </Button>
      </Grid>
      <pre>{this.state.fields.NFTFreight} - {this.state.fields.Tax_District} - {this.state.fields.Agency} </pre>
    </Grid.Row>
    )
  }
}

export default BilledForm;

BilledForm.propTypes = {
  invoice: PropTypes.string
}

const style = {
    form : { left: '5%', height:'80%', width: '90%'},
}
