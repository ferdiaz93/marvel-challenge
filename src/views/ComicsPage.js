import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'

const ComicsPage = () => {
    const { comic_id } = useParams();
    console.log(comic_id);

    return (
        <h1>ComicsPage</h1>
    )
}

export default ComicsPage;