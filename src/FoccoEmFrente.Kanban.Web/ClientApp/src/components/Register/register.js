import React, { useState } from "react";
import Content from '../UI/Content'
import Paragrafo from "../UI/Paragrafo";
import Botao from "../UI/Botao";
import FormInput from "../UI/FormInput";
import Popup from "../UI/Popup";
import fetchFunction from "../../functions/fetchFunction";

export default function Register({history}) {

   const [formRegister, setFormRegister] = useState({email: "", password: "", confirmPassword: ""});
   const [showPopup, setShowPopup] = useState(false);
   const [popupText, setPopupText] = useState("");

   const setEmail = (event) => {
      setFormRegister({...formRegister, email: event.target.value});
   }

   const setPassword = (event) => {
      setFormRegister({...formRegister, password: event.target.value});
   }

   const setconfirmPassword = (event) => {
      setFormRegister({...formRegister, confirmPassword: event.target.value});
   }

   const onRegister = async (event) => {
      event.preventDefault();

      const response = await fetchFunction("/api/account/register", "POST", undefined, formRegister);

      const responseContent = await response.json();

      if (!response.ok){
         setShowPopup(true);
         setPopupText(responseContent);
         return;
      }

      localStorage.setItem("token", responseContent);
      history.push("/");
   };

   const onVoltar = () => {
      history.push("/login");
   };

   return (
      <>
      <Content width={450}>
         <Paragrafo>Crie uma conta no <strong>Sunday.com</strong></Paragrafo>
         <form onSubmit={onRegister}>
            <FormInput id="email" type="email" placeholder="E-mail" label="E-mail" value={formRegister.email} onChange={setEmail}></FormInput>
            <FormInput id="senha" type="password" placeholder="Senha" label="Senha" value={formRegister.password} onChange={setPassword}></FormInput>
            <FormInput id="confirm-password" type="password" placeholder="Confirmar a Senha" label="Confirmar a Senha" value={formRegister.confirmPassword} onChange={setconfirmPassword}></FormInput>
            <Botao text="Registrar" type="primary" submit></Botao>
            <Botao text="Voltar" type="secondary" submit onClick={onVoltar}></Botao>
         </form>
      </Content>
      <Popup trigger={showPopup} setTrigger={setShowPopup} type="Registro">{popupText}</Popup>
      </>
   );
}