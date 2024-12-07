import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './main/GlobalStyles'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CountCartProvider } from './frontend/hooks/useContext.jsx'
import { AuthProvider } from './main/context/AuthContext.jsx'

const clientId = '935001753058-csguu1f35thco95983jno3gpnao80pf2.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <CountCartProvider>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </CountCartProvider>
    </AuthProvider>
  </GoogleOAuthProvider>

  // </React.StrictMode>
)
