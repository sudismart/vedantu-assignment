import React from 'react';
import './App.css';
import SideBar from './components/sideBar';
import MainSection from './components/mainSection';

function App() {
  return (
    <div className="App">
      <SideBar></SideBar>
      <MainSection></MainSection>
    </div>
  );
}

export default App;
