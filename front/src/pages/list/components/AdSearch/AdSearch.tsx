import { TextInput } from "@mantine/core";

import { useAdSearch } from "./hooks/useAdSearch";

interface IAdSearchProps {
  ref: React.RefObject<HTMLInputElement>;
}

export const AdSearch = ({ ref }: IAdSearchProps) => {
  const { state, functions } = useAdSearch();

  return (
    <TextInput
      ref={ref}
      placeholder='Введите название объявления'
      value={state.searchValue}
      onChange={functions.handleSearchChange}
    />
  );
};
