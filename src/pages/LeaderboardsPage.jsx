import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../app/states/leaderboards/action';
import { Leaderboards } from '../components';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, []);

  return (
    <section>
      <Leaderboards leaderboards={leaderboards} />
    </section>
  );
}
