import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuthContext } from "CONFIG/context/authcontext";
import logo from "SOURCES/logo-uazuay.png";
import { ROUTES } from "CONFIG/ROUTES/paths";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContenedorPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-p);
  min-height: 50px;
  width: 100%;
  position: relative;
  padding: 0 40px;
  color: white;
`;

const ContenedorN1 = styled.div`
  display: flex;
  height: 100%;
  padding: 0;
  margin: 0;
`;
const ContenedorCuenta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  margin: 0 15px 0 0;
  padding: 0 12px;
  transition: all 0.5s ease;
  height: 50px;
  user-select: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const SubMenu = styled.div`
  position: absolute;
  top: 100%;
  background-color: var(--color-p);
  max-width: 160px;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  color: white;
  opacity: ${(props) => (props.open ? 1 : 0)};
  animation: ${(props) => (props.open ? fadeIn : "none")} 0.5s ease;
  z-index: 99;
  & > div {
    cursor: pointer;
    padding: 0 10px;
    height: 100%;
    padding: 10px 15px;
    transition: all 0.3s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  div{
    display: flex;
    gap: 10px;
  }
`;

const LinkStyled = styled(Link)`
  cursor: pointer;
  padding: 0 10px;
  height: 100%;
  padding: 10px 15px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  div{
    display: flex;
    gap: 10px;
  }
`;

const Logo = styled.img`
  max-width: 120px;
`;

export const Header = () => {
  const [subMenuCuenta, setsubMenuCuenta] = useState(false);
  const { logout } = useAuthContext();
  const tipoUsu = localStorage.getItem("tipo");

  const toggleSubMenu = () => {
    setsubMenuCuenta(!subMenuCuenta);
  };
  return (
    <ContenedorPrincipal>
      <ContenedorN1>
        <a href="https://www.uazuay.edu.ec/">
          <Logo alt="LogoUDA" src={logo}></Logo>
        </a>
      </ContenedorN1>
      <ContenedorN1>Programa de Estimulación Visual</ContenedorN1>
      <ContenedorN1>
        <ContenedorCuenta onClick={toggleSubMenu}>
          <i className="bi bi-person-circle" />
          <span>{localStorage.getItem("nombre")}</span>
        </ContenedorCuenta>
        <SubMenu open={subMenuCuenta}>
          {tipoUsu !== "ADM" && (<LinkStyled to={ROUTES.PERFIL}>
            <div> <i className="bi bi-person-vcard-fill"></i> Ver Perfil</div>
          </LinkStyled>)}
          
          <div onClick={logout}> <i className="bi bi-door-open-fill"></i> Cerrar Sesión</div>
        </SubMenu>
      </ContenedorN1>
    </ContenedorPrincipal>
  );
};
