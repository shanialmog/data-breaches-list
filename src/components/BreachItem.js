const BreachItem = ({ breachItem, isOpen, onOpen, onClose }) => {
    const {
        Title,
        Description,
        Domain,
        BreachDate,
        AddedDate,
        ModifiedDate,
        PwnCount,
        LogoPath,
        DataClasses,
        IsVerified,
        IsFabricated,
        IsSensitive,
        IsRetired,
        IsSpamList
    } = breachItem

    const icon = IsVerified && 'IsVerified'

    return (
        <div onClick={isOpen ? onClose : onOpen}>
            {
                icon === 'IsVerified'
                    ?
                    <i className="fas fa-check-circle"></i>
                    :
                    <i className="fal fa-check-circle"></i>
            }
            <h3>{BreachDate}</h3>
            <h2>{Title}</h2>
            {
                isOpen &&
                <div>
                    <div>{Description}</div>
                    <div>{Domain}</div>
                    <div>{BreachDate}</div>
                    <div>{AddedDate}</div>
                    <div>{ModifiedDate}</div>
                    <div>{PwnCount}</div>
                    <div>{LogoPath}</div>
                    <div>{DataClasses}</div>
                    <div>{IsFabricated}</div>
                    <div>{IsSensitive}</div>
                    <div>{IsRetired}</div>
                    <div>{IsSpamList}</div>
                </div>
            }
        </div>
    )
}

export default BreachItem