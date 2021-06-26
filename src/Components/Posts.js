import React, { useContext, useEffect, useState } from 'react';
import SinglePost from './SinglePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import "../App.css";
import { Link } from 'react-router-dom';
import { userAuthData } from '../App';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [userLog, setUserLog] = useContext(userAuthData);
    useEffect(()=> {
        fetch("https://ph-travel-blog.herokuapp.com/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    const handleLogout = () => {
        setUserLog({})
    }
    return (
        <div className="row p-2">
            <div className="header-container py-3">
                <div className="header-nav">
                    <div className="navigation">
                        <ul>
                            <li>{userLog.isAdmin && <Link to="/addPost">Create Post</Link>}</li>
                            <li className="welcome-green">{userLog.email && <p>{`Welcome, ${userLog.email}`}</p>}</li>
                        </ul>
                    </div>
                    <div>
                        {userLog.email || userLog.isAdmin ? <button onClick={handleLogout}>Logout</button> : <Link to="/login"><button>Login</button></Link>}
                    </div>
                </div>
                <div className="search-container d-flex justify-content-center align-items-center mt-2">
                    <div className="text-center search-container-center">
                        <div><h1>Welcome To <span className="travel">TRAVEL</span></h1></div>
                        <p>Programming Hero Travel Blog where we represent stories of places. We write stories about people, culture, and life. People travel, but how many are keep it in heart?</p>
                        <div className="mt-4">
                            <input type="text" placeholder="search your content.." />
                            <button><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                    </div>
                </div>
            </div>
            {posts.map(singlePost => <SinglePost singlePost={singlePost} key={singlePost._id}/>)}
        </div>
    );
};

export default Posts;