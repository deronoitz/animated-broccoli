import { Ticket } from "@prisma/client";
import { TicketService } from "../../services/ticket.service";
import { pubsub } from "../pubsub";
import { DashboardService } from "../../services/dashboard.service";

const ticketService = new TicketService();
const dashboardService = new DashboardService();

export const ticketResolver = {
  Query: {
    getTickets: async () => {
      return await ticketService.getTickets();
    },
    getTicketById: async (_: any, args: { id: number }) => {
      return await ticketService.getTicketById(args.id);
    },
  },

  Mutation: {
    createTicket: async (
      _: any,
      args: Omit<Ticket, "createdAt" | "completedAt" | "updatedAt">
    ) => {
      const newTicket = await ticketService.createTicket(
        args.title,
        args.description ?? "",
        args.urgency,
        args.status || "open"
      );

      pubsub.publish("TICKET_CREATED", { ticketCreated: newTicket });

      // Update the dashboard
      const updatedDashboard = await dashboardService.getDashboard();
      pubsub.publish("DASHBOARD_UPDATED", { updatedDashboard });

      return newTicket;
    },

    updateTicket: async (
      _: any,
      args: Omit<
        Ticket,
        "createdAt" | "completedAt" | "updatedAt" | "urgencyUpdatedAt"
      >
    ) => {
      const payload = {
        id: args.id,
        title: args.title,
        description: args.description,
        urgency: args.urgency,
        status: args.status,
        updatedAt: new Date(),
        completedAt: null,
      };

      const updatedTicket = await ticketService.updateTicket(payload);

      pubsub.publish("TICKET_UPDATED", { ticketUpdated: updatedTicket });

      // Update the dashboard
      const updatedDashboard = await dashboardService.getDashboard();
      pubsub.publish("DASHBOARD_UPDATED", { updatedDashboard });

      return updatedTicket;
    },

    updateStatus: async (
      _: any,
      args: { id: number; status: "open" | "resolved" }
    ) => {
      const completedAt = args.status === "resolved" ? new Date() : null;

      const updatedTicket = await ticketService.updateStatus(
        args.id,
        args.status,
        completedAt
      );

      pubsub.publish("TICKET_UPDATED", { ticketUpdated: updatedTicket });

      // Update the dashboard
      const updatedDashboard = await dashboardService.getDashboard();
      pubsub.publish("DASHBOARD_UPDATED", { updatedDashboard });

      return updatedTicket;
    },
  },

  Subscription: {
    ticketUpdated: {
      subscribe: () =>
        pubsub.asyncIterableIterator(["TICKET_UPDATED", "TICKET_CREATED"]),
      resolve: (payload: {
        ticketUpdated?: Ticket;
        ticketCreated?: Ticket;
      }) => {
        // Check which event was triggered and return the correct value
        return payload.ticketUpdated || payload.ticketCreated;
      },
    },
  },
};
