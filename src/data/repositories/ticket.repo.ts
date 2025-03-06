import { prisma } from "../../config/prisma";
import { Ticket } from "@prisma/client";

export class TicketRepository {
  async createTicket(
    title: string,
    description: string,
    urgency: number,
    status: 'open' | 'resolved'
  ) {
    return await prisma.ticket.create({
      data: {
        title,
        description,
        urgency,
        status,
      },
    });
  }

  async getTickets(){
    return await prisma.ticket.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getTicketById(id: number) {
    return await prisma.ticket.findUnique({ where: { id } });
  }

  async updateTicket(data: Omit<Ticket, "createdAt" | "urgencyUpdatedAt">) {
    return await prisma.ticket.update({
      where: { id: data.id },
      data,
    });
  }

  async updateStatus(id: number, status: "open" | "resolved", completedAt: Date | null) {
    return await prisma.ticket.update({
      where: { id },
      data: { status, completedAt },
    });
  }
}
