
import "./App.css";
import "antd/dist/antd.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export function ProtectedRoute(props){

  if(localStorage.getItem('finance-tracker-user'))
  {
    return props.children
  }else{
   return <Navigate to='/login'/>
  }

}



export default App;
