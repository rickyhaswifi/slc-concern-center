import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import VendorDetail from "./VendorDetail";
import { Button, Divider, Input, Segment, Table } from "semantic-ui-react";

const Vendors = () => {
  // function controller for fireDB
  var [vendorObjects, setVendorObjects] = useState({});

  // function controller for CRUD
  var [currentId, setCurrentId] = useState("");

  // search logic
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = Object.keys(vendorObjects).filter(
      (id) =>
      vendorObjects[id].fullName.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [vendorObjects, searchTerm]);

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

  const addOrEdit = (obj) => {
    if (currentId === "") {
      //save
      database.child("vendors").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      //editing
      database.child(`vendors/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <h1>Concern Center Vendors</h1>

      <Segment basic textAlign="center">
        <Input
          //action={{ color: 'blue', content: 'Search' }}
          icon="search"
          label="Search"
          labelPosition="right"
          iconPosition="left"
          placeholder="Name, Email or Phone #"
          value={searchTerm}
          onChange={handleChange}
        />

        <Divider horizontal>Or</Divider>

        <Link to="vendor/form">
          <Button
            color="orange"
            content="Add New Vendor"
            icon="add"
            labelPosition="left"
          />
        </Link>
      </Segment>

      <hr />

      <h2>Client Total: {searchResults.length}</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>mobile</Table.HeaderCell>
            <Table.HeaderCell>email</Table.HeaderCell>
            <Table.HeaderCell>DOB</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(searchResults).map((id) => {
            return (
              <Table.Row key={id}>
                <Table.Cell>{vendorObjects[id].fullName}</Table.Cell>
                <Table.Cell>{vendorObjects[id].mobile}</Table.Cell>
                <Table.Cell>{vendorObjects[id].email}</Table.Cell>
                <Table.Cell>{vendorObjects[id].dob}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`vendor/${id}`}
                    render={
                      <VendorDetail
                        key={vendorObjects[id]}
                        {...id}
                        addOrEdit={addOrEdit}
                        {...{ currentId, vendorObjects, addOrEdit }}
                      />
                    }
                  >
                    <Button color="orange" icon="info" />
                  </Link>

                  <Link to="vendor/form"></Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Link to="vendor/form">
        <Button
          color="orange"
          content="Add New Vendors"
          icon="add"
          labelPosition="left"
        />
      </Link>
    </>
  );
};

export default Vendors;
