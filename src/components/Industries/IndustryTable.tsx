import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';
import IndustryTableConsole from './IndustryTableConsole';
import IndustryCart from './IndustryCart';
import { useStyles } from './IndustryTable.styles';
import ApiClient from '../../api/api-clients';
import { Industry } from '../../types';
import { useIndustries } from '../hooks';

interface Column {
  key: 'sic_code' | 'title';
  label: string;
}

const columns: Column[] = [
  { key: 'sic_code', label: 'SIC Code' },
  { key: 'title', label: 'Title' },
];

const IndustryTable: React.FC<{}> = () => {
  const industryReturnType = useIndustries();
  const {
    industries,
    sortedIndustries,
    filteredIndustries,
    isSorted,
    isFiltered,
    updateIndustryList,
    addToCart,
  } = industryReturnType;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [displayedIndustry, setDisplayedIndustry] =
    React.useState<Industry[]>();
  const classes = useStyles();

  useEffect(() => {
    const fetchIndustries = async () => {
      const industires = await ApiClient.getIndustryList();
      updateIndustryList(industires);
    };
    fetchIndustries();
    console.log('fetch');
  }, [updateIndustryList]);

  useEffect(() => {
    if (!isFiltered && isSorted) setDisplayedIndustry(sortedIndustries);
    else if (isFiltered) setDisplayedIndustry(filteredIndustries);
    else if (!isFiltered) setDisplayedIndustry(industries);
  }, [isSorted, isFiltered, industries, sortedIndustries, filteredIndustries]);

  const handleTableRowClick = React.useCallback(
    (mem: Industry) => {
      addToCart(mem);
    },
    [addToCart]
  );

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    },
    []
  );

  return (
    <div className={classes.root}>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedIndustry
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((industry: Industry) => {
                  return (
                    <TableRow
                      hover
                      key={industry.sic_code}
                      onClick={() => handleTableRowClick(industry)}
                    >
                      {columns.map((column) => {
                        // const value = industry[column.key];
                        return (
                          <TableCell key={column.key}>
                            {industry[column.key]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100, 250, 500]}
          component="div"
          count={displayedIndustry?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Paper className={classes.tableConsole}>
        <IndustryTableConsole industryReturnType={industryReturnType} />
        <IndustryCart industryReturnType={industryReturnType} />
      </Paper>
    </div>
  );
};

export default IndustryTable;
