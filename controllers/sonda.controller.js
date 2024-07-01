import sondaService from "../services/sonda.service.js";

const postSonda = async(req,res) =>{
try{
    const sonda = req.body
    const postearSonda = await sondaService.postSonda(sonda)
    res.send(postearSonda)
}catch(error){
    res.status(500).json({error: error.message})
}
}

const getSondas = async(req,res) =>{
    try{
        const sondas = await sondaService.getSondas()
        res.send(sondas)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
const getSondasById = async(req,res) =>{
    try{
        const id = req.params.id
        console.log(typeof(id));
        const sondaPorId  = await sondaService.getSondasById(id)
        res.send(sondaPorId)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const getEstadisticas = async (req,res) =>{
    try{
        const estadistica = await sondaService.getEstadisticas()
        res.send(estadistica)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}



export default {
postSonda,
getSondas,
getSondasById,
getEstadisticas
}