import http from "k6/http";
import { Trend, Rate } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const DURATION = 30;
const VUS = 1;

export const options = {
  scenarios: {
    graphql: {
      executor: "constant-vus",
      exec: "runGraphql",
      vus: VUS,
      duration: `${DURATION}s`,
      startTime: "0s",
    },
    plug: {
      executor: "constant-vus",
      exec: "runPlug",
      vus: VUS,
      duration: `${DURATION}s`,
      startTime: `${DURATION * 1}s`,
    },
  },
};

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

const graphqlTrend = new Trend("bench_graphql_request_latency", true);
const restTrend = new Trend("bench_rest_request_latency", true);

const graphqlRate = new Rate("bench_graphql_request_rate");
const restRate = new Rate("bench_rest_request_rate");

const baseUrl = "http://localhost:4000";

export function runGraphql() {
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

  const res = http.post(`${baseUrl}/graphql`, { query });

  graphqlTrend.add(res.timings.duration);
  graphqlRate.add(1);
}

export function runPlug() {
  const res = http.get(`${baseUrl}/authors`);

  restTrend.add(res.timings.duration);
  restRate.add(1);
}
