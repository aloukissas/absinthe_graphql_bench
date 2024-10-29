# AbsintheTest

A simple Absinthe GraphQL server to benchmark performance (latency and throughput).

To run the server for experiments:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `MIX_ENV=prod mix phx.server`

The sample query you can use for your benchmarks is below - it comes from hard-coded data (no DB calls).

```graphql
      query authors {
        authors {
          id
          name
          company
          books {
            id
            name
            numPages
          }
        }
      }
```
