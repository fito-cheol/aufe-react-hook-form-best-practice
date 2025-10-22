import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Examples from "./pages/Examples";
import BasicForm from "./pages/examples/BasicForm";
import Validation from "./pages/examples/Validation";
import DynamicFields from "./pages/examples/DynamicFields";
import FileUpload from "./pages/examples/FileUpload";
import CustomComponents from "./pages/examples/CustomComponents";
import ConditionalFields from "./pages/examples/ConditionalFields";
import ArrayFields from "./pages/examples/ArrayFields";
import NestedObjects from "./pages/examples/NestedObjects";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>React App</h2>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/examples">Examples</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/examples/basic-form" element={<BasicForm />} />
            <Route path="/examples/validation" element={<Validation />} />
            <Route
              path="/examples/dynamic-fields"
              element={<DynamicFields />}
            />
            <Route path="/examples/file-upload" element={<FileUpload />} />
            <Route
              path="/examples/custom-components"
              element={<CustomComponents />}
            />
            <Route
              path="/examples/conditional-fields"
              element={<ConditionalFields />}
            />
            <Route path="/examples/array-fields" element={<ArrayFields />} />
            <Route
              path="/examples/nested-objects"
              element={<NestedObjects />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
