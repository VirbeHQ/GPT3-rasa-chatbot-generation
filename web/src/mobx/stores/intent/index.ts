import {types} from "mobx-state-tree";

const Utterance = types.model({
    text: types.string
})

/**
 * This file is generated as an example of Mobx State Tree Stores
 *
 * To learn more about Mobx and Mobx State Tree,
 * please visit https://mobx-state-tree.js.org/intro/welcome
 */

// declaring the shape of a node with the type `Todo`
const Intent = types.model({
    name: types.string,
    utterances: types.array(Utterance)
}).actions(self => ({
    addUtterance(text: string) {
        self.utterances.push(text)
    }
}))


export const IntentStore = types
    .model("IntentStore", {
        intents: types.array(Intent),
        nluFile: types.optional(types.string, "")
    })
    .actions(self => ({
        addIntent(intentName: string, utterances: string[]) {
            self.intents.push(Intent.create({
                name: intentName,
                utterances: utterances.map(utterance => Utterance.create({text: utterance}))
            }));
            let nluYML =
                `
version: "2.0"
nlu:
`;
            self.intents.forEach(intent => {
                nluYML = nluYML.concat(`- intent: ${intent.name}\n  examples: |\n`)
                nluYML = nluYML.concat(intent.utterances.map(utternace => `    - ${utternace.text}`).join('\n')+"\n")
            });
            self.nluFile = nluYML;
        },
    }));
