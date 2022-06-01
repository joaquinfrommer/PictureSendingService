import { Box, Flex, Heading } from "@chakra-ui/react";
import { Formik } from "formik";
import {
  InputControl,
  PercentComplete,
  SubmitButton,
  SelectControl
} from "formik-chakra-ui";
import * as React from "react";
import * as Yup from "yup";
import "yup-phone";
import axios from 'axios';

const initialValues = {
  firstName: "",
  phone: "",
  select: ""
};
const validationSchema = Yup.object({
  name: Yup.string().required().max(20).matches(/^[aA-zZ\s]+$/, "Only letters allowed"),
  phone: Yup.string().phone("US").matches(/^[0-9]*$/, "Only numbers allowed").required(),
  select: Yup.string().required()
});
const endpoint = 'https://jblcb1xi2a.execute-api.us-east-1.amazonaws.com/prod/'

async function make_request(name, phone, act) {
    const p1 = "+1";
    const format_phone = p1 + phone;
    const body = {"name": name, "phone": format_phone};

    if(act === 'add') {
        try {
            const res = await axios.put(endpoint, body);
            console.log(res);
            alert(`Success! ${name} has been added with the phone # ${phone}.`);
        } catch (e) {
            console.error(e);
            alert("Something went wrong, make sure all info is correct and the user is not already added.");
        }
    }
    else if (act === 'del') {
        try {
            const res = await axios.delete(endpoint, {data: body});
            console.log(res);
            alert(`Sorry to see you go, ${name} at ${phone} has been successfully deleted.`);
        } catch (e) {
            console.error(e);
            alert("Something went wrong, make sure all info is correct and the user exists.");
        }
    }
    else {
        alert("Error, please reload and try again.")
    }
}

const onSubmit = (values, actions) => {
    const user_name = values.name;
    const user_phone = values.phone;
    const user_action = values.select;
    make_request(user_name, user_phone, user_action);
    actions.setSubmitting(false);
    actions.resetForm({});
  };

const Form = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Flex width="full" align="center" justifyContent="center">
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          bg="white"
          maxWidth={800}
          p={6}
          m="10px auto"
          top="50%"
          transform="translateY(50%)"
          as="form"
          onSubmit={handleSubmit}
        >
          <Box textAlign="center">
            <Heading>Dog Sender</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <InputControl name="name" label="Name" m="10px auto"/>
            <InputControl name="phone" label="Phone" m="10px auto"/>
            <SelectControl
                name="select"
                m="10px auto"
                label="Add or Delete"
                selectProps={{ placeholder: "Select Action" }}
            >
                <option value="add">Add User</option>
                <option value="del">Delete User</option>
            </SelectControl>
            <PercentComplete />
            <SubmitButton>Submit</SubmitButton>
          </Box>
        </Box>
        </Flex>
      )}
    </Formik>
  );
};

export default Form;