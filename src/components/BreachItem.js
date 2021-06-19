const BreachItem = ({ breachItem }) => {
    const {Title, BreachDate} = breachItem
    return (
        <div>
            {console.log(Title, BreachDate)}
            <h2>{Title}</h2>
            <h3>{BreachDate}</h3>
        </div>
    )
}

export default BreachItem