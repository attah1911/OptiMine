export const formatTime = () => {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const createMessage = (text, sender, id = null) => {
  return {
    id: id || Date.now(),
    text,
    sender,
    time: formatTime(),
  };
};
