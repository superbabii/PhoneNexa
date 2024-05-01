import React from "react";
import styled from "styled-components";
import VisibilityIcon from '@mui/icons-material/Visibility';

const WidgetSmContainer = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  margin-right: 20px;
  padding: 20px;
`;

const WidgetSmTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;

const WidgetSmImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const WidgetSmList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  flex-grow: 1;
`;

const WidgetSmListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const WidgetSmUser = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

const WidgetSmUsername = styled.span`
  font-weight: 600;
`;

const WidgetSmUserTitle = styled.span`
  font-size: 14px;
  font-weight: 200;
`;

const WidgetSmButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
`;

const WidgetSmIcon = styled(VisibilityIcon)`
  font-size: 16px;
  margin-right: 5px;
`;

export default function WidgetSm() {
  return (
    <WidgetSmContainer>
      <WidgetSmTitle>New Join Members</WidgetSmTitle>
      <WidgetSmList>
        <WidgetSmListItem>
          <WidgetSmImg
            src='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png'
            alt=''
          />
          <WidgetSmUser>
            <WidgetSmUsername>John Hewlett</WidgetSmUsername>
            <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
          </WidgetSmUser>
          <WidgetSmButton>
            <WidgetSmIcon />
            Display
          </WidgetSmButton>
        </WidgetSmListItem>
        <WidgetSmListItem>
          <WidgetSmImg
            src='https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt=''
          />
          <WidgetSmUser>
            <WidgetSmUsername>John Federer</WidgetSmUsername>
            <WidgetSmUserTitle>Concept Artist</WidgetSmUserTitle>
          </WidgetSmUser>
          <WidgetSmButton>
            <WidgetSmIcon />
            Display
          </WidgetSmButton>
        </WidgetSmListItem>
        <WidgetSmListItem>
          <WidgetSmImg
            src='https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt=''
          />
          <WidgetSmUser>
            <WidgetSmUsername>Jennifer Kolstan</WidgetSmUsername>
            <WidgetSmUserTitle>Project Manager</WidgetSmUserTitle>
          </WidgetSmUser>
          <WidgetSmButton>
            <WidgetSmIcon />
            Display
          </WidgetSmButton>
        </WidgetSmListItem>
        <WidgetSmListItem>
          <WidgetSmImg
            src='https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt=''
          />
          <WidgetSmUser>
            <WidgetSmUsername>Roger Mathew</WidgetSmUsername>
            <WidgetSmUserTitle>Sound Designer</WidgetSmUserTitle>
          </WidgetSmUser>
          <WidgetSmButton>
            <WidgetSmIcon />
            Display
          </WidgetSmButton>
        </WidgetSmListItem>
        <WidgetSmListItem>
          <WidgetSmImg
            src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt=''
          />
          <WidgetSmUser>
            <WidgetSmUsername>Anna Sveltare</WidgetSmUsername>
            <WidgetSmUserTitle>Product Manager</WidgetSmUserTitle>
          </WidgetSmUser>
          <WidgetSmButton>
            <WidgetSmIcon />
            Display
          </WidgetSmButton>
        </WidgetSmListItem>
        <WidgetSmListItem>
          <WidgetSmImg
            src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt=''
          />
          <WidgetSmUser>
            <WidgetSmUsername>Anna Sveltare</WidgetSmUsername>
            <WidgetSmUserTitle></WidgetSmUserTitle>
          </WidgetSmUser>
          <WidgetSmButton>
            <WidgetSmIcon />
            Display
          </WidgetSmButton>
        </WidgetSmListItem>
      </WidgetSmList>
    </WidgetSmContainer>
  );
}
