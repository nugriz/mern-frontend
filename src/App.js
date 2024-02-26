import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState('Buat')

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sample Blog</h1>
        <div onClick={setData('Buat Lagi')} id='add'><h6 style={{margin:0}}>{{data}}</h6></div>
        <div id='blog'>
        </div>
      </header>
    </div>
  );
}

export default App;
