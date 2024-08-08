import type * as Party from "partykit/server";
import { json } from "./utils/response";

export default class BasicServer implements Party.Server {
    constructor(readonly party: Party.Party) {
        console.log("Created a party")
    }

    async onRequest(req: Party.Request) {
        console.log("yay!", req.body)
        return json({ data: 1 })
    }
}

BasicServer satisfies Party.Worker;