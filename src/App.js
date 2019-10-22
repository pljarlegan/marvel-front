import React from 'react';
import {
  Switch,
  Route,
  // useLocation,
} from "react-router-dom";

import ButtonAppBar from "./components/ButtonAppBar";
import CharacterCard from "./components/CharacterCard";
import ComicsList from "./components/ComicList";
import Home from "./components/Home";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CharacterList from "./components/CharacterList";
import { Provider } from "./provider/apollo-graphql";
import config from './config/default';
import {
  BrowserRouter as Router
} from "react-router-dom";

export default function App() {
  return (
    <Provider value={{uri: config.graphql.endpoint}}>
      <div>
        <Router>
        <ButtonAppBar/>
        <br/>
        <React.Fragment>
          <CssBaseline/>
          <Container fixed>

              <Switch>
                <Route path="/hero/:heroId">
                  <CharacterCard/>
                </Route>
                <Route path="/comics">
                  <ComicsList/>
                </Route>
                <Route path="/heros/:comicId">
                  <CharacterList/>
                </Route>
                <Route path="/heros">
                  <CharacterList/>
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
              </Switch>

          </Container>
        </React.Fragment>
        </Router>
      </div>
    </Provider>
  );
}
