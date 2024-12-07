import React, { useState, useEffect } from 'react'

const SecondPage = ({ currentPage, setCurrentPage, raceInProgress }) => {
  const [winners, setWinners] = useState([])
  const [totalWinners, setTotalWinners] = useState(0)
  const WINNERS_PER_PAGE = 10

  useEffect(() => {
    fetchWinners()
  }, [currentPage])

  const fetchWinners = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners?_page=${currentPage}&_limit=${WINNERS_PER_PAGE}`)
      const data = await response.json()
      setWinners(data)
      setTotalWinners(Number(response.headers.get('X-Total-Count')))
    } catch (error) {
      console.error('Error fetching winners:', error)
    }
  }

  return (
    <div>
      <h1>Winners ({totalWinners})</h1>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, index) => (
            <tr key={winner.id}>
              <td>{(currentPage - 1) * WINNERS_PER_PAGE + index + 1}</td>
              <td>🚗</td>
              <td>{winner.name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          disabled={currentPage * WINNERS_PER_PAGE >= totalWinners}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default SecondPage