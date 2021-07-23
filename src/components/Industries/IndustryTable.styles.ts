import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    container: {
      height: '70vh',
    },
    tableConsole: {
      width: '30vh',
    },
    inputMargin: {
      marginBottom: 8,
    },
    selectInput: {
      borderRadius: 4,
      position: 'relative',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 190,
      padding: '4px 26px 4px 12px',
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    cartElement: {
      fontSize: 12,
      textAlign: 'left',
      margin: '4px 12px',
      '&:hover': {
        background: '#D6CFC7',
        cursor: 'pointer',
      },
    },
  }),
  { name: 'IndustryTable' }
);
