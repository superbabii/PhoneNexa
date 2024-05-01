import React, { useContext } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import logo from "images/logo.svg";
import { AppBar, Typography } from "@mui/material";
import { UserContext } from "contexts/userContext";

const AdminTitle = styled.span`
  font-weight: bold;
  font-size: 32px;
  color: white;
  letter-spacing: 5px;
  @media (max-width: 1440px) {
    font-size: 28px;
    letter-spacing: 4px;  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

const TopAvatar = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-size: contain;
  border-radius: 50%;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 20px;
  @media (max-width: 1440px) {
    width: 30px;
    height: 30px;  }
`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-white hocus:text-white
`;

const LogoLink = styled(NavLink)`
  ${tw`flex items-center border-b-0 ml-0!`};

  img {
    ${tw`w-8 2xl:w-12 mr-3`}
  }
  
  font-family: 'Exo', sans-serif;
  font-weight: lighter;
  font-size: 32px;
  letter-spacing: 4px;
  color: white;

  @media (max-width: 1440px) {
    font-size: 24px;  }
`;

export default ({
  logoLink
}) => {

  const { userName } = useContext(UserContext);

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      PhoneNexa
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;

  return (
    <AppBar
      position="fixed"
      sx={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 'none',
        backgroundColor: 'rgba(116, 46, 238, 0.9)',
        color: '#d1bcf4',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        padding: '1rem 4rem',
        transition: 'color 0.5s',
        '&:hover': {
          color: 'white !important',
        },
      }}
    >
      {logoLink}
      <AdminTitle>Admin Control Panel</AdminTitle>
      <TopRight>
        <Typography
          variant="body"
          sx={{
            letterSpacing: '2px',
          }}
        >
          {userName}
        </Typography>
        <TopAvatar
          src={""}
          alt=''
        />
      </TopRight>
    </AppBar>
  );
}
