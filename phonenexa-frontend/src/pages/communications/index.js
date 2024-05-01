import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import _ from 'lodash';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  styled,
  alpha,
  useTheme,
  Paper,
  Box,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  InputBase,
  TextField,
  Fab,
  InputAdornment,
  Button,
  Grid,
} from '@mui/material';
import {
  MagnifyingGlass,
  Camera,
  Image,
  PaperPlaneTilt,
  Sticker,
  TrashSimple,
  UserCirclePlus,
  UserPlus,
  Phone,
  File,
} from 'phosphor-react';

import ChatElement from 'components/communications/ChatElement';
import StyleBadge from '../../components/communications/StyledBadge';
import { toggleSidebar } from '../../redux/slices/app';
import { UserContext } from 'contexts/userContext';
import {
  TImeline,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from '../../components/communications/MsgTypes';
import ContactInfo from './ContactInfo';
import LogoLink from 'components/communications/LogoLink';
import ThankYouPage from 'components/communications/ThankYouPage';

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import ContactsIcon from '@mui/icons-material/Contacts';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MoodIcon from '@mui/icons-material/Mood';
import MessageIcon from '@mui/icons-material/Message';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Actions = [
  {
    color: '#4da5fe',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video'
  },
  {
    color: '#1b8cfe',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Photo/Video'
  },
  {
    color: '#0172e4',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Photo/Video'
  },
  {
    color: '#0159b2',
    icon: <File size={24} />,
    y: 312,
    title: 'Document'
  },
];

const socket = io('https://phonenexa-server.vercel.app', {
  withCredentials: true,
  transports: ['websocket'],
});

// const socket = io('http://localhost:3030', {
//   withCredentials: true,
//   transports: ['websocket'],
// });

const ClientDashboard = () => {
  const theme = useTheme();

  const isMax1440px = useMediaQuery(theme.breakpoints.down(1440));
  const isMax1024px = useMediaQuery(theme.breakpoints.down(1024));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const scrollBottomRef = useRef(null);

  const { sidebar } = useSelector((store) => store.app);

  const [people, setPeople] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const {
    userName,
    picture,
    userId: id,
    setUserId,
    setUserName,
    setPicture,
  } = useContext(UserContext);

  useEffect(() => {
    if (userName === null || undefined) {
      console.log("username: ", userName)
      navigate('/login');
    }
  }, [userName, navigate]);

  useEffect(() => {
    console.log('Connecting to Socket.IO server...');

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((userMediaStream) => {
        console.log('Got user media stream:', userMediaStream);
        setStream(userMediaStream);

        if (userVideo.current) {
          userVideo.current.srcObject = userMediaStream;
        }
      })
      .catch((error) => console.error('Error accessing media devices:', error));

    socket.on('yourID', (id) => {
      console.log('Received yourID:', id);
      setYourID(id);
    });

    socket.on('allUsers', (receivedUsers) => {
      console.log('Received allUsers:', receivedUsers);
      setUsers(receivedUsers);
    });

    socket.on('hey', (data) => {
      console.log('Received hey:', data);
      setReceivingCall(true);
      //
      setShowSidebar(false);
      setShowConversation(false);
      setShowCalling(true);
      //
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.off('message');
    };
  }, [id]);

  const handleSendSubmit = () => {
    if (newMessage && selectedUserId) {
      const messageData = {
        _id: Date.now(),
        sender: id,
        receiver: selectedUserId,
        text: newMessage,
      };
      socket.emit('sendMessage', messageData); // Emit the message to the server
      setNewMessage('');
      setMessages((prevMessages) => [...prevMessages, messageData]);
    }

    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTo({
        top: scrollBottomRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    setNumberOfLines(1);
  };

  useEffect(() => {
    axios.get('user/users').then(({ data }) => {

      const people = {};
      data.forEach(({ _id, userName, picture, onlineStatus }) => {
        people[_id] = {
          userName,
          picture,
          onlineStatus,
          // Add other properties as needed
        };
      });
      setPeople(people);
    });
  }, [id]);

  useEffect(() => {
    if (selectedUserId) {
      axios
        .get(`message/messages/${selectedUserId}`)
        .then(({ data }) => {
          setMessages(data);
        })
        .catch((error) => console.log(error));
      socket.emit('join', id);
    }
    if (!selectedUserId && sidebar.open)
      dispatch(toggleSidebar());
  }, [selectedUserId]);

  const renderUsers = people && Object.entries(people).map(([userId, user]) => {
  
    if (id === userId) return null;
  
    return (
      <ChatElement
        id={userId}
        img={user.picture}
        name={user.userName}
        msg="Andrey is a full-stack developer"
        time="9:36"
        unread={4}
        pinned={true}
        online={user.onlineStatus}
        key={userId}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
    );
  });

  const handleLogout = async () => {
    try {
      // Assuming you have a proper endpoint for revoking the token on the server
      await axios.post('/auth/logout');

      // Clear user-related state
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openPicker, setOpenPicker] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const [numberOfLines, setNumberOfLines] = useState(1);

  const handleInput = (e) => {
    const lines = e.target.value.split('\n').length;
    setNumberOfLines(lines === 1 ? 1 : lines + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendSubmit();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setNumberOfLines((prevLines) => prevLines + 1);
    }
  };

  const ScrollButton = ({ targetRef }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      if (targetRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = targetRef.current;

        // Adjust visibility based on scroll position within the target section
        setIsVisible(scrollHeight - scrollTop > clientHeight + 100);
      }
    };

    const scrollToBottom = () => {
      if (targetRef.current) {
        targetRef.current.scrollTo({
          top: targetRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    useEffect(() => {
      const currentRef = targetRef.current;

      if (currentRef) {
        currentRef.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
          currentRef.removeEventListener('scroll', handleScroll);
        };
      }
    }, [targetRef]);

    return (
      <>
        {isVisible && (
          <Fab
            size="small"
            color="primary"
            aria-label="scroll to bottom"
            style={{
              position: 'absolute',
              bottom: 100,
              right: sidebar.open ? 360 : 30,
              boxShadow: 'none',
              backgroundColor: '#f9f9fc', // Adjust the color here
              border: "1px solid lightgray",
              '&:hover': {
                backgroundColor: '#125193', // Adjust the hover color here
              },
            }}
            onClick={scrollToBottom}
          >
            <KeyboardArrowDownIcon sx={{ color: "lightgray" }} />
          </Fab>
        )}
      </>
    );
  };

  // Effect to scroll to the bottom when a person is selected or messages change
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTo({
        top: scrollBottomRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [selectedUserId, messages]);

  const [showSidebar, setShowSidebar] = useState(true);
  const [showConversation, setShowConversation] = useState(true);
  const [showCalling, setShowCalling] = useState(false);

  const handlePhoneButtonClick = () => {
    if (selectedUserId) {
      const userId = people[selectedUserId].userId;
      console.log(`Calling ${userId}`);
      setShowSidebar(false);
      setShowConversation(false);
      setShowCalling(true);

      callPeer(selectedUserId);
    }
  };

  const handleReturnToConversation = () => {
    setShowSidebar(false);
    setShowConversation(true);
    setShowCalling(true);
  };

  const userVideo = useRef();
  const partnerVideo = useRef();

  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState(null);
  const [isCallAccepted, setCallAccepted] = useState(false);

  const callPeer = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: yourID });
    });

    peer.on('stream', (partnerStream) => {
      partnerVideo.current.srcObject = partnerStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  };

  const handleCallApproval = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (data) => {
      socket.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', (partnerStream) => {
      partnerVideo.current.srcObject = partnerStream;
    });

    peer.signal(callerSignal);
  };

  const UserVideo = stream && <video sx={{ border: '1px solid blue', width: '50%', height: '50%' }} autoPlay playsInline muted ref={userVideo} />;
  const PartnerVideo = isCallAccepted && <video sx={{ border: '1px solid blue', width: '50%', height: '50%' }} autoPlay playsInline ref={partnerVideo} />;

  const iconData = [
    { label: 'chat', icon: <ChatIcon sx={{ width: '24px', height: '24px' }} /> },
    { label: 'call', icon: <CallIcon sx={{ width: '24px', height: '24px' }} /> },
    { label: 'team', icon: <Diversity1Icon sx={{ width: '24px', height: '24px' }} /> },
    { label: 'contact', icon: <ContactsIcon sx={{ width: '24px', height: '24px' }} /> },
  ];

  return (
    <Stack direction="row" sx={{ width: '100%', height: '100%' }}>
      {/* sidebar */}
      <Box sx={{ display: showSidebar ? 'block' : 'none' }}>
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, backgroundColor: "#f9f9fc", height: '100%' }}>
          <Box
            margin="16px 8px"
            padding="32px 16px 64px 16px"
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: "auto",
              backgroundColor: theme.palette.primary.main,
              boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.5)",
              color: "white",
              borderRadius: "12px",
              minHeight: 'calc(100vh - 32px)'
            }}
          >
            <LogoLink />

            <Box sx={{ marginTop: '96px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {iconData.map(({ label, icon }) => (
                <IconButton
                  key={label}
                  aria-label={label}
                  id={`${label}-button`}
                  // onClick={handleClick} // Add your click handler
                  sx={{
                    padding: "10px", // You can adjust the padding as needed
                    // width: "36px", // Set the width to 36 pixels
                    // height: "36px", // Set the height to 36 pixels
                    color: "white",
                    cursor: 'pointer',
                    border: "2px solid #742eee", // Apply border directly
                    '&:hover': {
                      // background: '#bdbdbd',
                      border: "2px solid white", // Apply border directly
                      boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.25)'
                    },
                    marginBottom: '48px', // Adjust the margin between icons vertically
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Box>
            <Box sx={{ marginTop: 'auto' }}>
              <Divider color="white" sx={{ marginBottom: "36px" }} />
              <IconButton
                aria-label="avatar"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleAvatarClick}
                sx={{
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
                  padding: "0",
                  cursor: 'pointer',
                  '&:hover': {
                    background: '#742EEE',
                    color: 'white'
                  }
                }}
              >
                <Avatar
                  id="basic-button"
                  src={picture}
                  sx={{
                    width: 48,
                    height: 48,
                    borderWidth: 2,
                    borderColor: "white",
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
                  }}
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                sx={{
                  marginLeft: '48px', // Adjust the value as needed
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountBoxRoundedIcon style={{ color: theme.palette.primary.main }} fontSize="small" />
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
                    <Settings style={{ color: theme.palette.primary.main }} fontSize="small" />
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
            </Box>
          </Box>

          <Box
            sx={{
              padding: "32px 0px 0px 0px",
              position: "relative",
              width: 300,
              justifyContent: "center",
            }}
          >
            <Stack sx={{ width: "100%", padding: "0px 12px 4px 12px" }} >
              <Search style={{
                backgroundColor: "lightgray"
              }}>
                <SearchIconWrapper>
                  <MagnifyingGlass />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
              </Search>
            </Stack>
            <Typography variant='caption' color="lightgray">Recent Chats</Typography>
            <Stack direction="column" sx={{ flexGrow: 1, overflow: "auto" }}>
              <Stack sx={{ marginTop: "4px" }}>
                {renderUsers}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
      {/* calling */}
      <Box sx={{ display: showCalling ? 'block' : 'none' }}>
        <Box style={{
          width: showConversation ? 'calc(100% - 200px)' : '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'white', // Replace with your preferred background color
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            {!isCallAccepted && receivingCall ?
              <Paper>
                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  <h1>{caller} is calling you</h1>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CallIcon />}
                    onClick={handleCallApproval}
                    style={{
                      margin: '0 8px',
                    }}
                  >
                    Accept Call
                  </Button>
                </div>
              </Paper> : !receivingCall ? <Avatar
                alt="Other User"
                // src={otherUserAvatar} 
                style={{
                  width: '80px',
                  height: '80px',
                  marginBottom: '16px',
                }}
              /> : <></>}
            {isCallAccepted ?
              <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Grid sx={{ display: 'flex', width: '100%' }}>
                  {PartnerVideo}
                  {UserVideo}
                </Grid>
                <Grid>
                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <IconButton
                      color="secondary"
                      // onClick={onCameraToggle}
                      style={{
                        margin: '0 8px',
                      }}
                    >
                      <VideocamOffIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      // onClick={onMicToggle}
                      style={{
                        margin: '0 8px',
                      }}
                    >
                      <MicOffIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={handleReturnToConversation}
                      style={{
                        margin: '0 8px',
                      }}
                    >
                      <MessageIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="secondary"
                      // onClick={onCallEnd}
                      style={{
                        margin: '0 8px',
                      }}
                    >
                      End Call
                    </Button>
                  </div>
                </Grid>
              </Box> : <></>
            }
          </Box>
        </Box>
      </Box>
      {/* conversation */}
      <Box
        sx={{
          display: showConversation ? 'flex' : 'none',
          width: showCalling ? '200px' : 'auto',
          height: '100%'
        }}
      >
        {/* Main Chat Box */}
        <Box
          sx={{
            width: {
              xs: `calc(100vw - ${sidebar.open ? '334px' : '0px'})`,
              lg: `calc(100vw - ${sidebar.open ? '730px' : '396px'})`,
            },
            backgroundColor: 'white',
          }}
        >
          <Stack maxHeight={'calc(100vh - 12px)'} width="auto">
            {selectedUserId ?
              <Box
                margin="16px 16px 4px 32px"
                padding="16px"
                sx={{
                  width: "auto",
                  backgroundColor: "#f9f9fc",
                  boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.2)",
                  // color: "#742EEE",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  borderWidth: 1, borderColor: "white", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
                }}
              >
                <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }}>
                  <Stack onClick={() => {
                    dispatch(toggleSidebar());
                  }} direction="row" spacing={2}>
                    <Box>
                      <StyleBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right"
                        }}
                        variant="dot"
                      >
                        <Avatar
                        // alt={faker.name.fullName()}
                        src={people[selectedUserId].picture}
                        />
                      </StyleBadge>
                    </Box>
                    <Stack spacing={0.2}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {selectedUserId ? people[selectedUserId].userName : 'Andrey'}
                      </Typography>
                      {/* <Typography variant="caption">Online</Typography> */}
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    spacing={isMax1440px ? 1 : 2}
                    sx={{
                      display: isMax1024px ? 'none' : 'flex',
                    }}
                  >
                    <IconButton>
                      <UserPlus color="gray" />
                    </IconButton>
                    <IconButton>
                      <UserCirclePlus color="gray" />
                    </IconButton>
                    <IconButton onClick={handlePhoneButtonClick}>
                      <Phone color="gray" />
                    </IconButton>
                    <IconButton>
                      <TrashSimple color="gray" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
              : <></>}
            <Box ref={scrollBottomRef} width="100%" sx={{ flexGrow: 1, height: '100%', overflowY: "scroll" }}>
              <Box sx={{ padding: `48px calc(6vw)`, minHeight: 'calc(100vh - 174px)' }}>
                <Stack spacing={3}>
                  {!selectedUserId ? (
                    <ThankYouPage />
                  ) : (
                    <Box
                      component="div"
                      sx={{
                        position: 'relative',
                        height: '100%',
                      }}
                    >
                      <Box sx={{
                        display: 'contents',
                        position: 'absolute',
                        // inset: 0,
                        overflowY: 'auto',
                      }}
                      >
                        {messages.map((m, index) => (
                          <Box key={index} sx={{
                            display: 'flex',
                            justifyContent: m.sender === id ? "flex-end" : "flex-start",
                            paddingLeft: m.sender === id ? "250px" : "0px",
                            paddingRight: m.sender === id ? "0px" : "150px",
                          }}>
                            <Box
                              sx={{
                                width: 'fit-content',
                                padding: '12px',
                                margin: '1px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                backgroundColor: m.sender === id ? "#a27eee" : 'lightgray',
                                color: m.sender === id ? '#FFFFFF' : 'black',
                              }}
                              component="div"
                            >
                              {m.text}
                            </Box>
                          </Box>
                        ))}
                        <Box ref={ref}></Box>
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Box>
            {/* //footer-part */}
            {selectedUserId && (
              <Paper
                elevation={0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: `4px calc(6vw)`
                }}
              >
                {/* File Add Button */}
                <IconButton style={{
                  borderRadius: '50%',
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.3)',
                }}>
                  <AttachFileIcon />
                </IconButton>

                {/* Message Input */}
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Type a message..."
                  style={{ margin: '8px', }}
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleInput(e);
                  }}
                  onKeyDown={handleKeyDown}
                  multiline
                  rows={numberOfLines}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* Emotion Button */}
                        <IconButton>
                          <MoodIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      padding: '12px 18px',
                      borderRadius: '28px',
                      fontSize: '14px',
                      boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)'
                    },
                  }}
                />
                {/* Send Button */}
                <IconButton
                  type='submit'
                  onClick={handleSendSubmit}
                  style={{
                    borderRadius: '50%',
                    backgroundColor: "#742eee",
                    color: "white",
                    boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.4)',
                  }}>
                  <PaperPlaneTilt />
                </IconButton>
                <div ref={ref} />
              </Paper>
            )}
          </Stack>
          <ScrollButton targetRef={scrollBottomRef} />
        </Box>
        <Box>{selectedUserId && sidebar.open ? <ContactInfo userId={people[selectedUserId]}/> : <></>}</Box>
      </Box>
    </Stack>
  );
};

export default ClientDashboard;