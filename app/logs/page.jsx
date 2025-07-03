"use client";
import { useLogs } from "../hooks/useLogs.js";

export default function Home() {
    const allLogs = useLogs("ws://localhost:8080", "SUBSCRIBE:all");
    const importantLogs = useLogs("ws://localhost:8080", "SUBSCRIBE:important");

    return (
        <main style={styles.container}>
            <h1 style={styles.header}>📜 Live Log Viewer</h1>
            <div style={styles.grid}>
                <section style={styles.column}>
                    <h2 style={styles.subheader}>All Logs</h2>
                    <div style={styles.logBox}>
                        {allLogs.map((log, index) => (
                            <div key={index} style={styles.logLine}>{log}</div>
                        ))}
                    </div>
                </section>

                <section style={styles.column}>
                    <h2 style={styles.subheader}>Important Logs</h2>
                    <div style={styles.logBox}>
                        {importantLogs.map((log, index) => (
                            <div key={index} style={styles.logLine}>{log}</div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

const styles = {
    container: {
        padding: "2rem",
        fontFamily: "monospace",
        backgroundColor: "#1e1e1e",
        minHeight: "100vh",
        color: "#ffffff",
    },
    header: {
        fontSize: "2rem",
        marginBottom: "2rem",
        textAlign: "center",
    },
    grid: {
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    column: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: "45%",
    },
    subheader: {
        fontSize: "1.2rem",
        marginBottom: "0.5rem",
    },
    logBox: {
        border: "1px solid #444",
        padding: "1rem",
        borderRadius: "8px",
        maxHeight: "75vh",
        overflowY: "auto",
        backgroundColor: "#000",
    },
    logLine: {
        padding: "2px 0",
        borderBottom: "1px solid #333",
    },
};