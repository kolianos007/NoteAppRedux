// const months = {
//   January: "января",
//   February: "февраля",
//   March: "марта",
//   April: "апреля",
//   May: "мая",
//   June: "июня",
//   July: "июля",
//   August: "августа",
//   September: "сентября",
//   October: "октября",
//   November: "ноября",
//   December: "декабря",
// };

const convertDate = (time, locale) => {
  const date = new Date(time)
    .toLocaleString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");
  return date;
  //   const month = date.split(" ")[1];
  //   return date.replace(month, months[month]);
};

export default convertDate;
