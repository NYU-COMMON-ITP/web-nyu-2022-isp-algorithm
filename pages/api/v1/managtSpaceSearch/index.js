import { getSpacesforManagt } from "../../../../src/data-access/searches";

export default async function handler(req, res) {
    try {
        const userSelection = req.body
        console.log('API')
        const result = await getSpacesforManagt(userSelection)
        console.log("result")
        console.log(result)
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}