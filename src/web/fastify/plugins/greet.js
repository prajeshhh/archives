// plugin - callback style
module.exports = function(app, opts, done) {
  const greeting = opts.message
  console.log({ greeting })
  done()
}
