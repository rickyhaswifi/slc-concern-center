import React, {useState, useEffect} from 'react';
import ContactForm from './ClientForm';
// import firebaseDb from '../../firebase';
import { database } from '../../firebase';


const ClientAddForm = () => {
  // function controller for fireDB
  var [clientObjects, setClientObjects] = useState({})
  
  // function controller for CRUD
  var [currentId, setCurrentId] = useState('')

  // search logic
  // const [searchTerm, setSearchTerm] = React.useState("");
  // const [searchResults, setSearchResults] = React.useState([]);
  // const handleChange = event => {
  //   setSearchTerm(event.target.value);
  // };
  // React.useEffect(() => {
  //   const results = Object.keys(clientObjects).filter(id =>
  //     clientObjects[id].fullName.toLowerCase().includes(searchTerm) || clientObjects[id].mobile.includes(searchTerm) 
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);
  

  // Firedb
  useEffect(() => {
    database.child('clients').on('value', snapshot => {
      if(snapshot.val()!= null)
      setClientObjects({
        ...snapshot.val()
      })
      else
      setClientObjects({})
      }
    ) 
  },[]) // similar to component did mount
  
  const addOrEdit = obj => {
    if (currentId === '') { //save
      database.child('clients').push(
        obj,
        err => {
          if(err)
          console.log(err)
          else
          setCurrentId('')
          window.location.href = '/client'
        }
        )
      }
      else { //editing
        database.child(`clients/${currentId}`).set(
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

    <h1>Clients</h1>


    <hr />
    <h2>Add New Client</h2>
    <ContactForm 
    {...({currentId, clientObjects, addOrEdit})}
    />

    </>
  );
}
 
export default ClientAddForm;