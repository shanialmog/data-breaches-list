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
            const urlBreachId = getQueryParam('breachId')
            if (urlBreachId) {
                setOpenBreachId(urlBreachId)
            }
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

    const onOpen = (breachId) => () => {
        setQueryParams(breachId, 0)
        setOpenBreachId(breachId)
    }

    const onClose = () => () => {
        setQueryParams(null, null)
        setOpenBreachId(null)
    }

    const setQueryParams = (breachId, page) => {
        const searchParams = new URLSearchParams(window.location.search)
        if (breachId !== null) {
            searchParams.set('breachId', breachId)
            searchParams.set('page', page)
        } else {
            searchParams.delete('breachId')
            searchParams.delete('page')
        }
        const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString()
        window.history.pushState(null, '', newRelativePathQuery)
    }

    const getQueryParam = (param) => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        return params[param]
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
                            onOpen={onOpen(item.id)}
                            onClose={onClose()}
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