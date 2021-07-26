import React from "react";

export default function Register({history}) {

   const onVoltar = () => {
      history.push("/login");
   }

   return (
      <div style={{width: "450px"}}>
         <p>Crie uma conta no <strong>Sunday.com</strong></p>
         <form>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="E-mail"/>

            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="Senha"/>

            <label htmlFor="confirm-password">Confirmar a Senha</label>
            <input id="senha" type="password" placeholder="Confirmar a Senha"/>

            <button className="btn btn-primary" type="submit">Registrar</button>
            <button className="btn btn-secundary" type="submit" onClick={onVoltar}>Voltar</button>
         </form>
      </div>
   );
}