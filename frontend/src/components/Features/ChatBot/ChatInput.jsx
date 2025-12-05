import { FiSend } from "react-icons/fi";

const ChatInput = ({ message, onMessageChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="p-3 sm:p-4 bg-white border-t border-gray-200"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-gray-800 text-white p-2 sm:p-3 rounded-lg hover:bg-gray-700 transition-colors flex-shrink-0"
          aria-label="Kirim pesan"
        >
          <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
