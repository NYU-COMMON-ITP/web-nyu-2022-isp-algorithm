import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

interface Props {
    image: string;
    title: string;
    price: string;
    description: string;
}

export default function MediaCard({ image, title, price, description }: Props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={image} title={title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" color="textSecondary" component="h2">
                        Price at: {price} $
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Explore the detail
                </Button>
                <Button size="small" color="primary">
                    Get Info
                </Button>
            </CardActions>
        </Card>
    );
}