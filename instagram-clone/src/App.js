import React ,{useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db,auth }from './firebase'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import ImageUpload from './ImageUpload';




function getModalStyle(){
  const top = 50 ;
  const left = 50 ;
  return{
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

function App() {
  const classes = useStyles();
  const[modalStyle] = useState(getModalStyle);

  
  const [posts,setPosts] = useState ([]);
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);


  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName: username,
          });
        }
      }else{
        setUser(null);
      }
      return () => {
       
        unsubscribe();
      }
    })
  },[user,username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => { 
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post:doc.data()
      }) ));
    });

  },[]);
  
  const signUp = (event)=>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{return authUser.user.updateProfile({
      displayName: username
    })})
    .catch((error) => alert(error.message));
  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false);
  }



  return (
    <div className="App">

  
      

      <Modal
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
        <center>
              <img 
                className="app__headerImage"
                height="100px;"
                src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
                alt=""
              />
            </center>
            <input 
              type="text"
              placeholder={"username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> 
            <input 
              placeholder={"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              placeholder={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>{"Sign Up"}</Button>
            </form>
        </div>
      </Modal>
      <Modal  
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://toogreen.ca/instagreen/img/instagreen.svg"
                height="40px;"
                alt=""
              />
            </center>

            <input 
              placeholder={"email"}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input 
              placeholder={"password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>{"Sign In"}</Button>

          </form>

        </div>
      </Modal>

      <div className="app__header">
      <img className="app__headerImage"
      src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
      alt=""/>
        {user ?(      <Button type="submit" onClick={() => auth.signOut()}>Logout</Button>):
              ( <div className="app__logincontainer" >
           <Button type="submit" onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button type="submit" onClick={() => setOpen(true)}>Sign up</Button>
            </div>
)}

      </div>
     
<div className='app__posts'>
  <div className='app__postsLeft'>
      {
      posts.map(({id,post}) => (
        <Post key ={id} postId={id}username={post.username}caption={post.caption}imageUrl={post.imageUrl}/>
      ))
      }
      </div>
      </div>
      {user ? (<ImageUpload username={user.displayName}/>
):(
<h3>Sorry you need to login to upload</h3>
)

}
    </div>
  );
 
  

}

export default App;
