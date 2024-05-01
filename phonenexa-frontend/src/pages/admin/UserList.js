import React, { useState } from "react";
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { DefaultContainer } from "./Home";

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
  object-fit: cover;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
`;

const UserListEditButton = styled.button`
  // border: none;
  border-radius: 5px;
  margin: 5px 10px;
  background-color: #3bb077;
  cursor: pointer;
  margin-right: 20px;
  color: white;
`;

const UserListDeleteButton = styled(DeleteOutlineIcon)`
  color: red;
  cursor: pointer;
`;

export default ({ data }) => {
  const [users, setUsers] = useState(data.map((user, index) => ({ ...user, id: index + 1 })));

  const removeUserHandler = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt='' />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/usermanagement/" + params.row.id}>
              <UserListEditButton>Edit</UserListEditButton>
            </Link>
            <UserListDeleteButton
              onClick={() => removeUserHandler(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <DefaultContainer>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        checkboxSelection
      />
    </DefaultContainer>
  );
}
