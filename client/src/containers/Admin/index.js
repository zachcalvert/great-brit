import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodes } from "store/episodesSlice";

import Stars from "./Stars";
import CreateEpisode from "./CreateEpisode";
import EpisodeList from "./EpisodeList";

import { styles } from "./styles";

const Admin = () => {
  const dispatch = useDispatch();
  const episodes = useSelector((state) => state.episodes.list);

  const [active, setActive] = useState(null);

  useEffect(() => {
    if (episodes.length > 0) {
      setActive(episodes[episodes.length - 1]);
    }
  }, [episodes]);

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`episodes ${styles}`}>
      <Stars />
      <CreateEpisode />
      <EpisodeList active={active} setActive={setActive} />
    </div>
  );
};

export default Admin;
