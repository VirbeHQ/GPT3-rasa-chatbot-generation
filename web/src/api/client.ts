import {UtteranceResponse} from "./api";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5000/"

export class Client {
    /**
     * Generate utterances
     * @param intent
     * @param slots
     * @param n - number of utterances
     */
    async generateUtterances(intent: string, slots: string[], n, example: string): Promise<UtteranceResponse> {
        return axios.get<UtteranceResponse>(
            BASE_URL + `intent?intent=${intent}&n=${n}${slots && slots.length>0 ? `&slot=${slots.join("&slot=")}`: ""}${example ? `&example=${example}` : ""}`
        )
            .then((data) => {
                if (data.status !== 200) {
                    throw Error(`Failed to get the utterances: ${data.status} ${data.statusText}`);
                }
                return data.data;
            });
    }
}