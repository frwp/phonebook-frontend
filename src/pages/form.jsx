import React, { useState } from 'react';
import {
  f7,
  Page,
  Navbar,
  List,
  ListInput,
  BlockTitle,
  Button,
} from 'framework7-react';
import axios from 'axios';

const FormPage = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const { inNumber } = props.f7route.params;
  const onPageBeforeIn = () => {
    if (inNumber) {
      setPhoneNumber(inNumber);
      // console.log(`primordial: ${inNumber}`);
    }
  };

  async function handleSubmit() {
    try {
      const result = await axios.post(`http://localhost:8080/api/v1/contacts`, {
        name: name,
        phone_number: phoneNumber,
      });
      if (result.status === 201) {
        f7.dialog.alert('Create contact success', 'Success', () => {
          props.f7router.navigate('/');
        });
        return;
      }
    } catch (err) {
      if (err.response.status === 400)
        f7.dialog.alert('Failed, field incomplete');
      else if (err.response.status === 409)
        f7.dialog.alert('Failed, name already exists');
    }
  }

  return (
    <Page name='form' onPageBeforeIn={onPageBeforeIn}>
      <Navbar title='New contact' backLink='Back'></Navbar>

      <BlockTitle>Create new contact</BlockTitle>
      <List noHairlinesMd>
        <ListInput
          outline
          floatingLabel
          required={true}
          label='Name'
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></ListInput>
        <ListInput
          outline
          floatingLabel
          required={true}
          label='Phone Number'
          type='tel'
          placeholder='Phone number'
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            // console.log(phoneNumber);
          }}
        ></ListInput>
      </List>
      <Button large fill onClick={handleSubmit}>
        SAVE
      </Button>
    </Page>
  );
};

export default FormPage;
