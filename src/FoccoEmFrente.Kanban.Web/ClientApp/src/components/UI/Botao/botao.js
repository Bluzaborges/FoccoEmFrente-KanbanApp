import React from "react"

export default function Botao(props){
    const submitRender = props.submit ? "submit" : null;
    return <button className={"btn btn-" + props.type} type={submitRender} onClick={props.onClick}>{props.text}</button>
 }