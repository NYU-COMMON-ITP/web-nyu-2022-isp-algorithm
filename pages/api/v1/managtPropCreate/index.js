import { createProperty } from "../../../../src/data-access/OpsCreate";

export default async function handler(req, res) {
  console.log("create api called")
  try {
    const userSelection = req.body
    console.log(userSelection)
    // const result = await createProperty(userSelection.variables)
    // res.send(JSON.stringify(result));
  } catch (err) {
    res.status(500).json({ error: 'failed to Add Property' })
  }
}