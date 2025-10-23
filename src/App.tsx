import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Examples from "./pages/Examples";
import ExamplesLayout from "./layouts/ExamplesLayout";
import { Navigate } from "react-router-dom";
import FeatureGuide from "./pages/features/FeatureGuide";
import FeatureDetail from "./pages/features/FeatureDetail";
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
              <Link to="/examples">예제 목록</Link>
            </li>
            <li>
              <Link to="/examples/features">기능별 가이드</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/examples" replace />} />
            <Route path="/examples" element={<ExamplesLayout />}>
              <Route index element={<Examples />} />
              <Route path="features" element={<FeatureGuide />} />
              <Route path="features/:featureId" element={<FeatureDetail />} />
              <Route path="basic-form" element={<BasicForm />} />
              <Route path="validation" element={<Validation />} />
              <Route path="dynamic-fields" element={<DynamicFields />} />
              <Route path="file-upload" element={<FileUpload />} />
              <Route path="custom-components" element={<CustomComponents />} />
              <Route
                path="conditional-fields"
                element={<ConditionalFields />}
              />
              <Route path="array-fields" element={<ArrayFields />} />
              <Route path="nested-objects" element={<NestedObjects />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
