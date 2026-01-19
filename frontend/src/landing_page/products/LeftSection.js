import React from 'react';

function LeftSection({
    imageURL, 
    productName, 
    ProductDescription, 
    tryDemo, 
    learnMore, 
    googlePlayLink, 
    appStore
})  {
    return (
        <div className="container">
            <div className="row">
                <div className="col-5 mt-4 mb-5 p-5">
                    <img src={imageURL} />
                </div>
                <div className="col-3"></div>
                <div className="col-4 mt-5 p-4">
                    <h1 style={{color:"#3e3f42ff"}}>{productName}</h1>
                    <p>{ProductDescription}</p>
                    <div  className="mt-4 ">
                        <a href={tryDemo} style={{ textDecoration: "none" }}>Try Demo →</a>
                        <a href={learnMore} style={{marginLeft:"120px" , textDecoration: "none"}}>
                            Learn More →
                        </a>
                    </div>
                    <div className="mt-3">
                        <a href={googlePlayLink}>
                            <img src="media/images/googlePlayBadge.svg"/>
                        </a>
                        <a href={appStore}>
                            <img src="media/images/appstoreBadge.svg"
                            style={{marginLeft:"50px"}}
                        />
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default LeftSection;


