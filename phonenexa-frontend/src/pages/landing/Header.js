import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { UserContext } from "contexts/userContext.js";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = styled.header`
  ${tw`flex justify-around items-center 
    max-w-screen-xl mx-0 fixed w-full top-0 bg-white z-50 left-0
    transition-all duration-500`}
    color: #d1bcf4;
    background-color: ${(props) => (props.isScrolled ? "rgba(116, 46, 238, 0.9)" : "transparent")};
    padding-bottom: ${(props) => (props.isScrolled ? "16px" : "20px")};
    padding-top: ${(props) => (props.isScrolled ? "16px" : "20px")};
    @media (max-width: 1440px) {
      padding-bottom: ${(props) => (props.isScrolled ? "12px" : "16px")};
      padding-top: ${(props) => (props.isScrolled ? "12px" : "16px")};
    }
    @media (max-width: 1280px) {
      padding-bottom: ${(props) => (props.isScrolled ? "8px" : "12px")};
      padding-top: ${(props) => (props.isScrolled ? "8px" : "12px")};
    }
    box-shadow: ${(props) => (props.isScrolled ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "none")};
    $:hover {
      color: white !important;
    }
  `;

export const NavLinks = tw.div`inline-block text-xl`;

export const NavLink = tw.a`
  text-sm my-2 2xl:text-lg lg:mx-6 lg:my-0
  font-mono tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-white hocus:text-white
`;

export const PrimaryLink = styled(NavLink)`
  ${tw`
  lg:mx-0
  px-6 2xl:px-8 
  py-3 2xl:py-3 
  rounded-full
  bg-primary-500 
  text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
  bg-white
  `}
  color: #742EEE !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Add the white shadow directly */
  &:hover {
    color: #ffffff !important; /* Enforce the text color on hover */
  }
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center border-b-0 ml-0!`};

  img {
    ${tw`w-12 2xl:w-16 mr-3`}
  }
  
  font-family: 'Exo', sans-serif;
  font-weight: lighter;
  font-size: 42px;
  letter-spacing: 4px;
  color: white;

  @media (max-width: 1440px) {
    font-size: 36px;
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between mx-5`;

export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;

export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-center items-center
`;

export const defaultLogoLink = (
  <LogoLink href="/">
    <img src={logo} alt="logo" />
    PhoneNexa
  </LogoLink>
);

export default ({
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {
    userName,
    picture,
    userId: id,
    setUserId,
    setUserName,
    setPicture,
  } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');

      setUserId(null);
      setUserName(null);
      setPicture("");

      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Clear session storage
      sessionStorage.clear();

      // Clear all cookies
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      }

      console.log('Logout successful');
      navigate('/'); // Assuming navigate is a function for routing (e.g., from react-router-dom)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderAuthLinks = (userName, picture) => {
    if (userName) {
      return <>
        <a sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          {/* <Tooltip title="Account settings"> */}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              color: '#d1bcf4',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'white',
              },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                borderWidth: 2,
                borderColor: "#d1bcf4",
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
                '&:hover': {
                  borderColor: "white",
                },
              }}
              src={picture}
            />
            <Typography sx={{
              marginLeft: '8px',
              fontFamily: 'monospace',
              fontSize: '16px',
              '@media (min-width: 1440px)': {  // 2xl and larger
                fontSize: '18px',
              },
            }}>
              {userName}
            </Typography>
          </IconButton>
          {/* </Tooltip> */}
        </a>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBoxRoundedIcon style={{ color: '#742EEE' }} fontSize="small" />
            </ListItemIcon>
            <Typography
              fontSize={14}
              fontFamily="monospace"
              color="#742EEE"
            >
              Profile
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings style={{ color: '#742EEE' }} fontSize="small" />
            </ListItemIcon>
            <Typography
              fontSize={14}
              fontFamily="monospace"
              color="#742EEE"
            >
              Settings
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout style={{ color: 'red' }} fontSize="small" />
            </ListItemIcon>
            <Typography
              fontSize={14}
              fontFamily="monospace"
              color="red"
            >
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </>
    } else {
      return <>
        <NavLink href="/login" tw="lg:ml-12!">
          Log in
        </NavLink>
        <PrimaryLink href="/signup">
          Sign up
        </PrimaryLink>
      </>
    }
  };

  const [isHeaderFixed, setHeaderFixed] = useState(false);
  const defaultLinks = [
    <NavLinks key={1}>
      {/* <NavLink href="/admin">Admin</NavLink> */}
      <NavLink href="/features">Features</NavLink>
      <NavLink href="/pricing">Pricing</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <NavLink href="/reviews">Reviews</NavLink>
      {renderAuthLinks(userName, picture)}
    </NavLinks>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  const handleScroll = () => {
    const offset = window.scrollY;
    setHeaderFixed(offset > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header className={`${className || "header-light"}`} isScrolled={isHeaderFixed}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
