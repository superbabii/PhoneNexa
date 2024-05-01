import { Box, Stack, IconButton, Typography, Divider, Avatar, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from 'redux/slices/app';
import { faker } from '@faker-js/faker';
import { Phone, Prohibit, Trash, VideoCamera, X, Buildings, DotsThree, UserSquare, Eye, At, UserCircle } from 'phosphor-react';

const ContactInfo = (props) => {
    const { onlineStatus, picture, userName } = props.userId;
    console.log(userName);
    const dispatch = useDispatch();
    return (
        <Box>
            <Stack sx={{
                width: 300,
                margin: '8px 8px 0px 16px',
            }}>
                <Box sx={{
                    // boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    backgroundColor: "white",
                    color: "#742EEE",
                    margin: "8px"
                }}>
                    <Stack sx={{ height: "auto", m: 2, }} direction="row" alignItems={"center"} justifyContent="end" spacing={3}>
                        {/* <Typography variant='subtitle2'>Contact Info</Typography> */}
                        <IconButton onClick={() => {
                            dispatch(toggleSidebar());
                        }}>
                            <X
                            // color="#742EEE"
                            />
                        </IconButton>
                    </Stack>
                </Box>
                <Stack
                    sx={{
                        height: `calc(100vh - 96px)`, // Add spaces around the operator
                        position: "relative",
                        flexGrow: 1,
                        overflowY: "auto",
                        backgroundColor: "#f9f9fc",
                        borderRadius: "16px",
                    }}
                    p={3}
                    spacing={3}
                >
                    <Stack alignItems={"center"} justifyContent={"center"} direction={"row"} spacing={3}>
                        <Avatar src={picture} alt={"avatar"} sx={{ height: 72, width: 72, borderWidth: 3, borderColor: "white", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)', }} />
                        <Stack spacing={1}>
                            <Typography variant='article' fontWeight={600}>
                                {userName}
                            </Typography>
                            <Typography variant='body2' fontWeight={500}>
                                {'@ByteBuilder'}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                        <Stack spacing={1} alignItems={"center"}>
                            <IconButton>
                                <Phone />
                            </IconButton>
                            <Typography variant='overline'>Voice</Typography>
                        </Stack>
                        <Stack spacing={1} alignItems={"center"}>
                            <IconButton>
                                <VideoCamera />
                            </IconButton>
                            <Typography variant='overline'>Vedeo</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack spacing={2}>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"} color={"lightgray"}>
                                <Buildings />
                                <Typography paddingLeft={"8px"} fontSize={14}>Company</Typography>
                            </Stack>
                            <Typography fontSize={14}>
                                {userName}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"} color={"lightgray"}>
                                <UserCircle />
                                <Typography paddingLeft={"8px"} fontSize={14}>Role</Typography>
                            </Stack>
                            <Typography fontSize={14}>
                                Project Manager
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"} color={"lightgray"}>
                                <At />
                                <Typography paddingLeft={"8px"} fontSize={14}>Email</Typography>
                            </Stack>
                            <Typography fontSize={14}>
                                ByteBuilder@gmail.com
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"} color={"lightgray"}>
                                <DotsThree />
                                <Typography paddingLeft={"8px"} fontSize={14}>Lead status</Typography>
                            </Stack>
                            <Typography fontSize={14} backgroundColor="#742EEE" color={"white"} borderRadius={"3px"} padding={"2px"}>
                                Customer
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack color={"lightgray"} direction={"row"} alignItems={"center"}>
                                <UserSquare />
                                <Typography paddingLeft={"8px"} fontSize={14}>Creator</Typography>
                            </Stack>
                            <Typography fontSize={14}>
                                You
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent={"space-between"}>
                            <Stack direction={"row"} alignItems={"center"} color={"lightgray"}>
                                <Eye />
                                <Typography paddingLeft={"8px"} fontSize={14}>Access</Typography>
                            </Stack>
                            <Typography fontSize={14}>
                                Everyone
                            </Typography>
                        </Stack>
                    </Stack>

                    <Divider />
                    {/* <Typography>1 group in common</Typography>
                <Stack dirction="row" spacing={2} alignItems={"center"}>
                    <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>
                    <Stack spacing={0.5}>
                        <Typography variant='subtitle2'>PhoneNexa</Typography>
                        <Typography variant='caption'>Owl, Parrot, Rabbit, You</Typography>
                    </Stack>
                </Stack> */}

                    <Stack direction={"row"} alignItems={"center"} spacing={2} >
                        <Button startIcon={<Prohibit />} fullWidth variant="outlined">
                            Block
                        </Button>
                        <Button startIcon={<Trash />} fullWidth variant="outlined">
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ContactInfo