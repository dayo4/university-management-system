import logo from "./images/logo.svg";
import "./Mixins.scss";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
// import Sidenav from "./components/Sidenav/Sidenav";



/* Import Management Routes */
import ManagementSection from "./components/Sections/Management/Index";

/* Import Staff Routes */
import StaffSection from "./components/Sections/Staff/Index";

/* Import Students Routes */
import StudentsSection from "./components/Sections/Student/Index";

// import IconsPreview from "./devOnly/IconsPreview";
// import LinkTest from "./devOnly/LinkTest";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* LOGIN FOR ALL APP */}
          <Route path="/" element={<Login />} exact />

          {/* MANAGEMENT ROUTING */}
          <Route path="/management/*" element={<ManagementSection />} exact />

          {/* STAFF ROUTING */}
          <Route path="/staff/*" element={<StaffSection />} exact />

          {/* STUDENTS ROUTING */}
          <Route path="/student/*" element={<StudentsSection />} exact />

          {/* DevMode IconsPreview */}
          {/* <Route path="/icons" element={<IconsPreview />} exact /> */}
          {/* <Route path="/test" element={<LinkTest />} exact /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
