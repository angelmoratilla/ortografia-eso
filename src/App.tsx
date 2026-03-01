import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ModulePage } from './pages/ModulePage'
import { ExercisePage } from './pages/ExercisePage'
import { ResultPage } from './pages/ResultPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modulo/:moduleId" element={<ModulePage />} />
        <Route path="/modulo/:moduleId/ejercicios" element={<ExercisePage />} />
        <Route path="/modulo/:moduleId/resultado" element={<ResultPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
