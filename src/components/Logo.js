import React from 'react'
import styled from "styled-components"

function Logo() {
    return (
        <Container>
            Photogram
        </Container>
    )
}

export default Logo

const Container = styled.div`
    font-size: 30px;
    color: white;
    -webkit-text-stroke: 1px black;
    letter-spacing: 5px;
    font-family: Helvetica, Arial, sans-serif;
    /* text-shadow: 1px 1px 2px lightgray; */
`