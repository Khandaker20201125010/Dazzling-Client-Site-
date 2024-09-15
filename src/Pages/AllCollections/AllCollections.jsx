import React from 'react';
import b from '../../assets/react.svg'
import { Helmet } from 'react-helmet';
const AllCollections = () => {
    return (
        <div>
            <Helmet>
                <title>All Collections</title>
            </Helmet>
            <img className='w-80 h-56 rounded-xl bg-opacity-30 group-hover:scale-105' src={b} alt="" />
        </div>
    );
};

export default AllCollections;