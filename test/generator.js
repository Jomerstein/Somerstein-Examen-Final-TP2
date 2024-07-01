import { faker } from "@faker-js/faker"
const randomData = () => ({
    id: faker.number.int({ min: 1, max: 5 }),
    temperatura: faker.number.int({min:-20, max:100})
  
})

export default{
    randomData
} 