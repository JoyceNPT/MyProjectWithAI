import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { ProjectionResult } from "@/types/investment";

export function useSignalR(hubUrl: string) {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [hubUrl]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => setIsConnected(true))
                .catch((err) => console.error("SignalR Connection Error: ", err));

            return () => {
                connection.stop();
            };
        }
    }, [connection]);

    return { connection, isConnected };
}
