import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import logo from 'images/logo.svg';

const LogoLink = () => {
  return (
    <RouterLink to="/" style={{ textDecoration: 'none' }}>
      <Typography
        sx={{
          width: '48px',
          height: '48px',
        }}
      >
        <img
          src={logo}
          alt="Logo"
        />
      </Typography>
    </RouterLink>
  );
};

export default LogoLink;
