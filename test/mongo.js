'use strict';

const dbName = 'jenkinsdemo';
const dbSize = 10;
const records = Array(dbSize).fill(0)
  .map((_, idx) => ({
    id:      `id${idx}`,
    name:    `joe smith${idx}`,
    email:   `joe${idx}@example.com`,
    age:     25 + (idx * 2),
    enabled: (idx % 2) === 0,
  }));

// eslint-disable-next-line no-undef
db[dbName].drop();
// eslint-disable-next-line no-undef
db[dbName].insertMany(records);
