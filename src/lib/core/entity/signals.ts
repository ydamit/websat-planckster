import { signal, type Signal } from "@preact/signals-react";
import { injectable } from "inversify";


export interface TSignal<TValue> {
    name: string;
    description: string;
    value: Signal<TValue>;
}