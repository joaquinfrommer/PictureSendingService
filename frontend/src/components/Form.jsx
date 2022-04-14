import React, { useState } from "react";
import { Formik, Form , Field, FormikHelpers } from 'formik'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, } from '@chakra-ui/react'

const SignUpForm = () => {
  
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
    
  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
      }}
      onSubmit={(values, actions) => {
        alert('Welcome ' + values.name + ', you will now start receiving pictures at ' + values.phone + '!');
        actions.setSubmitting(false);
      }}>
        {(props) => (
          <Form>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
              <FormControl isRequired isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" placeholder='Name'/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>)}
            </Field>
            <Field name='phone' validate={validatePhone}>
              {({ field, form }) => (
              <FormControl isRequired>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input {...field} id="phone" placeholder='(xxx)-xxx-xxxx'/>
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              </FormControl>)}
            </Field>
            <Button
            mt={4}
            colorScheme='blue'
            type='submit'
            isLoading={props.isSubmitting}
            >
              Submit
            </Button>
          </Form>)}
    </Formik>
  );
  }

  export default SignUpForm;