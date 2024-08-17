import {
  type Prettify,
  type SignalStoreFeatureResult,
  type StateSignals,
  type WritableStateSource,
} from '@ngrx/signals';
import {
  type CreateMutationOptions,
  type CreateMutationResult,
  type CreateQueryOptions,
  type CreateQueryResult,
} from '@tanstack/angular-query-experimental';
import { type QueryClient } from '@tanstack/query-core';

export type QueryStore<Input extends SignalStoreFeatureResult> = Prettify<
  StateSignals<Input['state']> & Input['computed'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>
>;

export type CreateQueryFn<
  TDataFn = unknown,
  TError = Error,
  TData = TDataFn,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
> = (store: QueryStore<Input>) => (client: QueryClient) => CreateQueryOptions<TDataFn, TError, TData>;

export type QueryProp<Name extends string> = `${Uncapitalize<Name>}Query`;

export type QueryMethod<TData = unknown, TError = Error> = (() => CreateQueryResult<TData, TError>) &
  CreateQueryResult<TData, TError>;

export type CreateMutationFn<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
> = (store: QueryStore<Input>) => (client: QueryClient) => CreateMutationOptions<TData, TError, TVariables, TContext>;

export type MutationProp<Name extends string> = `${Uncapitalize<Name>}Mutation`;

export type MutationMethod<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = (() => CreateMutationResult<TData, TError, TVariables, TContext>) &
  CreateMutationResult<TData, TError, TVariables, TContext>;
