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
export const useApi = () => {
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
        } else if (method === "PUT") {
          response = await axiosInstance.put<ApiSuccessInterface>(api, payload);
        } else if (method === "PATCH") {
          response = await axiosInstance.patch<ApiSuccessInterface>(
            api,
            payload,
          );
        } else if (method === "DELETE") {
          response = await axiosInstance.delete<ApiSuccessInterface>(api, {
            data: payload,
          });
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

    onSuccess: (data, variables) => {
      console.log("data", data);
      if (variables?.isFetchEnable) {
        queryClient.invalidateQueries({ queryKey: ["fetchApi"], exact: false });
      }
    },

    onError: (error) => console.log("Error:", error.message),
  });

  return mutation;
};

const fetchApi = async (
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
export const useFetch = (
  queryParams: QueryParamIndexInterface,
  queryApi: QueryApiType,
  settingUseQuery?: SettingUseQuery,
) => {
  const query = useQuery<ApiSuccessInterface, Error>({
    queryKey: ["fetchApi", queryParams, queryApi],
    queryFn: () => fetchApi(queryParams, queryApi),

    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: true,

    // Allow overrides
    ...settingUseQuery,
  });

  return query;
};
