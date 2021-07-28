import React from "react"
import Activity from "../Activity";

export default function Pipe({activities, status}){

    const activitiesList = activities && activities.filter((a) => a.status === status);

    const title = (status === 0) ? "Aguardando" : (status === 1) ? "Em andamento" : "Concluído";

    return (
        <div className={`pipe pipe-${status}`}>
            <span className="pipe-title">{title} / {activitiesList.length}</span>
            {
                activitiesList.map((activity, index) => {
                    return <Activity activity={activity} key={index}/>
                })
            }
        </div>
    )
}