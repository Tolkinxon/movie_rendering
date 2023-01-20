import React, { useReducer } from 'react'
import reducer from './Reducer'

import './App.css'

function App() {
  const [{ r, g, b }, dispatch] = useReducer(reducer, { r: 0, g: 0, b: 0 })

  return (
    <div className="App">
      <div className="container">
        <h1 style={{ color: `rgb(${r}, ${g}, ${b})` }}>hello world</h1>
        <div className="colors">
          <p>R</p>
          <button onClick={() => dispatch({ type: 'INCREMENT_R' })}>+</button>
          <button onClick={() => dispatch({ type: 'DECREMENT_R' })}>-</button>
        </div>
        <div className="colors">
          <p>G</p>
          <button onClick={() => dispatch({ type: 'INCREMENT_G' })}>+</button>
          <button onClick={() => dispatch({ type: 'DECREMENT_G' })}>-</button>
        </div>
        <div className="colors">
          <p>B</p>
          <button onClick={() => dispatch({ type: 'INCREMENT_B' })}>+</button>
          <button onClick={() => dispatch({ type: 'DECREMENT_B' })}>-</button>
        </div>
      </div>
    </div>
  )
}

export default App
