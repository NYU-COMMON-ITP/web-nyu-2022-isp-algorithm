import { deleteProperty, deleteSpaceByPropId } from "../../../../src/data-access/opsDelete";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        let resultS = await Promise.all([deleteSpaceByPropId(userSelection.variables)]);

        let  resultP = await Promise.all([deleteProperty(userSelection.variables)]);
        res.send(JSON.stringify(resultS+resultP));
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to Delete data' })
    }
}