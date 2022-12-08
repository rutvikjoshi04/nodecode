import { useQuery } from "urql";

export default function useGraphqlQuery({ query, variables, keyExtractor }) {
  const [result] = useQuery({ query, variables });
  const { data, error, fetching } = result;

  if (data) {
    return {
      data: keyExtractor ? JSON.parse(data[keyExtractor].data) : data,
      error: null,
      isLoading: fetching,
    };
  }

  if (error) {
    return { data: null, error, isLoading: fetching };
  }

  return { data: data, error, isLoading: fetching };
}
