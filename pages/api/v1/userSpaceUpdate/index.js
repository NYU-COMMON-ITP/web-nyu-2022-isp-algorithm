import { updateSpace } from "../../../../src/data-access/OpsUpdate";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        const result = await updateSpace(userSelection.variables)
        res.send(JSON.stringify(result));
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to Add data' })
    }
}

