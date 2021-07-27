import React from "react";
import Content from '../UI/Content'
import Paragrafo from "../UI/Paragrafo";
import Botao from "../UI/Botao";
import FormInput from "../UI/FormInput";

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