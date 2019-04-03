import React, { Component } from 'react';
import {dateFormat} from '../../Formats';
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
} from 'semantic-ui-react'

const statusList = [
  { value: 'none', label: '' },
  { value: 'submitted', label:'Submitted' },
  { value: 'awarded', label: 'Awarded',  },
  { value: 'dead', label: 'Dead' },
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
      agency: this.props.tableAgency, employee: '', poc: '', revision: 0, status: '',
      //Dates
      receivedDate: 0, dueDate: 0,dueTime: 0,dateSent:0,datePO: 0,
      // Misc
      poFields: false, editSelect: false, buttonAction: 'edit'
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
  handlePOC = (poc) => { this.setState({poc});; console.log(poc);}
  handleRevision = (revision) => { this.setState({revision}); console.log(revision);}
  handleStatus = (status) => {
    const newDate = new Date();
    this.setState({status});
    if (status === "submitted") { this.handleDateSent(newDate);}
  }

  handleReceived = (receivedDate) => { this.setState({receivedDate}); console.log(receivedDate);}
  handleDueDate = (dueDate) => { this.setState({dueDate}); console.log(dueDate);}
  handleDueTime = (dueTime) => { this.setState({dueTime}); console.log(dueTime);}
  handleDateSent = (dateSent) => { this.setState({dateSent}); console.log(dateSent);}
  handleDatePO = (datePO) => { this.setState({datePO}); console.log(datePO);}

  submitForm = () => {
    console.log("What is this:", this.state.agency, this.state.poc, this.state.employee );
    console.log(this.state.fields);
    publishLog("David", "Edit quote:" + this.state.fields.quote_number);
    fetch('api/quote/open_bids', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({

      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({});
    });
  };


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
  AddQuote = (e) => {
    fetch('api/quote/open_bids', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          quote: this.state.fields.quote_number,
          

      })
    })
    .then(res => res.json())
    .then(res => {
      this.setState({});
    });
  };

  EditQuote = (id) => {
    let url = ('api/quote/open_bids/edit/?id=' + id);
    fetch(url, {
      method: 'put',
      headers: {'Content-Type': 'aplication/json'},
      body: JSON.stringify({})

    })
    .then(res => res.json())
    .then(res => {
      this.setState({});
    });
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
      this.state.fields.quote_number = this.state.bid[0].quote;
      this.handleAgency(this.state.bid[0].agency);
      this.handlePOC(this.state.bid[0].point_of_contact);
      this.state.fields.solicitation = this.state.bid[0].solicitation;
      this.handleRevision(this.state.bid[0].revision);
      this.handleEmployee(this.state.bid[0].employee);
      this.handleReceived(this.state.bid[0].received_date);
      this.state.fields.description = this.state.bid[0].description;
      this.handleStatus(this.state.bid[0].status);
    //  this.handleDueTime(this.state.bid[0].due_time);
      this.handleDueDate(this.state.bid[0].due_date);
      this.handleDateSent(this.state.bid[0].date_sent);
    });
  };

  getQuoteNumber = () => {
    // Get latest quote - Q18023-01
    fetch('/api/quote/open_bids/quote')
    .then(res => res.json())
    .then(q => {
      var prevJulDay = q[0].quote.slice(3,6); // 034
      // Check if Solictation
      if ( q[0].quote.slice(-1) === "S" ) { var suffix = q[0].quote.slice(7,9);}
      else { suffix = q[0].quote.slice(-2)}
      // Get year
      var currentYear = new Date().getFullYear().toString().substr(-2);
      // Get Julain Date - 035
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      var julDay = ("00" + day).slice(-3);
      //Check if need to increment count
      if (prevJulDay < julDay) { var count  = "01";}
      else { count = ( "00" + suffix + 1).slice(-2);}
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
      let employeeList = res.map(r => ({label: r.first_name, value: r.first_name}));
      this.setState({employees:employeeList});
    })
  }

  chooseButtonAction = () => {
    if (this.props.type  === 'edit') { this.EditQuote(this.props.id);}
    if (this.props.type === 'new')   { this.AddQuote();}
  }

  chooseFormAction = () => {
    if (this.props.type  === 'edit') { this.getSingleBid(this.props.id);}
    if (this.props.type === 'new')   { this.getQuoteNumber(this.state.fields.quote_number);}
  }

  componentDidMount () {
    this.chooseFormAction();
    this.chooseButtonAction();
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
           <Form.Field  width={5}>
             <label>Quote Number</label>
             <Input readOnly name='quote_number' placeholder='Quote Number' value={this.state.fields.quote_number} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Agency</label>
             <Select fluid placeholder='Agency' name='agency' defaultValue={{label:this.props.tableAgency, value:this.props.tableAgency}} options={agencies} value={this.agency}  onChange={this.handleAgency} />
           </Form.Field>
           <Form.Field required width={5}>
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
           <Form.Field required width={7}>
             <label>Employee</label>
              <Select placeholder='' name='employee' options={employees} defaultValue={{label:this.props.tableEmployee, value:this.props.tableEmployee}} value={this.employee} onChange={this.handleEmployee} />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={3}>
             <label>Received</label>
             <DatePicker name= 'receivedDate' type= 'date' selected={this.state.receivedDate} onChange={this.handleReceived} />
           </Form.Field>
           <Form.Field required width={6}>
             <label>Description</label>
             <Input fluid placeholder='Description' name='description' value={this.state.fields.description} onChange={this.handleInputChange} />
           </Form.Field>
           <Form.Field required width={6}>
             <label>Status</label>
             <Select options={statusList} name='status' defaultValue={{label:this.props.tableStatus, value:this.props.tableStatus}} value={this.status} onChange={this.handleStatus} />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={5}>
             <label>Due Date</label>
              <DatePicker selected={this.state.dueDate} onChange={this.handleDueDate} />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Due Time</label>
             <DatePicker selected={this.state.dueTime} onChange={this.handleDueTime} showTimeSelect dateFormat="Pp" />
           </Form.Field>
           <Form.Field width={5}>
             <label>Date Sent</label>
             <DatePicker selected={this.state.dateSent} onChange={this.handleDateSent} />
            </Form.Field>
         </Form.Group>

         { this.state.poFields &&
           <Form.Group >
             <Form.Field width={5}>
               <label>Date PO Received</label>
               <DatePicker selected={this.state.datePO} onChange={this.handleDatePO} />
             </Form.Field>
             <Form.Field width={5}>
               <label>PO Number</label>
               <Input fluid placeholder='PO Number' name='po_number' value={this.state.fields.po_number} onChange={this.handleInputChange} />
             </Form.Field>
             <Form.Field width={5}>
               <label>Comments</label>
               <Input fluid placeholder='Comments' name='comments' value={this.state.fields.comments} onChange={this.handleInputChange} />
             </Form.Field>
           </Form.Group>
        }
        </Form>
        </Grid.Row>
        <br/>
        <br/>
        <Grid centered>
        <Button primary onClick={this.chooseButtonAction}> <Icon name='arrow up'/> Add </Button>
        </Grid>
      </div>
    )
  }
}

const style = {
    form : { left: '15%', height:'80%', width: '80%'},
    button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
    popup: { height: '70px', width: '600px' },
    error : {color: 'red'}
};

NewQuoteForm.propTypes = {
  id: PropTypes.Number,
  type: PropTypes.String,
}
export default NewQuoteForm;
