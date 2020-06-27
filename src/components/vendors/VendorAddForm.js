import React, {useState, useEffect} from 'react';
import VendorForm from './VendorForm';
import { database } from '../../firebase';
import {Header} from 'semantic-ui-react'

const VendorsAddForm = () => {

  var [vendorObjects, setVendorObjects] = useState({})
  var [currentId, setCurrentId] = useState('')

  useEffect(() => {
    database.child('vendors').on('value', snapshot => {
      if(snapshot.val()!= null)
        setVendorObjects({
        ...snapshot.val()
      })
      else
      setVendorObjects({})
    })

  },[]) // similar to component did mount

  const addOrEditVendor = obj => {
    if (currentId === '') {
      database.child('vendors').push(
        obj,
        err => {
          if(err)
            console.log(err)
            else
            setCurrentId('')
            window.location.href = '/vendor'
        }
      )
    }
    else {
      database.child(`vendors/${currentId}`).set(
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
    <Header as='h1'>Vendor Form</Header>
    <VendorForm 
    {...({currentId, vendorObjects, addOrEditVendor})}
    />
   
    </>
  );
}
 
export default VendorsAddForm;