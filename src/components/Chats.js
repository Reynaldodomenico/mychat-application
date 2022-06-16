import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import {auth} from "../firebase";
import {useAuth} from "../contexts/AuthContext";
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);
    const handleLogout = async () => {
        await auth.signOut();
        history.push('./');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type :'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers :{
                "project-id": "5eff4efc-21a7-465e-94c7-b17a68a2ebb3",
                "user-name": user.email,
                "user-secret": user.uid,  
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users',
                formdata,
                { headers :{"private-key" : "30f7b5d6-5bd6-46e9-9374-7f2ef2ce445d"}}
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user,history]);

    if(!user || loading ) return 'Loading....';

  return (
    <div className="chats-page">
        <div className="nav-bar">
            <div className="logo-tab">
                MyChat
            </div>
            <div onClick={handleLogout} className="logout-tab">
                Logout
            </div>
        </div>

        <ChatEngine
        height ="calc(100vh - 66px)"
        projectID="5eff4efc-21a7-465e-94c7-b17a68a2ebb3"
        userName={user.email}
        userSecret={user.uid}
        />
    </div>
  )
}

export default Chats