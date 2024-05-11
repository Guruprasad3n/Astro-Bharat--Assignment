

import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterAstrologer from "./Components/RegisterAstrologer";
import AdminPanel from "./Components/AdminPanel";
import EditAstrologer from "./Components/EditAstrologer";
import Navbar from "./Components/Navbar";

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterAstrologer />} />
        <Route path="/" element={<AdminPanel />} />
        <Route path="/edit/:id" element={<EditAstrologer />} />
      </Routes>
      {/* Hello Banti Chocklet Kavala
      <Button variant="contained">
        Hello world <AddCircleIcon />{" "}
      </Button> */}
    </>
  );
}

export default App;
