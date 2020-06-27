import React, { useState, useEffect } from "react";
import VendorForm from "./VendorForm";
import { database } from "../../firebase";
import { Card, Button, Icon, Divider, Header } from "semantic-ui-react";

const VendorDetail = ({ match }) => {
  // function controller for fireDB
  var [vendorObjects, setVendorObjects] = useState({});
  // function controller for CRUD
  var [currentId, setCurrentId] = useState(match.params.id);

  // Firedb
  useEffect(() => {
    database.child("vendors").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setVendorObjects({
          ...snapshot.val(),
        });
      else setVendorObjects({});
    });
  }, []); // similar to component did mount

  const addOrEditVendor = (obj) => {
    if (match.params.id === "") {
      //save
      database.child("vendors").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
        window.location.href = "/vendor";
      });
    } else {
      //editing
      database.child(`vendors/${match.params.id}`).set(obj, (err) => {
        if (err) console.log(err);
        // setCurrentId(match.params.id)
        else toggleEdit();
        alert("Vendor Updated");
        //setCurrentId('')
      });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("are you are you want to delete vendor?")) {
      database.child(`vendors/${match.params.id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
        window.location.href = "/vendor";
      });
    }
  };

  const [editing, setEditing] = useState(false);
  console.log(`Editing Status: ${editing}`);
  const toggleEdit = () => setEditing(!editing);

  const vendor = vendorObjects[match.params.id];

  if (!vendor) return null;

  return (
    <>
      {editing ? (
        <VendorForm
          {...{ currentId, vendorObjects, addOrEditVendor }}
        />
      ) : (
        <>
          <Card fluid color="teal">
            <Card.Content>
              {/* <Image
                size="tiny"
                floated="left"
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={true}
              /> */}
              <Header as="h1">{vendor.fullName}</Header>
              <Divider />
             
              <Icon name="calendar" />
              Date of Birth: {vendor.dob} <br />
              <Icon name="user" />
              Gender: {vendor.gender} <br />
              <Icon name="mail" />
              Email: {vendor.email} <br />
              <Icon name="phone" />
              {vendor.mobile} <br />
              <Divider />
 
            </Card.Content>
          </Card>

          <Button href="/vendor" color="blue">
            Back
          </Button>

          <Button onClick={toggleEdit} color="yellow">
            Edit
          </Button>

          <Button
            onClick={() => {
              onDelete(vendor.id);
            }}
            color="red"
          >
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default VendorDetail;
