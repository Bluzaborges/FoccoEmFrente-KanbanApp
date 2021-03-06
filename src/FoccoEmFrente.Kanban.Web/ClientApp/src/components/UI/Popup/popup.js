import React from "react"
import Botao from "../Botao";

export default function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h2>{props.type} inválido</h2>
                <p>{props.children}</p>
                <Botao text="Tentar novamente" type="primary" submit onClick={() => props.setTrigger(false)}></Botao>
            </div>
        </div>
    ) : "";
 }