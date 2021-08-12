import React, { useState, useEffect } from 'react';

import {
  f7,
  f7ready,
  App,
  Views,
  View,
  Toolbar,
  Link,
} from 'framework7-react';

import routes from '../js/routes';
// import store from '../js/store';

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'Phone Book', // App name
    theme: 'auto', // Automatic theme detection

    // App store
    // store: store,
    // App routes
    routes: routes,
    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === 'production'
        ? {
            path: '/service-worker.js',
          }
        : {},
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      {/* Views/Tabs container */}
      <Views tabs className='safe-areas'>
        {/* Tabbar for switching views-tabs */}
        <Toolbar tabbar labels bottom>
          <Link
            tabLink='#view-home'
            tabLinkActive
            iconIos='f7:phone_fill'
            iconAurora='f7:phone_fill'
            iconMd='material:phone'
            text='Dialer'
          />
          <Link
            tabLink='#view-contacts'
            iconIos='f7:square_list_fill'
            iconAurora='f7:square_list_fill'
            iconMd='material:view_list'
            text='Contacts'
          />
        </Toolbar>

        {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
        <View id='view-home' main tab tabActive url='/' />

        {/* Catalog View */}
        <View id='view-contacts' name='contacts' tab url='/contacts/' />
      </Views>

    </App>
  );
};
export default MyApp;
