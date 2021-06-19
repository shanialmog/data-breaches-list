import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
    const useStyles = makeStyles({
        root: {
            maxWidth: 800,
            marginBottom: 10
        },
        details: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline'
        },
        padding: {
            paddingLeft: 10
        }
    })
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea onClick={isOpen ? onClose : onOpen}>
                    <CardContent>
                        <div className={classes.details}>
                            {
                                icon === 'IsVerified'
                                    ?
                                    <div>
                                        <i className="fas fa-check-circle"></i>
                                    </div>
                                    :
                                    <div>
                                        <i className="fal fa-check-circle"></i>
                                    </div>
                            }
                            <Typography className={classes.root, classes.padding} variant="body2" color="textSecondary" component="p">
                                {BreachDate}
                            </Typography>
                            <Typography className={classes.root, classes.padding} gutterBottom variant="h6" component="h2">
                                {Title}
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
                {
                    isOpen &&
                    <CardContent>
                        <div>
                            <Typography variant="body2" color="textSecondary" component="p">{Description}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{Domain}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{BreachDate}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{AddedDate}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{ModifiedDate}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{PwnCount}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{LogoPath}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{DataClasses}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{IsFabricated}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{IsSensitive}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{IsRetired}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{IsSpamList}</Typography>
                        </div>
                    </CardContent>
                }
            </Card>
        </div>
    )
}

export default BreachItem