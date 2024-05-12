import "./App.css";
import toast, { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import RegisterAstrologer from "./Components/RegisterAstrologer";
import AdminPanel from "./Components/AdminPanel";
import EditAstrologer from "./Components/EditAstrologer";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterAstrologer />} />
        <Route path="/" element={<AdminPanel />} />
        <Route path="/edit/:id" element={<EditAstrologer />} />
      </Routes>
      <Toaster />
      {/* Hello Banti Chocklet Kavala
      <Button variant="contained">
        Hello world <AddCircleIcon />{" "}
      </Button> */}
    </div>
  );
}

export default App;
