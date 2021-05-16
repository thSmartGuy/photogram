import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Avatar from "@material-ui/core/Avatar"
import './Post.css'
import { db } from '../firebase'
import { Input } from '@material-ui/core'
import firebase from "firebase"

const Post = ({postId, username, caption, imageUrl, user}) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe ;
        if (postId) {
            unsubscribe = db.collection("posts")
                            .doc(postId)
                            .collection("comments")
                            .onSnapshot((snapshot) => {
                                setComments(snapshot.docs.map((doc) => doc.data()));
                            });
        }

        return () => {
            unsubscribe()
        }
    }, [postId])

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add(
            {
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        setComment('')
    }

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

            <Comments>
                {console.log("post__comments", comments)}
                {comments && comments.map((comment) => {
                    return (
                        <p>
                            <strong>{comment.username}</strong>{comment.text}
                        </p>
                    )
                })}
            </Comments>
            
            {user && (
                <Form>
                    <input 
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button 
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </Form>
            )}
            
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

const Form = styled.form`
    display: flex;
    margin-top: 10px;

    input {
        flex: 1;
        padding: 10px;
        border: none;
        border-top: 1px solid lightgray;
    }

    button {
        flex: 0;
        border: none;
        border-top: 1px solid lightgray;
        color: #6082a3;
        background-color: transparent;
    }
`

const Comments = styled.div`
    padding: 20px;
`