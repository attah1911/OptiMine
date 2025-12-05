import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";

const ChatWindow = ({
  messages,
  message,
  onMessageChange,
  onSendMessage,
  onClose,
}) => {
  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
      <ChatHeader onClose={onClose} />
      <MessagesList messages={messages} />
      <ChatInput
        message={message}
        onMessageChange={onMessageChange}
        onSubmit={onSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
