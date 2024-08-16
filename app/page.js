import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Topbar from './components/topbar'


export default function Home() {
  return (
    <Topbar/>
  );
}
