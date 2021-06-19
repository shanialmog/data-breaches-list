import { useEffect, useState } from 'react'
import { getData } from '../utils/API'
import BreachItem from './BreachItem'
import Button from '@material-ui/core/Button'

const Breaches = () => {
    const [breachesList, setBreachesList] = useState([])
    const [openBreachId, setOpenBreachId] = useState(null)
    const [isFetching, setIsFetching] = useState(null) // Either top/bottom/null

    useEffect(() => {
        const loadInitialPage = async () => {
            let page = 0
            const urlPage = getQueryParam('page')
            if (typeof urlPage !== 'undefined') {
                page = Number(urlPage)
            }
            const data = await getData(page)
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
        if (isFetching === null) {
            return
        }
        const fetchMoreData = async () => {
            let page
            if (isFetching === 'bottom') {
                const lastItem = breachesList[breachesList.length - 1]
                page = lastItem.page + 1
            } else {
                const firstItem = breachesList[0]
                page = firstItem.page - 1
                if (page < 0) {
                    return
                }
            }
            const data = await getData(page)
            // Add page property to every item
            for (const i in data.items) {
                data.items[i].page = page
            }
            if (isFetching === 'bottom') {
                setBreachesList([...breachesList, ...data.items])
            } else {
                setBreachesList([...data.items, ...breachesList])
            }
            setIsFetching(null)
        }
        fetchMoreData()
        // eslint-disable-next-line
    }, [isFetching])

    const loadNextPage = () => {
        if (isFetching) {
            return
        }
        setIsFetching('bottom')
    }

    const loadPreviousPage = () => {
        if (isFetching) {
            return
        }
        setIsFetching('top')
    }

    const onOpen = (breachId, page) => () => {
        setQueryParams(breachId, page)
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

    const showLoadPreviousPage = breachesList.length > 0 && breachesList[0].page === 0

    return (
        <div className='breaches-container'>
            <h1>Data Breaches List</h1>
            {
                !showLoadPreviousPage &&
                <div style ={{textAlign: 'center'}}>
                <Button
                    className="button"
                    onClick={loadPreviousPage}
                    variant="contained"
                >
                    LOAD MORE
                </Button>
                </div>
            }
            <div style={{marginTop: '1em'}}>
                {
                    breachesList &&
                    breachesList.map((item) => {
                        return (
                            <BreachItem
                                key={item.id}
                                breachItem={item}
                                isOpen={item.id === openBreachId}
                                onOpen={onOpen(item.id, item.page)}
                                onClose={onClose()}
                            />
                        )
                    })
                }
            </div>
            <div style ={{textAlign: 'center'}}>
            <Button
                className="button"
                onClick={loadNextPage}
                variant="contained"
            >
                LOAD MORE
            </Button>
            </div>
        </div>
    )
}

export default Breaches