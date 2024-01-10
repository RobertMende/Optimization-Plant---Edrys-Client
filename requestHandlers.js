
const f1=window.document.getElementById("f1");
const f2=window.document.getElementById("f2");
const f3=window.document.getElementById("f3");     


const appendEventHandlers=()=>{        
        
        const getFloat=(value)=>{
            const valueWithPoint=value.replace(',','.');
            return parseFloat(parseFloat(valueWithPoint).toFixed(1));
        }
        
        f1.addEventListener("submit", e=>{
            //mfc
            e.preventDefault();
            const input=getFloat(e.target[0].value)
            console.log("Clicked");
            console.log(input);
            const info={topic: "setValue", subTopic: "MFC in", data: {func: "SetFlowRate", args: [input, 1]}}
            Edrys.sendMessage("setValue", info);
        })

        f2.addEventListener("submit", e=>{
            //oven
            e.preventDefault();
            const input=getFloat(e.target[0].value)
            const info={topic: "setValue", subTopic: "Temperature Controller Oven", data: {func: "SetTemperature", args: [input]}}
            Edrys.sendMessage("setValue", info);
        })

        f3.addEventListener("submit", e=>{
            //thermostat
            e.preventDefault();
            const input=getFloat(e.target[0].value)
            const info={topic: "setValue", subTopic: "Thermostat", data: {func: "SetTemperature", args: [input]}}
            Edrys.sendMessage("setValue", info);
        });

        let valveState=false;
        const btn=window.document.getElementById("mvBtn");
        btn.innerHTML="Turn On Magnetic Valve";
        btn.addEventListener("click", (e)=>{
            const info={topic: "setValue", subTopic: "Relay switch", data: {func: valveState?"turnOff":"turnOn", args: [1]}};
            Edrys.sendMessage("setValue", info);
            valveState=!valveState;
            
        })
    }

const topicForms={
    "MFC in": f1,
    "Temperature Oven": f2,
    "Temperature Thermostat": f3
};

const  updateInputFields=(setValueRequest)=>{

}

const updateButton=newState=>{
    const btn=window.document.getElementById("mvBtn");
    btn.innerHTML=newState? "Turn off Magnetic Valve": "Turn on Magnetic Valve";
}

export default appendEventHandlers;
export {updateInputFields}
