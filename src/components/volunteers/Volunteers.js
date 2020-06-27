import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import VolunteerDetail from "./VolunteerDetail";
import { Button, Divider, Input, Segment, Table } from "semantic-ui-react";

const Volunteers = () => {
  // function controller for fireDB
  var [volunteerObjects, setVolunteerObjects] = useState({});

  // function controller for CRUD
  var [currentId, setCurrentId] = useState("");

  // search logic
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = Object.keys(volunteerObjects).filter(
      (id) =>
      volunteerObjects[id].fullName.toLowerCase().includes(searchTerm)  ||
      volunteerObjects[id].mobile.includes(searchTerm) ||
      volunteerObjects[id].email.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [volunteerObjects, searchTerm]);

  // Firedb
  useEffect(() => {
    database.child("volunteers").on("value", (snapshot) => {
      if (snapshot.val() != null)
      setVolunteerObjects({
          ...snapshot.val(),
        });
      else setVolunteerObjects({});
    });
  }, []); // similar to component did mount

  const addOrEdit = (obj) => {
    if (currentId === "") {
      //save
      database.child("volunteers").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      //editing
      database.child(`volunteers/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <h1>Concern Center Volunteers</h1>

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

        <Link to="volunteer/form">
          <Button
            color="blue"
            content="Add New Volunteer"
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
                <Table.Cell>{volunteerObjects[id].fullName}</Table.Cell>
                <Table.Cell>{volunteerObjects[id].mobile}</Table.Cell>
                <Table.Cell>{volunteerObjects[id].email}</Table.Cell>
                <Table.Cell>{volunteerObjects[id].dob}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`volunteer/${id}`}
                    render={
                      <VolunteerDetail
                        key={volunteerObjects[id]}
                        {...id}
                        addOrEdit={addOrEdit}
                        {...{ currentId, volunteerObjects, addOrEdit }}
                      />
                    }
                  >
                    <Button color="blue" icon="info" />
                  </Link>

                  <Link to="client/form"></Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Link to="volunteer/form">
        <Button
          color="blue"
          content="Add New Volunteer"
          icon="add"
          labelPosition="left"
        />
      </Link>
    </>
  );
};

export default Volunteers;
