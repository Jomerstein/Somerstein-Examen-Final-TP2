import fs from 'fs'
import Joi from 'joi'
const sondasJson = './sondas.json'

const schema = Joi.object({
    id: Joi.number().min(1).max(5).required(),
    temperatura: Joi.number().min(-20).max(100).required()
})

const idSchema = Joi.object({
    id: Joi.number().min(1).max(5).required()
})

const traerDatos = async() =>{
    const data = JSON.parse(await fs.promises.readFile(sondasJson, "utf-8",(error, dt)=>{
        if(error){
            console.log("Error trayendo los datos");
        }
    }
    ))
    
    
    return data
}
const getSondas = async() =>{
    try{
        const data = await traerDatos()
        return data
    }catch(error){
        log(error)
    }
    
    
}
const postSonda = async(sonda) =>{
    try{
        const validar = schema.validate(sonda)
        if(validar.error){
            throw new Error('Datos no válidos')
        }
        const data = await traerDatos()
        let fechaActual = new Date()
        let fechaHoraEnArgentina = fechaActual.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
        sonda.fecha = fechaHoraEnArgentina
        data.push(sonda)
        const pushearData  = JSON.stringify(data)
        await fs.promises.writeFile(sondasJson, pushearData)
        return sonda
    }catch(error){
        throw new Error(error)
    }
}

const getSondasById = async (id) =>{
const idNumero = Number(id)
console.log(idNumero);
const validar = idSchema.validate({id: idNumero})
if(validar.error){
    throw new Error('No existe un id con ese número')
}
const data = await traerDatos()
const sonda = data.filter(sondaBuscada => sondaBuscada.id === idNumero)
if(sonda.length === 0){
    throw new Error('Sonda no encontrada')
}
return sonda


}

const getEstadisticas = async()=>{
    const data = await traerDatos()
    const estadistica = {
        cantidadTotalDeMuestras: 0,
        temperaturaSondas: {
            1: { cantidad: 0, promedioTemperatura: 0, totalTemperatura: 0 },
            2: { cantidad: 0, promedioTemperatura: 0, totalTemperatura: 0 },
            3: { cantidad: 0, promedioTemperatura: 0, totalTemperatura: 0 },
            4: { cantidad: 0, promedioTemperatura: 0, totalTemperatura: 0 },
            5: { cantidad: 0, promedioTemperatura: 0, totalTemperatura: 0 }
        }
    };

    data.forEach(data => {
    estadistica.cantidadTotalDeMuestras++
     estadistica.temperaturaSondas[data.id].cantidad++
     estadistica.temperaturaSondas[data.id].totalTemperatura += data.temperatura;
        
    });

    for (const id in estadistica.temperaturaSondas) {
        const sonda = estadistica.temperaturaSondas[id];
        if (sonda.cantidad > 0) {
            sonda.promedioTemperatura = sonda.totalTemperatura / sonda.cantidad;
        }
    }

    for (const id in estadistica.temperaturaSondas) {
        delete estadistica.temperaturaSondas[id].totalTemperatura;
    }

    return estadistica;
}


export default {
getSondas,
postSonda,
getSondasById,
getEstadisticas
}