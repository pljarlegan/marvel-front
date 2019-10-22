import React, {useState, useContext} from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Context from "../../provider/apollo-graphql";
import Typography from "@material-ui/core/Typography";
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

export default function CharacterList() {
  const classes = useStyles();
  const client = useContext(Context);
  // let { comicId } = useParams();
  const [ characters ] = useState({
    columns: [
      {
        title: '',
        field: 'image',
        render: rowData => <Avatar alt={rowData.name} src={rowData.thumbnail ? `${rowData.thumbnail.path}.${rowData.thumbnail.extension}` : "/empty-avatar.png"} className={classes.bigAvatar}/>
      },
      {
        title: 'Name',
        field: 'id',
        render: rowData => <Button component={Link} to={`/hero/${rowData.id}`} size="small" color="primary">{rowData.name} ({rowData.comics.items.length})</Button>
      },
      {
        title: 'Description',
        field: 'description',
        render: rowData => <Typography variant="body2" color="textSecondary" component="p">{rowData.description.substr(0,100)}</Typography>
      }
    ],
    data: [ { info: "fetch data ..." } ],
  });

  return (
    <div>
      <MaterialTable
        title="Characters"
        columns={characters.columns}
        data = { query => client.paginateQuery("characters",`
          {
              characters(limit: ${query.pageSize}, offset: ${query.page*query.pageSize}) {
                  meta {
                      offset
                      limit
                      total
                      count
                  }
                  data {
                      id
                      name
                      comics {
                          items {
                              name
                          }
                      }
                      description
                      resourceURI
                      thumbnail {
                          path
                          extension
                      }
                  }
              }
          }
        `)}
        options={{
          search: false,
          actionsColumnIndex: -1
        }}
      />
    </div>
  );
}
