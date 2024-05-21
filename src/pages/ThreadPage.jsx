import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetDetailThread, resetDetailThreadActionCreator } from '../app/states/detailThread/action';
import { Comments, Thread, ThreadAdd } from '../components';

export default function ThreadPage() {
  const { id } = useParams();

  const { authUser, detailThread } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(asyncGetDetailThread(id));
    return () => {
      dispatch(resetDetailThreadActionCreator());
    };
  }, []);

  if (!detailThread || !id) return null;

  return (
    <section>
      <Thread
        key={detailThread.id}
        id={detailThread.id}
        title={detailThread.title}
        body={detailThread.body}
        category={detailThread.category}
        createdAt={detailThread.createdAt}
        owner={detailThread.owner}
        totalComments={detailThread.comments.length}
        upVotesBy={detailThread.upVotesBy}
        downVotesBy={detailThread.downVotesBy}
      />
      <Comments threadId={id} comments={detailThread.comments} />
      {authUser && <ThreadAdd />}
    </section>
  );
}
