import { inject, Injector } from '@angular/core';

import {
  type EmptyFeatureResult,
  signalStoreFeature,
  type SignalStoreFeature,
  type SignalStoreFeatureResult,
  withMethods,
} from '@ngrx/signals';
import { injectMutation } from '@tanstack/angular-query-experimental';

import { type CreateMutationFn, type MutationMethod, type MutationProp, type QueryStore } from './types';
import { lowerFirst } from './utils';

export const withMutation = <
  Name extends string,
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
>(
  name: Name,
  createMutationFn: CreateMutationFn<TData, TError, TVariables, TContext, Input>,
): SignalStoreFeature<
  Input,
  EmptyFeatureResult & { methods: Record<MutationProp<Name>, MutationMethod<TData, TError, TVariables, TContext>> }
> => {
  const prop: MutationProp<Name> = `${lowerFirst(name)}Mutation`;

  return signalStoreFeature(
    withMethods((store) => {
      const mutation = injectMutation(createMutationFn(store as QueryStore<Input>), inject(Injector));

      return {
        [prop]: new Proxy(() => mutation, {
          get: (_, prop) => Reflect.get(mutation, prop),
          has: (_, prop) => Reflect.has(mutation, prop),
        }),
      } as Record<MutationProp<Name>, MutationMethod<TData, TError, TVariables, TContext>>;
    }),
  );
};
