import { useState } from 'react'
import './App.css'

function AlertButton() {
  const raiseAlert = () => {
    alert(`Yay!`);
  } 

  return (
    <button onClick={raiseAlert}>Raise Alert</button>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AlertButton></AlertButton>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
