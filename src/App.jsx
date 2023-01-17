import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Core from "./pages/builder/core"
import Preview from "./pages/preview/preview"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/builder'/>}/>
        <Route path="/builder" element={<Core/>}/>
        <Route path="/preview" element={<Preview/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
