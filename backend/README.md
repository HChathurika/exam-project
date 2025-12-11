# Usage

---
## Install Backend Dependencies
   
- Rename the `.env.example` file to `.env` in the backend directory.
- Change the JWT `SECRET`.
- Navigate to the backend directory: `cd backend`
- Install the necessary dependencies:
```sh
npm install express dotenv cors mongoose jsonwebtoken bcryptjs colors swagger-jsdoc swagger-ui-express validator
```
- Install Dev Dependencies
```sh
npm install nodemon jest supertest  cross-env -D
```
- Start the server
```sh
npm run dev
```

---
## Misc.

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```sh
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

### Run tests 

```sh
# Run tests 
npm test
```

### Sample User Logins

```json
jane@email.com
R3g5T7#gh

john@email.com
R3g5T7#gh
```