import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Page,
  Navbar,
  NavTitle,
  List,
  Button,
  ListInput,
  Block,
  Segmented,
  ListItemRow,
  ListItem,
} from 'framework7-react';

const HomePage = (props) => {
  const [inputNumber, setInputNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getContacts() {
      setIsLoading(true);
      let listContacts = await axios.get(
        `http://localhost:8080/api/v1/contacts?q=${inputNumber}`
      );
      listContacts = listContacts.data;
      setContacts(listContacts);
      setIsLoading(false);
      // console.log(contacts);
    }
    getContacts();
  }, [inputNumber]);

  function clickNumber(num) {
    setInputNumber(inputNumber + num);
  }

  function clickDelete() {
    setInputNumber(inputNumber.slice(0, -1));
  }

  return (
    <Page name='home'>
      {/* Top Navbar */}
      <Navbar>
        <NavTitle>Phone Book</NavTitle>
      </Navbar>
      <Block>
        <List>
          {contacts.forEach((item) => {
            return (
              <ListItem
                title={item.name}
                key={item.id}
                link={`/contacts/${item.id}/`}
              ></ListItem>
            );
          })}
        </List>
      </Block>
      <Block className='fixed bottom-0 -inset-x-0'>
        <List>
          <ListItemRow>
            <ListInput
              inputStyle={{ textAlign: 'center' }}
              readonly
              outline
              value={inputNumber}
              className='h-13 self-center w-4/5'
            ></ListInput>
            <Button outline className='self-center' onClick={clickDelete}>
              del
            </Button>
          </ListItemRow>
        </List>
        <Block strong>
          <Segmented tag='p'>
            <Button
              large
              onClick={() => {
                clickNumber('1');
              }}
            >
              1
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('2');
              }}
            >
              2
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('3');
              }}
            >
              3
            </Button>
          </Segmented>
          <Segmented tag='p'>
            <Button
              large
              onClick={() => {
                clickNumber('4');
              }}
            >
              4
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('5');
              }}
            >
              5
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('6');
              }}
            >
              6
            </Button>
          </Segmented>
          <Segmented tag='p'>
            <Button
              large
              onClick={() => {
                clickNumber('7');
              }}
            >
              7
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('8');
              }}
            >
              8
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('9');
              }}
            >
              9
            </Button>
          </Segmented>
          <Segmented tag='p'>
            <Button
              large
              onClick={() => {
                clickNumber('*');
              }}
            >
              *
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('0');
              }}
            >
              0
            </Button>
            <Button
              large
              onClick={() => {
                clickNumber('#');
              }}
            >
              #
            </Button>
          </Segmented>
        </Block>
        <Block>
          <Button
            large
            raised
            fill
            onClick={() =>
              props.f7router.navigate(`/contacts/new/${inputNumber}/`)
            }
          >
            Save
          </Button>
        </Block>
      </Block>
    </Page>
  );
};
export default HomePage;
