import { searchingAlgo } from "../../../../src/data-access/searchAlgo";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        const result = await searchingAlgo(userSelection.variables)
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}