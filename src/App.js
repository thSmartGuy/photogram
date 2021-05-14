import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header'
import styled from 'styled-components'
import Post from './components/Post';
import { auth, database } from "./firebase"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle());

  const [posts, setPosts] = useState('')
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        console.log(authUser)
        setUser(authUser)

        if (authUser.displayName){
          //  dont update
        }
        else {
          return authUser.updateProfile(
            {
              displayName: username
            }
          )
        }
      }
      else{
        // user has logged out
        setUser(null);
      }
    })
  }, [user, username])

  // useEffect - runs code on a specific condition
  useEffect(() => {
    database.ref("post").on("value", (snapshot) => {
        setPosts(Object.entries(snapshot.val()).map(
          (item) => {
            return {
              id: item[0],
              post: item[1]
            }
          }
        ))
      }
    )
  }, [])

  const setModalOpen = () => {
    setOpen(true)
  }

  const handleSignUp = (event) => {
    event.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  }

  return (
      <Container>
        <Modal
          open={open}
          onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <SignUpForm>
                <center>  
                  <img 
                        src="/images/instagram-logo.png" 
                        alt="instagram logo"
                        />
                </center>

              <Input 
                type="text" 
                placeholder="username"
                value={username}
                onChange={
                  (event) => {
                    setUsername(event.target.value)
                  }
                }
                />

              <Input 
                type="text" 
                placeholder="email"
                value={email}
                onChange={
                  (event) => {
                    setEmail(event.target.value)
                  }
                }
                />

              <Input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={
                  (event) => {
                    setPassword(event.target.value)
                  }
                }
                />

                <Button type="submit" onClick={handleSignUp}>SignUp</Button>
              </SignUpForm>
            </div>
        </Modal>

        <Header setModalOpen={setModalOpen}/>
          {console.log(posts)}
          { 
            posts ? (
            posts.map(
              (post) => {
                return (
                  <Post 
                    key={post.id}
                    username={post.post.username} 
                    imageUrl={post.post.imageUrl}
                    caption={post.post.caption}  
                  />
                )
              }
            )) : (<div>Failed to retrieve</div>)    
          }

      </Container>
  );
}

export default App;

const SignUpForm = styled.form`
  display:flex;
  flex-direction:column;
`

const Container = styled.div`
  background-color: #fafafa;
`