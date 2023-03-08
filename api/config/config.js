const dotenv = require('dotenv')
dotenv.config()

const config = {
  dbUrl: process.env.DB_URL || 'mongodb+srv://' +
            process.env.DB_USER + ':' + process.env.DB_USER_PASS + '@' +
            process.env.DB_CLUSTER + '/?retryWrites=' +
            process.env.DB_RETRY_WRITES + '&w=' + process.env.DB_W,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  filesRoute: 'files'
}

module.exports = config
