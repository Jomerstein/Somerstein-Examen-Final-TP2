import sondaModel from "../models/sonda.modelo.js";

const postSonda = async (sonda) =>{
    try{
        const postearSonda  = await sondaModel.postSonda(sonda)
    return postearSonda
    }catch(error){
        throw new Error(error.message)
    }
}

const getSondas = async() =>{
    try{
        const getSondas = sondaModel.getSondas()
        return getSondas
    }catch(error){
        throw new Error(error.message)
    }
}

const getSondasById = async(id) =>{
    try {
        console.log('servicio id', id);
        const sondaPorId = await sondaModel.getSondasById(id);
        return sondaPorId;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getEstadisticas = async()=>{
    try{
        const estadistica = sondaModel.getEstadisticas()
        return estadistica
    }catch(error){
        throw new Error(error.message)
    }
}

export default {
postSonda,
getSondas,
getSondasById,
getEstadisticas
}