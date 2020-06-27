import React, { useState, useEffect } from "react";
import VolunteerForm from "./VolunteerForm";
import { database } from "../../firebase";
import { Card, Button, Icon, Divider, Header } from "semantic-ui-react";

const VolunteerDetail = ({ match }) => {
  // function controller for fireDB
  var [volunteerObjects, setVolunteerObjects] = useState({});
  // function controller for CRUD
  var [currentId, setCurrentId] = useState(match.params.id);

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

  const addOrEditVolunteer = (obj) => {
    if (match.params.id === "") {
      //save
      database.child("volunteers").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
        window.location.href = "/volunteer";
      });
    } else {
      //editing
      database.child(`volunteers/${match.params.id}`).set(obj, (err) => {
        if (err) console.log(err);
        // setCurrentId(match.params.id)
        else toggleEdit();
        alert("Volunteer Updated");
        //setCurrentId('')
      });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("are you are you want to delete volunteer?")) {
      database.child(`volunteers/${match.params.id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
        window.location.href = "/volunteer";
      });
    }
  };

  const [editing, setEditing] = useState(false);
  console.log(`Editing Status: ${editing}`);
  const toggleEdit = () => setEditing(!editing);

  const volunteer = volunteerObjects[match.params.id];

  if (!volunteer) return null;

  return (
    <>
      {editing ? (
        <VolunteerForm
          {...{ currentId, volunteerObjects, addOrEditVolunteer }}
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
              <Header as="h1">{volunteer.fullName}</Header>
              <Divider />
              {/* <Card.Meta>
                <span className="date">
                  Date of Birth {client.dob}
                </span>
              </Card.Meta> */}
              {/* <Card.Meta> */}
              {/* <Header as='h4' icon='calendar' content={client.dob} />
              <Header as='h4' icon='user' content={client.gender} />
              <Header as='h4' icon='mail' content={client.mail} />
              <Header as='h4' icon='phone' content={client.mobile} />
              <Header as='h4' icon='users' content={client.householdTotal} /> */}
              <Icon name="calendar" />
              Date of Birth: {volunteer.dob} <br />
              <Icon name="user" />
              Gender: {volunteer.gender} <br />
              <Icon name="mail" />
              Email: {volunteer.email} <br />
              <Icon name="phone" />
              Mobile: {volunteer.mobile} <br />
              <Divider />
              <Card.Content>
                Preferred shift: {volunteer.shifts} <br />
                Preferred Ministry: {volunteer.ministry} <br />
                Personal Faith: {volunteer.faith} <br />
                Civil Rights Training Status: {volunteer.civilrights}
              </Card.Content>
              <Divider />
              <Card.Content>
                <Header as="h3">Skills</Header>
                <p>{volunteer.skills}</p>
              </Card.Content>
            </Card.Content>
          </Card>

          <Button href="/volunteer" color="blue">
            Back
          </Button>

          <Button onClick={toggleEdit} color="yellow">
            Edit
          </Button>

          <Button
            onClick={() => {
              onDelete(volunteer.id);
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

export default VolunteerDetail;
