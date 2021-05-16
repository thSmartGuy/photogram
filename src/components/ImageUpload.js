import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { db, storage } from "./../firebase"
import firebase from "firebase"

function ImageUpload(username) {
    const [url, setUrl] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (event) => {
        //  select the first file you have selected, as sometimes you can select multiple files
        if(event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    // function to handle uploading of picture
    const handleUpload = () => {
        // upload the image
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        // on state changed detect snapshot
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function

                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )

                setProgress(progress)
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post the image url in the posts database(collection)
                        {console.log("imageupload__username:", username)}
                        db.collection("posts").add(
                            Object.assign({}, {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                username: username.username
                            })
                        )
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
            }
        )
    }

    return (
        <Container>
            <ProgressBar value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption..." onChange={(event) => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </Container>
    )
}

export default ImageUpload

const Container = styled.div`
    display:flex;
    flex-direction: column;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`

const ProgressBar = styled.progress`
    width: 100%;
`