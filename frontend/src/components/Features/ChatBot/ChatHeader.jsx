import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatHeader = ({ onClose }) => {
  return (
    <div className="bg-primary text-white p-3 sm:p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
          <FiMessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-sm sm:text-base">AI Assistant</h3>
          <p className="text-xs text-gray-300">Online</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="hover:bg-primary-dark p-1.5 sm:p-2 rounded-full transition-colors"
        aria-label="Tutup chat"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
