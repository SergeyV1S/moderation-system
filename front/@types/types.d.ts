// Основные типы для объявлений
type AdStatus = "pending" | "approved" | "rejected" | "draft";
type Priority = "urgent" | "normal";
type Period = "today" | "week" | "month";
declare enum Category {
  ELECTRONICS = "Электроника",
  FASHION = "Мода",
  REAL_ESTATE = "Недвижимость",
  ANIMALS = "Животные",
  TRANSPORT = "Транспорт",
  JOB = "Работа",
  KIDS = "Детское",
  SERVICES = "Услуги"
}

// Тип для продавца
interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

// Тип для характеристик товара
interface Characteristics {
  Состояние: string;
  Гарантия: string;
  Производитель: string;
  Модель: string;
  Цвет: string;
}

// Тип для истории модерации
interface ModerationHistoryItem {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: AdStatus;
  reason: string | null;
  comment: string;
  timestamp: string;
}

// Основной тип объявления
interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: AdStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: Seller;
  characteristics: Characteristics;
  moderationHistory: ModerationHistoryItem[];
}

// Тип для пагинации
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Типы для фильтрации (дополнительно)
interface AdsFilter {
  status?: AdStatus;
  categoryId?: number;
  priority?: Priority;
  sellerId?: number;
  dateFrom?: string;
  dateTo?: string;
}

// Типы для сортировки (дополнительно)
type SortField = "createdAt" | "updatedAt" | "price" | "title";
type SortOrder = "asc" | "desc";

interface SortOptions {
  field: SortField;
  order: SortOrder;
}

// Тип для параметров запроса
interface AdsRequestParams {
  page?: number;
  limit?: number;
  filter?: AdsFilter;
  sort?: SortOptions;
}

// Типы для действий модерации
interface ModerateAdRequest {
  action: "approved" | "rejected";
  reason?: string;
  comment: string;
}
