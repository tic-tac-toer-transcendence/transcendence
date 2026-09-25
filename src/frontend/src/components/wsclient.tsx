"use client"

import { useRef, useState, useEffect } from "react"

export default function WsClient() {
	const [messages, setMessages] = useState<string[]>([]);
	const [input, setInput] = useState("");
	const ws = useRef<WebSocket>(null);

	useEffect(() => {
		const websocket = new WebSocket("wss://echo.websocket.org");
		ws.current = websocket;

		websocket.onopen = () => console.log("Connected to websocket server");
		websocket.onmessage = (event) => {
			setMessages((prevMessages) => [...prevMessages, event.data]);
		}
		websocket.onclose = () => console.log("Disconnected from websocket server");
		return () => websocket.close();
	}, [])

	function sendMessage() {
		if (ws.current && ws.current.readyState == WebSocket.OPEN) {
			ws.current.send(input);
			setInput("");
		}
	}

	return (
		<section>
			<h2>Websocket Client</h2>
			<div>{messages.map((message, i) => (<p key={i}>{message}</p>))}</div>
			<input
				type="text"
				placeholder="Input your message"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
		</section>
	)
}
