import React, { useState } from 'react';
import "../App.css"

const AddPost = () => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);

    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value.trim();
        setInfo(newInfo);
    }
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('post', info.post);
        formData.append("query", info.title.toString().split(" ").join("-").toLowerCase())

        fetch('https://ph-travel-blog.herokuapp.com/addPost', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) { alert("Your post has been submitted") }
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className="add-post d-flex justify-content-center align-items-center text-center">
            <div className="post-input-container">
                <h2>Write Your Beautiful Post</h2>
                <div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="file-input">
                            <input onChange={handleFileChange} type="file" name="file" className="file-style"/>
                        </div>
                        <div className="title-input">
                            <input type="text" onBlur={handleBlur} name="title" placeholder="add title" />
                        </div>
                        <div className="">
                            <textarea type="text" onBlur={handleBlur} name="post" placeholder="write your post" />
                        </div>
                        <div>
                            <button type="submit">post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;