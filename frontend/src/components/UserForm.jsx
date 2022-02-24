
import {
  MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Formik, Form , Field } from 'formik'

  //TODO: Add name constraints
  function validateName(value) {
    let error;
    if(!value){
      error = 'Required';      
    }
    return error;
  }

  //TODO: Add phone constraints
  function validatePhone(value) {
    let error;
    if(!value){
      error = 'Required';      
    }
    return error;
  }

const FormPage = () => {
return (
  <Formik
  initialValues={{
    name: "",
    phone: "",
  }}
  onSubmit={values => {
    alert('Welcome ' + values.name + ', you will now start receiving pictures at ' + values.phone + '!');
  }}>
    {(props) => (
    <Form>
      <Field as="Name"> 
        {({ field }) => (
          <MDBInput required className='mb-4' id='formControlLg' label='Name' {...field}/>)}
        </Field>
      <MDBInput required className='mb-4'  id='formControlLg' label='Phone Number' />

      <MDBBtn type='submit' block>
        Subscribe
      </MDBBtn>
    </Form>)}
  </Formik>
  );
};

export default FormPage;