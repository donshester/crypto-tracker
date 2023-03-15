import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import CryptoInfoPage from "./components/CryptoInfoPage/CryptoInfoPage";


function App() {
  return (
    <div className="App">
      <Header/>
        <CryptoInfoPage></CryptoInfoPage>
    </div>
  );
}

export default App;
