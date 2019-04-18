import React, { Component } from 'react';
import {dateFormat, numberFormat} from '../../Formats';
import {publishLog} from '../../appLogs';
import {getQuoters} from '../FetchCalls'
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
  Popup,
  TextArea
} from 'semantic-ui-react'

const statusList = [
  { value: 'Submitted', label:'Submitted' },
  { value: 'Awarded', label: 'Awarded',  },
  { value: 'Dead', label: 'Dead' },
]

const revisionList = [
  {  value: '0', label: '0' },
  {  value: '1', label: '1' },
  {  value: '2', label: '2' },
  {  value: '3', label: '3' },
  {  value: '4', label: '4' },
  {  value: '5', label: '5' },
]

class NewQuoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //  Object stores multiple values
      bid: {}, errors: {}, fields: {}, employees: [], agencies: [], pointsOfContact: [],
      // Select option states
      agency: '', employee: '', buyer: '', poc: '', revision: 0, status: '', dueTime: '',
      //Dates
      receivedDate: null , dueDate: null, dateSent: null, datePO: null, expDelivery: null,
      billingTransfer: null, dateOrderPO: null,
      // Misc
      poFields: false, editSelect: false, buttonAction: 'submit'
    };
  }
  // Input field handler
  handleInputChange = (e) => {
    const fields = this.state.fields;
    const value  =  e.target.value;
    fields[e.target.name] = value;
    this.setState({fields});
  }

  // All the select handlers for the quote form
  handleAgency = (agency) => { this.setState({agency}); console.log(agency); }
  handleEmployee = (employee) => { this.setState({employee:employee}); console.log(employee);}
  handleBuyer = (buyer) => { this.setState({buyer});}
  handlePOC = (poc) => { this.setState({poc});; console.log(poc);}
  handleRevision = (revision) => { this.setState({revision}); console.log(revision);}
  handleStatus = (status) => {
    const newDate = new Date();
    this.setState({status});
    if (status.label === "Submitted") { this.handleDateSent(newDate);}
    if (status.label === "Awarded") { this.handleDatePO(newDate);}
  }

  handleReceived = (receivedDate) => { this.setState({receivedDate}); console.log(receivedDate);}
  handleDueDate = (dueDate) => { this.setState({dueDate}); console.log(dueDate);}
  handleDateSent = (dateSent) => { this.setState({dateSent}); console.log(dateSent);}
  handleDatePO = (datePO) => { this.setState({datePO}); console.log(datePO);}
  handleDateOrderPO = (dateOrderPO) => { this.setState({dateOrderPO}); }
  handleExpDelivery = (expDelivery) => { this.setState({expDelivery});}
  handleBillingTransfer = (billingTransfer) => {
    this.setState({billingTransfer});
  }

  //Add new agency to the dropdown
  addAgency = (e) => {
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
  //Add to dropdowns
  addPointOfContact = (e) => {
    e.preventDefault();
    fetch('api/dropdowns/postPOC', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ newPOC : this.state.fields.newPOC })
    })
    let fields = {};
    const message = "You have added a new point of contact: " + this.state.fields.newPOC;
    this.props.confirmation(message);
    fields[e.target.name] = '';
    this.setState({fields});
  };

  // Add a new bid to the database
  addNewQuote = (bodyData) => {
    fetch('api/quote/open_bids/create', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        quote: this.state.fields.quote_number, agency: this.state.agency, poc: this.state.poc,
        solicitation: this.state.fields.solicitation, revision: this.state.revision, employee: this.state.employee,
        received: this.state.received, description: this.state.fields.description, status: this.state.status,
        dueDate: this.state.dueDate, dueTime: this.state.fields.time, dateSent: this.state.dateSent,
        datePO: this.state.datePO, poNumber: this.state.fields.po_number
      })
    }).then(res => res.json())
    .then(response => console.log('Succes:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

    const message = "You have added a new quote: " + this.state.fields.quote_number;
    this.props.confirmation(message);
  };

  editQuote = (id) => {
    let url = ('api/quote/open_bids/edit/');
    fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        invoice: this.state.fields.invoice, quote: this.state.fields.quote_number, agency: this.state.agency, poc: this.state.poc,
        solicitation: this.state.fields.solicitation, revision: this.state.revision, employee: this.state.employee,
        received: this.state.received, description: this.state.fields.description, status: this.state.status,
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

  // Gets a single bid with id
  getSingleBid = (id, agency, dueDate, dueTime, dateSent, employee, poc,
    receivedDate, revision,status) => {
    let url = ('/api/quote/open_bids/id/?id=' + id);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({bid:data});
      console.log("bid details", this.state.bid);
      this.state.fields.invoice = this.state.bid[0].invoice;
      this.state.fields.quote_number = this.state.bid[0].quote;
      this.handleAgency(this.state.bid[0].agency);
      this.handlePOC(this.state.bid[0].point_of_contact);
      this.state.fields.solicitation = this.state.bid[0].solicitation;
      this.handleRevision(this.state.bid[0].revision);
      this.handleEmployee(this.state.bid[0].employee);
      this.handleReceived(this.state.bid[0].received_date);
      this.state.fields.description = this.state.bid[0].description;
      this.handleStatus(this.state.bid[0].status);
      this.state.fields.time = this.state.bid[0].due_time;
      this.handleDueDate(this.state.bid[0].due_date);
      this.handleDateSent(this.state.bid[0].date_sent);
      this.handleDatePO(this.state.bid[0].date_po_received)
      this.state.fields.po_number = this.state.bid[0].po_number;
      this.state.fields.cost = this.state.bid[0].cost;
      this.handleExpDelivery(this.state.bid[0].date_exp_delivery);
      this.handleBillingTransfer(this.state.bid[0].wait_billing);
      this.handleDateOrderPO(this.state.bid[0].date_po_ordered);
      this.state.fields.comments = this.state.bid[0].comments;
    });
  };

  getQuoteNumber = () => {
    // Get latest quote - Q18023-01
    fetch('/api/quote/open_bids/quote')
    .then(res => res.json())
    .then(q => {
      var prevJulDay = q[0].quote.slice(3,6); // 034 -105
      // Check suffix if Solictation
      if ( q[0].quote.slice(-1) === "S" ) { var suffix = q[0].quote.slice(7,9);}
      else { suffix = q[0].quote.slice(-2)} // 11
      // Get year
      var currentYear = new Date().getFullYear().toString().substr(-2); //19
      // Get Julain Date - 035 - 105
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      var julDay = ("00" + day).slice(-3);
      //Check if need to increment count
      if (prevJulDay < julDay) { var count  = "01";}
      else { count = ( "00" + (parseInt(suffix) + parseInt(1))).slice(-2);}
      //Concatenation
      var finalQuoteString = "Q" + currentYear + julDay + "-" + count;
      this.state.fields.quote_number = finalQuoteString;
    });
    // Set received date to current date
    const today = new Date();
    this.handleReceived(today);
  }

  getAgencies = () => {
    fetch('/api/dropdowns/agencies')
    .then(res => res.json())
    .then(res => {
      let agencyList = res.map(r => ({label: r.agency, value: r.agency}));
      this.setState({agencies:agencyList});
      console.log(this.state.agencies);
    })
  }
  getContacts = () => {
    fetch('/api/dropdowns/poc')
    .then(res => res.json())
    .then(res => {
      let contacts = res.map(r => ({label: r.point_of_contact, value: r.point_of_contact}));
      this.setState({pointsOfContact:contacts});
    })
  }
  getQuoters = () => {
    fetch('/api/users/quoters')
    .then(res => res.json())
    .then(res => {
      let employeeList = res.map(r => ({label: r.first_name.toUpperCase(), value: r.first_name.toUpperCase()}));
      this.setState({employees:employeeList});
    })
  }

  chooseFormAction = () => {
    if (this.props.type  === 'edit')  this.getSingleBid(this.props.id);
    if (this.props.type === 'new')    this.getQuoteNumber(this.state.fields.quote_number);
  }

  componentDidMount () {
    this.chooseFormAction();
    this.getAgencies();
    this.getContacts();
    this.getQuoters();
    console.log('Quotes Form mounted');
  }

  render() {
    const {employees, id, agencies, agency, pointsOfContact} = this.state;
    return (
      <div>
      <Popup style={style.popup} position='bottom left' trigger={<Button icon='plus' content='New Agency'/>} on='click'>
        <Grid divided columns='equal'>
         <Grid.Column>
            <Input fluid placeholder='agency'  name='newAgency' value={this.state.fields.newAgency} onChange={this.handleInputChange} />
         </Grid.Column>
         <Grid.Column>
            <Button disabled={!this.state.fields.newAgency} onClick={this.addAgency} >Submit</Button>
         </Grid.Column>
        </Grid>
      </Popup>
      <Popup style={style.popup} position='bottom left' trigger={<Button icon='plus' content='New POC'/>} on='click'>
        <Grid divided columns='equal'>
         <Grid.Column>
            <Input fluid placeholder='contact' name='newPOC' value={this.state.fields.newPOC} onChange={this.handleInputChange} />
         </Grid.Column>
         <Grid.Column>
            <Button disabled={!this.state.fields.newPOC} onClick={this.addPointOfContact}>Submit</Button>
         </Grid.Column>
        </Grid>
      </Popup>
      <br/>
      <br/>
      <br/>
      <Grid.Row centered>
        <Form style={style.form} onSubmit={this.submitForm}>

         <Form.Group>
           <Form.Field disabled={!this.state.datePO} width={2}>
             <label>Invoice</label>
             <Input name='invoice' placeholder='Invoice' value={this.state.fields.invoice} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field  width={3}>
             <label>Quote Number</label>
             <Input readOnly name='quote_number' placeholder='Quote Number' value={this.state.fields.quote_number} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Agency</label>
             <Select fluid placeholder='Agency' name='agency' defaultValue={{label:this.props.tableAgency, value:this.props.tableAgency}} options={agencies} value={this.agency}  onChange={this.handleAgency} />
           </Form.Field>
           <Form.Field required width={6}>
             <label>Point of Contact</label>
             <Select name='point_of_contact' placeholder='Point of Contact' options={pointsOfContact} defaultValue={{label:this.props.tablePOC, value:this.props.tablePOC}} value={this.poc}  onChange={this.handlePOC} />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={6} >
             <label>Solicitation</label>
             <Input placeholder='Solicitation Number' name='solicitation' value={this.state.fields.solicitation} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field width={2}>
             <label>Revision</label>
             <Select compact options={revisionList} defaultValue= '0' name='revision' defaultValue={{label:this.props.tableRev, value:this.props.tableRev}} value={this.state.fields.revision} onChange={this.handleRevision} />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Employee</label>
              <Select placeholder='' name='employee' options={employees} defaultValue={{label:this.props.tableEmployee, value:this.props.tableEmployee}} value={this.employee} onChange={this.handleEmployee} />
           </Form.Field>
           <Form.Field required width={3}>
           <label>Received</label>
           <DatePicker name= 'receivedDate' type= 'date' selected={this.state.receivedDate} onChange={this.handleReceived} />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={7}>
             <label>Description</label>
             <Input fluid placeholder='Description' name='description' value={this.state.fields.description} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field required width={6}>
             <label>Status</label>
             <Select options={statusList} name='status' defaultValue={{label:this.props.tableStatus, value:this.props.tableStatus}} value={this.status} onChange={this.handleStatus} />
           </Form.Field>
           <Form.Field required width={3}>
           <label>Due Date</label>
           <DatePicker selected={this.state.dueDate} onChange={this.handleDueDate} />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={3}>
             <label>Due Time</label>
                <Input fluid placeholder='Time' name='time' value={this.state.fields.time} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field width={3}>
             <label>Date Sent</label>
             <DatePicker selected={this.state.dateSent} onChange={this.handleDateSent} />
            </Form.Field>

          <Form.Field width={3} disabled={!this.state.dateSent}>
            <label>Date PO Received</label>
            <DatePicker selected={this.state.datePO} onChange={this.handleDatePO} />
          </Form.Field>
          <Form.Field width={7} disabled={!this.state.datePO}>
            <label>PO Number</label>
            <Input fluid placeholder='PO Number' name='po_number' value={this.state.fields.po_number} onChange={this.handleInputChange} />
          </Form.Field>
         </Form.Group>

         { this.props.costExtention &&
         <Form.Group>
           <Form.Field required width={4}>
             <label>Buyer</label>
              <Select placeholder='' name='buyer' options={employees} defaultValue={{label:this.props.tableBuyer, value:this.props.tableBuyer}} value={this.buyer} onChange={this.handleBuyer} />
           </Form.Field>
           <Form.Field width={4}>
             <label>Cost</label>
             <Input fluid placeholder='Cost' icon='dollar' iconPosition='left' name='cost' value={numberFormat(this.state.fields.cost)} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field width={3} >
             <label>Date PO Ordered </label>
             <DatePicker selected={this.state.dateOrderPO} onChange={this.handleDateOrderPO} />
           </Form.Field>
           <Form.Field width={3} >
             <label>Date Exp Delivery</label>
             <DatePicker selected={this.state.expDelivery} onChange={this.handleExpDelivery} />
           </Form.Field>
            <Popup inverted style={style.popup} trigger={
               <Form.Field width={4} disabled={!this.state.dateSent}>
                 <label>Date Transfered to Billing</label>
                 <DatePicker selected={this.state.billingTransfer} onChange={this.handleBillingTransfer } />
               </Form.Field>
             } content='Entering a date will remove this quote from the oranges!' />
          </Form.Group>
         }

         { this.props.costExtention &&
           <Form.Field
             control={TextArea}
             label='Comments'
             placeholder='Comments'
             name='comments' value={this.state.fields.comments} onChange={this.handleInputChange}
           />
         }
        </Form>
        </Grid.Row>
        <br/>
        <br/>
        <Grid centered>
        {this.props.type === 'new' ? <Button primary onClick={this.addNewQuote}> <Icon name='arrow up'/> Create </Button> :
          <Button primary onClick={this.editQuote}> <Icon name='arrow up'/> Edit </Button>
        }
        </Grid>
      </div>
    )
  }
}

const style = {
    form : { left: '10%', height:'80%', width: '80%'},
    button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
    popup: { height: '70px', width: '700px' },
    error : {color: 'red'}
};

NewQuoteForm.propTypes = {
  id: PropTypes.Number,
  type: PropTypes.String,
}
export default NewQuoteForm;
