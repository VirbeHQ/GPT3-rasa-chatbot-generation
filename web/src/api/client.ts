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
    generateUtterances(intent: string, slots: string[], n): Promise<UtteranceResponse> {
        return axios.get<UtteranceResponse>(
            BASE_URL + `intent?intent=${intent}&slot=${slots[0]}&n=${n}`
        )
            .then((data) => {
                if (data.status !== 200) {
                    throw Error(`Failed to login: ${data.status} ${data.statusText}`);
                }
                return data.data;
            });
    }
}