export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^0-9]/g, "");
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 8)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  if (phoneNumber.length === 10)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  if (phoneNumber.length === 11)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
  return phoneNumber;
};
