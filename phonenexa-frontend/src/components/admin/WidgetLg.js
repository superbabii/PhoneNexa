import React from "react";
import styled from "styled-components";

const WidgetLgContainer = styled.div`
  flex: 2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 20px;
`;

const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

const WidgetLgTh = styled.th`
  text-align: left;
`;

const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const WidgetLgImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
`;

const WidgetLgApproved = styled(WidgetLgButton)`
  background-color: #e5faf2;
  color: #3bb077;
`;

const WidgetLgDeclined = styled(WidgetLgButton)`
  background-color: #fff0f1;
  color: #d95087;
`;

const WidgetLgPending = styled(WidgetLgButton)`
  background-color: #ebf1fe;
  color: #2a7ade;
`;

const WidgetLgDate = styled.td`
  font-weight: 300;
`;

const WidgetLgAmount = styled.td`
  font-weight: 300;
`;

export default function WidgetLg() {
  const Button = ({ type }) => {
    const ButtonType = {
      Approved: WidgetLgApproved,
      Declined: WidgetLgDeclined,
      Pending: WidgetLgPending,
    }[type];

    return <ButtonType>{type}</ButtonType>;
  };

  return (
    <WidgetLgContainer>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <tr>
          <WidgetLgTh>Customer</WidgetLgTh>
          <WidgetLgTh>Data</WidgetLgTh>
          <WidgetLgTh>Amount</WidgetLgTh>
          <WidgetLgTh>Status</WidgetLgTh>
        </tr>
        <tr>
          <WidgetLgUser>
            <WidgetLgImg
              src='https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
            />
            <span>Roger Mathew</span>
          </WidgetLgUser>
          <WidgetLgDate>2 Jun 2021</WidgetLgDate>
          <WidgetLgAmount>$122.00</WidgetLgAmount>
          <td>
            <Button type='Approved' />
          </td>
        </tr>
        <tr>
          <WidgetLgUser>
            <WidgetLgImg
              src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
            />
            <span>Anna Sveltare</span>
          </WidgetLgUser>
          <WidgetLgDate>2 Jun 2021</WidgetLgDate>
          <WidgetLgAmount>$67.00</WidgetLgAmount>
          <td>
            <Button type='Declined' />
          </td>
        </tr>
        <tr>
          <WidgetLgUser>
            <WidgetLgImg
              src='https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
            />
            <span>Jennifer Kolstan</span>
          </WidgetLgUser>
          <WidgetLgDate>2 Jun 2021</WidgetLgDate>
          <WidgetLgAmount>$435.00</WidgetLgAmount>
          <td>
            <Button type='Pending' />
          </td>
        </tr>
        <tr>
          <WidgetLgUser>
            <WidgetLgImg
              src='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png'
              alt=''
            />
            <span>John Hewlett</span>
          </WidgetLgUser>
          <WidgetLgDate>2 Jun 2021</WidgetLgDate>
          <WidgetLgAmount>$56.00</WidgetLgAmount>
          <td>
            <Button type='Approved' />
          </td>
        </tr>
        <tr>
          <WidgetLgUser>
            <WidgetLgImg
              src='https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
            />
            <span>John Federer</span>
          </WidgetLgUser>
          <WidgetLgDate>2 Jun 2021</WidgetLgDate>
          <WidgetLgAmount>$232.00</WidgetLgAmount>
          <td>
            <Button type='Pending' />
          </td>
        </tr>
      </WidgetLgTable>
    </WidgetLgContainer>
  );
}
