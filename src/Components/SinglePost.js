import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { userAuthData } from '../App';

const SinglePost = (props) => {
    const [userLog, setUserLog] = useContext(userAuthData);
    const { title, postBody, image, query, _id } = props.singlePost;
    const getThumbnail = useRef(null)
    const handleDelete = id => {
        fetch(`https://ph-travel-blog.herokuapp.com/delete/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                getThumbnail.current.parentElement.style.display = "none"
            }
        })
    }
    return (
        <div className="col-md-4 p-2 post-thumbnail">
            <Link to={`/posts/${query}`}>
                <img class="img-fluid" src={`data:image/png;base64,${image.img}`} alt={title} />
            </Link>
            <Link to={`/posts/${query}`}><h4 className="py-2">{title}</h4></Link>
            <p className="text-truncate">{postBody}</p>
            {userLog.isAdmin && <div className="py-1 delete-post" ref={getThumbnail}>
                <button onClick={() => handleDelete(_id)}><FontAwesomeIcon icon={faTrash}/> Delete post</button>
            </div>}
        </div>
    );
};

export default SinglePost;