import React, {useState} from 'react'
import {gql} from 'apollo-boost';
import ApolloClient from "apollo-client";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";





const Context = React.createContext(["", () => {}]);

const client = (uri) => {
  const link = createPersistedQueryLink({useGETForHashedQueries: true}).concat(createHttpLink({ uri }));
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
};

const Provider = (props) => {
  const clt = client(props.value.uri);
  const [state] = useState({
    client: clt,
    paginateQuery: (field, q) => {
      return new Promise((resolve, reject) => {
        clt.query({ query: gql(q) })
          .then((res) => {
            resolve({
              data: res.data[field].data,
              page: res.data[field].meta.offset / res.data[field].meta.limit,
              totalCount: Math.floor(res.data[field].meta.total / res.data[field].meta.limit),
            });
          })
          .catch(() => {
            reject({
              data: [],
              page: 0,
              totalCount: 0,
            })
          })
      })
    }
  });

  return (
    <Context.Provider value={state}>
      { props.children }
    </Context.Provider>
  )
};

const Consumer = Context.Consumer;

export { Provider, Consumer };
export default Context;






