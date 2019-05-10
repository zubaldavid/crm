import React from 'react'
import {withFormik,Field} from 'formik'
import Yup from 'yup'
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

const QuoteForm = ({
  values,
  handleSubmit
}) => (
  <Grid.Row centered>
    <Form onSubmit={handleSubmit} style={style.form}>
      <Form.Field>
        <label> Quote Number</label>
        <Input name='quote' placeholder='Quote'  value={values.quote}/>
      </Form.Field>
      <label> Agency</label>
      <Select name='agency' placeholder='Agency' value={values.agency}/>

      <Select name='poc' placeholder='Point of Contact' value={values.poc}/>
      <Button primary> Submit </Button>
    </Form>

     <Form.Group>
       <Form.Field required width={5}>
         <label>Quote Number</label>
         <Input name='quote_number' placeholder='Quote Number'
          value={values.quote}
          
         />
       </Form.Field>
       <Form.Field required width={5}>
         <label>Agency</label>
         <Select fluid name='agency' placeholder='Agency' value={values.agency} />
       </Form.Field>
       <Form.Field required width={5}>
          <label>Point of Contact</label>
            <Select name='point_of_contact' placeholder='Point of Contact' value={values.poc}/>

       </Form.Field>
     </Form.Group>
  </Grid.Row>
)

const FormikApp = withFormik({
  mapPropsToValues(quote, agency) {
    return {
      quote: quote || '',
      agency: agency || '',
    }
  },
  handleSubmit(values){
    console.log(values);
  }
})(QuoteForm)

const style = {
    form : { left: '10%', height:'80%', width: '80%'},
    button:{ flex: 1, flexDirection: 'row', alignItems: 'center'},
    popup: { height: '70px', width: '600px' },
    error : {color: 'red'}
};

export default FormikApp
