module.exports = function(message) {
  const _ = message.split(" ");
  this.send({ message: _.map(() => "meow").join(" ") })
}
