import type {
  DefaultRuleGroupType,
  Field,
  OptionGroup,
  RQBJsonLogic,
  ValueSources,
} from '../../types/index.noReact';
import { parseJsonLogic } from './parseJsonLogic';

const rqbJsonLogic: RQBJsonLogic = {
  and: [
    // Ignored/invalid
    { '===': [{ var: 'f1' }, { '+': [1, 1] }] },
    { '!': false },
    { '!!': false },
    {
      or: [
        // valueSource: 'value'
        { '!': { '==': [{ var: 'f1' }, 'Test'] } },
        { '==': [{ var: 'f1' }, 'Test'] },
        { '==': ['Test', { var: 'f1' }] },
        { '!=': [{ var: 'f1' }, 'Test'] },
        { '===': [{ var: 'f1' }, 'Test'] },
        { '!==': [{ var: 'f1' }, 'Test'] },
        { '>': [{ var: 'f1' }, 1214] },
        { '>=': [{ var: 'f1' }, 1214] },
        { '<': [{ var: 'f1' }, 1214] },
        { '<=': [{ var: 'f1' }, 1214] },
        { in: [{ var: 'f1' }, ['Test', 'Test2']] },
        { in: [{ var: 'f1' }, [12, 14]] },
        { in: [{ var: 'f1' }, [true, false]] },
        { in: [{ var: 'f1' }, 'Test'] },
        { startsWith: [{ var: 'f1' }, 'Test'] },
        { endsWith: [{ var: 'f1' }, 'Test'] },
      ],
    },
    {
      or: [
        // valueSource: 'field'
        { '==': [{ var: 'f1' }, { var: 'f2' }] },
        { '!=': [{ var: 'f1' }, { var: 'f2' }] },
        { '===': [{ var: 'f1' }, { var: 'f2' }] },
        { '!==': [{ var: 'f1' }, { var: 'f2' }] },
        { '>': [{ var: 'f1' }, { var: 'f2' }] },
        { '>=': [{ var: 'f1' }, { var: 'f2' }] },
        { '<': [{ var: 'f1' }, { var: 'f2' }] },
        { '<=': [{ var: 'f1' }, { var: 'f2' }] },
        { in: [{ var: 'f1' }, [{ var: 'f2' }, { var: 'f3' }]] },
        { in: [{ var: 'f1' }, { var: 'f2' }] },
        { startsWith: [{ var: 'f1' }, { var: 'f2' }] },
        { endsWith: [{ var: 'f1' }, { var: 'f2' }] },
      ],
    },
  ],
};

const ruleGroup: DefaultRuleGroupType = {
  combinator: 'and',
  rules: [
    {
      combinator: 'or',
      rules: [
        {
          combinator: 'and',
          rules: [{ field: 'f1', operator: '=', value: 'Test' }],
          not: true,
        },
        { field: 'f1', operator: '=', value: 'Test' },
        { field: 'f1', operator: '=', value: 'Test' },
        { field: 'f1', operator: '!=', value: 'Test' },
        { field: 'f1', operator: '=', value: 'Test' },
        { field: 'f1', operator: '!=', value: 'Test' },
        { field: 'f1', operator: '>', value: 1214 },
        { field: 'f1', operator: '>=', value: 1214 },
        { field: 'f1', operator: '<', value: 1214 },
        { field: 'f1', operator: '<=', value: 1214 },
        { field: 'f1', operator: 'in', value: 'Test,Test2' },
        { field: 'f1', operator: 'in', value: '12,14' },
        { field: 'f1', operator: 'in', value: 'true,false' },
        { field: 'f1', operator: 'contains', value: 'Test' },
        { field: 'f1', operator: 'beginsWith', value: 'Test' },
        { field: 'f1', operator: 'endsWith', value: 'Test' },
      ],
    },
    {
      combinator: 'or',
      rules: [
        { field: 'f1', operator: '=', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '!=', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '=', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '!=', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '>', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '>=', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '<', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: '<=', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: 'in', value: 'f2,f3', valueSource: 'field' },
        { field: 'f1', operator: 'contains', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: 'beginsWith', value: 'f2', valueSource: 'field' },
        { field: 'f1', operator: 'endsWith', value: 'f2', valueSource: 'field' },
      ],
    },
  ],
};

