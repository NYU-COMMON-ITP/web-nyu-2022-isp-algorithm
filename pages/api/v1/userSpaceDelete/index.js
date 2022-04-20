import { deleteSpace } from "../../../../src/data-access/OpsDelete";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        const result = await deleteSpace(userSelection.variables)
        res.send(JSON.stringify(result));
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to Delete Space data' })
    }
}