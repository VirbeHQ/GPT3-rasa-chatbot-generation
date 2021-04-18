import React from "react";
import {Spacer, Flex} from "@chakra-ui/react";

import {Header, Input, Footer, Button} from "@components";
import {useRootStore} from "@mobx";
import {
    Container,
    FormControl,
    FormLabel,
    FormHelperText,
    Heading,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea
} from "@chakra-ui/react"

const IntentPage: React.FC = () => {
    const RootStore = useRootStore()

    return (
        <Flex direction="column" minH="100vh">
            <Header/>
            <Container direction="column" maxW="800px" centerContent>
                <Flex direction="column" w="100%" mt={8}>
                    <FormControl id="intent">
                        <FormLabel>Intent name</FormLabel>
                        <Input type="text"/>
                        <FormHelperText>Define your intent name without whitespaces(eg. PlayMusic)</FormHelperText>
                    </FormControl>
                    <FormControl id="slot">
                        <FormLabel>Slot names</FormLabel>
                        <Input type="text"/>
                        <FormHelperText>Define available slots with underscore (eg. artist_name,
                            song_name)</FormHelperText>
                    </FormControl>
                    <FormControl id="n">
                        <FormLabel>Utterance number</FormLabel>
                        <NumberInput>
                            <NumberInputField/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>Define number of utterances to generate</FormHelperText>
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        type="submit"
                    >
                        Generate
                    </Button>
                </Flex>
                <Flex direction="column" mt={12} w="100%">
                    <Heading>Generated utterances</Heading>
                    <Textarea placeholder="This is where your utterances will be generated"/>
                </Flex>
            </Container>
            <Spacer/>
            <Footer/>
        </Flex>
    );
};

export default IntentPage;