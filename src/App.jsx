import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MainPage from './pages/mainPage'
import SecondPage from './pages/secondPage'

function App() {
  // Persistent state
  const [currentPage, setCurrentPage] = useState(1)
  const [raceInProgress, setRaceInProgress] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8 items-center">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  Garage
                </Link>
                <Link 
                  to="/winners" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  Winners
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <MainPage 
                  currentPage={currentPage} 
                  setCurrentPage={setCurrentPage}
                  raceInProgress={raceInProgress}
                  setRaceInProgress={setRaceInProgress}
                />
              } 
            />
            <Route 
              path="/winners" 
              element={
                <SecondPage 
                  currentPage={currentPage} 
                  setCurrentPage={setCurrentPage}
                  raceInProgress={raceInProgress}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
