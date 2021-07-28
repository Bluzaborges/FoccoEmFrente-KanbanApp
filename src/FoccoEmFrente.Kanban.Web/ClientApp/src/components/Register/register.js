import React, { useState } from "react";

export default function Register({history}) {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setconfirmPassword] = useState("");

   const onRegister = async (event) => {
      event.preventDefault();
      
      const response = await fetch("/api/account/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
         body: JSON.stringify({
            "Email": email,
            "Password": password,
            "ConfirmPassword": confirmPassword
         })
      });

      const responseContent = await response.json();

      if (!response.ok){
         window.alert(responseContent);
         return;
      }

      localStorage.setItem("token", responseContent);
      history.push("/");
   };

   const onVoltar = () => {
      history.push("/login");
   };

   return (
      <div style={{width: "450px"}}>
         <p>Crie uma conta no <strong>Sunday.com</strong></p>
         <form onSubmit={onRegister}>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)}/>

            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)}/>

            <label htmlFor="confirm-password">Confirmar a Senha</label>
            <input id="confirm-password" type="password" placeholder="Confirmar a Senha" value={confirmPassword} onChange={(event) => setconfirmPassword(event.target.value)}/>

            <button className="btn btn-primary" type="submit">Registrar</button>
            <button className="btn btn-secundary" type="submit" onClick={onVoltar}>Voltar</button>
         </form>
      </div>
   );
}