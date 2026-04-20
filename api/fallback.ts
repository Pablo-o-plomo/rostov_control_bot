import { Issue, PriceRecord, RestaurantSummary, RestaurantWeekSummary, Task, WeekBlock, WeekMetrics } from '@/types/entities';

export const fallbackRestaurants: RestaurantSummary[] = [
  {
    id: 'r1',
    name: 'Rostov Center',
    activeWeekLabel: '2026-W16',
    weekStatus: 'in_progress',
    redIssues: 3,
    openTasks: 8,
    revenue: 2420000,
    foodCostPercent: 33.2,
    fotPercent: 28.4,
  },
];

export const fallbackWeeks: RestaurantWeekSummary[] = [
  {
    id: 'w16',
    label: '2026-W16',
    dateRange: '13.04.2026 – 19.04.2026',
    status: 'in_progress',
    issuesCount: 6,
    tasksCount: 9,
  },
];

export const fallbackBlocks: WeekBlock[] = [
  { id: 'b1', name: 'Выручка и чек', status: 'yellow', problemsCount: 1, tasksCount: 2, metricSummary: 'Выручка 2.42M ₽' },
  { id: 'b2', name: 'Food Cost', status: 'red', problemsCount: 2, tasksCount: 2, metricSummary: '33.2% (цель 30%)' },
  { id: 'b3', name: 'Склад и потери', status: 'yellow', problemsCount: 1, tasksCount: 1, metricSummary: 'Списания 145k ₽' },
  { id: 'b4', name: 'Закупки', status: 'green', problemsCount: 0, tasksCount: 1, metricSummary: 'Отклонение +2.1%' },
  { id: 'b5', name: 'ФОТ', status: 'yellow', problemsCount: 1, tasksCount: 1, metricSummary: '28.4% (цель 26%)' },
  { id: 'b6', name: 'Красные зоны', status: 'red', problemsCount: 3, tasksCount: 2, metricSummary: '3 критических пункта' },
  { id: 'b7', name: 'Решения и результат', status: 'yellow', problemsCount: 1, tasksCount: 3, metricSummary: '2 из 5 закрыты' },
];

export const fallbackMetrics: WeekMetrics = {
  weekId: 'w16', revenue: 2420000, avg_check: 1320, guest_count: 1834, food_cost_value: 804000,
  food_cost_percent: 33.2, fot_value: 687000, fot_percent: 28.4, write_offs_value: 145000,
  inventory_diff_value: 72000, negative_stock_value: 31000, comments: 'Нужно снизить перерасход в мясной группе.'
};

export const fallbackIssues: Issue[] = [
  {
    id: 'i1', title: 'Перерасход по мясу', description: 'Food Cost выше нормы по мясной категории', type: 'food_cost', severity: 'critical', status: 'open',
    restaurantName: 'Rostov Center', weekLabel: '2026-W16', assignedUser: 'Иван Петров', deadline: '2026-04-24',
    comments: [{ id: 'c1', author: 'Бухгалтер', text: 'Требуется разбор закупочных цен.', createdAt: '2026-04-18' }]
  }
];

export const fallbackTasks: Task[] = [
  { id: 't1', title: 'Проверить поставщика говядины', description: 'Сверка прайса и накладных', status: 'in_progress', assignedUser: 'Иван Петров', deadline: '2026-04-23', block: 'Закупки', restaurant: 'Rostov Center' }
];

export const fallbackPrices: PriceRecord[] = [
  { id: 'p1', product: 'Говядина', supplier: 'ЮгМит', restaurant: 'Rostov Center', price: 760, date: '2026-04-19', deltaPercent: 6.4, status: 'red' }
];
