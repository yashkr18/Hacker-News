import React, { useState,useEffect } from 'react'
import {  useLocation } from "react-router-dom"
import Tree from "./Tree";
import "../styles/PostDetail.css";
import Loading from "../utils/Loading";


// listd the deatails of the selected objectId
function PostDetail() {

    const[loading,setLoading] = useState(true);
    const[post,setPost] = useState("");
    const location = useLocation();
    const { id } = location.state;

    useEffect(() => {

        const link = `http://hn.algolia.com/api/v1/items/${id}`

        const getPost = async () => {

            await fetch(link)
            .then((response) => response.json())
            .then((data) => {
                const post = data;
                setPost(post);
                setLoading(false);
            });           
        }

        getPost();
    }, []);

    return (
        <div>
            {loading ? <Loading /> :
                <div className="post">
                    <div className="heading">
                        <h2 className="title"><a className="title" href={post.url}>{post.title}</a></h2>
                        <div className="detail">
                            <h3>Author : {post.author}</h3>
                            <h3>Points : {post.points}</h3>
                        </div>
                    </div>
                    {post.children.length ?
                        <div className="tree-comments">
                            <h3 className="comment-title">Comments</h3>               
                            <Tree data={post.children} />           
                        </div>
                        :<h1 className="no-comment">No comments available</h1>
                    }
                </div>
            }
        </div>
    )
}

export default PostDetail
