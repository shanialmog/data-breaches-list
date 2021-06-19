const PAGE_SIZE = 10

export const getData = async (page = 0) => {

    const data = await fetch(`https://hiring.guardio.dev/fe/breaches?offset=${page * PAGE_SIZE}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Best-Pokemon': 'Charmander'
            }
        })
    return data.json()
}
