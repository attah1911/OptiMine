import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Dummy messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo, saya AI Assistant. Siap bantu rencanakan jadwal produksi & distribusi hari ini.",
      sender: "bot",
      time: "18:13",
    },
    {
      id: 2,
      text: "💡 Ada anomali cuaca minggu ini. Apakah ingin saya analisis dampaknya terhadap produksi?",
      sender: "bot",
      time: "18:13",
    },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate bot response (dummy)
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Terima kasih atas pertanyaannya. Saya sedang memproses informasi untuk Anda.",
          sender: "bot",
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-primary text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 z-50 flex items-center justify-center"
        style={{ width: "56px", height: "56px" }}
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMessageCircle className="w-10 h-10" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  AI Assistant
                </h3>
                <p className="text-xs text-gray-300">Online</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-primary-dark p-1.5 sm:p-2 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto bg-gray-50"
            style={{
              maxHeight: "60vh",
              minHeight: "300px",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2.5 sm:p-3 ${
                    msg.sender === "user"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs mt-1 ${
                      msg.sender === "user" ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 sm:p-4 bg-white border-t border-gray-200"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white p-2 sm:p-3 rounded-lg hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
