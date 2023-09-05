import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodes } from "store/episodesSlice";

import AdminEvents from "components/Events";

const Admin = ({ active, setActive }) => {
  const episodes = useSelector((state) => state.episodes.list);

  const handleTabClick = (episodeId) => {
    setActive(episodeId);
  };

  return (
    <div className="folder">
      <div className="tabs">
        {episodes.map((episode) => {
          const tabClass =
            episode._id === active?._id ? "tab active" : "tab inactive";

          return (
            <div
              key={episode._id}
              className={tabClass}
              onClick={() => handleTabClick(episode)}
            >
              {episode.number}
            </div>
          );
        })}
      </div>
      <div className="main">
        <h1>Episode {active?.number}</h1>
        {active && <AdminEvents episodeId={active?._id} />}
      </div>
    </div>
  );
};

export default Admin;
