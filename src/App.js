import React from 'react'
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BarChart from './components/BarChart'
import HistoryPage from './components/history/History'
import './App.css'

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<BarChart />} />
          <Route path="/history" element={<HistoryPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App