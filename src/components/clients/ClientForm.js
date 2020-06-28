import React, { useState, useEffect } from "react";
import { Form, Button, Divider } from "semantic-ui-react";

const ContactForm = (props) => {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    dob: "1965-01-01",
    gender: null,
    householdTotal: 0,
    salvationPresented: "",
    lifeAssistance: "",
    familyList: "",
  };

  const optionsGender = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
    { key: "o", text: "Other", value: "Other" },
  ];

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "") {
      setValues({
        ...initialFieldValues,
      });
    } else {
      setValues({
        ...props.clientObjects[props.currentId],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId, props.clientObjects]);


  // INPUTS
  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // DROPDOWNS
  const handleDropdownChange = (e, result) => {
    const { name, value } = result;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} name="clients" method="POST" data-netlify="true">
        <Form.Input
          fluid
          label="First name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
          placeholder="First Name"
        />

        <Form.Group widths="equal">
          <div class="field">
            <label>Date of Birth</label>

            <input
              name="dob"
              type="date"
              value={values.dob}
              placeholder="12/24/1965"
              onChange={handleInputChange}
            />
          </div>

          <Form.Select
            fluid
            label="Gender"
            name="gender"
            value={values.gender}
            options={optionsGender}
            onChange={handleDropdownChange}
            placeholder="Gender"
          />

          <Form.Input
            fluid
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            placeholder="801-123-4567"
          />

          <Form.Input
            fluid
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            placeholder="john@baptist.com"
          />

          <Form.Input
            fluid
            label="Total Household Size"
            name="householdTotal"
            type="number"
            max={20}
            value={values.householdTotal}
            onChange={handleInputChange}
            placeholder="Total in household"
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            placeholder="9:11 Straight House of Judas Blvd., Damascus"
          />
        </Form.Group>

        <Divider />

        <Form.Group widths="equal">
          <Form.TextArea
            fluid
            label="Family List"
            name="familyList"
            value={values.familyList}
            onChange={handleInputChange}
            placeholder="Ron Clement - 02/29/2018"
          />

          {/* <
          
          FORM FIELDS FOR FUTURE REFACTOR OF DYNAMIC VALUES
          Form.Input fluid 
          label='Dependant Name' 
          name='dependantName'
          value={values.dependantName}
          onChange={handleInputChange}
          placeholder='Dependant Name' />

<div class="field">
        <label>Date of Birth</label>
        
          <input 
          name='dob'
          type="date"
          value={values.dob}
          placeholder="12/24/1965"
          onChange={handleInputChange}
          /> 
        </div> 
        <Button icon='plus' color='teal' /> */}
        </Form.Group>
        <Form.TextArea
          fluid
          label="Church/Salvation Notes"
          name="salvationPresented"
          placeholder="Salvation Presented, attends K2"
          value={values.salvationPresented}
          // value={values.handleDropdownChange}
          onChange={handleInputChange}
        />

        <Form.Group widths="equal">
          <Form.TextArea
            fluid
            label="Life Assistance/Client Notes"
            name="lifeAssistance"
            value={values.lifeAssistance}
            onChange={handleInputChange}
            placeholder="Needs of client"
          />
        </Form.Group>
          {/* <ReactQuill
          theme="snow"
          name='lifeAssistance'
          value={values.lifeAssistance}
          onChange={handleContentChange}
          >
          </ReactQuill> */}

        {/* clients
who is connected to church
- how many in home has food been provided
- plan of salvation presented
- Life Assistance notes
Did get food today?
Optional assistance
enter all in houseold, name & birthdates */}

        <Form.Field control={Button} color="blue">
          {props.currentId === "" ? "Save" : "Update"}
        </Form.Field>
      </Form>
    </>
  );
};

export default ContactForm;
