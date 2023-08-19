import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { mockData } from "./mockData";
import { fetchStars } from "store/starsSlice";
import { starsSelector } from "store/starsSlice";
import { tableStyles } from "./styles";

const StarsList = () => {
  const dispatch = useDispatch();
  const stars = useSelector(starsSelector);

  useEffect(() => {
    dispatch(fetchStars());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`betTable ${tableStyles}`}>
      {stars?.map((bet) => {
        return (
          <div key={bet.id} className="betCard">
            <div>{bet.firstName}</div>
            <div>{bet.lastName}</div>
            <div>{bet.bio}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StarsList;
