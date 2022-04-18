import React, { Component } from 'react'
import { useParams } from 'react-router-dom';

const StoryPage = () => {
    const { story_id } = useParams();

    return(
        <h1>{story_id}</h1>
    )
}

export default StoryPage;