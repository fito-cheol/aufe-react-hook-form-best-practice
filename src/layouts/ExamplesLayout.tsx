import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { examplesNavItems } from "../data/examplesNav";
import { featureCatalog } from "../data/featureCatalog";

const ExamplesLayout: React.FC = () => {
  const location = useLocation();
  const isFeatureGuide = location.pathname.startsWith("/examples/features");

  const leftbarItems = isFeatureGuide
    ? featureCatalog.map((f) => ({ label: f.title, to: `/examples/features#${f.id}` }))
    : examplesNavItems;

  return (
    <div className="examples-layout">
      <aside className="examples-leftbar">
        <nav>
          <ul>
            {leftbarItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    "leftbar-link" + (isActive ? " active" : "")
                  }
                  end
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section className="examples-content">
        <Outlet />
      </section>
    </div>
  );
};

export default ExamplesLayout;
