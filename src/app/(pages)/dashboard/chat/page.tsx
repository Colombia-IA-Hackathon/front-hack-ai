import Chat from "@/app/components/chat";
import { unstable_ViewTransition as ViewTransition } from "react";

const ChatPage = () => {
	return (
		<ViewTransition name='chat-page'>
			<div className='py-4 overflow-scroll'>
				<Chat />
			</div>
		</ViewTransition>
	);
};

export default ChatPage;
