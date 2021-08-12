import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Subnavbar,
  Searchbar,
  theme,
} from 'framework7-react';

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [contactGroup, setContactGroup] = useState([]);
  const [initSearch, setInitSearch] = useState(false);

  function groupAndSort() {
    const groupedContact = contacts.map((c) => {
      return { ...c, group: c.name.charAt(0).toUpperCase() };
    });
    let group = [];
    groupedContact.forEach((item) => {
      let exist = false;
      group.forEach((inner) => {
        if (inner.title === item.group) {
          inner.data.push(item);
          exist = true;
        }
      });
      if (!exist) {
        group.push({
          title: item.group,
          data: [item],
        });
      }
    });
    return group;
  }

  const refresh = (done) => {
    setTimeout(() => {
      getContacts();
      done();
    }, 500);
  };

  async function getContacts() {
    let listContacts = await axios.get(`http://localhost:8080/api/v1/contacts`);
    listContacts = listContacts.data;
    setContacts(listContacts);
    setContactGroup(groupAndSort);
    setInitSearch(true);
  }

  return (
    <Page
      name='contactsList'
      ptr
      onPtrRefresh={refresh}
      onPageBeforeIn={getContacts}
      onPageTabShow={getContacts}
      onPageTabHide={() => {
        setInitSearch(false);
      }}
    >
      <Navbar name='Contacts' title='Contacts'>
        <Subnavbar inner={false}>
          <Searchbar
            init={initSearch}
            searchContainer='.search-list'
            searchIn='.item-title'
            disableButton={!theme.aurora}
          ></Searchbar>
        </Subnavbar>
      </Navbar>
      <List className='searchbar-not-found'>
        <ListItem title='Nothing found'></ListItem>
      </List>
      {contactGroup.map((contact) => {
        let innerView = contact.data.map((innerData) => (
          <ListItem
            title={innerData.name}
            key={innerData.id}
            link={`/contacts/${innerData.id}/`}
          ></ListItem>
        ));
        return (
          <List className='search-list searchbar-found' contactsList>
            <ListItem title={contact.title} groupTitle></ListItem>
            {innerView}
          </List>
        );
      })}
    </Page>
  );
};

export default ContactPage;
