import jshashes from 'jshashes'
const PAGE_SIZE = 10
const md5 = new jshashes.MD5().b64

export const getData = async (page = 0) => {

    const response = await fetch(`https://hiring.guardio.dev/fe/breaches?offset=${page * PAGE_SIZE}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Best-Pokemon': 'Charmander'
            }
        })
    const data = await response.json()
    for (const i in data.items) {
        data.items[i].id = md5(data.items[i].Title + data.items[i].Description)
    }
    return data
}
