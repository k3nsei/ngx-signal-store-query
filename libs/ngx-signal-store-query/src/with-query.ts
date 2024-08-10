import {
  type EmptyFeatureResult,
  patchState,
  type Prettify,
  type SignalStoreFeature,
  signalStoreFeature,
  type SignalStoreFeatureResult,
  type StateSignals,
  withHooks,
  withState,
  type WritableStateSource,
} from '@ngrx/signals';
import { type CreateQueryResult, injectQuery } from '@tanstack/angular-query-experimental';

import { lowerFirst } from './utils';

export function withQuery<
  Input extends SignalStoreFeatureResult,
  QueryName extends string,
  Store = QueryStore<Input>,
  DataFnType = unknown,
  DataType = DataFnType,
  ErrorType = Error,
  QueryKey extends readonly unknown[] = readonly unknown[],
>(
  queryName: QueryName,
  createQueryFn: (store: Store) => QueryFactory<DataFnType, DataType, ErrorType, QueryKey>,
): SignalStoreFeature<
  Input,
  EmptyFeatureResult & { state: Record<QueryProp<QueryName>, CreateQueryResult<DataType, ErrorType>> }
> {
  const prop: QueryProp<QueryName> = `${lowerFirst(queryName)}Query`;

  return signalStoreFeature(
    withState({
      [prop]: {},
    } as unknown as Record<QueryProp<QueryName>, CreateQueryResult<DataType, ErrorType>>),
    withHooks((store) => {
      const query = injectQuery(createQueryFn(store as Store));

      return {
        onInit(): void {
          patchState(store, {
            [prop]: query,
          } as Record<QueryProp<QueryName>, CreateQueryResult<DataType, ErrorType>>);
        },
      };
    }),
  );
}

type QueryStore<Input extends SignalStoreFeatureResult> = Prettify<
  StateSignals<Input['state']> & Input['computed'] & Input['methods'] & WritableStateSource<Prettify<Input['state']>>
>;

type QueryProp<QueryName extends string> = `${Uncapitalize<QueryName>}Query`;

type QueryFactory<
  DataFnType = unknown,
  DataType = DataFnType,
  ErrorType = Error,
  QueryKey extends readonly unknown[] = readonly unknown[],
> = Parameters<typeof injectQuery<DataFnType, ErrorType, DataType, QueryKey>>[0];
