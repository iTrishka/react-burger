
export default function checkResponse(res:Response) {
    if (res.ok) {
        return res.json()
    }
    return res.json() 
}