import generator from "./generator.js";
import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://127.0.0.1:8080");

describe('Test', ()=>{
    it('Obtener datos de Faker', ()=>{
        const data = generator.randomData()
        expect(data)
    })

    describe('Test del método "postSondas"', ()=>{
        it('POST', async()=>{
            const data = generator.randomData()
            const response = await request.post('/sondas').send(data)
            expect(response.status).to.eq(200)
            const newData = response.body
            expect(newData).to.include.keys('id','temperatura')
        })
    })

    describe('Test del método "getSondas"', () =>{
        it('GET', async() =>{
            const response = await request.get("/sondas")
            expect(response.status).to.eq(200)
        })
    })

    describe('Test del método "getEstadisticas"', () =>{
        it('GET', async() =>{
            const response = await request.get("/estadistica")
            expect(response.status).to.eq(200)
        })
    })
})