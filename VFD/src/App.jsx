import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Create from "./Create";
import Bye from "./Bye";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/byebye" element={<Bye />} />
      </Routes>
    </Router>
  );
}

export default App;
