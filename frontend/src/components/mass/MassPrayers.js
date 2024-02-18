import React from "react";

const MassPrayers = ({
    decreaseFontSize,
    increaseFontSize,
    fontSize,
    novusOrdoImage,
    latinMassImage,
}) => {
    return(
        <>
            {/* Content for Prayers */}
            <div className="container">
                    
                {/* Font Size Controls */}
                <div className="text-size-controls">
                    {/* <div>
                        <p>Text Size</p>
                    </div> */}
                    Text Size
                    <button 
                        onClick={decreaseFontSize}
                        className='btn btn-outline-secondary btn-sm m-1'
                    >
                        -
                    </button>
                    <button 
                        onClick={increaseFontSize}
                        className='btn btn-outline-secondary btn-sm m-1'
                    >
                        +
                    </button>
                </div>

                <div className="row mb-5">
                    <div className="col-12">
                        <h2 style={{ fontSize: '25px' }} className="text-center m-1">
                            Guide to the Catholic Mass
                        </h2>
                        <p style={{ fontSize: `${fontSize}px` }}>
                            Are you new to the Traditional Latin Mass or Novus Ordo? Our concise and straightforward beginner's guide 
                            to the Catholic Mass offers an effortless way for you to engage in prayer during the service.
                        </p>

                        <div className='mb-3'>
                            <div>
                                <h2 className="text-center m-1">
                                    Novus Ordo
                                </h2>
                            </div>
                            <img 
                                src={novusOrdoImage}
                                style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                                alt="novus ordo image" 
                            />
                        </div>
                        <hr />
                        <div className='mb-3'>
                            <div>
                                <h2 className="text-center m-1">
                                    Latin Mass
                                </h2>
                            </div>
                            <img 
                                src={latinMassImage}
                                style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                                alt="latin mass image" 
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default MassPrayers