import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import http from "k6/http";

export const options = {
  vus: 1,
  duration: "30s",
};

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export default function () {
  const url = "http://localhost:4000/graphql";

  http.post(url, {
    query: `
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
    `,
  });
}
