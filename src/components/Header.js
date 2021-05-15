import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { auth } from "./../firebase"

function Header({user, setModalOpen, setOpenSignIn}) {
    return (
        <Container>
            <img 
                src="/images/instagram-logo.png" 
                alt="instagram logo"
            />

            {   
                user ? 
                (<Button onClick={() => auth.signOut()}> Logout </Button>) : 
                (   
                    <>
                    <Button onClick={() => setOpenSignIn(true)}> Sign In </Button>
                    <Button onClick={setModalOpen}> Sign up </Button>
                    </>
                )
            }
        </Container>
    )
}

export default Header

const Container = styled.div`
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    object-fit: contain;
    display: flex;
    justify-content: space-between;
`