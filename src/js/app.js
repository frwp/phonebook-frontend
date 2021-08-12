// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
import 'tailwindcss/tailwind.css';

// Import App Component
import App from '../components/app.jsx';
import { store } from './store';

// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
// ReactDOM.render(
//   React.createElement(Provider, { store: store }, App),
//   document.getElementById('app')
// );

ReactDOM.render(React.createElement(App), document.getElementById('app'));
