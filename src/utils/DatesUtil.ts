/*
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
*/

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

export const formatDate = (date: Date) => {
  try {
    if (date === undefined || date === null) return "";
    return (
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "/" +
      (date.getMonth() + 1 < 10 ? "0" : "") +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    );
  } catch ({ message }) {
    alert(message);
  }
  return "";
};

export const getStrDateStartEnd = (dateStart: Date, dateEnd: Date) => {
  if (
    dateStart == undefined ||
    dateStart === null ||
    dateEnd === undefined ||
    dateEnd === null
  )
    return "";

  return (
    dateStart.getDate() +
    (dateStart.getMonth() === dateEnd.getMonth()
      ? " "
      : " " + monthNames[dateStart.getMonth()]) +
    (dateStart.getDate() === dateEnd.getDate() &&
    dateStart.getMonth() === dateEnd.getMonth() &&
    dateStart.getFullYear() === dateEnd.getFullYear()
      ? ""
      : " au " + dateEnd.getDate() + " ") +
    monthNames[dateEnd.getMonth()] +
    " " +
    dateEnd.getFullYear()
  );
};
