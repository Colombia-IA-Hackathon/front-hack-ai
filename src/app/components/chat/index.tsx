"use client";
import { BsArrowsFullscreen } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type React from "react";
import { FaUser } from "react-icons/fa6";
import { useChatAI } from "@/app/hooks/useChatAI";
import { useGeo } from "@/app/store/useGeo";
import { useHistoryChat } from "@/app/store/useHistoryChat";
import ReactMarkdown from "react-markdown";
import { useRiskStore } from "@/app/store/useRisk";
import { IoReload } from "react-icons/io5";

import { useContractStore } from "@/app/store/useContract";
import RiskSelector from "../risk";

interface Message {
	id: string;
	content: string;
	sender: "user" | "bot";
	timestamp: Date;
}

export default function Chat() {
	const { setContractSend, contractSend } = useContractStore();
	const { setRiskLevel, riskLevel } = useRiskStore();
	const { addUserMessage, addBotMessage, messages: globalMessages, clearMessages } = useHistoryChat();
	const { latitude, longitude } = useGeo();
	const { mutateAsync: sendInfo, isPending, isError } = useChatAI();
	const [messages, setMessages] = useState<Message[]>(globalMessages || []);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMessages(globalMessages || []);
	}, [globalMessages]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isPending) return;

		const userMessage: Message = {
			id: "1234567890",
			content: input.trim(),
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		addUserMessage(userMessage.content);
		setInput("");

		sendInfo({
			id: userMessage.id,
			message: userMessage.content,
			lat: latitude ?? 0,
			long: longitude ?? 0,
		}).then((response) => {
			const botMessage: Message = {
				id: Date.now().toString() + "-bot",
				content: response.message,
				sender: "bot",
				timestamp: new Date(),
			};
			setRiskLevel(response.risk);
			setContractSend(response.contract);
			setMessages((prev) => [...prev, botMessage]);
			addBotMessage(botMessage.content);
		});
	};
	const formatTime = (date: Date | string) => {
		const dateObj = typeof date === "string" ? new Date(date) : date;
		return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	useEffect(() => {
		if (isError) {
			const errorMessage: Message = {
				id: Date.now().toString() + "-error",
				content: "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.",
				sender: "bot",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
			addBotMessage(errorMessage.content);
		}
	}, [isError, addBotMessage]);

	return (
		<div className='flex flex-col h-screen mx-auto shadow-lg rounded-2xl bg-white'>
			<div className='flex items-center p-4 shadow-sm m-2 rounded-2xl bg-white'>
				<div className='w-10 h-10 rounded-full'>
					<Image src='/insure-ai.png' alt='Insure AI' width={50} height={50} />
				</div>
				<div className='ml-3 items-center flex justify-between w-full'>
					<div className='font-medium'>Chat Insure AI</div>
					<div className='gap-2 flex items-center'>
						<Link href={"/dashboard/chat"} className='text-xs text-blue-500 hover:underline'>
							<BsArrowsFullscreen className='inline ml-1' />
						</Link>
						<button
							className='text-lg text-red-500 hover:underline'
							onClick={() => {
								clearMessages();
								setMessages([]);
								setRiskLevel(0);
								setContractSend(false);
							}}>
							<IoReload className='inline ml-1' />
						</button>
					</div>
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-4 space-y-4 shadow-sm m-2 rounded-2xl bg-white'>
				{messages.length === 0 && <div className='text-center text-gray-500 py-10'>Envia un mensaje para iniciar el chat</div>}
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
								{String(message.content || "")
									.split("\n")
									.map((text, i) => (
										<ReactMarkdown key={i}>{`${text || "\u00A0"}`}</ReactMarkdown>
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

				{isPending && (
					<div className='flex justify-start'>
						<div className='w-8 h-8 rounded-full  text-white flex items-center justify-center mr-2'>
							<Image src='/insure-ai.png' alt='Insure AI' width={50} height={50} />
						</div>
						<div className='bg-gray-200 px-4 py-2 rounded-lg'>
							<span className='loading loading-dots loading-xl'></span>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className='p-4 shadow-sm m-2 rounded-2xl bg-white'>
				{riskLevel > 0 && <RiskSelector value={riskLevel} />}
				{contractSend && (
					<button className='btn btn-primary mb-4 w-full' onClick={() => setContractSend(false)}>
						Pagar poliza
					</button>
				)}
				<form onSubmit={handleSend} className='flex gap-2 mt-4'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='flex-1 px-4 py-2 input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Escribe un mensaje...'
						disabled={isPending}
					/>
					<button type='submit' className='btn btn-primary rounded-2xl' disabled={isPending || !input.trim()}>
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
