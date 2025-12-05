const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2.5 sm:p-3 ${
          isUser
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
          {message.text}
        </p>
        <p
          className={`text-[10px] sm:text-xs mt-1 ${
            isUser ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
