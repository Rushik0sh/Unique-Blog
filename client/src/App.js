import React from "react";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      {/* <BrowserRouter> */}
      <Router>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
        {/* <BrowserRouter/> */}
      </Router>
    </>
  );
}

export default App;
