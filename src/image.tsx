import React, { EventHandler } from "react";

export const Image = ({src, value}:{src:string, value:string}) => {

    const handleDragStart = (ev:React.DragEvent<HTMLImageElement> )=>{
        ev.dataTransfer.setData("text/plain", value);
    }
    return (
        <img src={src} draggable={true} onDragStart={(e) => handleDragStart(e)}/>
    )
}