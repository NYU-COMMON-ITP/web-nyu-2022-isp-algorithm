import { getProperties } from "../../../../data-access/properties";

// Dumb example of an api route. Express applies here
const getPropertiesHandler = async (context, res) => {
  const properties = await getProperties();

  res.writeHead(200);
  res.end(JSON.stringify(properties));
};

export default getPropertiesHandler;
