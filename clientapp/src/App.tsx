import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { CheckLocationsPage } from "./pages/CheckLocationsPage";
import { UploadFilePage } from "./pages/UploadFilePage";
function App() {
  return (
    <Container className="pb-5">
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<CheckLocationsPage></CheckLocationsPage>} />
        <Route path="/upload" element={<UploadFilePage />} />
      </Routes>
    </Container>
  );
}

export default App;
