import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Divider,
  Select,
  TextArea,
} from "semantic-ui-react";

const shifts = [
  { key: "fulltime", text: "Full Time", value: "Fulltime" },
  { key: "parttime", text: "Part Time", value: "Parttime" },
  { key: "morning", text: "Morning", value: "Morning" },
  { key: "noon", text: "Noon", value: "Noon" },
  { key: "afternoon", text: "Afternoon", value: "Afternoon" },
  { key: "evening", text: "Evening", value: "Evening" },
];

const faith = [
  { key: "christian", text: "Christian", value: "Christian" },
  { key: "catholic", text: "Catholic", value: "Catholic" },
  { key: "lds", text: "LDS", value: "LDS" },
  { key: "unaffiliated", text: "Unaffiliated", value: "Unaffiliated" },
];

const ministry = [
  { key: "interviewing", text: "Interviewing", value: "Interviewing" },
  { key: "truckunloader", text: "Truck Unloader", value: "Truck Unloader" },
  { key: "stocker", text: "Stocker", value: "Stocker" },
  {
    key: "shoppingassistance",
    text: "Shopping Assistance",
    value: "Shopping Assistance",
  },
  {
    key: "donationsorting",
    text: "Donation Sorting",
    value: "Donation Sorting",
  },
];

const optionsGender = [
  { key: "f", text: "Female", value: "Female" },
  { key: "m", text: "Male", value: "Male" },
  { key: "o", text: "Other", value: "Other" },
];

const civilrights = [
  { key: "c", text: "Completed", value: "Completed" },
  { key: "n", text: "Not Completed", value: "Not Completed" },
  { key: "i", text: "In Progress", value: "In Progress" },
];

const VolunteerForm = (props) => {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    dob: "1995-01-01",
    skills:'',
    shifts: null,
    faith: null,
    ministry: null,
    civilrights: null,
  };

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialFieldValues });
    } else {
      setValues({
        ...props.volunteerObjects[props.currentId],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId, props.volunteerObjects]);

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
    props.addOrEditVolunteer(values);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field
          control={Input}
          label="Full Name"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
        />

        {/* SECOND ROW */}

        <Form.Group widths="equal">
          <div class="field">
            <label>Date of Birth</label>

            <input
              name="dob"
              type="date"
              value={values.dob}
              placeholder="12/24/1995"
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

          <Form.Field
            control={Input}
            label="Phone"
            placeholder="Cellphone"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
          />

          <Form.Field
            control={Input}
            label="Email"
            placeholder="john@thebaptist.com"
            name="email"
            value={values.email}
            onChange={handleInputChange}
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

        <Divider section />
        {/* THIRD ROW */}
        <Form.Group>
          <Form.Field
            control={Select}
            name="ministry"
            onChange={handleDropdownChange}
            value={values.ministry}
            label="Preferred Ministry"
            options={ministry}
            placeholder="Ministry"
          />

          <Form.Field
            control={Select}
            name="shifts"
            onChange={handleDropdownChange}
            value={values.shifts}
            label="Preferred Shift"
            options={shifts}
            placeholder="Shifts"
          />

          <Form.Field
            control={Select}
            name="faith"
            onChange={handleDropdownChange}
            value={values.faith}
            label="Personal Faith"
            options={faith}
            placeholder="Faith"
          />

          <Form.Field
            control={Select}
            name="civilrights"
            onChange={handleDropdownChange}
            value={values.civilrights}
            label="Civil Rights Training"
            options={civilrights}
            placeholder="Civil Rights Training"
          />
        </Form.Group>

        <Form.Field
          control={TextArea}
          label="Skills/Notes"
          placeholder="Bilingual, Available only Mondays, Can drive other volunteers, Great at Data Entery"
          name="skills"
          value={values.skills}
          onChange={handleInputChange}
        />

      <Form.Field control={Button} color="blue">
        {props.currentId === "" ? "Save" : "Update"}
      </Form.Field>
      </Form>
    </>
  );
};

export default VolunteerForm;
