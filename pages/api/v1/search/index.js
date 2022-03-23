import { getPropertiesbycity } from "../../../../src/data-access/searches";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        const result = await getPropertiesbycity(userSelection.variables)
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}