import React from 'react';
import { Button } from './react/ui/Button';

function App() {
  return (
    <div className='App'>
      <div
        className='flex flex-centered flex-column'
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--background-color)',
          color: 'var(--foreground-color)'
        }}
      >
        <h1>KC Components</h1>
        <Button text='See em all' />
      </div>
    </div>
  );
}

export default App;
