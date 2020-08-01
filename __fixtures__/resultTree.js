const tree = [
  {
    type: 'node',
    name: 'common',
    children: [
      {
        type: 'leaf',
        name: 'setting1',
        value: 'Value 1',
        status: 'not changed',
      },
      {
        type: 'leaf',
        name: 'setting2',
        value: 200,
        status: 'removed',
      },
      {
        type: 'node',
        name: 'setting3',
        children: [
          {
            type: 'leaf',
            name: 'key',
            value: 'value',
            status: 'not changed',
          },
        ],
        status: 'added',
      },
      {
        type: 'leaf',
        name: 'setting3',
        value: true,
        status: 'removed',
      },
      {
        type: 'node',
        name: 'setting6',
        children: [
          {
            type: 'leaf',
            name: 'key',
            value: 'value',
            status: 'not changed',
          },
          {
            type: 'leaf',
            name: 'ops',
            value: 'vops',
            status: 'added',
          },
        ],
        status: 'added',
      },
      {
        type: 'leaf',
        name: 'follow',
        value: false,
        status: 'added',
      },
      {
        type: 'leaf',
        name: 'setting4',
        value: 'blah blah',
        status: 'added',
      },
      {
        type: 'node',
        name: 'setting5',
        children: [
          {
            type: 'leaf',
            name: 'key5',
            value: 'value5',
            status: 'not changed',
          },
        ],
        status: 'added',
      },
    ],
    status: 'changed',
  },
  {
    type: 'node',
    name: 'group1',
    children: [
      {
        type: 'leaf',
        name: 'baz',
        value: 'bars',
        status: 'added',
      },
      {
        type: 'leaf',
        name: 'baz',
        value: 'bas',
        status: 'removed',
      },
      {
        type: 'leaf',
        name: 'foo',
        value: 'bar',
        status: 'not changed',
      },
      {
        type: 'leaf',
        name: 'nest',
        value: 'str',
        status: 'added',
      },
      {
        type: 'node',
        name: 'nest',
        children: [
          {
            type: 'leaf',
            name: 'key',
            value: 'value',
            status: 'not changed',
          },
        ],
        status: 'changed',
      },
    ],
    status: 'changed',
  },
  {
    type: 'node',
    name: 'group2',
    children: [
      {
        type: 'leaf',
        name: 'abc',
        value: 12345,
        status: 'not changed',
      },
    ],
    status: 'removed',
  },
  {
    type: 'node',
    name: 'group3',
    children: [
      {
        type: 'leaf',
        name: 'fee',
        value: 100500,
        status: 'not changed',
      },
    ],
    status: 'added',
  },
];

// const node = [
//   'type',
//   'name',
//   'children',
// ];
//
// const leaf = [
//   'type',
//   'name',
//   'value',
//   'status',
// ];

const node = {
  type: 'node',
  name: 'common',
  children: [],
  status: 'not changed',
};

const leaf = {
  type: 'leaf',
  name: 'setting1',
  value: 'Value 1',
  status: 'not changed',
};
