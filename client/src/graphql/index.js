import { createClient, cacheExchange, dedupExchange } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

export const client = createClient({
  url: "http://localhost:5001/graphql",
  exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
});
