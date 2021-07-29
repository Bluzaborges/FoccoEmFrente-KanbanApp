
export default function fetchFunction(localRequest, method, token, body){
    return fetch(localRequest, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
         },
         body: JSON.stringify(body)
    })
}