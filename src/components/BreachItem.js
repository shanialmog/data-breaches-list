const BreachItem = ({ breachItem }) => {
    const {Title, BreachDate} = breachItem
    return (
        <div>
            <h2>{Title}</h2>
            <h3>{BreachDate}</h3>
        </div>
    )
}

export default BreachItem