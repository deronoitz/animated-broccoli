import { TicketRepository } from "../data/repositories/ticket.repo";

export class DashboardService {
  private ticketRepo = new TicketRepository();

  async getDashboard() {
    const tickets = await this.ticketRepo.getTickets();
    const completedTickets = tickets.filter((ticket) => ticket.status === "resolved" && ticket.completedAt !== null);

    const averageTicketAge =
      completedTickets.reduce((acc, ticket) => {
        const ticketAge = new Date(Number(ticket.completedAt)).getTime() - new Date(ticket.createdAt).getTime();
        return acc + ticketAge;
      }, 0) / completedTickets.length;

    const averageTicketAgeInDays = Math.floor(averageTicketAge / (1000 * 60 * 60 * 24));

    return {
      openTickets: tickets.filter((ticket) => ticket.status === "open").length || 0,
      urgentTickets: tickets.filter((ticket) => ticket.urgency === 3).length || 0,
      averageTicketAge: averageTicketAgeInDays || 0,
    };
  }
}