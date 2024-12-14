import { type SignalStoreFeatureResult, type withProps } from '@ngrx/signals';
import { type CreateQueryOptions, type injectMutation, type QueryKey } from '@tanstack/angular-query-experimental';

export type StoreType<Input extends SignalStoreFeatureResult, Props extends object> = Parameters<
  Parameters<typeof withProps<Input, Props>>[0]
>[0];

export type QueryProp<Name extends string> = `${Uncapitalize<Name>}Query`;

export type CreateQueryFn<
  Name extends string,
  TDataFn = unknown,
  TError = Error,
  TData = TDataFn,
  TQueryKey extends QueryKey = QueryKey,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
> = (
  store: StoreType<Input, Record<QueryProp<Name>, unknown>>,
) => () => CreateQueryOptions<TDataFn, TError, TData, TQueryKey>;

type CreateMutationOptions<TData = unknown, TError = Error, TVariables = void, TContext = unknown> = ReturnType<
  NonNullable<Parameters<typeof injectMutation<TData, TError, TVariables, TContext>>[0]>
>;

export type MutationProp<Name extends string> = `${Uncapitalize<Name>}Mutation`;

export type CreateMutationFn<
  Name extends string,
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
> = (
  store: StoreType<Input, Record<MutationProp<Name>, unknown>>,
) => () => CreateMutationOptions<TData, TError, TVariables, TContext>;
