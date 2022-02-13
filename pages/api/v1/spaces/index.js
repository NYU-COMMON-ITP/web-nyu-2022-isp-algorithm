import { getSpaces } from "../../../../src/data-access/spaces";

// Dumb example of an api route. Express applies here
const getSpacesHandler = async (context, res) => {
  const spaces = await getSpaces();

  res.writeHead(200);
  res.end(JSON.stringify(spaces));
};

export default getSpacesHandler;
