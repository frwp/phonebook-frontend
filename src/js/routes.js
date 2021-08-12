import HomePage from '../pages/home.jsx';
import ContactPage from '../pages/contactPage.jsx';
import ContactDetails from '../pages/contactDetails.jsx';
import Form from '../pages/form.jsx';

import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/contacts/',
    component: ContactPage,
  },
  {
    name: 'form',
    path: '/contacts/new/:inNumber/',
    component: Form,
  },
  {
    path: '/contacts/:id/',
    component: ContactDetails,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
