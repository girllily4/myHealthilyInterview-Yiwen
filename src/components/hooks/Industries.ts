import React from 'react';
import { Industry } from '../../types/api';

export interface IndustriesRetureType {
  industries?: Industry[];
  industryCart?: Industry[];
  sortedIndustries?: Industry[];
  filteredIndustries?: Industry[];
  isSorted: boolean;
  isFiltered: boolean;
  // industriesAscendingBySICCode: Industry[];
  // industriesDesendingBySICCode: Industry[];
  // industriesAscendingByTitle: Industry[];
  // industriesDesendingByTitle: Industry[];

  updateIndustryList: (newIndustryList: Industry[]) => void;
  sortIndustries: (
    groupBy: IndustriesGroupBy,
    sortBy: IndustriesSortBy
  ) => void;
  filteredBySIC: (keyword: string) => void;
  filteredByTitle: (keyword: string) => void;
  clearFilters: () => void;
  addToCart: (mem: Industry) => void;
  deleteFromCart: (mem: Industry) => void;
}

export type IndustriesGroupBy = 'SIC_Code' | 'Title';
export type IndustriesSortBy = 'Ascending' | 'Descending';

export const useIndustries = (): IndustriesRetureType => {
  const [industries, setIndustries] = React.useState<Industry[]>();
  const [sortedIndustries, setSortedIndustries] = React.useState<Industry[]>();
  const [filteredIndustries, setFilteredIndustries] =
    React.useState<Industry[]>();
  const [industryCart, setIndustryCart] = React.useState<Industry[]>([]);
  const [isSorted, setIsSorted] = React.useState(false);
  const [isFiltered, setIsFiltered] = React.useState(false);
  // const [isSorted, setIsSorted] = React.useState<boolean>(true);
  const updateIndustryList = React.useCallback(
    (newIndustryList: Industry[]) => {
      setIndustries(newIndustryList);
      setSortedIndustries(newIndustryList);
      setFilteredIndustries(newIndustryList);
    },
    []
  );

  const sortIndustries = React.useCallback(
    (groupBy: IndustriesGroupBy, sortBy: IndustriesSortBy) => {
      let tempResult = industries?.concat();
      if (groupBy === 'SIC_Code' && sortBy === 'Ascending') {
        tempResult = tempResult?.sort((a, b) => a.sic_code - b.sic_code);
        // setSortedIndustries(tempResult);
      } else if (groupBy === 'SIC_Code' && sortBy === 'Descending') {
        tempResult = tempResult?.sort((a, b) => b.sic_code - a.sic_code);
        // setSortedIndustries(tempResult);
      } else if (groupBy === 'Title' && sortBy === 'Ascending') {
        tempResult = tempResult?.sort((a, b) => a.title.localeCompare(b.title));
        // setSortedIndustries(tempResult);
      } else if (groupBy === 'Title' && sortBy === 'Descending') {
        tempResult = tempResult?.sort((a, b) => b.title.localeCompare(a.title));
        // setSortedIndustries(tempResult);
      }
      setIsSorted(true);
      setSortedIndustries(tempResult);
      // console.log('temp Result', tempResult);
      return tempResult;
    },
    [industries]
  );

  const filteredBySIC = React.useCallback(
    (keyword: string) => {
      const temp = industries
        ?.concat()
        .filter((industry: Industry) =>
          industry.sic_code.toString().includes(keyword)
        );
      console.log('filteredBySIC', temp);
      setFilteredIndustries(temp);
    },
    [industries]
  );

  const filteredByTitle = React.useCallback(
    (keyword: string) => {
      const temp = industries
        ?.concat()
        .filter((industry: Industry) =>
          industry.title.toString().includes(keyword)
        );
      console.log('filteredByTitle', temp);
      setIsFiltered(true);
      setFilteredIndustries(temp);
    },
    [industries]
  );

  const clearFilters = React.useCallback(() => {
    setIsFiltered(false);
    setFilteredIndustries(industries?.concat());
  }, [industries]);

  const addToCart = React.useCallback(
    (mem: Industry) => {
      setIndustryCart(industryCart?.concat(mem));
    },
    [industryCart]
  );
  const deleteFromCart = React.useCallback(
    (mem: Industry) => {
      const temp = industryCart?.filter(
        (industry) => industry.sic_code !== mem.sic_code
      );
      console.log('deleteFromCart', temp);
      setIndustryCart(temp);
    },
    [industryCart]
  );

  return {
    industries,
    industryCart,
    sortedIndustries,
    filteredIndustries,
    isSorted,
    isFiltered,
    updateIndustryList,
    sortIndustries,
    filteredBySIC,
    filteredByTitle,
    clearFilters,
    addToCart,
    deleteFromCart,
  };
};
