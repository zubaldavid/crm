import React, { Component } from 'react';
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
      showTable: false,
      showForm: true,
      dateBilled:0,
      dateDelivered:0,
      receivedDate: 0,
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
      this.state.fields.Invoice = this.state.bills[0].invoice;
      console.log('Invoice state', this.state.fields.Invoice);
      this.state.fields.Agency = this.state.bills[0].agency;
      console.log('agency Data',  this.state.bills[0].agency);
      console.log('Invoice state', this.state.fields.Agency);
      this.state.fields.POC = this.state.bills[0].point_of_contact;
      this.state.fields.Description = this.state.bills[0].description;
      this.state.fields.NFTFreight = this.state.bills[0].nft_freight;
    });
  }

  componentDidMount () {
     this.state.fields.invoice = '1206';
     this.getSingleBill(this.props.invoice);
  }

  render () {
    const {dateBilled, value, dateDelivered, receivedDate} = this.state;
    return (
      <Grid.Row centered>
        <Form style={style.form}>
         <Form.Group>
           {disabledFields1.map((field) => {
           let value = `this.state.field.${field}`
           return (
             <Form.Field disabled width={6}>
             <label>{field}</label>
             <Input type='text'
              placeholder={field}
              name={field}
              value={value.value}
              onChange={this.handleInputChange}
            /></Form.Field> )})}
        </Form.Group>

        <Form.Group>
          {disabledFields2.map((field) => {
          let value = `this.state.field.${field}`
          return (
            <Form.Field disabled width={6}>
            <label>{field}</label>
            <Input type='text'
             placeholder={field}
             name={field}
             value={value.value}
             onChange={this.handleInputChange}
           /></Form.Field> )})}

           <Form.Field disabled width={5}>
             <label>Date Billed</label>
             <DatePicker type='date'
             name='received_date'
             selected={dateBilled}
             onChange={this.handleDateBilled}
           /></Form.Field>
        </Form.Group>
        <br/>

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
