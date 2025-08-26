import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from "react-router-dom"
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
  import { ToastContainer } from 'react-toastify';
import UsersInfo from './pages/UsersInfo/UsersInfo'

function App() {
  const url = "https://food-del-backend-e7ym.onrender.com";
  return (
    <div>
    
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        
        <Sidebar />
   
        <Routes>
          <Route path='/add' element={<Add  url={url}/>}/>
          <Route path='/list' element={<List  url={url}/>}/>
          <Route path='/orders' element={<Orders url={url} />}/>
          <Route path='/usersInfo' element={<UsersInfo url={url} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
