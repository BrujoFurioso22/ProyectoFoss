import axios from "axios";
import url from "CONFIG/url";

export async function ConsultaEstudiantes(idprofesor) {
  // console.log(`${url}`);
  const res = await axios.get(`${url}/profesor/${idprofesor}`);
  // console.log(res.data);
  return res.data;
}

export async function ConsultaIDEstudiante(correoEstudiante) {
  // console.log(`${url}`);
  try {
    const res = await axios.get(
      `${url}/profesor/idEstudiante/${correoEstudiante}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
  // console.log(res.data);
}
export async function CrearAsignacion(idestudiante, idprofesor, fetch) {
  const res = await axios.post(`${url}/profesor/crearAsignacion`, {
    idestudiante: idestudiante,
    idprofesor: idprofesor,
  });
  fetch();
  return res;
}
export async function EliminarAsignacion(idestudiante, idprofesor, fetch) {
  const res = await axios.delete(`${url}/profesor/eliminarAsignacion`, {
    params: {
      idestudiante: idestudiante,
      idprofesor: idprofesor,
    },
  });
  fetch();
  return res;
}

export async function ConsultaIDprofesor(correoprofesor) {
  try {
    const res = await axios.get(
      `${url}/profesor/obtenerIDprofesor/${correoprofesor}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
}
export async function ConsultaReporteEstJuego(idestudiante, numjuego) {
  try {
    const res = await axios.get(
      `${url}/profesor/obtenerReporteEstJuego/${idestudiante}/${numjuego}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
}
export async function ConsultaReporteEstJuegoTotal(idestudiante, numjuego) {
  try {
    const res = await axios.get(
      `${url}/profesor/obtenerReporteEstJuegoTotal/${idestudiante}/${numjuego}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
}
export async function ConsultaReporteEstJuegoFecha(idestudiante, numjuego, fechaI, fechaF) {
  try {
    const res = await axios.get(
      `${url}/profesor/obtenerReporteEstJuegoFecha/${idestudiante}/${numjuego}/${fechaI}/${fechaF}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
}
export async function ConsultaReporteEstJuegoTotalFecha(idestudiante, numjuego,fechaI,fechaF) {
  try {
    const res = await axios.get(
      `${url}/profesor/obtenerReporteEstJuegoTotalFecha/${idestudiante}/${numjuego}/${fechaI}/${fechaF}`
    );
    return res.data;
  } catch (err) {
    return [];
  }
}
