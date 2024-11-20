import {
  type Prettify,
  type SignalStoreFeatureResult,
  type StateSignals,
  type WritableStateSource,
} from '@ngrx/signals';
import {
  type CreateMutationResult,
  type CreateQueryOptions,
  type CreateQueryResult,
  type injectMutation,
  type QueryKey,
} from '@tanstack/angular-query-experimental';

export type QueryStore<Input extends SignalStoreFeatureResult> = Prettify<
  StateSignals<Input['state']> & Input['computed'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>
>;

export type CreateQueryFn<
  TDataFn = unknown,
  TError = Error,
  TData = TDataFn,
  TQueryKey extends QueryKey = QueryKey,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
> = (store: QueryStore<Input>) => () => CreateQueryOptions<TDataFn, TError, TData, TQueryKey>;

export type QueryProp<Name extends string> = `${Uncapitalize<Name>}Query`;

export type QueryMethod<TData = unknown, TError = Error> = (() => CreateQueryResult<TData, TError>) &
  CreateQueryResult<TData, TError>;

type CreateMutationOptions<TData = unknown, TError = Error, TVariables = void, TContext = unknown> = ReturnType<
  NonNullable<Parameters<typeof injectMutation<TData, TError, TVariables, TContext>>[0]>
>;

export type CreateMutationFn<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
> = (store: QueryStore<Input>) => () => CreateMutationOptions<TData, TError, TVariables, TContext>;

export type MutationProp<Name extends string> = `${Uncapitalize<Name>}Mutation`;

export type MutationMethod<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = (() => CreateMutationResult<TData, TError, TVariables, TContext>) &
  CreateMutationResult<TData, TError, TVariables, TContext>;
