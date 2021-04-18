import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Spacer, Flex} from "@chakra-ui/react";
import {observer} from "mobx-react-lite"

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
    Text,
    Textarea
} from "@chakra-ui/react"
import {Client} from "../src/api/client";
import {useRootStore} from "@mobx";

const IntentPage: React.FC = observer(() => {
    let client = new Client();
    const [isSending, setIsSending] = useState(false)
    const [intentName, setIntentName] = useState("PlayMusic")
    const [slotsText, setSlotsText] = useState("")
    const [number, setNumber] = useState(3)
    const [exampleUtterance, setExampleUtterance] = useState("")
    const [slots, setSlots] = useState([])
    const [generatedUtterance, setGeneratedUtterance] = useState([])
    const [formattedResponse, setFormattedResponse] = useState("")

    const {intentStore} = useRootStore()

    useEffect(() => {
        if (slotsText.trim() == "") setSlots([])
        else setSlots(slotsText.split(","))
    }, [slotsText])

    useEffect(() => {
        setFormattedResponse(generatedUtterance.map(utternace => `  - ${utternace}`).join('\n'))
    }, [generatedUtterance])

    const sendRequest = () => {
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        client
            .generateUtterances(intentName, slots, number, exampleUtterance)
            .then((utteranceResponse) => setGeneratedUtterance(utteranceResponse.utterances))
            .finally(() => {
                // once the request is sent, update state again
                setIsSending(false)
            })
    }

    const appendIntent = (async () => {
        intentStore.addIntent(intentName, generatedUtterance)
    })

    return (
        <Flex direction="column" minH="100vh">
            <Header/>
            <Container direction="column" maxW="1200px" centerContent>
                <Flex direction="row" w="100%" mt={8}>
                    <Flex direction="column" w="100%" mt={8}>
                        <FormControl id="intent">
                            <FormLabel>Intent name</FormLabel>
                            <Input type="text"
                                   value={intentName}
                                   onChange={(e) => setIntentName(e.target.value)}/>
                            <FormHelperText>Define your intent name without whitespaces(eg. PlayMusic)</FormHelperText>
                        </FormControl>
                        <FormControl id="slot">
                            <FormLabel>(Optional) Slot names</FormLabel>
                            <Input
                                type="text"
                                value={slotsText}
                                onChange={(e) => setSlotsText(e.target.value)}
                            />
                            <FormHelperText>Define available slots with underscore (eg. artist_name,
                                song_name)</FormHelperText>
                        </FormControl>
                        <FormControl id="n">
                            <FormLabel>Utterance number</FormLabel>
                            <NumberInput
                                value={number}
                                onChange={(value) => setNumber(value)}
                            >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText>Define number of utterances to generate</FormHelperText>
                        </FormControl>
                        <FormControl id="example">
                            <FormLabel>(Optional) Example Utterance</FormLabel>
                            <Input type="text"
                                   value={exampleUtterance}
                                   onChange={(e) => setExampleUtterance(e.target.value)}/>
                            <FormHelperText>Define first example eg. Play [song name](song_name) by [artist
                                name](artist_name)</FormHelperText>
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            type="submit"
                            isLoading={isSending}
                            onClick={sendRequest}
                        >
                            Generate
                        </Button>
                    </Flex>
                    <Flex direction="column" m={12} w="100%">
                        <Heading>Generated utterances</Heading>
                        <Textarea
                            placeholder="This is where your utterances will be generated"
                            minH="200px"
                            value={formattedResponse}
                            onChange={(e) => setFormattedResponse(e.target.value)}/>
                        <Text as="cite">You can tweak those examples before adding them to NLU file</Text>
                        <Spacer/>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            type="submit"
                            onClick={appendIntent}
                        >
                            Append
                        </Button>
                    </Flex>
                </Flex>
                <Flex direction="column" mt={12} w="100%">
                    <Heading>Final Rasa NLU file</Heading>
                    <Textarea
                        placeholder=""
                        minH="600px"
                        value={intentStore.nluFile}/>
                </Flex>
            </Container>
            <Spacer/>
            <Footer/>
        </Flex>
    );
});

export default IntentPage;