import React, { useState } from "react";
import Popup from "../UI/Popup";
import fetchFunction from "../../functions/fetchFunction";

export default function Register({history}) {

   //const [email, setEmail] = useState("");
   //const [password, setPassword] = useState("");
   //const [confirmPassword, setconfirmPassword] = useState("");
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
      
      /*const response = await fetch("/api/account/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
         body: JSON.stringify(formRegister)
      });*/

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
      <div style={{width: "450px"}}>
         <p>Crie uma conta no <strong>Sunday.com</strong></p>
         <form onSubmit={onRegister}>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="E-mail" value={formRegister.email} onChange={setEmail}/>

            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="Senha" value={formRegister.password} onChange={setPassword}/>

            <label htmlFor="confirm-password">Confirmar a Senha</label>
            <input id="confirm-password" type="password" placeholder="Confirmar a Senha" value={formRegister.confirmPassword} onChange={setconfirmPassword}/>

            <button className="btn btn-primary" type="submit">Registrar</button>
            <button className="btn btn-secundary" type="submit" onClick={onVoltar}>Voltar</button>
         </form>
      </div>
      <Popup trigger={showPopup} setTrigger={setShowPopup} type="Registro">{popupText}</Popup>
      </>
   );
}