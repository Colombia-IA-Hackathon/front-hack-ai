"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type React from "react";
import { FaUser } from "react-icons/fa6";

interface Message {
	id: string;
	content: string;
	sender: "user" | "bot";
	timestamp: Date;
}

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const simulateBotResponse = (userMessage: string) => {
		setIsLoading(true);
		setTimeout(() => {
			const botMessage: Message = {
				id: Date.now().toString(),
				content: `You said: "${userMessage}"`,
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, botMessage]);
			setIsLoading(false);
		}, 1000);
	};

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: input.trim(),
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		simulateBotResponse(input);
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	return (
		<div className='flex flex-col h-screen max-w-2xl mx-auto shadow-lg rounded-2xl bg-white'>
			<div className='flex items-center p-4 shadow-sm m-2 rounded-2xl bg-white'>
				<div className='w-10 h-10 rounded-full'>
					<Image src='/insure-ai.png' alt='Insure AI' width={50} height={50} />
				</div>
				<div className='ml-3'>
					<div className='font-medium'>Chat Insure AI</div>
					{/* <div className='text-xs text-gray-500'>{isLoading ? "Typing..." : "Online"}</div> */}
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-4 space-y-4 shadow-sm m-2 rounded-2xl bg-white'>
				{messages.length === 0 && <div className='text-center text-gray-500 py-10'>Send a message to start chatting</div>}

				{messages.map((message) => (
					<div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
						{message.sender === "bot" && (
							<div className='w-8 h-8 rounded-full  text-white flex items-center justify-center mr-2'>
								<Image src='/insure-ai.png' alt='Insure AI' width={50} height={50} />
							</div>
						)}

						<div>
							<div
								className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-md break-words ${
									message.sender === "user"
										? "bg-blue-500 text-white rounded-br-none shadow-sm"
										: "bg-gray-200 text-gray-800 rounded-bl-none shadow-sm"
								}`}>
								{message.content.split("\n").map((text, i) => (
									<p key={i} className={i > 0 ? "mt-2" : ""}>
										{text}
									</p>
								))}
							</div>
							<div className='text-xs text-gray-500 mt-1'>{formatTime(message.timestamp)}</div>
						</div>

						{message.sender === "user" && (
							<div className='w-8 h-8 rounded-full bg-gray-300 ml-2'>
								<FaUser className='w-5 h-5 text-white m-1.5' />
							</div>
						)}
					</div>
				))}

				{isLoading && (
					<div className='flex justify-start'>
						<div className='w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2'>AI</div>
						<div className='bg-gray-200 px-4 py-2 rounded-lg'>
							<div className='flex space-x-1'>
								<div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce'></div>
								<div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' style={{ animationDelay: "0.2s" }}></div>
								<div className='w-2 h-2 bg-gray-500 rounded-full animate-bounce' style={{ animationDelay: "0.4s" }}></div>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className='p-4 shadow-sm m-2 rounded-2xl bg-white'>
				<form onSubmit={handleSend} className='flex gap-2'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='flex-1 px-4 py-2 input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Escribe un mensaje...'
						disabled={isLoading}
					/>
					<button type='submit' className='btn btn-primary rounded-2xl' disabled={isLoading || !input.trim()}>
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
