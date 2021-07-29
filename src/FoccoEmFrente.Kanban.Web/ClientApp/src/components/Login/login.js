import React, { useState } from "react";
import Content from '../UI/Content'
import Paragrafo from "../UI/Paragrafo";
import Botao from "../UI/Botao";
import FormInput from "../UI/FormInput";
import Popup from "../UI/Popup";
import fetchFunction from "../../functions/fetchFunction";

export default function Login({history}) {

   const [formLogin, setFormLogin] = useState({email: "", password: ""});
   const [showPopup, setShowPopup] = useState(false);
   const [popupText, setPopupText] = useState("");

   const setEmail = (event) => {
      setFormLogin({...formLogin, email: event.target.value});
   }

   const setPassword = (event) => {
      setFormLogin({...formLogin, password: event.target.value});
   }

   const onLogin = async (event) => {
      event.preventDefault();
      
      /*const response = await fetch("/api/account/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
         body: JSON.stringify(formLogin)
      });*/

      const response = await fetchFunction("/api/account/login", "POST", undefined, formLogin);

      const responseContent = await response.json();

      if (!response.ok){
         setShowPopup(true);
         setPopupText((typeof responseContent === 'object') ? responseContent[0] : responseContent);
         return;
      }

      localStorage.setItem("token", responseContent);
      history.push("/");
   }

   const onRegister = () => {
      history.push("/register")
   }

   return (
      <>
      <Content width={450}>
         <Paragrafo>Bem vindo ao <strong>Sunday.com</strong>, o melhor sistema para gestão de tarefas.</Paragrafo>
         <form onSubmit={onLogin}>
            <FormInput id="email" type="email" placeholder="E-mail" label="E-mail" value={formLogin.email} onChange={setEmail}></FormInput>
            <FormInput id="senha" type="password" placeholder="Senha" label="Senha" value={formLogin.password} onChange={setPassword}></FormInput>
            <Botao text="Entrar" type="primary" submit></Botao>
            <Botao text="Registrar" type="secondary" submit onClick={onRegister}></Botao>
         </form>
      </Content>
      <Popup trigger={showPopup} setTrigger={setShowPopup} type="Login">{popupText}</Popup>
      </>
   );
}