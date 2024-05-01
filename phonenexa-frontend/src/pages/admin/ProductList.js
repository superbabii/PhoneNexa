import React, { useState } from "react";
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";

const ProductListContainer = styled.div`
  flex: 4;
`;

const ProductListProduct = styled.div`
  display: flex;
  align-items: center;
`;

const ProductListImg = styled.img`
  object-fit: cover;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  border-radius: 50%;
`;

const ProductListEdit = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #3bb077;
  cursor: pointer;
  margin-right: 20px;
  color: white;
`;

const ProductListDelete = styled(DeleteOutlineIcon)`
  color: red;
  cursor: pointer;
`;

export default function ProductList({ data }) {
  const [products, setProducts] = useState(data);

  const removeUserHandler = (id) => {
    setProducts(products.filter((user) => user.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "image",
      headerName: "Product Image",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListProduct>
            <ProductListImg
              src={params.row.image}
              alt=""
              className="productListImg"
            />
            {params.row.name}
          </ProductListProduct>
        );
      },
    },
    {
      field: "type",
      headerName: "Product Type",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
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
            <Link to={"/product/" + params.row.id}>
              <ProductListEdit>Edit</ProductListEdit>
            </Link>
            <ProductListDelete
              onClick={() => removeUserHandler(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <ProductListContainer>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        checkboxSelection
      />
    </ProductListContainer>
  );
}
