import React, { useState, useEffect } from "react";
import Content from '../UI/Content'
import Paragrafo from "../UI/Paragrafo";
import Botao from "../UI/Botao";
import Pipe from "./Pipe";
import Popup from "../UI/Popup";
import './home.css';

export default function Home({history}) {
   
   const [activities, setActivities] = useState([]);
   const token = localStorage.getItem("token");
   const [showPopup, setShowPopup] = useState(false);
   const [popupText, setPopupText] = useState("");

   if (!token) history.push("/login");

   const loadActivities = async () => {
      const response = await fetch("/api/activities", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
         }
      });

      const responseContent = await response.json();

      if (!response.ok){
         setShowPopup(true);
         setPopupText("Não foi possível buscar as tarefas.");
         return;
      }
      setActivities(responseContent);
   }

   useEffect(() => {
      loadActivities();
   }, []);

   const onExit = () => {
      localStorage.removeItem("token");
      history.push("/login");
   }

   return (
      <>
      <Content width={800}>
         <Paragrafo>Bem vindo ao <strong>Sunday.com</strong>.</Paragrafo>
         <Paragrafo>Esse é seu canvas para organizar suas atividades. Crie novas atividades e mantenha elas sempre atualizadas.</Paragrafo>
         <div className="canvas">
            <Pipe activities={activities} status={0} />
            <Pipe activities={activities} status={1} />
            <Pipe activities={activities} status={2} />
         </div>
         <Botao text="Adicionar Atividade" type="primary" submit></Botao>
         <Botao text="Sair" type="secondary" submit onClick={onExit}></Botao>
      </Content>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>{popupText}</Popup>
      </>
   );
}
