import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import data from "./Data";
function Action({show, setShow}) {
    const onDragStart = (event, nodeTypes, icon) => {
        event.dataTransfer.setData('application/reactflow', nodeTypes);
        event.dataTransfer.effectAllowed = 'move';
    };
    
    return (<div>
       <h3 style={{border:"1px solid black", color:"ActiveBorder" ,height:"35px",width:"250px",margin:"10px",padding:"10px"}}>Action
            {show?.Action?  <button onClick={()=>setShow({Action: false})} style={{justifyContent:"end",height:"15px", marginLeft:"163px"}}>-</button>:<button onClick={()=>setShow({Action: true})} style={{justifyContent:"end",height:"15px", marginLeft:"165px"}}>+</button>} 
            </h3> 
            
          {show?.Action && 
            <div style={{ display: "grid", gridTemplateColumns: "33% 33% 33%", marginTop: "30px" ,backgroundColor:"#3d404e"}}>

                {data.map((data, index) => (
                <div key={index}
                    onDragStart={(event) => onDragStart(event, data.type, data.icon)} draggable>
                    <FontAwesomeIcon icon={data?.icon} style={{ height: "auto", width: "25px", color: '#ffff', padding: '8px', borderRadius: '50%', margin: '10px 2px 0px 25px', backgroundColor: 'green' }} />

                    <p style={{ color: "white", display: "flex", margin: "10px 0 0 10px", fontSize: "13px", marginLeft: "15px" }}>{data.text}</p>

                </div>
))}
            </div>}
</div>
    
       
    );
}
export default Action;
