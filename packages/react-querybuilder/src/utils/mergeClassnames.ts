import type { Classnames } from '../types';

export const mergeClassnames = (...args: (Partial<Classnames> | undefined)[]): Classnames => {
  const joinClassnamesByName = (name: keyof Classnames) =>
    (args.filter(Boolean) as Partial<Classnames>[]).map(c => c[name]).join(' ');
  return {
    queryBuilder: joinClassnamesByName('queryBuilder'),
    ruleGroup: joinClassnamesByName('ruleGroup'),
    header: joinClassnamesByName('header'),
    body: joinClassnamesByName('body'),
    combinators: joinClassnamesByName('combinators'),
    addRule: joinClassnamesByName('addRule'),
    addGroup: joinClassnamesByName('addGroup'),
    cloneRule: joinClassnamesByName('cloneRule'),
    cloneGroup: joinClassnamesByName('cloneGroup'),
    removeGroup: joinClassnamesByName('removeGroup'),
    rule: joinClassnamesByName('rule'),
    fields: joinClassnamesByName('fields'),
    operators: joinClassnamesByName('operators'),
    value: joinClassnamesByName('value'),
    removeRule: joinClassnamesByName('removeRule'),
    notToggle: joinClassnamesByName('notToggle'),
    dragHandle: joinClassnamesByName('dragHandle'),
    lockRule: joinClassnamesByName('lockRule'),
    lockGroup: joinClassnamesByName('lockGroup'),
    valueSource: joinClassnamesByName('valueSource'),
  };
};
