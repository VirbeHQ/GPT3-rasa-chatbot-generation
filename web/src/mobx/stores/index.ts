import {types} from "mobx-state-tree";
import {CounterStore} from "./counter";
import {IntentStore} from "./intent";

export const RootStore = types.model("RootStore", {
    counterStore: CounterStore,
    intentStore: IntentStore,
});

export const createRootStore = () =>
    RootStore.create({
        counterStore: CounterStore.create(),
        intentStore: IntentStore.create(),
    });
