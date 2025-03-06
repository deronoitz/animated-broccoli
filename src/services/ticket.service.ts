import { TicketRepository } from "../data/repositories/ticket.repo";
import { Ticket } from "@prisma/client";

export class TicketService {
  private ticketRepo = new TicketRepository();

  async getTickets() {
    return this.ticketRepo.getTickets();
  }

  async getTicketById(id: number) {
    return this.ticketRepo.getTicketById(id);
  }

  async createTicket(
    title: string,
    description: string,
    urgency: number,
    status: "open" | "resolved"
  ) {
    return this.ticketRepo.createTicket(title, description, urgency, status);
  }

  async updateTicket(data: Omit<Ticket, "createdAt" | "urgencyUpdatedAt">) {
    return this.ticketRepo.updateTicket(data);
  }

  async updateStatus(id: number, status: "open" | "resolved", completedAt: Date | null) {
    return this.ticketRepo.updateStatus(id, status, completedAt);
  }
}
