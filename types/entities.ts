export type HealthStatus = 'green' | 'yellow' | 'red';

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface RestaurantSummary {
  id: string;
  name: string;
  activeWeekLabel: string;
  weekStatus: string;
  redIssues: number;
  openTasks: number;
  revenue: number;
  foodCostPercent: number;
  fotPercent: number;
}

export interface RestaurantWeekSummary {
  id: string;
  label: string;
  dateRange: string;
  status: string;
  issuesCount: number;
  tasksCount: number;
}

export interface WeekBlock {
  id: string;
  name: string;
  status: HealthStatus;
  problemsCount: number;
  tasksCount: number;
  metricSummary: string;
}

export interface WeekMetrics {
  weekId: string;
  revenue: number;
  avg_check: number;
  guest_count: number;
  food_cost_value: number;
  food_cost_percent: number;
  fot_value: number;
  fot_percent: number;
  write_offs_value: number;
  inventory_diff_value: number;
  negative_stock_value: number;
  comments: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  restaurantName: string;
  weekLabel: string;
  assignedUser?: string;
  deadline?: string;
  analysis?: {
    reason: string;
    solution: string;
    result: string;
  };
  comments: Array<{ id: string; author: string; text: string; createdAt: string }>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  assignedUser?: string;
  deadline?: string;
  block: string;
  restaurant: string;
}

export interface PriceRecord {
  id: string;
  product: string;
  supplier: string;
  restaurant: string;
  price: number;
  date: string;
  deltaPercent: number;
  status: HealthStatus;
}
