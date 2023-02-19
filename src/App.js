import logo from "./images/logo.svg";
import "./Mixins.scss";
import "./App.scss";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Login from "./components/Login/Login";
// import Sidenav from "./components/Sidenav/Sidenav";



/* Import Management Routes */
import ManagementSection from "./components/Sections/Management/Index";

/* Import Staff Routes */
import StaffSection from "./components/Sections/Staff/Index";

/* Import Students Routes */
import StudentsSection from "./components/Sections/Student/Index";

// import IconsPreview from "./devOnly/IconsPreview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* LOGIN FOR ALL APP */}
          <Route path="/" element={<Login />} exact />

          {/* MANAGEMENT ROUTING */}
          <Route path="/management/*" element={<ManagementSection />}  />

          {/* STAFF ROUTING */}
          <Route path="/staff/*" element={<StaffSection />}  />

          {/* STUDENTS ROUTING */}
          <Route path="/student/*" element={<StudentsSection />}  />

          {/* Redirects */}
          <Route path="*" element={<StudentsSection />}  />

          {/* DevMode IconsPreview */}
          {/* <Route path="/icons-preview" element={<IconsPreview />}  /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
