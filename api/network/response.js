
const statusMessagesCodes = require('./statusMessage')

exports.success = function (req, res, message, status) {
  if (!status) {
    status = 200
  }

  const statusMessage = statusMessagesCodes[status]

  res.status(status || 200).send({
    error: 0,
    message: statusMessage,
    body: message
  })
}

exports.error = function (req, res, message, status, details) {
  if (!status) {
    status = 500
  }

  const statusMessage = statusMessagesCodes[status]

  console.error('[response error] ' + details)

  res.status(status || 500).send({
    error: 1,
    details,
    body: statusMessage
  })
}
