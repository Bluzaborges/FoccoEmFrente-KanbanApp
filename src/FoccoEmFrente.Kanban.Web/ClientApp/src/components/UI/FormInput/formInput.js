import React from "react"

export default function FormInput(props){
    return (
       <>
          <label htmlFor={props.id}>{props.label}</label>
          <input id={props.id} type={props.type} placeholder={props.placeholder}/>
       </>
    )
 }