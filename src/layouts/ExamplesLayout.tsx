import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { examplesNavItems } from "../data/examplesNav";

const ExamplesLayout: React.FC = () => {
  return (
    <div className="examples-layout">
      <aside className="examples-leftbar">
        <nav>
          <ul>
            {examplesNavItems.map((item) => (
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


