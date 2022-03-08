import { getPropertiesbycity } from "../../../../src/data-access/properties";

export default async function handler(req, res) {
  try {
    const { city } = req.query
    console.log(city);
    const result = await getPropertiesbycity(city)
    res.status(200).json( result )
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}