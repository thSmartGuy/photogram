import React from 'react'
import styled from 'styled-components'
import Avatar from "@material-ui/core/Avatar"
import './Post.css'

const Post = ({username, caption, imageUrl}) => {
    return (
        <Container>
            <Header>
                <Avatar 
                    className="post__avatar"
                    alt="thesmartguy"
                    src=""
                />
                <h3>
                    {username}
                </h3>
            </Header>

            <img 
                src={imageUrl} 
                alt="url"
            />

            <Caption>
                <strong>{username}</strong> {caption}
            </ Caption>
        </Container>
    )
}

export default Post

const Container = styled.div`
    max-width: 500px;
    background-color: white;
    border: 1px solid lightgray;
    margin-bottom: 45px;

    img {
        width: 100%;
        object-fit: contain;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
    }
`
const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    div {
        margin-right: 10px;
    }
`
const Caption = styled.h4`
    font-weight: normal;
    padding: 20px;
`