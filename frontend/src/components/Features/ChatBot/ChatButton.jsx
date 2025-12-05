import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-primary text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 z-50 flex items-center justify-center"
      style={{ width: "56px", height: "56px" }}
      aria-label={isOpen ? "Tutup chat" : "Buka chat"}
    >
      {isOpen ? (
        <FiX className="w-6 h-6" />
      ) : (
        <FiMessageCircle className="w-10 h-10" />
      )}
    </button>
  );
};

export default ChatButton;
