import { request } from '@/api/http';
import { fallbackBlocks, fallbackIssues, fallbackMetrics, fallbackPrices, fallbackRestaurants, fallbackTasks, fallbackWeeks } from '@/api/fallback';
import { Issue, PriceRecord, RestaurantSummary, RestaurantWeekSummary, Task, TelegramAuthSession, TelegramAuthStatus, WeekBlock, WeekMetrics } from '@/types/entities';

const withFallback = async <T>(loader: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await loader();
  } catch {
    return fallback;
  }
};

export const login = (email: string, password: string) => request<{ token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const getRestaurants = () => withFallback(() => request<RestaurantSummary[]>('/restaurants'), fallbackRestaurants);
export const getRestaurantWeeks = (restaurantId: string) => withFallback(() => request<RestaurantWeekSummary[]>(`/restaurants/${restaurantId}/weeks`), fallbackWeeks);

export const getWeeks = () => withFallback(() => request<RestaurantWeekSummary[]>('/weeks'), fallbackWeeks);
export const getWeekBlocks = (weekId: string) => withFallback(() => request<WeekBlock[]>(`/weeks/${weekId}/blocks`), fallbackBlocks);
export const getWeekMetrics = (weekId: string) => withFallback(() => request<WeekMetrics>(`/weeks/${weekId}/metrics`), { ...fallbackMetrics, weekId });
export const saveWeekMetrics = (weekId: string, payload: WeekMetrics) => request<WeekMetrics>(`/weeks/${weekId}/metrics`, { method: 'PUT', body: JSON.stringify(payload) });

export const getIssues = (query = '') => withFallback(() => request<Issue[]>(`/issues${query}`), fallbackIssues);
export const getIssueById = (issueId: string) => withFallback(() => request<Issue>(`/issues/${issueId}`), fallbackIssues[0]);
export const fillIssueAnalysis = (issueId: string, payload: { reason: string; solution: string; result: string; assignedUser?: string; deadline?: string }) => request<Issue>(`/issues/${issueId}/analysis`, { method: 'POST', body: JSON.stringify(payload) });

export const getTasks = (query = '') => withFallback(() => request<Task[]>(`/tasks${query}`), fallbackTasks);
export const updateTaskStatus = (taskId: string, status: Task['status']) => request<Task>(`/tasks/${taskId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });

export const getPrices = () => withFallback(() => request<PriceRecord[]>('/prices'), fallbackPrices);
export const addPrice = (payload: Omit<PriceRecord, 'id' | 'deltaPercent' | 'status'>) => request<PriceRecord>('/prices', { method: 'POST', body: JSON.stringify(payload) });


export const startTelegramAuth = () => request<TelegramAuthSession>('/auth/telegram/start', { method: 'POST' });
export const getTelegramAuthStatus = (token: string) => request<TelegramAuthStatus>(`/auth/telegram/status?token=${encodeURIComponent(token)}`);
