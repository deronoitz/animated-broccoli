import { gql } from "apollo-server";

export const dashboardSchema = gql`
  type Dashboard {
    openTickets: Int
    urgentTickets: Int
    averageTicketAge: Int
  }
  
  type Query {
    getDashboard: Dashboard
  }

  type Subscription {
    updatedDashboard: Dashboard
  }
`