import React from "react"

export default function Activity({activity}){
    return (
        <div className={"activity"}>
            <span>{activity.title}</span>
        </div>
    )
}