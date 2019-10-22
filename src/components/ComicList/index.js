import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Context from "../../provider/apollo-graphql";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

export default function ComicsList() {
  const client = useContext(Context);
  const classes = useStyles();
  const comics = {
    columns: [
      {
        title: '',
        field: 'image',
        render: rowData => <Avatar alt={rowData.name} src={rowData.thumbnail ? `${rowData.thumbnail.path}.${rowData.thumbnail.extension}` : "/empty-avatar.png"} className={classes.bigAvatar}/>
      },
      { title: 'Title', field: 'id', render: rowData => <Button size="small" color="primary" component={Link} to={`/heros/${rowData.id}`}>{rowData.title} ({rowData.characters.available})</Button>}
    ],
    data: [],
  };

  return (
    <div>
      <MaterialTable
        title="Comics"
        columns={comics.columns}
        data = { query => {
          // console.log(JSON.stringify(query, null, 2));
          return client.paginateQuery("comics", `
        {
          comics(limit: ${query.pageSize}, offset: ${query.page*query.pageSize}) {
            meta {
              offset
              limit
              total
              count
            }
            data {
              id
              title
              description
              characters {
                available
                returned
                items {
                  name
                  role
                }
              }
              thumbnail {
                path
                extension
              }
            }
          }
        }
        `)
        }}
        options={{
          search: false,
          actionsColumnIndex: -1
        }}
      />
    </div>
  );
}
