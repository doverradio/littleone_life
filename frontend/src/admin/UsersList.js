// src/admin/UsersList.js

import React from 'react';
import ReusableDatatable from '../components/utils/datatable/ReusableDatatable';

const UsersList = ({ users }) => {
  const columns = [
    { title: 'Username', accessor: 'username' },
    { title: 'First Name', accessor: 'firstName' },
    { title: 'Last Name', accessor: 'lastName' },
    { title: 'Email', accessor: 'email' },
    { title: 'Phone', accessor: 'phone' },
    { title: 'Role', accessor: 'role', render: rowData => (rowData.role === 1 ? 'Admin' : 'User') }
  ];

  return (
    <div>
      <h2>Users List</h2>
      <ReusableDatatable
        data={users}
        columns={columns}
        pageSize={10}
        checkbox={true}
        onDelete={selectedIds => console.log('Delete Users:', selectedIds)}
      />
    </div>
  );
};

export default UsersList;
