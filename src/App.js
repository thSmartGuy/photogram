import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header'
import styled from 'styled-components'
import Post from './components/Post';
import { auth, db } from "./firebase"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
import Logo from './components/Logo';

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
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        // console.log(authUser)
        setUser(authUser)
      }
      else{
        // user has logged out
        setUser(null);
      }
    })

    return () => {
      // perform some actions before you refire the useEffect listener
      unsubscribe() ;
    }
  }, [user, username])

  // useEffect - runs code on a specific condition
  useEffect(() => {
    // FOR FIREBASE REALTIME DATABASE
    // database.ref("post").on("value", (snapshot) => {
    //     setPosts(Object.entries(snapshot.val()).map(
    //       (item) => {
    //         return {
    //           id: item[0],
    //           post: item[1]
    //         }
    //       }
    //     ))
    //   }
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(
          doc => {
            return (
              {
                post: doc.data(),
                id: doc.id
              })
          }
        ))
      })
  }, [])

  const setModalOpen = () => {
    setOpen(true)
  }

  const handleSignUp = (event) => {
    event.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile(
        {
            displayName: username
        }
      )
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const handleSignIn = (event) => {
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
      <Container>
        
        {/* {console.log("app__userDisplayName:", user.displayName)} */}

        <Modal
          open={open}
          onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <SignUpForm>
                <center>  
                  <Logo />
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

        <Modal
          open={openSignIn}
          onClose={()=>setOpenSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
              <SignUpForm>
                <center>  
                  <Logo />
                </center>

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

                <Button type="submit" onClick={handleSignIn}>Sign in</Button>
              </SignUpForm>
            </div>
        </Modal>


        <Header user={user} setModalOpen={setModalOpen} setOpenSignIn={setOpenSignIn}/>

        <UploadArea>
        {
          user && user.displayName ?
            (
              <ImageUpload username={user.displayName}/>
            )
            : 
            (
              <UploadAreaDiv>
                Login or sign up to upload a photo
              </UploadAreaDiv>
            ) 
        }
        </UploadArea>
      
        <Storeys>
          { 
            posts ? (
              posts.map(
                (post) => {
                  return (
                  <Post 
                    key={post.id}
                    postId={post.id}
                    user={user}
                    username={post.post.username} 
                    imageUrl={post.post.imageUrl}
                    caption={post.post.caption}  
                    />
                    )
                  }
                  )) : (<div>Loading...</div>)    
          }
        </ Storeys>
        
        <Footer>
          <div>
            Website developed by Shubham Pandey - Made only for showing web development techniques and to be included as a piece of portfolio.
          </div>
        </Footer>    
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

const Storeys = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
  div {
    margin-right: 20px;
  }
`

const Footer = styled.div`
  width:100%; 
  height: 150px;
  background: lightgray ;
  box-shadow: 5px 5px 20px #000 ;

  div {
    text-align: center;
    width: 700px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 15px;
  }
`

const UploadArea = styled.div`
  margin: auto; 
  width: 60%;
`

const UploadAreaDiv = styled.div`
  text-align: center;
  padding: 10px;
  box-shadow: 1px 1px 1px lightgray;
  margin: 5px;
`