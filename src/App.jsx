import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import DoctorProfile from "./components/DoctorProfile/DoctorProfile";
import { doctors as fetchedDoctors } from "./service/DoctorsService";
import { DocContext } from "./store/doctors-cnxt";
import Search from "./components/Search/Search";
import Tabs from "./components/Tabs/Tabs";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState({ name: null, major: null, city: null });
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Router>
      <Header />
      <DocContext.Provider value={{ filter, setFilter, activeIndex, setActiveIndex }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search fetchedDoctors={fetchedDoctors} />
                <Tabs fetchedDoctors={fetchedDoctors} />
                <Table />
              </>
            }
          />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
        </Routes>
      </DocContext.Provider>
    </Router>
  );
}

export default App;
