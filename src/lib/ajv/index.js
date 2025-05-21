const Ajv = require("ajv")

const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    num: {
      type: "number"
    }
  },
  required: ["name"]
}

const validate = ajv.compile(schema)

const data = {
  name: "wysa",
  num: "4"
}

const valid = validate(data)

if (!valid) console.log(validate.errors);
