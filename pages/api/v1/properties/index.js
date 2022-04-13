import { getProperties, getPropertiesbycity } from "../../../../src/data-access/properties";

const handlers = {
  POST: async function (req, res) {
    res.writeHead(200);
    res.end({ success: true });
  },
  GET: async function (req, res) {

    const properties = await getProperties();
    res.writeHead(200);
    res.send(JSON.stringify(properties));
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

export default async function handler(req, res) {
  try {
    console.log(req.query)
    // const city = req.query.city
    const result = await getPropertiesbycity(req.query.city)
    return res.status(200).json( result )
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}

// export default getPropertiesHandler;
