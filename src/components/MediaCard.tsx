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
        maxWidth: 280,
    },
    media: {
        height: 130,
    },
});

const img = '/img/apt.jpeg';

interface Props {
    id: string,
    home_name: string,
    property_id: string,
    brand: string,
    city_name: string,
    neighborhood: string,
    timezone: string,
    unit_count: string,
    rownum: string,
}

export default function MediaCard({ id, home_name, brand, city_name, neighborhood }: Props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <img src='/img/apt.jpeg'
                    width={280}
                    height={50}
                    alt="dev logo"></img>
                <CardContent>
                    <Typography gutterBottom component="h2">
                        Brand: {brand}
                    </Typography>
                    <Typography gutterBottom component="h2">
                        City: {city_name}
                    </Typography>
                    <Typography gutterBottom component="h2">
                        Neighbor: {neighborhood}
                    </Typography>
                    {/* <Typography gutterBottom variant="subtitle1" color="textSecondary" component="h2">
                        Price at: {price} $
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography> */}
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