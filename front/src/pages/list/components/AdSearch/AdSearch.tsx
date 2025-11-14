import { TextInput } from "@mantine/core";

import { useAdSearch } from "./hooks/useAdSearch";

export const AdSearch = () => {
  const { state, functions } = useAdSearch();

  return (
    <TextInput
      flex={1}
      placeholder='Введите название объявления'
      value={state.searchValue}
      onChange={functions.handleSearchChange}
    />
  );
};
