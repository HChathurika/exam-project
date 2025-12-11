const bcrypt = require("bcryptjs");

const users = [
  {
    'name': 'Rami',
    'email': 'rami@email.com',
    'password': bcrypt.hashSync('StrongPass123', 10),
  },
  {
    'name': 'John',
    'email': 'john@email.com',
    'password': bcrypt.hashSync('StrongPass123', 10),
  },
  {
    'name': 'Jane',
    'email': 'jane@email.com',
    'password': bcrypt.hashSync('StrongPass123', 10),
  },
];

module.exports = users;
