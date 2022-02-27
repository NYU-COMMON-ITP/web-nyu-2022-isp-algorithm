import { getSpaces } from "../../../../src/data-access/spaces";

const handlers = {
  GET: async function (req, res) {
    const spaces = await getSpaces();
    res.writeHead(200);
    res.end(JSON.stringify(spaces));
  },
};

// Dumb example of an api route. Express applies here
async function getSpacesHandler(req, res) {
  const handlerFn = handlers[req.method];
  if (typeof handlerFn !== "function") {
    throw new Error(`No handler for method ${req.method}`);
  }

  return handlerFn(req, res);
}

export default getSpacesHandler;
