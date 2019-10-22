import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ListComicsName({ title, items }) {
  const classes = useStyles();

  return (
    <List subheader={items.length >0 ? <ListSubheader>{title}</ListSubheader> : null} className={classes.root}>
      { items.map(item => <ListItem key={item.name}>{item.name}</ListItem>)}
    </List>
  );
}
