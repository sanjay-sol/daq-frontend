"use client";
import { useEffect, useState } from "react";

export function useLogs(socketUrl, subscribeMessage) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      ws.send(subscribeMessage); // Tell the server what to subscribe to
    };

    ws.onmessage = (event) => {
      setLogs((prevLogs) => [event.data, ...prevLogs]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      console.warn("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [socketUrl, subscribeMessage]);

  return logs;
}
