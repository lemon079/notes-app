import { Box, Text } from "@chakra-ui/react";
import gsap from "gsap";
import { useEffect } from "react";

const Loading = () => {

    useEffect(() => {

        gsap.to('.loading-text', {
            opacity: 1,
            translateY: '0%',
            stagger: 0.6,
            ease: 'expo.inOut',
        });

        gsap.to('.loading-text', {
            delay: 0.5,
            translateY: '-100%',
            stagger: 0.6,
            ease: 'expo.inOut',
        });

        gsap.to('.loading-screen', {
            x: '-100%',
            duration: 1,
            delay: 2,
            ease: 'power4.inOut',
        });

    }, []);

    const loadText = ['think', 'write', 'implement'];

    return (
        <Box
            className='loading-screen'
            bgColor="#f5f5f5"
            position={'fixed'}
            top={0}
            left={0}
            w={'100vw'}
            h={'100vh'}
            zIndex={100}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}

        >
            <Box
                position="relative"
                width="350px"
                height="60px"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {loadText.map(text => (
                    <Text
                        key={text}
                        className='loading-text'
                        position="absolute"
                        opacity={0}
                        transform="translateY(100%)"
                        top={0}
                        left={0}
                        width="100%"
                        textAlign="center"
                        fontSize="5xl"
                        fontFamily={'sans-serif'}
                        textTransform={'uppercase'}
                        pointerEvents={'none'}
                        fontWeight={900}
                        letterSpacing={'2px'}
                    >
                        {text}
                    </Text>
                ))}
            </Box>
        </Box>
    );
}

export default Loading;
