import React, { useState, useEffect, useContext } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ListComicsName from "../listItem";
import Context from "../../provider/apollo-graphql";
import { gql } from "apollo-boost";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    minWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CharacterCard({ location }) {
  let { heroId } = useParams();
  const [ character, setCharacter ] = useState({});
  const client = useContext(Context);

  useEffect(() => {
    client.client.query({
      query: gql`
          {
              character(id:${heroId}) {
                  name
                  description
                  comics {
                      items {
                          name
                      }
                  }
                  thumbnail {
                      path
                      extension
                  }
              }
          }
      `
    })
    .then((res) => {
      setCharacter(res.data.character)
    })
  }, [client, heroId]);

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={ character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : "/marvel.jpg" }
              title={character.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {character.name}
              </Typography>
              { character.description ? <Typography variant="body2" color="textSecondary" component="p">
                { character.description }
              </Typography> : null }
              <ListComicsName title={`This character appear in ${character && character.comics ? character.comics.items.length : 0} comics:`} items={character.comics ? character.comics.items : []}/>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>

  );
}
