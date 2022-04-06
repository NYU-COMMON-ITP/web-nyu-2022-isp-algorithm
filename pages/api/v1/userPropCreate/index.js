import { createProperty } from "../../../../src/data-access/opsCreate";

export default async function handler(req, res) {
    console.log("iiii")
    try {
        const userSelection = req.body
        console.log("iiii")
        const result = await createProperty(userSelection.variables)
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(500).json({ error: 'failed to Add Property' })
    }
}