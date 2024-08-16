import {
  type EmptyFeatureResult,
  signalStoreFeature,
  type SignalStoreFeature,
  type SignalStoreFeatureResult,
  withMethods,
} from '@ngrx/signals';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { type CreateQueryFn, type QueryMethod, type QueryProp, type QueryStore } from './types';
import { lowerFirst } from './utils';

export const withQuery = <
  Name extends string,
  TDataFn = unknown,
  TData = TDataFn,
  TError = Error,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
>(
  name: Name,
  createQueryFn: CreateQueryFn<TDataFn, TData, TError, Input>,
): SignalStoreFeature<Input, EmptyFeatureResult & { methods: Record<QueryProp<Name>, QueryMethod<TData, TError>> }> => {
  const prop: QueryProp<Name> = `${lowerFirst(name)}Query`;

  return signalStoreFeature(
    withMethods((store) => {
      const query = injectQuery(createQueryFn(store as QueryStore<Input>));

      return {
        [prop]: new Proxy(() => query, {
          get: (_, prop) => Reflect.get(query, prop),
          has: (_, prop) => Reflect.has(query, prop),
        }),
      } as Record<QueryProp<Name>, QueryMethod<TData, TError>>;
    }),
  );
};
