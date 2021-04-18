import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Spacer, Flex} from "@chakra-ui/react";

import {Header, Input, Footer, Button} from "@components";
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
import {Client} from "../src/api/client";
import {useRootStore} from "@mobx";

const IntentPage: React.FC = () => {
    let client = new Client();
    const [isSending, setIsSending] = useState(false)
    const [intentName, setIntentName] = useState("")
    const [slots, setSlots] = useState([])
    const [generatedUtterance, setGeneratedUtterance] = useState([])
    const [formattedResponse, setFormattedResponse] = useState("")
    const [finalNLU, setFinalNLU] = useState("")

    const {intentStore} = useRootStore()

    const sendRequest = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        // send the actual request
        await client.generateUtterances(intentName, [], 5).then((utteranceResponse) => {
                console.log(utteranceResponse)
                setGeneratedUtterance(utteranceResponse.utterances)
                setFormattedResponse(generatedUtterance.map(utternace => `  - ${utternace}`).join('\n'))
            }
        )
        // once the request is sent, update state again
        setIsSending(false)
    }, [isSending])

    const appendIntent = useCallback(async () => {
        intentStore.addIntent(intentName, generatedUtterance)
    }, [])
    // const {intentStore} = useRootStore()
    //
    // useEffect({
    //
    // }, [])

    return (
        <Flex direction="column" minH="100vh">
            <Header/>
            <Container direction="column" maxW="800px" centerContent>
                <Flex direction="column" w="100%" mt={8}>
                    <FormControl id="intent">
                        <FormLabel>Intent name</FormLabel>
                        <Input type="text"
                               value={intentName}
                               onChange={(e) => setIntentName(e.target.value)}/>
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
                        onClick={sendRequest}
                    >
                        Generate
                    </Button>
                </Flex>
                <Flex direction="column" mt={12} w="100%">
                    <Heading>Generated utterances</Heading>
                    <Textarea
                        placeholder="This is where your utterances will be generated"
                        minH="300px"
                        value={formattedResponse}
                        onChange={(e) => setFormattedResponse(e.target.value)}/>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        type="submit"
                    >
                        Append
                    </Button>
                </Flex>
                <Flex direction="column" mt={12} w="100%">
                    <Heading>Final NLU file</Heading>
                    <Textarea placeholder="" minH="600px">

                    </Textarea>
                </Flex>
            </Container>
            <Spacer/>
            <Footer/>
        </Flex>
    );
};

export default IntentPage;