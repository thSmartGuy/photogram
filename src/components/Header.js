import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

function Header({setModalOpen}) {
    return (
        <Container>
            <img 
                src="/images/instagram-logo.png" 
                alt="instagram logo"
                />

            <Button onClick={setModalOpen}> Sign Up </Button>
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