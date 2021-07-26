import React from "react";

export default function Login({history}) {

   const onRegister = () => {
      history.push("/register")
   }

   return (
      <div style={{width: "450px"}}>
         <p>Bem vindo ao <strong>Sunday.com</strong>, o melhor sistema para gestão de tarefas.</p>
         <form>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="E-mail"/>
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="Senha"/>
            <button className="btn btn-primary" type="submit">Entrar</button>
            <button className="btn btn-secundary" type="submit" onClick={onRegister}>Registrar</button>
         </form>
      </div>
   );
}