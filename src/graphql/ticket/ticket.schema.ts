import { gql } from "apollo-server";

export const ticketSchema = gql`
  type Ticket {
    id: Int
    title: String
    description: String
    urgency: Int
    status: String
    createdAt: String
    updatedAt: String
    completedAt: String
  }

  type Query {
    getTickets: [Ticket]
    getTicketById(id: Int!): Ticket
  }

  type Mutation {
    createTicket(
      title: String!
      description: String
      urgency: Int!
      status: String!
    ): Ticket

    updateTicket(
      id: Int!
      title: String
      description: String
      urgency: Int
      status: String
    ): Ticket

    updateStatus(id: Int!, status: String!): Ticket
  }

  type Subscription {
    ticketUpdated: Ticket!
  }
`;
