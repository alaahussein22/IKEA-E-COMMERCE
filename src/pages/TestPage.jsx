import React from 'react';

const Testpage = (props) => {
    console.log(props.location.state.prod);
    const{Name,Price}=props.location.state.prod.productData
    return (
        <div>
            <h1>Product Details</h1>
            <h1>{Name}</h1>
            <h1>{Price}</h1>
            
        </div>
    );
}

export default Testpage;
