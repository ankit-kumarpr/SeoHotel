import React from 'react'
import './searchbar.css';

import 'bootstrap-icons/font/bootstrap-icons.css';


function SearchBar() {
    return (
        <div className='searchbar'>
            <form
                className='search-form d-flex align-items-center'
                method='POST'
                action="#">
                <input
                    type='text'
                    name='query'
                    placeholder='Search'
                    title='Enter search keyword' />

                <button type='submit' title='Search'>
                    <i className='bi bi-search'></i>
                </button>
            </form>
        </div>
    )
}

export default SearchBar
