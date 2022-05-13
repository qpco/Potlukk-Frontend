import { useEffect, useState } from "react"

// prop should be user object(username and user id)
export default function PotlukkHomePage(props){

    const [potlukks, setPotlukks] = useState([])

    async function getAllPotlukks() {
        const response = await fetch('http://localhost:8080/potlukks')
        const body = await response.json()
        setPotlukks(body)
    }

    useEffect(()=>{
        getAllPotlukks();
    },[]);

    const potlukkRows = potlukks.map(p => <tr key={p.id}>
        <td>{p.name}</td>
        <td>{p.date}</td>
        <td><ButtonAction hostID={p.hostID}/></td>
    </tr>)

   //if logged in user id equals potlukk host_id, edit button
   //else attend button
    function ButtonAction(hostID) {
        if(props.id === hostID.hostID) {
            return(<button>edit</button>)
        } else {
            return(<button>attend</button>)
        }
    }

    return(<div id="potlukk-home">
        <h1>Upcoming Potlukks</h1>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {potlukkRows}
            </tbody>
        </table>
    </div>)
}