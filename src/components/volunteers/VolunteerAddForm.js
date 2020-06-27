import React, {useState, useEffect} from 'react';
import VolunteerForm from './VolunteerForm';
import { database } from '../../firebase';
import {Header} from 'semantic-ui-react'

const VolunteersAddForm = () => {

  var [volunteerObjects, setVolunteerObjects] = useState({})
  var [currentId, setCurrentId] = useState('')

  useEffect(() => {
    database.child('volunteers').on('value', snapshot => {
      if(snapshot.val()!= null)
        setVolunteerObjects({
        ...snapshot.val()
      })
      else
      setVolunteerObjects({})
    })

  },[]) // similar to component did mount

  const addOrEditVolunteer = obj => {
    if (currentId === '') {
      database.child('volunteers').push(
        obj,
        err => {
          if(err)
            console.log(err)
            else
            setCurrentId('')
            window.location.href = '/volunteer'
        }
      )
    }
    else {
      database.child(`volunteers/${currentId}`).set(
        obj,
        err => {
          if(err)
            console.log(err)
            else
              setCurrentId('')
        }
      )
    }
  }

  return (  
    <>
    <Header as='h1'>Volunteer Form</Header>
    <VolunteerForm 
    {...({currentId, volunteerObjects, addOrEditVolunteer})}
    />
   
    </>
  );
}
 
export default VolunteersAddForm;