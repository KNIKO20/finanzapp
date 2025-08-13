import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import OperationsTable from './pages/OperationsTable';
import ViewDetails from './pages/ViewDetails';
import Update from './pages/EditOperation';
import { Stats } from './pages/Stats';
import { Login } from './pages/Login';



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details" element={<OperationsTable />} />
        <Route path="/stats" element={<Stats />} />
        <Route path='/details/view/:operationid' element={<ViewDetails/>}></Route>
        <Route path='/details/edit/:operationid' element={<Update/>}></Route>

      </Routes>
    </Router>
    </>
  )
}

export default App
