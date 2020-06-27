import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import ClientDetail from "./ClientDetail";
import { Button, Divider, Input, Segment, Table, Breadcrumb } from "semantic-ui-react";

const Clients = () => {
  // function controller for fireDB
  var [clientObjects, setClientObjects] = useState({});

  // function controller for CRUD
  var [currentId, setCurrentId] = useState("");

  // search logic
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = Object.keys(clientObjects).filter(
      (id) =>
        clientObjects[id].fullName.toLowerCase().includes(searchTerm)  ||
        clientObjects[id].mobile.includes(searchTerm) ||
        clientObjects[id].email.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [clientObjects, searchTerm]);
console.log(searchTerm)

  //search DATE logic
  const [searchDate, setSearchDate] = React.useState("");
  const [searchDateResults, setSearchDateResults] = React.useState([]);
  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };
  React.useEffect(() => {
    const resultsDate = Object.keys(clientObjects).filter(
      (id) =>
        clientObjects[id].dob.includes(searchDate)
    );
    setSearchResults(resultsDate);
  }, [clientObjects, searchDate]);

  // Firedb
  useEffect(() => {
    database.child("clients").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setClientObjects({
          ...snapshot.val(),
        });
      else setClientObjects({});
    });
  }, []); // similar to component did mount

  const addOrEdit = (obj) => {
    if (currentId === "") {
      //save
      database.child("clients").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      //editing
      database.child(`clients/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
        <Breadcrumb>
    <Breadcrumb.Section href='/'>Home</Breadcrumb.Section>
    <Breadcrumb.Divider />
    <Breadcrumb.Section >Clients</Breadcrumb.Section>
  </Breadcrumb>

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
        <Input
          //action={{ color: 'blue', content: 'Search' }}
          icon="search"
          label="Search"
          labelPosition="right"
          iconPosition="left"
          placeholder="Date of Birth"
          value={searchDate}
          onChange={handleDateChange}
        />

        <Divider horizontal>Or</Divider>

        <Link to="client/form">
          <Button
            color="teal"
            content="Add New Client"
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
                <Table.Cell>{clientObjects[id].fullName}</Table.Cell>
                <Table.Cell>{clientObjects[id].mobile}</Table.Cell>
                <Table.Cell>{clientObjects[id].email}</Table.Cell>
                <Table.Cell>{clientObjects[id].dob}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`client/${id}`}
                    render={
                      <ClientDetail
                        key={clientObjects[id]}
                        {...id}
                        addOrEdit={addOrEdit}
                        {...{ currentId, clientObjects, addOrEdit }}
                      />
                    }
                  >
                    <Button color="teal" icon="info" />
                  </Link>

                  <Link to="client/form"></Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Link to="client/form">
        <Button
          color="teal"
          content="Add New Client"
          icon="add"
          labelPosition="left"
        />
      </Link>
    </>
  );
};

export default Clients;
