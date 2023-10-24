const data = {
    labels: [], // Empty labels array
    datasets: [{
        label: '', // Empty label
        data: [],  // Empty data array
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
    }]
};

const getNewData=()=>{
    const d={
    labels: [], // Empty labels array
    datasets: [{
        label: '', // Empty label
        data: [],  // Empty data array
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
    }]
}
return d;

}



const getNewOptions=(idx)=>{
    const options = {
        responsive: true,
        
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X Axis Label'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis Label'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Chart Title',
                fontSize: 16
            }
        }
    };
    const cs=chartSettings[idx];
    options.scales.x.title.text=cs.xaxis;
    options.scales.y.title.text=cs.yaxis;
    options.plugins.title.text=cs.title;

    return options;
}

const ctx=window.document.getElementById("c1");
function createLineChart(ctx, data, options){
    
    return new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
}

const chartSettings=[
    {title: "MFC in Flow Rate", xaxis: "Time (s)", yaxis: "Flow Rate (sccm/min)"},
    {title: "Temperature Oven", xaxis: "Time (s)", yaxis: "Temperature (°C)"},
    {title: "Temperature Thermostat", xaxis: "Time (s)", yaxis: "Temperature (°C)"},
    {title: "IR Spectrum", xaxis: "Wave Numbers (1/cm)", yaxis: "Transmission (%)"},
    {title: "IR Formaldehyde", xaxis: "Time (s)", yaxis: "Transmission (%)"},
    {title: "IR Methanol", xaxis: "Time (s)", yaxis: "Transmission (%)"},
    {title: "IR CO2", xaxis: "Time (s)", yaxis: "Transmission (%)"},
]


const c1=createLineChart(window.document.getElementById("c1"), getNewData(), getNewOptions(0));
const c2=createLineChart(window.document.getElementById("c2"), getNewData(), getNewOptions(1));
const c3=createLineChart(window.document.getElementById("c3"), getNewData(), getNewOptions(2));

const irOptions=getNewOptions(3);
irOptions.elements={
    point:{
        radius: 0
    }};
irOptions.scales.x={
    type: 'linear',
    position: 'bottom',
    ticks: {
        min: 1500,
        max: 4000,
        stepSize: 500,
        position: "right",
        reverse: true
    }
};
const irData=getNewData();
irData.datasets[0].borderColor="red";
const c4=createLineChart(window.document.getElementById("c4"), irData, irOptions);
const c5=createLineChart(window.document.getElementById("c5"), getNewData(), getNewOptions(4));
const c6=createLineChart(window.document.getElementById("c6"), getNewData(), getNewOptions(5));
const c7=createLineChart(window.document.getElementById("c7"), getNewData(), getNewOptions(6));

const charts=[c1, c2, c3, c4, c5, c6, c7];

export default charts;