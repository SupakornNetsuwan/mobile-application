const convertISOToCustomFormat = (inputDate: string) => {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: "Asia/Bangkok", // Thailand's time zone
  };

  const thaiTimeFormatter = new Intl.DateTimeFormat("th-TH", options);
  const formattedDate = thaiTimeFormatter.format(date);

  return formattedDate;
};

export default convertISOToCustomFormat;
