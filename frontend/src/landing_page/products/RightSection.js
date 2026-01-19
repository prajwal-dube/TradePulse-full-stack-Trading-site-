import React from 'react';

function RightSection({
    imageURL, 
    productName, 
    ProductDescription, 
    learnMore, 
}) {
    return (
         <div className="container">
            <div className="row">
                <div className="col-4 mt-5 pt-5">
                    <h1 style={{color:"#3e3f42ff"}}>{productName}</h1>
                    <p>{ProductDescription}</p>
                    <div  className="mt-4 ">
                        <a href={learnMore} style={{textDecoration: "none" , marginRight:"50px"}}>
                            Learn More →
                        </a>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-6 ">
                        <img src={imageURL} />
                </div>
             </div>
        </div>
    );
}

export default RightSection;