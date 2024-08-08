import type * as Party from "partykit/server";
import { onConnect, type YPartyKitOptions } from "y-partykit";
import type { Doc } from "yjs";
import { notFound, ok } from "./utils/response";

export default class EditorServer implements Party.Server {
  yjsOptions: YPartyKitOptions = {};
  constructor(public party: Party.Party) { }

  getOpts() {
    // options must match when calling unstable_getYDoc and onConnect
    const opts: YPartyKitOptions = {
      callback: { handler: (doc) => this.handleYDocChange(doc) },
    };
    return opts;
  }

  /**
   * Responds to HTTP requests to /parties/chatroom/:roomId endpoint
   */
  async onRequest(request: Party.Request) {
    // mark room as created by storing its id in object storage
    if (request.method === "POST") {
      // respond to authentication requests proxied through the app's
      // rewrite rules. See next.config.js in project root.
      if (new URL(request.url).pathname.endsWith("/auth")) {
        // await this.authenticateUser(request);
        return ok();
      }

      await this.party.storage.put("id", this.party.id);
      return ok();
    }

    // respond to cors preflight requests
    if (request.method === "OPTIONS") {
      return ok();
    }

    return notFound();
  }
  async onConnect(conn: Party.Connection) {
    await this.updateCount();
    return onConnect(conn, this.party, this.getOpts());
  }

  async onClose(_: Party.Connection) {
    await this.updateCount();
  }

  handleYDocChange(_: Doc) {
    //console.log("ydoc changed");
    // called on every ydoc change
    // no-op
  }

  async updateCount() {
    // Count the number of live connections
    const count = [...this.party.getConnections()].length;
    console.log(`we now have ${count} connections in ${this.party.id}`)

    // // Send the count to the 'rooms' party using HTTP POST
    // await this.party.context.parties.rooms.get(SINGLETON_ROOM_ID).fetch({
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ room: this.room.id, count }),
    // });
  }
}
