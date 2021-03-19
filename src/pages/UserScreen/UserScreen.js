import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SimpleTable from '../../components/formElements/table/SimpleTable';
import { getUsers } from '../../redux/actions/usersAction';

import './UserScreen.css';

const UserScreen = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <p>-- Click on the column names to sort --</p>
      {loading && <p>Loading...</p>}
      {users.users && <SimpleTable users={users.users} />}
      {users.length === 0 && !loading && <p>No users available!</p>}
    </>
  );
};

export default UserScreen;
