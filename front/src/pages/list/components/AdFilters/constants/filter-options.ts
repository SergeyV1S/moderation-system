import { AD_STATUS } from "@/constants";

export const categoryOptions = [
  {
    label: "Электроника",
    value: "0"
  },
  {
    label: "Недвижимость",
    value: "1"
  },
  {
    label: "Транспорт",
    value: "2"
  },
  {
    label: "Работа",
    value: "3"
  },
  {
    label: "Услуги",
    value: "4"
  },
  {
    label: "Животные",
    value: "5"
  },
  {
    label: "Мода",
    value: "6"
  },
  {
    label: "Детское",
    value: "7"
  }
];

export const statusOptions = [
  {
    label: AD_STATUS["approved"],
    value: "approved"
  },
  {
    label: AD_STATUS["pending"],
    value: "pending"
  },
  {
    label: AD_STATUS["rejected"],
    value: "rejected"
  }
];

export const sortByOptions = [
  {
    label: "Цена",
    value: "price"
  },
  {
    label: "Приоритет",
    value: "priority"
  },
  {
    label: "Дата создания",
    value: "createdAt"
  }
];
