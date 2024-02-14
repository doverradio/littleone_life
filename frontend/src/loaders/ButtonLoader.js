import React from "react";
import loader from '../assets/loader.gif'

const ButtonLoader = ( alt ) =>
{
    return(
        <>
            <img src={ loader } alt={ alt } style={{ maxHeight: '30px', maxWidth: '30px' }} />
        </>
    )
}

export default ButtonLoader