import { ReaderLocation } from "./reader-location";

export class Reader {
    id: string;
    placement: string;
    description: string;
    locations: Array<ReaderLocation>;
}