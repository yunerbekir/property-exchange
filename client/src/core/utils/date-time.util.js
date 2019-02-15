const toTwoDigitString = (value) => value < 10 ? `0${value}` : value;

export const getPeriodLabel = (timestampOfTheMiddleOfThePeriod, periodResolution) => {
    const periodStart = new Date(timestampOfTheMiddleOfThePeriod - periodResolution / 2);
    const periodEnd = new Date(timestampOfTheMiddleOfThePeriod + periodResolution / 2);
    const startHour = toTwoDigitString(periodStart.getHours());
    const startMinutes = toTwoDigitString(periodStart.getMinutes());
    const endHour = toTwoDigitString(periodEnd.getHours());
    const endMinutes = toTwoDigitString(periodEnd.getMinutes());
    return `${startHour}:${startMinutes} - ${endHour}:${endMinutes}`;
};
