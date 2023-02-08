import logo from "./logo.svg";
import "./Mixins.scss";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Sidenav from "./components/Sidenav/Sidenav";
import UserProtect from "./userProtect.jsx";
import Staff from "./components/Management/Staff/Staff";
import Finance from "./components/Management/Finance/Finance";
import Dashboard from "./components/Management/Dashboard/Dashboard";
import Memo from "./components/Management/Memo/Memo";
import Settings from "./components/Management/Settings/Settings";
import Student from "./components/Management/Student/Student";
import Topnav from "./components/Management/Topnav/Topnav";
import Newstaff from "./components/Management/Staff/Newstaff/Newstaff";
import Editstaff from "./components/Management/Staff/EditStaff/Editstaff";
import AddStudent from "./components/Management/Student/AddStudent/AddStudent";


/* Import Staff Routes */
import StaffSection from "./components/Sections/Student/Index";

/* Import Students Routes */
import StudentsSection from "./components/Sections/Student/Index";

import IconsPreview from "./devOnly/IconsPreview";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* LOGIN FOR ALL APP */}
          <Route path="/" element={<Login />} exact />

          {/* MANAGEMENT ROUTING */}
          <Route path="/management/staff" element={<Staff />} exact />
          <Route path="/management/dashboard" element={<Dashboard />} exact />
          <Route path="/management/memo" element={<Memo />} exact />
          <Route path="/management/Editstaff/:token" element={<Editstaff />} exact />
          <Route path="/management/settings" element={<Settings />} exact />
          <Route path="/management/student" element={<Student />} exact />
          <Route path="/management/topnav" element={<Topnav />} exact />
          <Route path="/management/newstaff" element={<Newstaff />} exact />
          <Route path="/management/addstudent" element={<AddStudent />} exact />

          <Route path="/management/finance" element={<Finance />} exact />
          {/* <Route path="/management/side" element={<Sidenav />} exact /> */}

          {/* STAFF ROUTING */}
          <Route path="/staff/*" element={<StaffSection />} exact />

          {/* STUDENTS ROUTING */}
          <Route path="/student/*" element={<StudentsSection />} exact />

          {/* DevMode IconsPreview */}
          <Route path="/icons-preview" element={<IconsPreview />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
