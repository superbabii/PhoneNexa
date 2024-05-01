import React from 'react';
import { Box, Stack, Typography, Avatar, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from './StyledBadge';
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';

const ChatElement = ({ id, name, img, msg, time, unread, online, selectedUserId, setSelectedUserId }) => {
    const theme = useTheme();
    if (!name) return;

    const StyledUnreadBadge = styled(Badge)(() => ({
        '& .MuiBadge-badge': {
            right: 0,
            top: 0,
        },
    }));

    return (
        <Box
            sx={{
                margin: "4px 8px",
                padding: "8px 12px",
                borderRadius: 1,
                backgroundColor: id === selectedUserId ? "#a27eee" : "white",
                color: id === selectedUserId ? "white" : "inherit",
                backgroundImage: id === selectedUserId
                    ? `linear-gradient(to right, #742eee 2%, transparent 2%)`
                    : "none",
                boxShadow: id === selectedUserId ? '0px 0px 8px 2px rgba(0, 0, 0, 0.3)' : 'none',
                '&:hover': {
                    cursor: 'pointer',
                },
            }}
            onClick={() => {
                setSelectedUserId(id);
                console.log(id);
            }}
        >
            <Stack direction="row" alignItems={"flex-start"} justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        online={online} // Pass the online status to the StyledBadge component
                    >
                        <Avatar sx={{ width: "50px", height: "50px" }} src={img} />
                    </StyledBadge>
                    <Stack spacing={0.3} sx={{ maxWidth: '160px', overflow: 'hidden' }}>
                        <Typography variant="subtitle1" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: 'bold' }}>
                            {name}
                        </Typography>
                        <Typography variant="caption" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: id === selectedUserId ? "White" : "gray" }}>
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack paddingTop={0.5} spacing={2} alignItems="center">
                    <Typography sx={{ frontWeight: 600 }} variant="caption">
                        {time}
                    </Typography>
                    <StyledUnreadBadge color="primary" badgeContent={unread} />
                </Stack>
            </Stack>
        </Box>
    );
};

ChatElement.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    img: PropTypes.string,
    msg: PropTypes.string,
    time: PropTypes.string,
    unread: PropTypes.number,
    online: PropTypes.string,
    selectedUserId: PropTypes.string,
    setSelectedUserId: PropTypes.func,
};

export default ChatElement;
