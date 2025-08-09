import './App.css'
import Welcome from './Components/Welcome'
import Photo from './Components/Photo'
import Form from './Components/Form'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  )
}

export default App