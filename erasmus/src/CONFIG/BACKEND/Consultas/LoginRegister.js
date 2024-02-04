import axios from "axios";
import url from "CONFIG/url";

export async function LoginUsers(correo, password) {
  // console.log(`${url}`);
  const res = await axios.get(`${url}/usuarios/${correo}/${password}`);
  // console.log(res.data);
  return res.data;
}

export async function CrearUsuario(
  nombre,
  tipo,
  correo,
  password,
  institucion,
  sexo,
  cedula,
) {
  // console.log(`${url}`);
  const res = await axios.post(`${url}/usuarios/crear`, {
    nombre: nombre,
    tipo: tipo,
    correo: correo,
    password: password,
    institucion: institucion,
    sexo: sexo,
    cedula:cedula,
  });
  // console.log(res.data);
  return res.data;
}
export async function CrearConfiguraciones(idprofesor) {
  try {
    const res = await axios.post(`${url}/usuarios/crearConfiguraciones`, {
      idprofesor: idprofesor,
    });
    return res.data;
  } catch (err) {
    return err;
  }
}
export async function ConsultarUsuario(correo, password) {
  // console.log(`${url}`);
  const res = await axios.get(`${url}/usuarios/${correo}/${password}`);
  // console.log(res.data);
  return res.data;
}

// export async function ListarMarcas(empresa) {
//   const res = await axios.get(`${url}/marca/${empresa}`);
//   // console.table(res.data)
//   return res.data;
// }
// export async function ListarProductos(empresa, marca) {
//   const res = await axios.get(`${url}/producto/${empresa}/${marca}`);
//   // console.log(res.data)
//   return res.data;
// }
// export async function ListarProductosAsignaciones(iempresa, imarca) {
//   const res = await axios.get(
//     `${url}/producto/asignados/${iempresa}/${imarca}`
//   );
//   // console.log(res.data)
//   return res.data;
// }
// export async function ListaParametrizacion() {
//   const res = await axios.get(`${url}/mrp`);
//   // console.log(res.data)
//   return res.data;
// }
// export async function Simular(iempresa, imarca) {
//   const res = await axios.get(`${url}/mrp/pedidos/${iempresa}/${imarca}`);
//   // console.log(res.data)
//   return res.data;
// }
// export async function ActualizarParametrizaciones(
//   identificador,
//   fecha,
//   leadTime,
//   NServicio,
//   fetch
// ) {
//   const res = await axios.post(`${url}/mrp/${identificador}`, {
//     fechaMaxima: fecha,
//     leadTime: leadTime,
//     nivelServicio: NServicio,
//   });
//   fetch();
// }
