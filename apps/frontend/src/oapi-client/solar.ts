/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * API Document
 * API Document Description
 * OpenAPI spec version: 1.0
 */
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type { SolarGenerateRequestDTO } from "./aPIDocument.schemas";

export const solarControllerGenerateSolar = (
  solarGenerateRequestDTO: SolarGenerateRequestDTO,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<void>> => {
  return axios.post(`/solar/generate`, solarGenerateRequestDTO, options);
};

export const getSolarControllerGenerateSolarMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof solarControllerGenerateSolar>>,
    TError,
    { data: SolarGenerateRequestDTO },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof solarControllerGenerateSolar>>,
  TError,
  { data: SolarGenerateRequestDTO },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof solarControllerGenerateSolar>>,
    { data: SolarGenerateRequestDTO }
  > = (props) => {
    const { data } = props ?? {};

    return solarControllerGenerateSolar(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SolarControllerGenerateSolarMutationResult = NonNullable<
  Awaited<ReturnType<typeof solarControllerGenerateSolar>>
>;
export type SolarControllerGenerateSolarMutationBody = SolarGenerateRequestDTO;
export type SolarControllerGenerateSolarMutationError = AxiosError<unknown>;

export const useSolarControllerGenerateSolar = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof solarControllerGenerateSolar>>,
    TError,
    { data: SolarGenerateRequestDTO },
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const mutationOptions =
    getSolarControllerGenerateSolarMutationOptions(options);

  return useMutation(mutationOptions);
};
export const solarControllerBurnSolar = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<void>> => {
  return axios.post(`/solar/burn`, undefined, options);
};

export const getSolarControllerBurnSolarMutationOptions = <
  TError = AxiosError<unknown>,
  TVariables = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof solarControllerBurnSolar>>,
    TError,
    TVariables,
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof solarControllerBurnSolar>>,
  TError,
  TVariables,
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof solarControllerBurnSolar>>,
    TVariables
  > = () => {
    return solarControllerBurnSolar(axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type SolarControllerBurnSolarMutationResult = NonNullable<
  Awaited<ReturnType<typeof solarControllerBurnSolar>>
>;

export type SolarControllerBurnSolarMutationError = AxiosError<unknown>;

export const useSolarControllerBurnSolar = <
  TError = AxiosError<unknown>,
  TVariables = void,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof solarControllerBurnSolar>>,
    TError,
    TVariables,
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const mutationOptions = getSolarControllerBurnSolarMutationOptions(options);

  return useMutation(mutationOptions);
};
export const solarControllerCountBurnedSolar = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<void>> => {
  return axios.get(`/solar/count-burned-solar`, options);
};

export const getSolarControllerCountBurnedSolarQueryKey = () =>
  [`/solar/count-burned-solar`] as const;

export const getSolarControllerCountBurnedSolarQueryOptions = <
  TData = Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>,
    TError,
    TData
  >;
  axios?: AxiosRequestConfig;
}): UseQueryOptions<
  Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getSolarControllerCountBurnedSolarQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>
  > = ({ signal }) =>
    solarControllerCountBurnedSolar({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions };
};

export type SolarControllerCountBurnedSolarQueryResult = NonNullable<
  Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>
>;
export type SolarControllerCountBurnedSolarQueryError = AxiosError<unknown>;

export const useSolarControllerCountBurnedSolar = <
  TData = Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof solarControllerCountBurnedSolar>>,
    TError,
    TData
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getSolarControllerCountBurnedSolarQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};