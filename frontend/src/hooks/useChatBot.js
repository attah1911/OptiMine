import { useState } from "react";
import { createMessage, formatTime } from "../utils/chatUtils";

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Halo, saya AI Assistant. Siap bantu rencanakan jadwal produksi & distribusi hari ini.",
    sender: "bot",
    time: formatTime(),
  },
  {
    id: 2,
    text: "💡 Ada anomali cuaca minggu ini. Apakah ingin saya analisis dampaknya terhadap produksi?",
    sender: "bot",
    time: formatTime(),
  },
];

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = createMessage(message, "user");
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    setTimeout(() => {
      const botResponse = createMessage(
        "Terima kasih atas pertanyaannya. Saya sedang memproses informasi untuk Anda.",
        "bot"
      );
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return {
    isOpen,
    message,
    messages,
    toggleChat,
    handleSendMessage,
    setMessage,
  };
};
