import {
  type EmptyFeatureResult,
  signalStoreFeature,
  type SignalStoreFeature,
  type SignalStoreFeatureResult,
  withMethods,
} from '@ngrx/signals';
import { injectQuery, type QueryKey } from '@tanstack/angular-query-experimental';

import { type CreateQueryFn, type QueryMethod, type QueryProp, type QueryStore } from './types';
import { lowerFirst } from './utils';

export const withQuery = <
  Name extends string,
  TDataFn = unknown,
  TError = Error,
  TData = TDataFn,
  TQueryKey extends QueryKey = QueryKey,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
>(
  name: Name,
  createQueryFn: CreateQueryFn<TDataFn, TError, TData, TQueryKey, NoInfer<Input>>,
): SignalStoreFeature<
  Input,
  EmptyFeatureResult & { methods: Record<QueryProp<NoInfer<Name>>, QueryMethod<NoInfer<TData>, NoInfer<TError>>> }
> => {
  const prop: QueryProp<NoInfer<Name>> = `${lowerFirst(name)}Query`;

  return signalStoreFeature(
    withMethods((store) => {
      const query = injectQuery(createQueryFn(store as QueryStore<NoInfer<Input>>));

      return {
        [prop]: new Proxy(() => query, {
          get: (_, prop) => Reflect.get(query, prop),
          has: (_, prop) => Reflect.has(query, prop),
        }),
      } as Record<QueryProp<NoInfer<Name>>, QueryMethod<NoInfer<TData>, NoInfer<TError>>>;
    }),
  );
};
