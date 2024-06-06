const generateDate = (type = "outHour") => {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril',
    'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const fechaActual = new Date();
  const day = fechaActual.getDate();
  const month = meses[fechaActual.getMonth()];
  const year = fechaActual.getFullYear();
  const dayOfWeek = fechaActual.getDay();
  const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  if (type == "hour") {
    const hour = fechaActual.getHours();
    let minutes:any = fechaActual.getMinutes();
    if(minutes.length == 1){
      minutes = `0${minutes}`
    }

    return `${hour}:${minutes}`;
  }

  return `${daysOfWeek[dayOfWeek]} ${day} de ${month} ${year}`;
};

export default generateDate;