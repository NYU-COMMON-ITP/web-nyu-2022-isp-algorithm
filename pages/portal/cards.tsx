import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MediaCard from '../../src/components/MediaCard';


const mediaCards = [
    {
        image: '/img/apt.jpeg',
        title: 'The Heritage',
        price: '1500',
        description:
            'Located in historic and lively Harlem only a block from Central Park, The Heritage by Common offers private bedrooms in all-inclusive coliving suites with convenient amenities, fully-stocked kitchens, and access to Common’s community.',
    },
    {
        image: '/img/apt.jpeg',
        title: 'Evergreen',
        price: '1500',
        description:
            'Live in one of Brooklyn’s most up-and-coming neighborhoods when you move into Common Evergreen in Bushwick, Brooklyn. Your fully furnished, move-in ready apartment is surrounded by great dining, bars, and some of the city’s coolest street art. ',
    },
    {
        image: '/img/apt.jpeg',
        title: 'Hancock',
        price: '1500',
        description:
            'Discover the best Brooklyn has to offer at Common Hancock in Bed-Stuy. This bustling neighborhood offers great nightlife, cozy eateries, historic architecture, and easy access to Manhattan and other Brooklyn neighborhoods.',
    },
    {
        image: '/img/apt.jpeg',
        title: 'Lincoln',
        price: '1500',
        description:
            'Set against the tranquil beauty of Prospect Park, Common Lincoln offers a friendly community, excellent location, and fantastic amenities. ',
    },
];

// mediaCards Array above

export default function Cards() {
    return (
        <Box p={5} pt={15} minHeight="100vh">
            <Grid container spacing={5}>
                {mediaCards.map((mediaCard, i) => {
                    return (
                        <Grid key={i} item>
                            <MediaCard {...mediaCard} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}