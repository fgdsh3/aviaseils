const formatDate = (date: string, duration: number) => {
  const departureTime = date.slice(
    date.indexOf('T') + 1,
    date.indexOf('.') - 3
  );
  const departureMinutes = Number(departureTime.slice(3));
  const departureHours = Number(departureTime.slice(0, 1));
  const departureTimeInMinutes = departureMinutes + departureHours * 60;
  const arrivalTimeInMinutes = departureTimeInMinutes + duration;
  let arrivalMinutes: string | number = arrivalTimeInMinutes % 60;
  let arrivalHours: string | number = Math.floor(arrivalTimeInMinutes / 60);
  if (arrivalHours >= 24) {
    arrivalHours -= 24;
  }
  if (arrivalHours < 10) {
    arrivalHours = `0${arrivalHours}`;
  }
  if (arrivalMinutes < 10) {
    arrivalMinutes = `0${arrivalMinutes}`;
  }

  const arrivalTime = `${arrivalHours}:${arrivalMinutes}`;

  return `${departureTime} - ${arrivalTime}`;
};

export default formatDate;
