import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Icon,
  Input,
  Popup,
  Select
} from 'semantic-ui-react'

const status = [
  { key: 'none', text: ' ', value: 'none' },
  { key: 'yellow', text: 'Submitted', value: 'yellow' },
  { key: 'blue', text: 'Awarded', value: 'blue' },
  { key: 'orange', text: 'Dead', value: 'orange' },
]

const revision = [
  { key: '0', text: '0', value: '0' },
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
  { key: '3', text: '3', value: '3' },
  { key: '4', text: '4', value: '5' },
  { key: '5', text: '5', value: '5' },
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

class NewQuoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      fields: {},
      dates: {},
      errors: {},
      quoters: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getQuoters = this.getQuoters.bind(this);
  }

  handleInputChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  handleChange = (date, e) => {
    let dates = this.state.fields;
    dates[e.target.name] = date;
    this.setState({dates});
  }

  handleAddQuote = () => {
    fetch('api/open_q_bids', {
      method: 'post',
      headers: {'Content-Type': 'aplication.json'},
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(res => {
      this.setState({});
    });
  };

  getQuoters = () => {
    fetch('/api/users')
    .then(res => res.json())
    .then(res => {
      var quoters = res.map(r => r.first_name);
      this.setState({quoters});
      console.log("quoters", this.state.quoters)
    })
  }

  componentDidMount () {
    this.getQuoters();
    console.log('New Quote Form mounted');
  }

  render() {
    const {quoters} = this.state;
    const style = {
        form : { left: '15%', height:'80%', width: '80%'},
        button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
        popup: { height: '65px', width: '600px' }
    };
    return (
      <div>
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
             <label>Quote Number</label>
             <Input fluid placeholder='Quote Number'
              name='quote_number'
              value={this.state.fields.quote_number}
              onChange={this.handleInputChange}
             />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Agency</label>
             <Input fluid placeholder='Agency'
             name='agency'
             value={this.state.fields.agency}
             onChange={this.handleInputChange}
             />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Point of Contact</label>
             <Input fluid placeholder='Point of Contact'
             name='point_of_contact'
             value={this.state.fields.point_of_contact}
             onChange={this.handleInputChange}
             />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={6} >
             <label>Solicitation</label>
             <Input fluid placeholder='Solicitation Number'
               name='solicitation'
               value={this.state.fields.solicitation}
               onChange={this.handleInputChange}
             />
           </Form.Field>
           <Form.Field width={2}>
             <label>Revision</label>
             <Select compact options={revision} defaultValue= '0'
             name='revision'
             value={this.state.fields.revison}
             onChange={this.handleInputChange}
             />
           </Form.Field>
           <Form.Field required width={7}>
             <label>Employee</label>
             <Select options={quoters}
             name='employee'
             value={this.state.fields.employee}
             onChange={this.handleInputChange}
             />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={5}>
             <label>Received</label>
             <DatePicker
              type='date'
              name='received_date'
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Description</label>
             <Input fluid placeholder='Description'
               name='description'
               value={this.state.fields.description}
               onChange={this.handleInputChange}
             />
           </Form.Field>
           <Form.Field required options={status} width={5}>
             <label>Status</label>
             <Select compact options={status} defaultValue= ' '
               name='status'
               value={this.state.fields.status}
               onChange={this.handleInputChange}
             />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={5}>
             <label>Due Date</label>
             <DatePicker
             placeholderText="Click to select a date"
             name='due_date'
             selected={this.state.dates.due_date}
             onChange={this.handleChange}
            />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Due Time</label>
             <DatePicker
              placeholderText="Click to select a time"
              name='due_time'
              selected={this.state.dates.due_time}
              onChange={this.handleChange}
              date={this.state.date}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="h:mm aa"
              timeCaption="Time"
             />
           </Form.Field>
           <Form.Field width={5}>
             <label>Date Sent</label>
             <DatePicker
              placeholderText="Click to select a date"
              name='due_date'
              value={this.state.dates.due_date}
              onChange={this.handleChange}
            />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field width={5}>
             <label>Date PO Received</label>
             <DatePicker
             placeholderText="Click to select a date"
             name='po_receive_date'
             selected={this.state.dates.po_receive_date}
             onChange={this.handleChange}
            />
           </Form.Field>
           <Form.Field width={5}>
             <label>PO Number</label>
             <Input fluid placeholder='PO Number'
             name='po_number'
             value={this.state.fields.po_number}
             onChange={this.handleInputChange}
             />
           </Form.Field>
           <Form.Field width={5}>
             <label>Comments</label>
             <Input fluid placeholder='Comments'
             name='comments'
             value={this.state.fields.comments}
             onChange={this.handleInputChange}
             />
           </Form.Field>
         </Form.Group>
        </Form>
        </Grid.Row>
        <br/>
        <br/>
        <Grid centered>
        <Button primary >
           <Icon name='arrow up'/>
               Submit
           </Button>
        </Grid>
      </div>
    )
  }
}

export default NewQuoteForm
