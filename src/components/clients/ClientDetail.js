import React, { useState, useEffect } from "react";
import ContactForm from "./ClientForm";
// import firebaseDb from '../../firebase';
import { database } from "../../firebase";
import { Card, Button, Icon, Divider, Header } from "semantic-ui-react";

const ClientDetail = ({ match }) => {
  // function controller for fireDB
  var [clientObjects, setClientObjects] = useState({});
  // function controller for CRUD
  var [currentId, setCurrentId] = useState(match.params.id);

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
    if (match.params.id === "") {
      //save
      database.child("clients").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
        window.location.href = "/client";
      });
    } else {
      //editing
      database.child(`clients/${match.params.id}`).set(obj, (err) => {
        if (err) console.log(err);
        // setCurrentId(match.params.id)
        else toggleEdit();
        alert("Client Updated");
        //setCurrentId('')
      });
    }
  };

  const onDelete = (id) => {
    if (window.confirm("are you are you want to delete client?")) {
      database.child(`clients/${match.params.id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
        window.location.href = "/client";
      });
    }
  };

  const [editing, setEditing] = useState(false);
  console.log(`Editing Status: ${editing}`);
  const toggleEdit = () => setEditing(!editing);

  const client = clientObjects[match.params.id];

  if (!client) return null;

  return (
    <>
      {editing ? (
        <ContactForm {...{ currentId, clientObjects, addOrEdit }} />
      ) : (
        <>
          <Card fluid color='teal'>
            <Card.Content>
              {/* <Image
                size="tiny"
                floated="left"
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={true}
              /> */}
             <Header as="h1">{client.fullName}</Header>
             
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
              Date of Birth: {client.dob} <br/> 

               <Icon name="user" />
              Gender: {client.gender} <br/>

              <Icon name="mail" />
              Email: {client.email} <br/>

              <Icon name="phone" />
              Mobile: {client.mobile} <br/>
              
              <Icon name="users" />
              Household Total: {client.householdTotal} <br/>
            {/* </Card.Meta> */}
              <Divider />

              <Card.Header as="h3">Salvation Presented</Card.Header>
              <Card.Description>
                <p>
                {client.salvationPresented}
                </p>
                </Card.Description>
              <Divider />

              <Card.Header as="h3">Life Needs</Card.Header>
              <Card.Description>
        
                <p>
                {client.lifeAssistance}
                </p>
              </Card.Description>

              <Divider />
              <Card.Header as="h3">Family List</Card.Header>
              <Card.Description>
                <p>
                {client.familyList}
                </p>
                </Card.Description>
            </Card.Content>
            
          </Card>

          <Button href='/client' color="blue">
            Back
          </Button>

          <Button onClick={toggleEdit} color="yellow">
            Edit
          </Button>

          <Button
            onClick={() => {
              onDelete(client.id);
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

export default ClientDetail;
