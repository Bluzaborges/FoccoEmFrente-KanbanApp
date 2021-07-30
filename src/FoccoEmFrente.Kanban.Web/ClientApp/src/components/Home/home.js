import React, { useState, useEffect } from "react";
import Content from '../UI/Content'
import Paragrafo from "../UI/Paragrafo";
import Botao from "../UI/Botao";
import Pipe from "./Pipe";
import Popup from "../UI/Popup";
import fetchFunction from "../../functions/fetchFunction";
import './home.css';

export default function Home({history}) {
   
   const [activities, setActivities] = useState([]);
   const token = localStorage.getItem("token");
   const [showPopup, setShowPopup] = useState(false);
   const [popupText, setPopupText] = useState("");

   if (!token) history.push("/login");

   const loadActivities = async () => {

      const response = await fetchFunction("/api/activities", "GET", token, undefined);

      const responseContent = await response.json();

      if (!response.ok){
         setShowPopup(true);
         setPopupText("Não foi possível buscar as tarefas.");
         return;
      }

      setActivities(responseContent);
   }

   const addActivity = async () => {
      const activity = {
         title: "Nova Atividade",
         status: 0,
      };

      const response = await fetchFunction("/api/activities", "POST", token, activity);
      const responseContent = await response.json();

      if (!response.ok){
         setShowPopup(true);
         setPopupText("Não foi possível inserir a tarefa.");
         return;
      }

      setActivities([...activities, responseContent]);
   }

   const updateActivity = async (activity) => {
      const response = await fetchFunction("/api/activities", "PUT", token, activity);

      if (!response.ok){
         setShowPopup(true);
         setPopupText("Não foi possível atualizar a tarefa.");
         await loadActivities();
         return;
      }
   }

   const updateActivityStatus =  async (activityId, status) => {

      const action = status === 0 ? "todo" : status === 1 ? "doing" : "done";

      const response = await fetchFunction(`/api/activities/${activityId}/${action}`, "PUT", token, undefined);

      if (!response.ok){
         setShowPopup(true);
         setPopupText("Não foi possível atualizar o status da tarefa.");
         return;
      }

      await loadActivities();
   }

   const deleteActivity = async (activity) => {
      const response = await fetchFunction(`/api/activities/${activity.id}`, "DELETE", token, undefined);

      if (!response.ok){
         setShowPopup(true);
         setPopupText("Não foi possível excluir a tarefa.");
         return;
      }

      setActivities(activities.filter(a => a.id !== activity.id));
   }

   const onExit = () => {
      localStorage.removeItem("token");
      history.push("/login");
   }

   useEffect(() => {
      loadActivities();
   }, []);

   return (
      <>
      <Content width={800}>
         <Paragrafo>Bem vindo ao <strong>Sunday.com</strong>.</Paragrafo>
         <Paragrafo>Esse é seu canvas para organizar suas atividades. Crie novas atividades e mantenha elas sempre atualizadas.</Paragrafo>
         <div className="canvas">
            {
               [0, 1, 2].map((status, index) => {
                  return (
                     <Pipe key={index} activities={activities} status={status} onDelete={deleteActivity} onUpdate={updateActivity} onActivityDrops={(activityId) => updateActivityStatus(activityId, status)}/>
                  );
               })
            }
         </div>
         <Botao text="Adicionar Atividade" type="primary" onClick={addActivity}></Botao>
         <Botao text="Sair" type="secondary" submit onClick={onExit}></Botao>
      </Content>
      <Popup trigger={showPopup} setTrigger={setShowPopup}>{popupText}</Popup>
      </>
   );
}
