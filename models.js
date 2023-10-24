import charts from "./charts.js";

const [c1,c2,c3,c4,c5,c6,c7]=charts;

export class TimeValueModel{
    constructor(topic, chart, maxLength){
        this.topic=topic;
        this.chart=chart;
        this.maxLength=maxLength;
    }

    appendValues(newData){
        const ts=parseFloat(newData.timestamp.toFixed(1));
        const v=parseFloat(newData.value.toFixed(1));
        if(this.chart.data.labels.length>=this.maxLength){
            this.chart.data.labels.shift();
            this.chart.data.datasets[0].data.shift();
        }
        this.chart.data.labels.push(ts);
        this.chart.data.datasets[0].data.push(v);
        this.chart.data.datasets[0].label=v;
    }
};

export class SpectrumModel{
    constructor(topic, chart){
        this.topic=topic;
        this.chart=chart;
    }

    appendValues(newData){
        this.chart.config.options.scales.x.reverse = true;
        this.chart.data.labels=newData.timestamp;
        this.chart.data.datasets[0].data=newData.value;
        console.log("Spectrum data length: ", newData.timestamp.length);
        
    }
}

const getOptimizationModels=()=>{
    const models=[new TimeValueModel("MFC in Flow", c1, 100), new TimeValueModel("Temperature Oven", c2, 100), new TimeValueModel("Temperature Thermostat", c3, 100), 
    new SpectrumModel("irSpectrum", c4), new TimeValueModel("IR Formaldehyde", c5, 300), new TimeValueModel("IR Methanol", c6), 300, new TimeValueModel("IR CO2", c7, 300)];

    return models;
}

export default getOptimizationModels;