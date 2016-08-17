const test = require('ava');
const uuid = require('../index');

test(t => {
  const uuid5 = uuid.v5('95722c8b-26f3-409a-b5cc-5e27b2a3536e', 'hello');
  t.is(uuid.stringify(uuid5), 'f39e5d43-9739-5594-8a5d-b0446ae57b30');
});
