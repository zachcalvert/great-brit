import React, { useState } from "react";
import { styles } from "./styles";

const Episodes = () => {
  const [active, setActive] = useState(0);

  const mockEpisodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={`episodes ${styles}`}>
      <div className="tabs">
        {mockEpisodes.map((episode) => {
          const tabClass = episode === active ? "tab active" : "tab inactive";

          return (
            <div
              key={episode}
              className={tabClass}
              onClick={() => setActive(episode)}
            >
              {episode}
            </div>
          );
        })}
      </div>
      <div className="main"></div>
    </div>
  );
};

export default Episodes;
