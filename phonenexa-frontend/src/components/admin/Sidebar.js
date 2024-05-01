import React from "react";
import styled from "styled-components";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/material";

const SidebarListItem = styled.li`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  align-items: center;
  @media (max-width: 1440px) {
    padding: 4px;
    font-size: 12px;  
  }

  &:hover {
    background-color: white;
    color: #742EEE;
  }
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const SidebarIcon = styled.div`
  margin-right: 20px;
  font-size: 20px;
`;

export default function Sidebar() {
  return (
    <Box
      flex={1}
      width={300}
      height="calc(100vh - 130px)"
      bgcolor="#742EEE"
      position="fixed"
      color='lightgray'
      marginLeft={2}
      borderRadius={2}
      zIndex={1}
      boxShadow="0 0 8px 4px rgba(0, 0, 0, 0.5)"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '56px',
        // alignItems: 'center',
        '@media (max-width: 1440px)': {
          width: 240,
        },
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          width: 'fit-content',
          height: 'fit-content',
          '@media (max-width: 1440px)': {
            spacing: 0,
          },
          '@media (max-width: 1280px)': {
            spacing: 0.5,
          },
        }}
      >
        <SidebarLink to="/admin" className="link">
          <SidebarListItem>
            <SidebarIcon as={HomeIcon} />
            Dashboard
          </SidebarListItem>
        </SidebarLink>
        <SidebarLink to="/usermanagement" className="link">
          <SidebarListItem>
            <SidebarIcon as={PersonIcon} />
            User
          </SidebarListItem>
        </SidebarLink>
        <SidebarLink to="/admin/productlist" className="link">
          <SidebarListItem>
            <SidebarIcon as={AttachMoneyIcon} />
            Funds
          </SidebarListItem>
        </SidebarLink>
        {/* <SidebarListItem>
          <SidebarIcon as={CallIcon} />
          Call
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={VoicemailIcon} />
          Voicemail
        </SidebarListItem> */}
        <SidebarListItem>
          <SidebarIcon as={MailOutlineIcon} />
          Logs and Analytics
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={SettingsIcon} />
          Settings
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={SecurityIcon} />
          Security
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={SystemUpdateAltIcon} />
          Updates
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={HelpIcon} />
          Help
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={HistoryIcon} />
          Logging
        </SidebarListItem>
        <SidebarListItem>
          <SidebarIcon as={NotificationsIcon} />
          Notifications
        </SidebarListItem>
      </Stack>
    </Box>
  );
}