it('parses JsonLogic', () => {
  expect(parseJsonLogic(rqbJsonLogic)).toEqual(ruleGroup);
});

it('parses JsonLogic from string', () => {
  expect(parseJsonLogic('{"and":[{"==":[{"var": "f1"},1]},{"==":[{"var": "f2"},2]}]}')).toEqual({
    combinator: 'and',
    rules: [
      { field: 'f1', operator: '=', value: 1 },
      { field: 'f2', operator: '=', value: 2 },
    ],
  });
});

it('parses JsonLogic and validates fields', () => {
  const getValueSources = (field: string): ValueSources =>
    field === 'f4' ? ['field'] : ['value', 'field'];
  const fields: Field[] = [
    { name: 'f1', label: 'Field 1', c: '1or2', comparator: 'c' },
    { name: 'f2', label: 'Field 2', c: '1or2', comparator: 'c' },
    { name: 'f3', label: 'Field 3', c: '3', comparator: 'c' },
    { name: 'f4', label: 'Field 4', c: '4', comparator: 'c' },
  ];
  const fieldsAsOptGroup: OptionGroup<Field>[] = [{ label: 'OptGroup', options: fields }];
  const fieldsAsObject: Record<string, Field> = {};
  for (const f of fields) {
    fieldsAsObject[f.name] = f;
  }
  const jsonLogicForFields: RQBJsonLogic = {
    and: [
      { '==': [{ var: 'f1' }, { var: 'f2' }] },
      { '==': [{ var: 'f1' }, { var: 'f3' }] },
      { '===': [{ var: 'f1' }, { var: 'f1' }] },
      { '===': [{ var: 'f4' }, 'Test'] },
      { '===': [{ var: 'f_missing' }, 'Test'] },
      { in: [{ var: 'f1' }, [{ var: 'f2' }, { var: 'f3' }]] },
    ],
  };
  const ruleGroupForFields: DefaultRuleGroupType = {
    combinator: 'and',
    rules: [
      { field: 'f1', operator: '=', value: 'f2', valueSource: 'field' },
      { field: 'f1', operator: 'in', value: 'f2', valueSource: 'field' },
    ],
  };

  expect(parseJsonLogic(jsonLogicForFields, { getValueSources, fields })).toEqual(
    ruleGroupForFields
  );
  expect(parseJsonLogic(jsonLogicForFields, { getValueSources, fields: fieldsAsOptGroup })).toEqual(
    ruleGroupForFields
  );
  expect(parseJsonLogic(jsonLogicForFields, { getValueSources, fields: fieldsAsObject })).toEqual(
    ruleGroupForFields
  );
});

it('invalidates primitives as root object', () => {
  const emptyRuleGroup: DefaultRuleGroupType = { combinator: 'and', rules: [] };
  expect(parseJsonLogic(true)).toEqual(emptyRuleGroup);
  expect(parseJsonLogic(1214)).toEqual(emptyRuleGroup);
  expect(parseJsonLogic('Test')).toEqual(emptyRuleGroup);
});

it('translates lists as arrays', () => {
  expect(
    parseJsonLogic(
      {
        and: [
          { in: [{ var: 'f1' }, [12, 14]] },
          { in: [{ var: 'f1' }, [{ var: 'f2' }, { var: 'f3' }]] },
        ],
      },
      { listsAsArrays: true }
    )
  ).toEqual({
    combinator: 'and',
    rules: [
      { field: 'f1', operator: 'in', value: [12, 14] },
      { field: 'f1', operator: 'in', value: ['f2', 'f3'], valueSource: 'field' },
    ],
  });
});

it('handles empty options object', () => {
  expect(parseJsonLogic({ '===': [{ var: 'f1' }, 1] }, {})).toEqual({
    combinator: 'and',
    rules: [{ field: 'f1', operator: '=', value: 1 }],
    not: false,
  });
});
