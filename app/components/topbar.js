import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Topbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    <Button href = "/" color = "inherit">
                        Flashcard SaaS
                    </Button>
                </Typography>
                <SignedOut>
                    <Button color= "inherit" href="/signin">Login</Button>
                    <Button color="inherit" href="/signup">Sign Up</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </Toolbar>
        </AppBar>
    );
}