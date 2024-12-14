import { type SignalStoreFeatureResult, withProps } from '@ngrx/signals';
import { type CreateQueryResult, injectQuery, type QueryKey } from '@tanstack/angular-query-experimental';

import { type CreateQueryFn, type QueryProp } from './types';
import { lowerFirst } from './utils';

export const withQuery = <
  Name extends string,
  TDataFn = unknown,
  TError = Error,
  TData = TDataFn,
  TQueryKey extends QueryKey = QueryKey,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
  Props extends object = Record<QueryProp<Name>, CreateQueryResult<TData, TError>>,
>(
  name: Name,
  createQueryFn: CreateQueryFn<Name, TDataFn, TError, TData, TQueryKey, Input>,
) => {
  const prop: QueryProp<Name> = `${lowerFirst(name)}Query`;

  return withProps<Input, Props>((store) => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const query = injectQuery(createQueryFn(store as any));

    return { [prop]: query } as Props;
  });
};
