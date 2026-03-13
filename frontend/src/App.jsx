import { BrowserRouter,Routes, Route} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register"

const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>   
    </BrowserRouter>

  )
}

export default App