import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

export async function updateTicketUrgency() {
  console.log("Running CRON updating ticket urgency");

  const now = new Date().getTime();
  const tickets = await prisma.ticket.findMany({
    where: {
      urgency: { in: [2, 3] },
      status: "open"
    },
  });

  for (const ticket of tickets) {
    const lastUpdated = new Date(Number(ticket.urgencyUpdatedAt)).getTime();
    const diffInHours = (now - lastUpdated) / (1000 * 60 * 60);
    
    let newUrgency = ticket.urgency;

    if(ticket.urgency === 2 && diffInHours >= 72) {
      // 72 hours = 3 days
      newUrgency = 3;
    }

    if(ticket.urgency === 3 && diffInHours >= 6) {
      // 6 hours
      newUrgency = 4;
    }

    if (newUrgency !== ticket.urgency) {
      await prisma.ticket.update({
        where: { id: ticket.id },
        data: { urgency: newUrgency, urgencyUpdatedAt: new Date() },
      });
    }
  }
}

cron.schedule("0 * * * *", updateTicketUrgency);
