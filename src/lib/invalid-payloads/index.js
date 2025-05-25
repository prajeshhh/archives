const input = require("./input.json");

function resize(value, size) {
  let s = value;
  for (let i = 0; i < size; i++) {
    s += "a";
  }
  return s;
}

const output = input.map((o) => {
  const properties = o.schema.properties;

  const required = o.schema.required ? o.schema.required : [];
  const anyOf = [];

  if (o.schema.anyOf) {
    o.schema.anyOf.forEach((e) => {
      if (e.required) {
        anyOf.push(e.required[0]);
      }
    });
  }

  console.log(properties);
  console.log(required);
  console.log(anyOf);

  const payloads = [{}];

  const invalid = {};

  const valid = {};

  Object.entries(properties).forEach(([key, value]) => {
    const values = [];
    Object.entries(value).forEach(([k, v]) => {
      if (k === "type") {
        if (typeof v == "object" && v.length === 2) {
          if (
            (v[0] === "string" && v[1] == "number") ||
            (v[1] === "string" && v[0] == "number")
          ) {
            v.push(true);
            valid[key] = "";
          }
          // other combo type checks
        } else {
          if (v === "string") {
            values.push(1);
            valid[key] = "";
          } else if (v === "number") {
            values.push("");
            valid[key] = 1;
          }
          // other type checks
        }
      }
      if (k === "minLength") {
        if (!valid[key]) {
          valid[key] = resize("", v);
        } else if (valid[key].length < v) {
          valid[key] = resize(valid[key], v - valid[key].length);
        }
        values.push(resize("", v - 1));
      }
      if (k === "maxLength") {
        if (!valid[key]) {
          valid[key] = resize("", v);
        }
        values.push(resize("", v + 1));
      }
    });
    invalid[key] = values;
  });

  console.log(invalid);
  console.log(valid);

  // time to make some payloads

  Object.entries(invalid).forEach(([key, value]) => {
    if (required.includes(key)) {
      payloads.push(valid);
    }
  });

  return {
    path: o.path,
    payloads,
  };
});

console.log(output);
