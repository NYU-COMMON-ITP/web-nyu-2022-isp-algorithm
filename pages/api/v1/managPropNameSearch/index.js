import { getPropertiesbyUserInput } from "../../../../src/data-access/searches";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        const result = await getPropertiesbyName(userSelection.variables)
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}