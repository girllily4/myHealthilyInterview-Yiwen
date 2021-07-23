import React, { useEffect } from 'react';
import { TextField, InputBase, Select } from '@material-ui/core';
import { useStyles } from './IndustryTable.styles';
import { IndustriesRetureType } from '../hooks/Industries';

type SortWay =
  | 'AscendingBySIC'
  | 'DescendingBySIC'
  | 'AscendingByTitle'
  | 'DescendingByTitle'
  | '';

type Props = {
  industryReturnType: IndustriesRetureType;
};

const IndustryTableConsole: React.FC<Props> = (props) => {
  const classes = useStyles();
  const industryReturnType = props.industryReturnType;
  const { sortIndustries, filteredBySIC, filteredByTitle, clearFilters } =
    industryReturnType;
  const [sortValue, setSortValue] = React.useState<SortWay>('');
  const [SICFilter, setSICFilter] = React.useState('');
  const [titleFilter, setTitleFilter] = React.useState('');

  useEffect(() => {
    setSICFilter('');
    setTitleFilter('');
    clearFilters();
    switch (sortValue) {
      case 'AscendingBySIC':
        sortIndustries('SIC_Code', 'Ascending');
        break;
      case 'DescendingBySIC':
        sortIndustries('SIC_Code', 'Descending');
        break;
      case 'AscendingByTitle':
        sortIndustries('Title', 'Ascending');
        break;
      case 'DescendingByTitle':
        sortIndustries('Title', 'Descending');
        break;
    }
  }, [sortValue, sortIndustries, clearFilters]);

  const handleSortChange = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSortValue(event.target.value as SortWay);
    },
    []
  );

  const handleSICFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSICFilter(event.target.value);
    },
    []
  );

  const handleTitleFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleFilter(event.target.value);
    },
    []
  );

  // Filter SIC
  useEffect(() => {
    if (SICFilter === '') {
      return;
    }
    setTitleFilter('');
    const time = setTimeout(() => filteredBySIC(SICFilter), 1000);
    return () => clearTimeout(time);
  }, [SICFilter, filteredBySIC]);

  // Filter Title
  useEffect(() => {
    if (titleFilter === '') {
      return;
    }
    setSICFilter('');
    const time = setTimeout(() => filteredByTitle(titleFilter), 1000);
    return () => clearTimeout(time);
  }, [titleFilter, filteredByTitle]);

  return (
    <form>
      <h3 style={{ marginBottom: 16 }}>Table Console</h3>
      <TextField
        variant="outlined"
        size="small"
        id="search-by-sic-code"
        label="SIC Code Search"
        value={SICFilter}
        onChange={handleSICFilterChange}
        className={classes.inputMargin}
      />
      <TextField
        variant="outlined"
        size="small"
        id="search-by-title"
        label="Title Search"
        value={titleFilter}
        onChange={handleTitleFilterChange}
        className={classes.inputMargin}
      />
      <Select
        native
        variant="outlined"
        input={<InputBase className={classes.selectInput} />}
        placeholder="Select Way to Sort"
        value={sortValue}
        onChange={handleSortChange}
      >
        <option value="" />
        <option value="AscendingBySIC">SIC Code Ascending</option>
        <option value="DescendingBySIC">SIC Code Descending</option>
        <option value="AscendingByTitle">Title Ascending</option>
        <option value="DescendingByTitle">Title Descending</option>
      </Select>
    </form>
  );
};
export default IndustryTableConsole;
