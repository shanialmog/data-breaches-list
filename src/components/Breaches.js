import { useEffect, useState } from 'react'
import { getData } from '../utils/API'

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
            Yo
            {console.log(breachesList)}
        </div>
    )
}

export default Breaches