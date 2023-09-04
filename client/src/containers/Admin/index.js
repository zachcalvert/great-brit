import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { styles } from "./styles";
import { fetchEpisodes, createEpisode } from "store/episodesSlice";
import AdminEvents from "./AdminEvents";

const Admin = () => {
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state.episodes.list);

  const [active, setActive] = useState(null);
  const [newEpisodeNumber, setNewEpisodeNumber] = useState("");

  const handleTabClick = (episodeId) => {
    setActive(episodeId);
  };

  const handleCreateEpisode = () => {
    dispatch(createEpisode({ number: newEpisodeNumber }));
    setNewEpisodeNumber("");
  };

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`episodes ${styles}`}>
      <div className="createForm">
        <TextField
          label="New Episode Number"
          variant="outlined"
          value={newEpisodeNumber}
          onChange={(e) => setNewEpisodeNumber(e.target.value)}
          sx={{ marginRight: "12px" }}
        />
        <Button variant="outlined" onClick={handleCreateEpisode}>
          Create Episode
        </Button>
      </div>
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
    </div>
  );
};

export default Admin;
