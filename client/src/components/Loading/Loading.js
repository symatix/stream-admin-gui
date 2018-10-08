import React from 'react';

const style = {
    container:{
        position:"relative",
        width: "100%",
        height: "100%",
        textAlign: "center"
    },
    img: {
        position: "absolute",
        marginTop:"200px",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000
    }
}

function Loading(props){
    return (
        <div style={style.container}>
            <img style={style.img} src="/assets/imgs/loading.gif" alt="Loading..." />
        </div>
    )
}

export default Loading