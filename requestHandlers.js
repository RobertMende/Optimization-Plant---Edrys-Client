
const [f1, f2, f3]=["f1", "f2", "f3"].map(el => window.document.getElementById(el));


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
    "MFC in Flow": f1,
    "Temperature Oven": f2,
    "Temperature Thermostat": f3
};

const setValueOnInput=(topic, newValue)=>{
    if(!(topic in topicForms)) return;

    const form=topicForms[topic];
    form.getElementsByTagName("input")[0].value=newValue.toFixed(1);
}

const  updateInputFields=(setValueRequest)=>{
    const msg=JSON.parse(setValueRequestBody);
    let topic, newValue;
    if(msg.subTopic==="MFC in"&&msg.data.func==="SetFlowRate"){
        topic="MFC in Flow"; newValue=msg.data.args[1];
    }
    else if(msg.subTopic==="Temperature Controller Oven"&&msg.data.func==="SetTemperature"){
        topic="Temperature Oven"; newValue=msg.data.args[0];
    }
    else if(msg.subTopic==="Thermostat"&&msg.data.func==="SetTemperature"){
        topic="Temperature Thermostat"; newValue=msg.data.args[0];
    }

    setValueOnInput(topic, newValue)
}

const updateButton=newState=>{
    const btn=window.document.getElementById("mvBtn");
    btn.innerHTML=newState? "Turn off Magnetic Valve": "Turn on Magnetic Valve";
}

export default appendEventHandlers;
export {updateInputFields}