import React from "react";
import { NavLink } from "react-router-dom";
import { featureCatalog } from "../data/featureCatalog";

const FeatureLeftBar: React.FC = () => {
  return (
    <nav>
      <ul>
        {featureCatalog.map((f) => (
          <li key={f.id}>
            <NavLink
              to={`/examples/features/${f.id}`}
              className={({ isActive }) =>
                "leftbar-link" + (isActive ? " active" : "")
              }
              end
            >
              {f.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FeatureLeftBar;
