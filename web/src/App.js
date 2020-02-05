import React, {useState,useEffect} from 'react';
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from "./services/api";
import DevItem from "./components/DevItem/Index";
import DevForm from "./components/DevForm";




function App() {

  const [devs,setDevs] = useState([]);

  useEffect(()=>{
      async function loadDev(){
        const response = await api.get("/devs");

        setDevs(response.data);
      }

      loadDev();
  }, []);

  async function handleAddDev(data){

    const response = await api.post("/devs",data);

    setDevs([...devs,response.data]);
    
  }

  
  return (
    <div id="app">
       <aside>
         <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
       </aside>


       <main>
        <ul>
          {devs.map(dev=>(
            <DevItem  key = {dev.id} dev={dev}/>
          ))}
        </ul>

       </main>
    </div>
  );
}

export default App;
