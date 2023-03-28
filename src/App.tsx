import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import CryptoInfoPage from './components/CryptoInfoPage/CryptoInfoPage'
import Table from './components/Table/Table'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Table />} />
        <Route path={'/currency/:id'} element={<CryptoInfoPage />} />
      </Routes>
    </Router>
)
}

export default App
