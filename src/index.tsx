import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OAuthClientID } from './Utils/baseUrls';
import { store } from './ReduxTool/store/store';
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundarys from './Components/ErrorBoundry/ErrorBoundarys';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode >   
   <GoogleOAuthProvider clientId={OAuthClientID}>
      <Provider store={store}>
      {/* <ErrorBoundarys> */}
        <App />
      {/* </ErrorBoundarys> */}
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
