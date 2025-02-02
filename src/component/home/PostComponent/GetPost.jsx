/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { Button } from '@mui/material';

export default function GetPost() {
    return (
        <div className=' mx-auto my-5'>

            <Card

                variant="outlined"
                sx={{
                    minWidth: 300,
                    '--Card-radius': (theme) => theme.vars.radius.xs,
                }}
            >
                <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                m: '-2px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                            },
                        }}
                    >
                        <Avatar
                            size="sm"
                            src="/static/logo.png"
                            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                        />
                    </Box>
                    <Typography fontWeight="lg">MUI</Typography>
                    <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                        <MoreHoriz />
                    </IconButton>
                </CardContent>
                <CardOverflow>
                    <AspectRatio>
                        <img src="/static/images/cards/yosemite.jpeg" alt="" loading="lazy" />
                    </AspectRatio>
                </CardOverflow>
                <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                    <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <FavoriteBorder />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <ModeCommentOutlined />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <SendOutlined />
                        </IconButton>
                    </Box>


                </CardContent>
                <CardContent>
                    <Link
                        component="button"
                        underline="none"
                        fontSize="sm"
                        fontWeight="lg"
                        textColor="text.primary"
                    >
                        8.1M Likes
                    </Link>
                    <Typography fontSize="sm">
                        <Link
                            component="button"
                            color="neutral"
                            fontWeight="lg"
                            textColor="text.primary"
                        >
                            MUI
                        </Link>{' '}
                        The React component library you always wanted
                    </Typography>
                    <Link
                        component="button"
                        underline="none"
                        fontSize="sm"
                        startDecorator="…"
                        sx={{ color: 'text.tertiary' }}
                    >
                        more
                    </Link>
                    <Link
                        component="button"
                        underline="none"
                        fontSize="10px"
                        sx={{ color: 'text.tertiary', my: 0.5 }}
                    >
                        2 DAYS AGO
                    </Link>
                </CardContent>
                <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                        <Face />
                    </IconButton>
                    <Input
                        variant="plain"
                        size="sm"
                        placeholder="Add a comment…"
                        sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                    />
                    <Button underline="none" role="button">
                        Post
                    </Button>
                </CardContent>
            </Card>
            <br />
            <Card

                variant="outlined"
                sx={{
                    minWidth: 300,
                    '--Card-radius': (theme) => theme.vars.radius.xs,
                }}
            >
                <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                m: '-2px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                            },
                        }}
                    >
                        <Avatar
                            size="sm"
                            src="/static/logo.png"
                            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
                        />
                    </Box>
                    <Typography fontWeight="lg">MUI</Typography>
                    <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                        <MoreHoriz />
                    </IconButton>
                </CardContent>
                <CardOverflow>
                    <AspectRatio>
                        <img src="/static/images/cards/yosemite.jpeg" alt="" loading="lazy" />
                    </AspectRatio>
                </CardOverflow>
                <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                    <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <FavoriteBorder />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <ModeCommentOutlined />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <SendOutlined />
                        </IconButton>
                    </Box>


                </CardContent>
                <CardContent>
                    <Link
                        component="button"
                        underline="none"
                        fontSize="sm"
                        fontWeight="lg"
                        textColor="text.primary"
                    >
                        8.1M Likes
                    </Link>
                    <Typography fontSize="sm">
                        <Link
                            component="button"
                            color="neutral"
                            fontWeight="lg"
                            textColor="text.primary"
                        >
                            MUI
                        </Link>{' '}
                        The React component library you always wanted
                    </Typography>
                    <Link
                        component="button"
                        underline="none"
                        fontSize="sm"
                        startDecorator="…"
                        sx={{ color: 'text.tertiary' }}
                    >
                        more
                    </Link>
                    <Link
                        component="button"
                        underline="none"
                        fontSize="10px"
                        sx={{ color: 'text.tertiary', my: 0.5 }}
                    >
                        2 DAYS AGO
                    </Link>
                </CardContent>
                <CardContent orientation="horizontal" sx={{ gap: 1 }}>
                    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                        <Face />
                    </IconButton>
                    <Input
                        variant="plain"
                        size="sm"
                        placeholder="Add a comment…"
                        sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
                    />
                    <Button underline="none" role="button">
                        Post
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
