
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    contacts: [
      {
        id: '1',
        name: 'Bapak',
        phoneNumber: '123456789'
      },
      {
        id: '2',
        name: 'Ibu',
        phoneNumber: '123456789'
      },
      {
        id: '3',
        name: 'Adek',
        phoneNumber: '123456789'
      },
    ]
  },
  getters: {
    contacts({ state }) {
      return state.contacts;
    }
  },
  actions: {
    addContact({ state }, contact) {
      state.contacts = [...state.contacts, contact];
    },
  },
})
export default store;
