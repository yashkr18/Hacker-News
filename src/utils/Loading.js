import React from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import "./Loading.css"

function Loading() {
    return (
        <div className="loading">
            <AutorenewIcon />
            <h2>Loading...</h2>
        </div>
    )
}

export default Loading
