// React TanStack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Axios
import axiosInstance from "../../axios/interceptor";

// Interfaces
import type {
  MutatePayloadInterface,
  QueryApiType,
  QueryParamIndexInterface,
  ApiSuccessInterface,
  ApiErrorInterface,
  SettingUseQuery,
} from "../../interface/api/global/globalInterface";

// Api
export const useAuthenticationApi = () => {
  const queryClient = useQueryClient(); // Add queryClient

  const mutation = useMutation<
    ApiSuccessInterface, // success type
    ApiErrorInterface, // error type
    MutatePayloadInterface
  >({
    mutationFn: async ({ payload, api, method }: MutatePayloadInterface) => {
      try {
        let response;

        if (method === "POST") {
          response = await axiosInstance.post<ApiSuccessInterface>(
            api,
            payload,
          );
        } else if (method === "GET") {
          response = await axiosInstance.get<ApiSuccessInterface>(
            api,
            payload,
          );
        } else {
          throw { message: "METHOD NOT FOUND CALL API" } as ApiErrorInterface;
        }

        return response.data;
      } catch (err: any) {
        const apiError: ApiErrorInterface = {
          message:
            err.response?.data?.message || err.message || "Unknown error",
          title_message: err.response?.data?.title_message,
          errors: err.response?.data?.errors,
        };
        throw apiError;
      }
    },

    onSuccess: () => {
      // console.log("Success:", data);

      // ✅ Refetch all queries starting with "fetchAuthenticationApi"
      queryClient.invalidateQueries({
        queryKey: ["fetchAuthenticationApi"],
        exact: false,
      });
    },

    onError: (error) => console.log("Error:", error.message),
  });

  return mutation;
};

const fetchAuthenticationApi = async (
  queryParams: QueryParamIndexInterface,
  queryApi: QueryApiType,
): Promise<ApiSuccessInterface> => {
  try {
    const updatedQueryParam = {
      ...queryParams,
    };

    const response = await axiosInstance.get<ApiSuccessInterface>(queryApi, {
      params: updatedQueryParam,
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err);
  }
};

// Hook
export const useAuthenticationFetch = (
  queryParams: QueryParamIndexInterface,
  queryApi: QueryApiType,
  settingUseQuery?: SettingUseQuery,
) => {
  const query = useQuery<ApiSuccessInterface, Error>({
    queryKey: ["fetchAuthenticationApi", queryParams, queryApi],
    queryFn: () => fetchAuthenticationApi(queryParams, queryApi),

    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,

    // Allow overrides
    ...settingUseQuery,
  });

  return query;
};
