import React from 'react'
import {useHistory} from 'react-router-dom';
import { useState } from 'react'

const Add_Data = () => {
  const history = useHistory();
    const [user, setUser] = useState({
      title:"", description:"", tag:""
    });

    let name, value;
    const handleInputs =(e) =>{
      console.log(e);
      name = e.target.name;
      value = e.target.value;

      setUser({ ...user, [name]:value});
    }

    const PostData = async (e) => {
      e.preventDefault();

      const {title, description, tag} = user;
      console.log(user);

      const res = fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: {
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiZmI3YjYzZmQzNjI1ZWQ3NTJhZDRmIn0sImlhdCI6MTY1NjczMTY1Nn0.aWHrXZ4R_6V0trXbrD6GwliWT0RAykGNJF6LNccotCE",
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          title, description, tag
        })  
      });
      const data = await res.json();

      if(data.status === 422 || !data){
        window.alert("Invalid Registration");
        console.log("Invalid Registration");
      }
      else{
        window.alert("Registration Succesfully");
        console.log("Registration Succesfully");
        history.puse("/login");
      }
    }
  return (
    <>
        <section className="Register">
          <div className="container mt-5">
            <div className="Register-content">
              <div className="Register-form">
                  <h3 className="form-title">ADD Note</h3>
                  <form method="POST" className="register-form" id="register-form">
                    <div className="form-group">
                      <label htmlFor="title">
                      <i className="zmdi zmdi-account"></i>
                      </label>
                      <input type="text" name="title" id="title" autoComplete='off'
                        value={user.title}
                        onChange={handleInputs}
                        placeholder='your title' 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">
                      <i className="zmdi zmdi-email"></i>
                      </label>
                      <input type="text" name="description" id="description" autoComplete='off'
                        value={user.description}
                        onChange={handleInputs}
                        placeholder='your description' 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="tag">
                      <i className="zmdi zmdi-phone-in-talk"></i>
                      </label>
                      <input type="text" name="tag" id="tag" autoComplete='off'
                        value={user.tag}
                        onChange={handleInputs}
                        placeholder='your tag' 
                      />
                    </div>

                    <div className="form-gorupform-button">
                      <div className="button">
                      <input type="submit" name="Register" className='form-submit' 
                      value="register" onClick={PostData}/>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Add_Data
