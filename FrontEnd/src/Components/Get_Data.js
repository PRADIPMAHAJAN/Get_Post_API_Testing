import React, {useState} from 'react'

function Get_Data() {

    // Get all Notes
    const [notes, setnotes] = useState([]);
    const getNotes = async () => {
  
      const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZmI3YjYzZmQzNjI1ZWQ3NTJhZDRmIn0sImlhdCI6MTY1NjczMTY1Nn0.aWHrXZ4R_6V0trXbrD6GwliWT0RAykGNJF6LNccotCE"
        }
      });
      const json = await response.json()
      // console.log(json);
      setnotes(json)
    }
  
    //   const fetchapi = ()=>{
    //     const res =  axios.get('http://localhost:5000/api/notes/fetchallnotes', {
    //   headers: {
    //     'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZmI3YjYzZmQzNjI1ZWQ3NTJhZDRmIn0sImlhdCI6MTY1NjczMTY1Nn0.aWHrXZ4R_6V0trXbrD6GwliWT0RAykGNJF6LNccotCE'
    //   }
    // });
    // console.log(res.json());
    //   }
  
  
  return (
    <div>
      <button onClick={getNotes}> Fetchapi</button>
      {notes.length > 0 && (
        <>
          {notes.map(notes => (
            <ul>
            <li><h3>{notes.title}</h3></li>
            <li>{notes.description}</li>
            <li>{notes.tag}</li>
            </ul>
          ))}
        </>
      )}
    </div>
  )
}

export default Get_Data