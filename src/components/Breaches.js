import { useEffect, useState } from 'react'
import { getData } from '../utils/API'
import BreachItem from './BreachItem'

const Breaches = () => {
    const [breachesList, setBreachesList] = useState([])

    useEffect(() => {
        const loadInitialPage = async () => {
            const data = await getData()
            setBreachesList(data.items)
        }
        loadInitialPage()
    }, [])

    return (
        <div>
            <h1>Data Breaches List</h1>
            {
                breachesList &&
                breachesList.map((item) => {
                    return (
                        <BreachItem
                            key={item.Name}
                            breachItem={item}
                        />
                    )
                })
            }
        </div>
    )
}

export default Breaches