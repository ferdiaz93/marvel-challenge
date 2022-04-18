import React from 'react'

const Card = ({title, description, imageUrl}) =>{
    return (
        <div className="card-container">
            <div className="card-header">
                <div className="image-container">
                    <img src={imageUrl}></img>
                </div>
            </div>
            <div className="card-body">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="footer">
                <a className="button" href="#">View Details</a>
            </div>
        </div>
    )
}

export default Card;