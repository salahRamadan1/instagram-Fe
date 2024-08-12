import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import Person2Icon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import './leftBar.css'
import { imgUrl, user } from '../../future/shareFunction/tokenJwtDecode';
import { socket } from '../../future/shareFunction/socket';
import { getNotiUnSeen, makeNotiSeen } from '../../redux/noti/notiAction';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function LeftBar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { isLoggedIn, userData } = useSelector((state) => state.auth);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    let navigate = useNavigate(); // Navigation function

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
        // handleDisconnect()

    };
    const handleGoToNti = async () => {
        makeNotiSeen()
        console.log('hello');
        setLengthNotiApi(false)
        setLengthNotiSocket(false)
    }
    const [lengthNotiApi, setLengthNotiApi] = React.useState(false);
    const getNotificationUnSeen = async () => {
        let noti = await getNotiUnSeen()
        if (noti) {
            setLengthNotiSocket(false)
            setLengthNotiApi(noti.noti)
        }

    }
    const [lengthNotiSocket, setLengthNotiSocket] = React.useState(false);
    React.useEffect(() => {
       
        socket.on(`notification/friendRequest/${userData.socketId}`, (data) => {
            console.log(data);
            setLengthNotiSocket(data.noti.length)
        })
        socket.on(`notification/acceptFriend/${userData.socketId}`, (data) => {
            console.log(data);
            setLengthNotiSocket(data.noti.length)

        })
        socket.on(`getMessage/${userData.socketId}`, (data) => {
            console.log(data);
            // setLengthNotiSocket(data.noti.length)

        })
        getNotificationUnSeen()
    }, [])
    return (
        <>
            {isLoggedIn &&


                <Box sx={{ display: 'flex' }} >
                    <CssBaseline />
                    <AppBar position="fixed" open={open} sx={{ background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div" sx={{ marginX: "auto", }}>
                                Instagram
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
                            {userData && <>
                                {userData.profilePicture.startsWith('https://') ?

                                    <img src={userData.profilePicture} className='profileImage me-2' alt="" /> :

                                    <img src={imgUrl + userData.profilePicture} className='profileImage me-2' alt="" />
                                }



                                <Typography variant='p' sx={{ fontSize: "15px" }}> {userData.name} </Typography>
                                <IconButton onClick={handleDrawerClose}>

                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </>
                            }
                        </DrawerHeader>

                        <Divider />
                        <List>
                            {[
                                { id: 1, text: <NavLink className='text-black text-decoration-none' to='/mainHome' >Home</NavLink> },
                                { id: 2, text: <NavLink className='text-black text-decoration-none' to='/mainFriend' >Add Friends</NavLink> },
                                { id: 3, text: <NavLink className='text-black text-decoration-none' to='/message' >messages</NavLink> },
                                { id: 4, text: <NavLink to='/notif' className='text-black text-decoration-none'   ><span onClick={handleGoToNti}>Notification</span></NavLink > },
                            ].map((elm) => (


                                <ListItem key={elm.id} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {elm.id === 1 && <NavLink to='/mainHome' className={({ isActive }) => isActive ? "link-active" : "link-inactive"} >< HomeIcon /></NavLink>}
                                            {elm.id === 2 && <NavLink to='/mainFriend' className={({ isActive }) => isActive ? "link-active" : "link-inactive"}>   < PersonAddIcon />  </NavLink>}
                                            {elm.id === 3 &&
                                                <Badge badgeContent={1} color="error">
                                                    <NavLink to='/message' className={({ isActive }) => isActive ? "link-active" : "link-inactive"}>
                                                        <MailIcon />
                                                    </NavLink>
                                                </Badge>
                                            }
                                            {elm.id === 4 && <> {lengthNotiApi || lengthNotiSocket ?
                                                <Badge badgeContent={lengthNotiSocket ? lengthNotiSocket : lengthNotiApi} color={'error'}>
                                                    <NavLink to='/notif' className={({ isActive }) => isActive ? "link-active" : "link-inactive"} >
                                                        <NotificationsIcon onClick={handleGoToNti} />
                                                    </ NavLink>
                                                </Badge> :

                                                <NavLink to='/notif' className={({ isActive }) => isActive ? "link-active" : "link-inactive"} >
                                                    <NotificationsIcon onClick={handleGoToNti} />
                                                </ NavLink>
                                            }
                                            </>
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={elm.text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>

                            ))}


                        </List>
                        <Divider />
                        <List>
                            {[
                                { id: 1, text: <NavLink to='/myAccount' className='text-black text-decoration-none' >Account</NavLink> },
                                { id: 2, text: <NavLink to='/setting' className='text-black text-decoration-none' >Settings</NavLink> },
                                { id: 3, text: <NavLink to='/fqi'>Help</NavLink> },
                                { id: 5, text: <p onClick={handleLogout} className='text-danger text-decoration-none'>Logout</p> },
                                ,].map((elm, index) => (
                                    <ListItem key={elm.id} disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {elm.id === 1 &&
                                                    <NavLink to='/myAccount' className={({ isActive }) => isActive ? "link-active" : "link-inactive"}>
                                                        <Person2Icon />
                                                    </NavLink>


                                                }
                                                {elm.id === 2 &&
                                                    <NavLink to='/setting' className={({ isActive }) => isActive ? "link-active" : "link-inactive"}>
                                                        <SettingsIcon />
                                                    </NavLink>
                                                }
                                                {elm.id === 3 && <HelpIcon />}

                                                {elm.id === 5 && <LogoutIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={elm.text} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                        </List>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        {/* <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography> */}
                    </Box>
                </Box>
            }
        </>
    )
}
