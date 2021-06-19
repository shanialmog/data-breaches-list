import { useEffect, useState } from 'react'
import { getData } from '../utils/API'
import BreachItem from './BreachItem'

const Breaches = () => {
    const [breachesList, setBreachesList] = useState([])
    const [openBreachId, setOpenBreachId] = useState(null)
    const [isFetching, setIsFetching] = useState(null) // Either top/bottom/null

    useEffect(() => {
        const loadInitialPage = async () => {
            const page = 0
            const data = await getData()
            // Add page property to every item
            for (const i in data.items) {
                data.items[i].page = page
            }
            setBreachesList(data.items)
        }
        loadInitialPage()
    }, [])

    useEffect(() => {
        if (isFetching !== 'bottom') {
            return
        }
        const fetchMoreData = async () => {
            const lastItem = breachesList[breachesList.length - 1]
            const page = lastItem.page + 1
            const data = await getData(page)
            // Add page property to every item
            for (const i in data.items) {
                data.items[i].page = page
            }
            setBreachesList([...breachesList, ...data.items])
            setIsFetching(null)
        }
        fetchMoreData()
    }, [isFetching])

    const loadNextPage = () => {
        if (isFetching) {
            return
        }
        setIsFetching('bottom')
    }

    return (
        <div>
            <h1>Data Breaches List</h1>
            {
                breachesList &&
                breachesList.map((item) => {
                    return (
                        <BreachItem
                            key={item.id}
                            breachItem={item}
                            isOpen={item.id === openBreachId}
                            onOpen={() => setOpenBreachId(item.id)}
                            onClose={() => setOpenBreachId(null)}
                        />
                    )
                })
            }
            <button
                onClick={loadNextPage}
            >
                LOAD MORE
            </button>
        </div>
    )
}

export default Breaches