import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing="0"
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs="12">
        <Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/marvel.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Marvel
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>Marvel Studios</b> est une société de production cinématographique américaine en prises de vue réelles et en animation assurant les adaptations cinématographiques des productions de Marvel Entertainment, essentiellement issues des Marvel Comics.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Card>
      </Grid>
    </Grid>

  );
}
