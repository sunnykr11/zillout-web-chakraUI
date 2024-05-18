import { useState, useEffect } from 'react'
import {
    Flex,
    Box,
    Card,
    Container,
    Text,
    Button,
    Spacer
} from "@chakra-ui/react"
import purpleBg from "../assets/purpleBg.png"
import pinkBg from "../assets/pinkBg.png"
import location from "../assets/location.svg"
import rectangle from "../assets/rectangle.svg"
import person from "../assets/person.svg"
import tag from "../assets/Tag.svg"


interface PubDetails {
    id: number,
    image: string,
    type: string;
    rating: number;
    name: string,
    shortAddress: string;
}

interface EventDetails {
    perkTime: string;
    perkName: string;
    perkCount: number;
}

interface OfferDetails {
    offerDays: object;
    offerName: string
}

interface Data {
    pubDetails: PubDetails,
    eventDetails: EventDetails,
    offerDetails: OfferDetails
}

const API = "https://zillout-backend.xyz/api/v1/rbzo/pubs/landingPage/278"

const Home = () => {

    const [data, setData]  = useState<Data | null>(null)

    const fetchUsers = async (url: string) => {
        try {
            const res = await fetch(url)                        
            const parsedData = await res.json()
            setData(parsedData.data)
            
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchUsers(API)
    }, [])

    const handleViewEventClick = () => {
        window.location.href = "https://zillout.com/pub/detail/209?tab=events"
    }
    
    const handleViewOfferClick = () => {
    window.location.href = "https://zillout.com/pub/detail/209?tab=offers"
    }

    // Function to shorten the letters of days
    const days = (data?.offerDetails?.offerDays)
    function shortDay(day) {
        if (!days || !Array.isArray(days)) {
            return "Not valid Day"
        }

        return days.map(day => day.substring(0,3)).join(', ')
    }
    const shortDayString = shortDay(days)

  return (
    <Container 
    centerContent
    p={0}
    border={"1px"}
    height={"100vh"} 
    minWidth={"408px"}
    maxWidth={"408px"}
    bgColor={"#111"}
    position={"relative"}
    >
        <Flex 
        direction={'column'}
        justify={'center'}
        >
            <Box
            bgPosition={"center"}
            bgSize={"cover"}
            bgRepeat="no-repeat"
            marginBottom={90}
            >
                <img
                src={data?.pubDetails?.image} alt="place"/>
            </Box>
            <Flex
            justify={"center"}
            >     
                <Card
                p={5}
                color={"white"}
                bgColor={"#1E1E1E"}
                width={"90%"}
                position={"absolute"}
                top={220}
                >
                    <Flex
                    justify={'space-between'}
                    >
                        <Text
                        textTransform="uppercase"
                        letterSpacing="2px"
                        fontSize={"12px"}
                        fontWeight={"700"}
                        color={"#9D9D9D"}
                        >{data?.pubDetails?.type}</Text>
                        <img
                        src={rectangle} alt="" />
                        <Text
                        fontSize={"12px"}
                        position={"absolute"}
                        marginLeft={"82%"}
                        marginTop={"3px"}
                        color={"black"}
                        fontWeight={"600"}
                        >{data?.pubDetails?.rating}
                        </Text>
                    </Flex>
                        <Text
                        letterSpacing="2px"
                        fontWeight={"700"}
                        fontSize={"20px"}
                        >{data?.pubDetails?.name}</Text>
                        <Flex
                        gap={"10px"}
                        >
                            <img src={location} alt="" />
                            <Text
                            color={"#9D9D9D"}
                            >{data?.pubDetails?.shortAddress}</Text>
                        </Flex>
                </Card>
            </Flex>
            <Flex
            direction={'column'}
            align={'center'}
            >
            <Card
                width={"90%"}
                marginBottom={7}
                height={"170px"}
                paddingLeft={3}
                backgroundImage={purpleBg}
                bgPosition={"center"}
                bgRepeat="no-repeat"
                backgroundSize={"cover"}
                >
                    <Text
                    fontSize={"18px"}
                    fontWeight={600}
                    color={"#EBBB79"}
                    marginTop={3}
                    marginBottom={2}
                    >Event Offers
                    </Text>
                    <Box
                    fontSize={"12px"}                    
                    height={"100%"}
                    color={"white"}
                    >
                        <Text>
                            Till {data?.eventDetails?.perkTime}
                        </Text>
                        <Text>
                            {data?.eventDetails?.perkName}
                        </Text>
                        <Text
                        color={"#9D9D9D"}
                        >
                            +{data?.eventDetails?.perkCount} more offers
                        </Text>
                        <Button
                        marginTop={"10px"}
                        onClick={handleViewEventClick}
                        >
                            View All Offers
                        </Button>
                    </Box>
                </Card>
            <Card
                
                width={"90%"}
                height={"170px"}
                paddingLeft={3}
                bgImage={pinkBg}
                bgPosition={"center"}
                bgRepeat="no-repeat"
                backgroundSize={"cover"}
                >
                    <Box
                    color={"white"}
                    >
                            <Text
                            fontWeight={"600"}
                            color={"#EBBB79"}
                            fontSize={"18px"}
                            marginTop={3}
                            marginBottom={2}
                            >Day Offers
                            </Text>
                            <Box
                            height={"100%"}
                            fontSize={"12px"}
                            >
                            <Text>
                                {shortDayString}
                            </Text>
                            <Text>
                                {data?.offerDetails?.offerName}
                            </Text>
                            <Button
                            marginTop={"20px"}
                            onClick={handleViewOfferClick}
                            >
                                View All Offers
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Flex>
        </Flex>
    </Container>
  )
}

export default Home