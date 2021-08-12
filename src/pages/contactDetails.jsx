import React, { useState, useEffect } from 'react';
import { f7, Page, Navbar, ListItem, List, Button } from 'framework7-react';
import axios from 'axios';

const ContactDetailsPage = (props) => {
  const contactId = props.f7route.params.id;
  const [contact, setContact] = useState({ name: '', phone_number: '' });

  const getContactDetails = async () => {
    var result = await axios.get(
      `http://localhost:8080/api/v1/contacts/${contactId}`
    );
    var content = result.data;
    setContact({ name: content.name, phone_number: content.phone_number });
  };

  function handleDelete() {
    f7.dialog.confirm('Are you sure you want to delete?', () => {
      axios.delete(`http://localhost:8080/api/v1/contacts/${contactId}`).then(
        f7.dialog.alert('Delete success', () => {
          props.f7router.navigate('/contacts/');
        })
      );
    });
  }
  return (
    <Page name='Contacts' onPageBeforeIn={getContactDetails}>
      <Navbar title='Contacts' backLink='Back'></Navbar>
      <List>
        <ListItem title={contact.name}></ListItem>
        <ListItem title={contact.phone_number}></ListItem>
      </List>
      <Button large fill className='bg-red-500' onClick={handleDelete}>
        Delete
      </Button>
    </Page>
  );
};

export default ContactDetailsPage;
