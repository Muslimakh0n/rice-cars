import React, { useState, useEffect } from 'react'

const MainPage = ({ currentPage, setCurrentPage, raceInProgress, setRaceInProgress }) => {
  const [cars, setCars] = useState([])
  const [totalCars, setTotalCars] = useState(0)
  const CARS_PER_PAGE = 7

  useEffect(() => {
    fetchCars()
  }, [currentPage])

  const fetchCars = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?_page=${currentPage}&_limit=${CARS_PER_PAGE}`)
      const data = await response.json()
      setCars(data)
      setTotalCars(Number(response.headers.get('X-Total-Count')))
    } catch (error) {
      console.error('Error fetching cars:', error)
    }
  }

  return (
    <div>
      <h1>Garage ({totalCars} cars)</h1>
      <div className="controls">
        <button disabled={raceInProgress}>Create Car</button>
        <button disabled={raceInProgress}>Race</button>
        <button disabled={!raceInProgress}>Reset</button>
      </div>
      <div className="cars-list">
        {cars.map(car => (
          <div key={car.id} className="car-item">
            <span>{car.name}</span>
            <button disabled={raceInProgress}>Select</button>
            <button disabled={raceInProgress}>Remove</button>
            <button disabled={raceInProgress}>Start</button>
            <button disabled={raceInProgress}>Stop</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage * CARS_PER_PAGE >= totalCars}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MainPage