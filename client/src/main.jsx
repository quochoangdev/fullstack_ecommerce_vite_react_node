import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './main/GlobalStyles'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientId = '935001753058-csguu1f35thco95983jno3gpnao80pf2.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
