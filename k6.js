import http from "k6/http";
import { Trend, Rate } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const DURATION = 30;
const VUS = 1;

export const options = {
  scenarios: {
    graphqlAbsinthe: {
      executor: "constant-vus",
      exec: "runGraphqlAbsinthe",
      vus: VUS,
      duration: `${DURATION}s`,
      startTime: "0s",
    },
    graphqlYogaBun: {
      executor: "constant-vus",
      exec: "runGraphqlYogaBun",
      vus: VUS,
      duration: `${DURATION}s`,
      startTime: `${DURATION * 1}s`,
    },
    restPlug: {
      executor: "constant-vus",
      exec: "runRestPlug",
      vus: VUS,
      duration: `${DURATION}s`,
      startTime: `${DURATION * 2}s`,
    },
  },
};

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

const graphqlTrendAbsinthe = new Trend(
  "bench_graphql_absinthe_request_latency",
  true
);
const graphqlTrendYogaBun = new Trend(
  "bench_graphql_yoga_bun_request_latency",
  true
);
const restTrend = new Trend("bench_rest_plug_request_latency", true);

const graphqlRateAbsinthe = new Rate("bench_graphql_absinthe_request_rate");
const graphqlRateYogaBun = new Rate("bench_graphql_yoga_bun_request_rate");
const restRate = new Rate("bench_rest_plug_request_rate");

const query = `
query GetAuthorsWithBooks {
  authors {
    __typename
    id
    name
    company
    books {
      __typename
      id
      name
      numPages
    }
  }
}
`;

const baseUrl = "http://localhost:4000";
const baseUrlBun = "http://localhost:3000";

export function runGraphqlAbsinthe() {
  const res = http.post(`${baseUrl}/graphql`, { query });

  graphqlTrendAbsinthe.add(res.timings.duration);
  graphqlRateAbsinthe.add(1);
}

export function runGraphqlYogaBun() {
  const res = http.post(`${baseUrlBun}/graphql`, { query });

  graphqlTrendYogaBun.add(res.timings.duration);
  graphqlRateYogaBun.add(1);
}

export function runRestPlug() {
  const res = http.get(`${baseUrl}/authors`);

  restTrend.add(res.timings.duration);
  restRate.add(1);
}
