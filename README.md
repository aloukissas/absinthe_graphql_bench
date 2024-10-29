# AbsintheTest

A simple Absinthe GraphQL server to benchmark performance (latency and throughput).

To run the server for experiments:

- Run `mix setup` to install and setup dependencies
- Start Phoenix endpoint with `MIX_ENV=prod mix phx.server`

# Benchmarks

- Run `k6 run k6.js` to run the benchmark

# References

1. https://github.com/benawad/node-graphql-benchmarks
2. https://github.com/graphql-crystal/benchmarks
3. https://github.com/dotansimha/graphql-yoga/tree/main/benchmark
