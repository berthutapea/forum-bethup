import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../app/states/shared/action';
import { Categories, ThreadAdd, Threads } from '../components';

export default function ThreadsPage() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const [keyword, setKeyword] = useState('');

  const onKeyword = (category) =>
    setKeyword((state) => (state === category ? '' : category));

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, []);

  const threadsList = threads.filter((thread) =>
    thread.category.includes(keyword)
  );
  const categories = threads
    .map((item) => item.category)
    .filter(
      (category, index, currentCategory) =>
        currentCategory.indexOf(category) === index
    );

  return (
    <section>
      <Categories
        categories={categories}
        keyword={keyword}
        onKeyword={onKeyword}
      />
      <Threads threads={threadsList} />
      {authUser && <ThreadAdd />}
    </section>
  );
}
