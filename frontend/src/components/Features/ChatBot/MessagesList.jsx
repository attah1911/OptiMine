import MessageBubble from "./MessageBubble";

const MessagesList = ({ messages }) => {
  return (
    <div
      className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto bg-gray-50"
      style={{
        maxHeight: "60vh",
        minHeight: "300px",
      }}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesList;
