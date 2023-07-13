import {Connection} from "./Connection.ts";

export type ConnectionsResponse = {
    connection: Connection[],
    timestamp: String,
    version: String,
}