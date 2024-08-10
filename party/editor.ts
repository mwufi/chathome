import type * as Party from "partykit/server";
import { onConnect, type YPartyKitOptions } from "y-partykit";
import { notFound, ok, json } from "./utils/response";

export default class EditorServer implements Party.Server {
  yjsOptions: YPartyKitOptions = {};

  constructor(public party: Party.Party) { }

  async onConnect(conn: Party.Connection) {
    await this.party.storage.put("title", this.party.id);
    return onConnect(conn, this.party, {
      // experimental: persists the document to partykit's room storage
      persist: { mode: "snapshot" }
    });
  }

  /**
   * Responds to HTTP requests to /parties/chatroom/:roomId endpoint
   */
  async onRequest(request: Party.Request) {
    // mark room as created by storing its id in object storage
    if (request.method === "POST") {
      await this.party.storage.put("id", this.party.id);

      try {
        const body = await request.json();
        if (body && typeof body.title === 'string') {
          await this.party.storage.put("title", body.title);
          console.log("Title updated:", body.title);
          // Broadcast the updated title to all connected clients
          this.party.broadcast(JSON.stringify({ type: 'titleUpdate', title: body.title }));
        }
      } catch (error) {
        console.error("Error parsing JSON body:", error);
      }

      return ok();
    }

    if (request.method === "GET") {
      return json({
        title: await this.party.storage.get("title"),
      });
    }

    // respond to cors preflight requests
    if (request.method === "OPTIONS") {
      return ok();
    }

    return notFound();
  }


  async onClose(_: Party.Connection) {
    // do what?
    console.log("document closed")
  }

}
