import React, { useState } from 'react';

// components
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div 
      className="App" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        padding: '3em 10em 0 10em',
        border: '1px solid red', 
      }}
    >
      { !isLoggedIn ? 
        <Login 
          setIsLoggedIn={setIsLoggedIn}
        />
        : 
        <p>Is logged in!</p>
      }
    </div>
  );
}

export default App;
