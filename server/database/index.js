
var { Pool } = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgres://evivuvnzsmqgxy:52a80ae4762a4a4b4255a6d687abb613f7b673058c0c9fcc2abb5f96a5a0ae9f@ec2-54-225-89-156.compute-1.amazonaws.com:5432/dn7vunkcqj7aq';
// will only be used when in production
const SSL = process.env.NODE_ENV === 'production';

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    // if there is any error connecting
    this._pool.on('error', (err, client) => {
      console.error('Unexpectd error on idel PorsgreSQL client', err);
      process.exit(-1);
    });
  }

  query (query, ...args) {
    this._pool.connect((err, client, done) => {
      if (err) throw err;
      const params = args.length === 2 ? args[0] : [];
      const callback = args.length === 1 ? args[0] : args[1];

      // Run query on client if made succesful connetion to postgres db
      client.query(query, params, (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
          return callback({error: 'Database Error.'}, null);
        }
        // if no errors return the rows from db
        callback({}, res.rows);
      });
    });
  }

  end() {
    this._pool.end();
  }
}

module.exports = new Database();
