import { DatePickerInput } from "@mantine/dates";

import { useDateRangePicker } from "./hooks";

const MIN_DATE = new Date(2000, 1, 1);

export const DateRangePicker = () => {
  const { state, functions } = useDateRangePicker();

  return (
    <DatePickerInput
      clearable
      locale='ru'
      type='range'
      minDate={MIN_DATE}
      maxDate={new Date()}
      value={state.dateRange}
      valueFormat='DD MMMM YYYY'
      placeholder='Выберите даты'
      onChange={functions.handleDateRangeChange}
    />
  );
};
