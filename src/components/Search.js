import React, { Component } from 'react'

const Search = () => {
    return(
        <form className="search-container">
            <div><input type="text"/></div>
            <div>
                <label for="cars">Choose:</label>
                <select name="cars" id="cars">
                    <option value="all">All</option>
                    <option value="character">Character</option>
                    <option value="comic">Comic</option>
                    <option value="stories">Stories</option>
                    <option value="serie">Serie</option>
                </select>
            </div>
        </form>
    )
}

export default Search;