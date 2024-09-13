import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import appStore from './utils/appStore';
import { Toaster } from 'react-hot-toast';
import Body from './components/Body';

function App() {
  return (
    // <Provider store={appStore} stabilityCheck="never">
      <BrowserRouter>
        <Body />
        <Toaster />
      </BrowserRouter>
    // </Provider>
  );
}

export default App;