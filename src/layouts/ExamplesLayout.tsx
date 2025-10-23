import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ExamplesLeftBar from "../components/ExamplesLeftBar";
import FeatureLeftBar from "../components/FeatureLeftBar";

const ExamplesLayout: React.FC = () => {
  const location = useLocation();
  const isFeatureGuide = location.pathname.startsWith("/examples/features");

  return (
    <div className="examples-layout">
      <aside className="examples-leftbar">
        {isFeatureGuide ? <FeatureLeftBar /> : <ExamplesLeftBar />}
      </aside>

      <section className="examples-content">
        <Outlet />
      </section>
    </div>
  );
};

export default ExamplesLayout;
