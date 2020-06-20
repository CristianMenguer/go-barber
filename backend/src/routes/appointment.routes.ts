import { Router, Request, Response } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentRoutes = Router()
const appointmentRepository = new AppointmentRepository()

appointmentRoutes.post('/', (request: Request, response: Response) => {
    try {
        const { provider, date } = request.body

        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService(
            appointmentRepository
        )

        const appointment = createAppointment.execute({
            provider,
            date: parsedDate
        })

        return response.json(appointment)
    } catch (err) {
        return response.status(409).json({ error: err.message })
    }
})

appointmentRoutes.get('/', (request: Request, response: Response) => {
    const appointments = appointmentRepository.all()

    return response.json(appointments)
})

export default appointmentRoutes
