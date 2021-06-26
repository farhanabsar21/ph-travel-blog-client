import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userAuthData } from '../App';

const SingleBlog = () => {
    const { blogQuery } = useParams()
    const [content, setContent] = useState({
        title: "",
        postBody: "",
        image: ""
    })
    useEffect(()=> {
        fetch(`https://ph-travel-blog.herokuapp.com/posts/${blogQuery}`)
            .then(res => res.json())
            .then(data => setContent(data))
    }, [blogQuery])

    const { title, postBody, image } = content;
    const [userLog, setUserLog] = useContext(userAuthData);

    const handleLogout = () => {
        setUserLog({})
    }
    return (
        <div>
            <div className="row single-blog-content">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-4">
                    <div>
                        <nav className="py-4">
                            <Link to="/">Go back to home</Link>
                            <div>
                                {userLog.email || userLog.isAdmin ? <button onClick={handleLogout}>Logout</button> : <Link to="/login"><button>Login</button></Link>}
                            </div>
                        </nav>
                    </div>
                    <div className="content-details">
                        <div className="mt-5">
                            <img class="img-fluid" src={`data:${image.contentType};base64,${image.img}`} alt={title} />
                        </div>
                        <div className="mt-5">
                            <h1>{title}</h1>
                        </div>
                        <div className="mt-5">
                            <p className="lead">{postBody}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};

export default SingleBlog;