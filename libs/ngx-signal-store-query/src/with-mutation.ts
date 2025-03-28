import { inject, Injector, runInInjectionContext } from '@angular/core';

import { type SignalStoreFeatureResult, withProps } from '@ngrx/signals';
import { type CreateMutationResult, injectMutation } from '@tanstack/angular-query-experimental';

import { type CreateMutationFn, type MutationProp } from './types';
import { lowerFirst } from './utils';

export const withMutation = <
  Name extends string,
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  Input extends SignalStoreFeatureResult = SignalStoreFeatureResult,
  Props extends object = Record<MutationProp<Name>, CreateMutationResult<TData, TError, TVariables, TContext>>,
>(
  name: Name,
  createMutationFn: CreateMutationFn<Name, TData, TError, TVariables, TContext, Input>,
) => {
  const prop: MutationProp<Name> = `${lowerFirst(name)}Mutation`;

  return withProps<Input, Props>((store) => {
    const injector = inject(Injector);
    const mutation = injectMutation((...args) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return runInInjectionContext(injector, () => createMutationFn(store as any)(...args));
    });

    return { [prop]: mutation } as Props;
  });
};
