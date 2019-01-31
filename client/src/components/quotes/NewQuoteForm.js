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
  { key: 'yellow', text: 'Awarded', value: 'yellow' },
  { key: 'blue', text: 'Dead', value: 'blue' },
  { key: 'orange', text: 'Submitted', value: 'orange' },
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
      errors: {},
      showTable: false,
      showForm: true
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

  handleAddQuote = () => {
    fetch('api/open_q_bids', {
      method: 'post',
      headers: {'Content-Type': 'aplication.json'},
      body: JSON.stringify({user: this.state.firstName})
    })
    .then(res => res.json())
    .then(res => {
      this.setState({});
    });
  };

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
             <label>Quote Number</label>
             <Input fluid placeholder='Quote Number' />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Agency</label>
             <Input fluid placeholder='Agency' />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Point of Contact</label>
             <Input fluid placeholder='Point of Contact' />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={6} >
             <label>Solicitation</label>
             <Input fluid placeholder='Solicitation Number' />
           </Form.Field>
           <Form.Field width={2}>
             <label>Revision</label>
             <Select compact options={revision} defaultValue= '0'/>
           </Form.Field>
           <Form.Field required width={7}>
             <label>Employee</label>
              <Select compact options={employee} defaultValue= ''/>
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required width={5}>
             <label>Received</label>
             <DatePicker
              type='date'
              name='received_date'
              value={this.state.fields.received_date}
              selected={this.state.startDate}
              onChange={this.handleInputChange}
            />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Description</label>
             <Input fluid placeholder='Description' />
           </Form.Field>
           <Form.Field required options={status} width={5}>
             <label>Status</label>
             <Select compact options={status} defaultValue= 'yellow'/>
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field required  width={5}>
             <label>Due Date</label>
             <DatePicker
             type='date'
             name='due_date'
             value={this.state.fields.due_date}
             placeholderText="Click to select a date"
             onChange={this.handleInputChange}
            />
           </Form.Field>
           <Form.Field required width={5}>
             <label>Due Time</label>
             <DatePicker name='due_time' value={this.state.fields.due_time}
               placeholderText="Click to select a time"
              onChange={this.handleInputChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
             />
           </Form.Field>
           <Form.Field width={5}>
             <label>Date Sent</label>
             <DatePicker name='due_date' value={this.state.fields.due_date}
              placeholderText="Click to select a date"
              onChange={this.handleInputChange}
            />
           </Form.Field>
         </Form.Group>

         <Form.Group >
           <Form.Field width={5}>
             <label>Date PO Received</label>
             <DatePicker name='po_receive_date' value={this.state.fields.po_receive_date}
              placeholderText="Click to select a date"
              onChange={this.handleInputChange}
            />
           </Form.Field>
           <Form.Field width={5}>
             <label>PO Number</label>
             <Input fluid placeholder='PO Number' />
           </Form.Field>
           <Form.Field width={5}>
             <label>Comments</label>
             <Input fluid placeholder='Comments' />
           </Form.Field>
         </Form.Group>
        </Form>
        </Grid.Row>
      </div>
    )
  }
}

export default NewQuoteForm
