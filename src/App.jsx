import { useState } from 'react'

import './App.css'
import { PasswordGenaretor } from './assets/component/PasswordGenaretor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PasswordGenaretor/>
    </>
  )
}

export default App
