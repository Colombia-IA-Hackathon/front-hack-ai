"use client";

import type React from "react";

import { useState } from "react";

export default function Chat() {
	const [messages, setMessages] = useState<string[]>([]);
	const [input, setInput] = useState("");

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;
		setMessages([...messages, input]);
		setInput("");
	};

	return (
		<div className='flex flex-col h-screen max-w-2xl mx-auto'>
			<div className='flex items-center p-4 border-b bg-gray-50'>
				<div className='w-10 h-10 rounded-full bg-gray-300'></div>
				<div className='ml-3'>
					<div className='h-4 w-20 bg-gray-300 rounded'></div>
					<div className='h-3 w-12 bg-gray-200 rounded mt-1'></div>
				</div>
			</div>

			<div className='flex-1 overflow-y-auto p-4 space-y-3'>
				{messages.map((message, index) => (
					<div key={index} className='flex justify-end'>
						<div className='max-w-xs bg-blue-500 text-white px-4 py-2 rounded-lg'>{message}</div>
					</div>
				))}
			</div>

			<div className='p-4 border-t'>
				<form onSubmit={handleSend} className='flex gap-2'>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Type message...'
					/>
					<button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
