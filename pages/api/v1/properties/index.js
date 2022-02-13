import { getProperties } from "../../../../src/data-access/properties";

const handlers = {
  POST: async function (req, res) {
    res.writeHead(200);
    res.end({ success: true });
  },
  GET: async function (req, res) {
    const properties = await getProperties();
    res.writeHead(200);
    res.end(JSON.stringify(properties));
  },
};

// Dumb example of an api route. Express applies here
async function getPropertiesHandler(req, res) {
  const handlerFn = handlers[req.method];
  if (typeof handlerFn !== "function") {
    throw new Error(`No handler for method ${req.method}`);
  }

  return handlerFn(req, res);
}

export default getPropertiesHandler;
