import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { productData } from "./dummyData";
import Chart from "components/admin/Chart";

const ProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const ProductTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
  margin-left: 20px;
`;

const ProductCreateButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: teal;
  border-radius: 5px;
  color: white;
  font-size: 16px;
`;

const ProductContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductContainerLeft = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  margin: 20px;
`;

const ProductContainerRight = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 40px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductInfoTitle = styled.h2`
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  display: flex;
`;

const ProductInfoItem = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const ProductInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
  flex: 1;
`;

const ProductInfoRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ProductImage = styled.img`
  width: 100px;
  object-fit: cover;
  height: 100px;
`;

export default function Product() {
  return (
    <ProductContainer>
      <ProductTop>
        <ProductTitle>Product</ProductTitle>
        <Link to='/newProduct' className='link'>
          <ProductCreateButton>Create</ProductCreateButton>
        </Link>
      </ProductTop>
      <ProductContainerWrapper>
        <ProductContainerLeft>
          <Chart data={productData} title={"Sales Analytics"} dataKey={"Sales"} grid={true} />
        </ProductContainerLeft>
        <ProductContainerRight>
          <ProductInfoTitle>Product Info</ProductInfoTitle>
          <ProductInfo>
            <ProductInfoLeft>
              <ProductInfoItem>
                <h4 className='product__item--title'>Product ID</h4>
                <h4 className='product__item--seperator'>:</h4>
                <p className='product__item--value'>123</p>
              </ProductInfoItem>
              <ProductInfoItem>
                <h4 className='product__item--title'>Sales</h4>
                <h4 className='product__item--seperator'>:</h4>
                <p className='product__item--value'>12,200</p>
              </ProductInfoItem>
              <ProductInfoItem>
                <h4 className='product__item--title'>Active</h4>
                <h4 className='product__item--seperator'>:</h4>
                <p className='product__item--value'>Yes</p>
              </ProductInfoItem>
              <ProductInfoItem>
                <h4 className='product__item--title'>In Stock</h4>
                <h4 className='product__item--seperator'>:</h4>
                <p className='product__item--value'>No</p>
              </ProductInfoItem>
            </ProductInfoLeft>
            <ProductInfoRight>
              <ProductImage
                className='product__image-image'
                src='https://specials-images.forbesimg.com/imageserve/5f5293860289c180f9dd5a41/960x0.jpg?fit=scale'
                alt=''
              />
            </ProductInfoRight>
          </ProductInfo>
        </ProductContainerRight>
      </ProductContainerWrapper>
    </ProductContainer>
  );
}
