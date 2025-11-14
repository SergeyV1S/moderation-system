import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useDebouncedValue } from "@mantine/hooks";

import { updateSearchParams } from "@/utils";

export const useAdSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const updateParams = updateSearchParams(searchParams, setSearchParams);

  const [debouncedSearchvalue] = useDebouncedValue(searchValue, 300);

  useEffect(() => {
    updateParams({
      search: debouncedSearchvalue || ""
    });
  }, [debouncedSearchvalue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return { state: { searchValue }, functions: { handleSearchChange } };
};
