import { deleteProperty } from "../../../../src/data-access/OpsCreate";

export default async function handler(req, res) {
  try {
    const userSelection = req.body
    // const result = await deleteProperty(userSelection.variables)
    // res.send(JSON.stringify(result));
  } catch (err) {
    res.status(500).json({ error: 'failed to delete data' })
  }
}