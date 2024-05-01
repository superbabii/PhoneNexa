import React from "react";
import styled from "styled-components";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublishIcon from '@mui/icons-material/Publish';
import { Link } from "react-router-dom";

const UserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  cursor: pointer;
  background-color: teal;
  border-radius: 5px;
  color: white;
  font-size: 16px;
`;

const UserShow = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 20px;
  margin-right: 20px;
`;

const UserUpdate = styled.div`
  flex: 2;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 20px;
`;

const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;

const UserShowImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  object-fit: cover;
`;

const UserShowTopTitle = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserShowName = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const UserShowTitleTop = styled.span`
  font-weight: 300;
  font-size: 14px;
`;

const UserShowTitle = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: rgb(175, 170, 170);
`;

const UserShowBottom = styled.div`
  margin-top: 20px;
`;

const UserShowInfo = styled.div`
  display: flex;
  align-content: center;
  margin: 20px 0;
  color: #444;
`;

const UserShowInfoTitle = styled.span`
  margin-left: 10px;
`;

const UserUpdateImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const UserUpdateForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const UserUpdateTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const UserUpdateInputLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

const UserUpdateInput = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  color: rgb(75, 75, 75);
  border-bottom: 1px solid grey;
`;

const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;

const UserUpdateIcon = styled(PublishIcon)`
  cursor: pointer;
`;

const UserUpdateButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  background-color: darkblue;
  color: white;
  font-weight: bolder;
`;

export default function User() {
  return (
    <UserContainer>
      <UserTitleContainer>
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <UserAddButton>Create</UserAddButton>
        </Link>
      </UserTitleContainer>
      <UserShow>
        <UserShowTop>
          <UserShowImg
            src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
            alt=""
          />
          <UserShowTopTitle>
            <UserShowName>Patrick Steward</UserShowName>
            <UserShowTitleTop>Software Developer</UserShowTitleTop>
          </UserShowTopTitle>
        </UserShowTop>
        <UserShowBottom>
          <UserShowTitle>Account Details</UserShowTitle>
          <UserShowInfo>
            <PermIdentityIcon className="userShowIcon" />
            <UserShowInfoTitle>patrick11</UserShowInfoTitle>
          </UserShowInfo>
          <UserShowInfo>
            <CalendarTodayIcon className="userShowIcon" />
            <UserShowInfoTitle>10.12.1999</UserShowInfoTitle>
          </UserShowInfo>
          <UserShowTitle>Contact Details</UserShowTitle>
          <UserShowInfo>
            <PhoneAndroidIcon className="userShowIcon" />
            <UserShowInfoTitle>+1 123 456 67</UserShowInfoTitle>
          </UserShowInfo>
          <UserShowInfo>
            <MailOutlineIcon className="userShowIcon" />
            <UserShowInfoTitle>patrick11@gmail.com</UserShowInfoTitle>
          </UserShowInfo>
          <UserShowInfo>
            <LocationSearchingIcon className="userShowIcon" />
            <UserShowInfoTitle>New York | USA</UserShowInfoTitle>
          </UserShowInfo>
        </UserShowBottom>
      </UserShow>
      <UserUpdate>
        <UserUpdateTitle>Edit</UserUpdateTitle>
        <UserUpdateForm>
          <div className="userUpdateLeft">
            <UserUpdateItem>
              <UserUpdateInputLabel>Username</UserUpdateInputLabel>
              <UserUpdateInput
                type="text"
                placeholder="patrick11"
                className="userUpdateInput"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateInputLabel>Full Name</UserUpdateInputLabel>
              <UserUpdateInput
                type="text"
                placeholder="Patrick Steward"
                className="userUpdateInput"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateInputLabel>Email</UserUpdateInputLabel>
              <UserUpdateInput
                type="text"
                placeholder="patrick11@gmail.com"
                className="userUpdateInput"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateInputLabel>Phone</UserUpdateInputLabel>
              <UserUpdateInput
                type="text"
                placeholder="+1 123 456 67"
                className="userUpdateInput"
              />
            </UserUpdateItem>
            <UserUpdateItem>
              <UserUpdateInputLabel>Address</UserUpdateInputLabel>
              <UserUpdateInput
                type="text"
                placeholder="New York | USA"
                className="userUpdateInput"
              />
            </UserUpdateItem>
          </div>
          <UserUpdateRight>
            <UserUpdateUpload>
              <UserUpdateImg
                src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
                alt=""
              />
              <UserUpdateIcon />
              <input type="file" id="file" style={{ display: "none" }} />
            </UserUpdateUpload>
            <UserUpdateButton>Update</UserUpdateButton>
          </UserUpdateRight>
        </UserUpdateForm>
      </UserUpdate>
    </UserContainer>
  );
}
