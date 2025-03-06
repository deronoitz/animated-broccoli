import { DashboardService } from '../../services/dashboard.service';
import { pubsub } from '../pubsub';
const dashboardService = new DashboardService();

export const dashboardResolver = {
  Query: {
    getDashboard: async () => {
      return await dashboardService.getDashboard();
    },
  },
  Subscription: {
    updatedDashboard: {
      subscribe: () => pubsub.asyncIterableIterator(['DASHBOARD_UPDATED']),
    }
  }
};
