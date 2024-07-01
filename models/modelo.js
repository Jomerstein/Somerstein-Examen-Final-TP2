import fs from 'fs'
const json = './hola.json'

const traerDatos = async() =>{
    const data = JSON.parse(await fs.promises.readFile(json, "utf-8",(error, dt)=>{
        if(error){
            log(error, "Error trayendo los datos")
        }
    }
    ))
    
    
    return data
}

export default {
    
}