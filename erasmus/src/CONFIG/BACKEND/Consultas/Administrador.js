import axios from "axios";
import url from "CONFIG/url";

export async function ConsultaImagenesAdmin(numJuego) {
  try {
    const res = await axios.get(`${url}/admin/consultarImagenes/${numJuego}`);
    return res.data;
  } catch (err) {
    return err;
  }
}
export async function CambiarEstadoImagen(idimagen, estado, fetch) {
  const res = await axios.post(`${url}/admin/cambiarEstadoImagenAdmin`, {
    idimagen: idimagen,
    estado: estado,
  });
  fetch();
  return res;
}
export async function CargarImagen(numJuego, nombreimagen, formData, fetch) {
  try {
    const res = await axios.post(
      `${url}/admin/subirImagen/${numJuego}/${nombreimagen}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    fetch()

    return res;
  } catch (error) {
    return error;
  }
}
