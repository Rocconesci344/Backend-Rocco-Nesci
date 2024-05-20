const TicketService = require('../service/ticket.service');

class TicketController {
    static async getAllTickets(req, res) {
        try {
            const tickets = await TicketService.getAllTickets();
            res.json(tickets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async createTicket(req, res) {
        const ticketData = req.body;
        try {
            const newTicket = await TicketService.createTicket(ticketData);
            res.status(201).json(newTicket);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = TicketController;