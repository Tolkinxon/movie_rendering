import React, { useReducer } from 'react'
import './App.css'
import reducer20 from './reducer2.0'

export default function App() {
  const [{ top, bottom, left, right }, dispatch] = useReducer(reducer20, {
    top: 0,
    bottom: 2,
    left: 2,
    right: 2,
  })
  return (
    <div className="app">
      <div className="container">
        <div
          className="shape"
          style={{
            borderRadius: `${top}px ${bottom}px ${left}px ${right}px`,
          }}
        ></div>
        <button onClick={() => dispatch({ type: 'top' })}>top</button>
        <button onClick={() => dispatch({ type: 'bottom' })}>bottom</button>
        <button onClick={() => dispatch({ type: 'left' })}>left</button>
        <button onClick={() => dispatch({ type: 'right' })}>right</button>
      </div>
    </div>
  )
}
