import React from 'react'

const Error = ({msg}) => {
    return(
        <p className="my-3 p-4 text-center text-white alert alert-danger">
            {msg}
        </p>
    )
} 

export default Error;