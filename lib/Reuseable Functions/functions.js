export const daysOfWeekArabic = (day) => {
  return day === "Saturday"
    ? "السبت"
    : day === "Friday"
    ? "الجمعة"
    : day === "Thursday"
    ? "الخميس"
    : day === "Wednesday"
    ? "الاربعاء"
    : day === "Tuesday"
    ? "الثلاثاء"
    : day === "Monday"
    ? "الاثنين"
    : day === "Sunday"
    ? "الاحد"
    : null;
};

export const convertToSubcurrencyEGP = (amount) => {
  return amount * 100;
};
