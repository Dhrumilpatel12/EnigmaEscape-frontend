import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: '2px 2px',
  },
  spacing: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '2px 0',
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
}));

export default useStyles;
