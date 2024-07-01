import express from 'express'
import controller from '../controllers/sonda.controller.js'
const router = express.Router()

router.post('/sondas', controller.postSonda)
router.get('/sondas', controller.getSondas)
router.get('/sondas/:id', controller.getSondasById)
router.get('/estadistica', controller.getEstadisticas)
export default router