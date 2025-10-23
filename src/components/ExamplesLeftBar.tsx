import React from "react";
import { NavLink } from "react-router-dom";
import { examplesNavItems } from "../data/examplesNav";

const ExamplesLeftBar: React.FC = () => {
  return (
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
  );
};

export default ExamplesLeftBar;
