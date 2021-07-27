import React from "react";

function Content(props){
   return <div style={{width: props.width}}>{props.children}</div>
}

function Paragrafo({children}){
   return <p>{children}</p>
}

function Botao(props){
   const submitRender = props.submit ? "submit" : null;
   return <button className={"btn btn-" + props.type} type={submitRender} onClick={props.onClick}>{props.text}</button>
}

function FormInput(props){
   return (
      <>
         <label htmlFor={props.id}>{props.label}</label>
         <input id={props.id} type={props.type} placeholder={props.placeholder}/>
      </>
   )
}

export default function Login({history}) {

   const onRegister = () => {
      history.push("/register")
   }

   return (
      <Content width={450}>
         <Paragrafo>Bem vindo ao <strong>Sunday.com</strong>, o melhor sistema para gestão de tarefas.</Paragrafo>
         <form>
            <FormInput id="email" type="email" placeholder="E-mail" label="E-mail"></FormInput>
            <FormInput id="senha" type="senha" placeholder="Senha" label="Senha"></FormInput>
            <Botao text="Entrar" type="primary" submit></Botao>
            <Botao text="Registrar" type="secondary" submit onClick={onRegister}></Botao>
         </form>
      </Content>
   );
}