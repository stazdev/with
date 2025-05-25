export const formatPhoneNumber = (value: string | undefined) => {
  if (!value) return "";
  const phoneNumber = value.replace(/[^\d]/g, "");
  return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const truncateText = (
  text: string | undefined,
  maxLength: number = 10
): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
