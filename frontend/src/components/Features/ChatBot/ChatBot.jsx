import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { useChatBot } from "../../../hooks/useChatBot";

const ChatBot = () => {
  const {
    isOpen,
    message,
    messages,
    toggleChat,
    handleSendMessage,
    setMessage,
  } = useChatBot();

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      {isOpen && (
        <ChatWindow
          messages={messages}
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onClose={toggleChat}
        />
      )}
    </>
  );
};

export default ChatBot;
