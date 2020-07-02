import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Divider,
  TextArea,
} from "semantic-ui-react";



const VendorForm = (props) => {
  const initialFieldValues = {
    companyName: "",
    repName: "",
    mobile: "",
    email: "",
    notes:'',
    services:''
  };

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialFieldValues });
    } else {
      setValues({
        ...props.vendorObjects[props.currentId],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId, props.vendorObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEditVendor(values);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field
          control={Input}
          label="Company Name"
          placeholder="Company Name"
          name="companyName"
          value={values.companyName}
          onChange={handleInputChange}
        />

        {/* SECOND ROW */}

        <Form.Group widths="equal">

        <Form.Field
          control={Input}
          label="Rep Name"
          placeholder="Rep Name"
          name="repName"
          value={values.repName}
          onChange={handleInputChange}
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

        <Divider section />
        {/* THIRD ROW */}

        <Form.Field
          control={TextArea}
          label="Services provided"
          placeholder="Vendor provides maintence"
          name="services"
          value={values.services}
          onChange={handleInputChange}
        />

        <Form.Field
          control={TextArea}
          label="Notes"
          placeholder="Vendor Needs"
          name="notes"
          value={values.notes}
          onChange={handleInputChange}
        />

      <Form.Field control={Button} color="orange">
        {props.currentId === "" ? "Save" : "Update"}
      </Form.Field>
      </Form>
    </>
  );
};

export default VendorForm;
