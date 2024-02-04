import React, { useState } from "react";
import styled from "styled-components";
import { jsonData } from "GENERAL/ComponentesGenerales/Sidebar/ITEMS";
import { Link } from "react-router-dom";
import { useAuthContext } from "CONFIG/context/authcontext";

const SidebarContainer = styled.div`
  width: ${({ open }) => (open ? "200px" : "50px")};
  height: 100vh;
  background-color: var(--color-p);
  color: #fff;
  overflow: hidden;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: ${({ open }) =>
    open ? "flex-start" : "center"}; // Alinea los elementos al inicio
`;

const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between; // Alinea los elementos al inicio
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
  & > span {
    display: flex;
    column-gap: 10px;
  }

  &.open .toggle-btn {
    transition: all 0.5s ease;
    transform: rotate(180deg);
  }
`;

const SubMenu = styled.div`
  padding-left: 20px;
  display: ${({ open }) => (open ? "block" : "none")};
`;
const SubMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(
      255,
      255,
      255,
      0.2
    ); // Color de fondo al pasar el ratón
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
const StyledLinkA = styled.a`
  text-decoration: none;
  color: #fff;
  i {
    color: white;
  }
`;

const ToggleButton = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-left: ${({ open }) => (open ? "6px" : "0")};
`;
const ContenedorItem = styled.div`
  width: 100%;
  padding: 2px 5px;
  &.open {
    background-color: rgba(255, 255, 255, 0.18);
  }
`;

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const { logout } = useAuthContext();

  const handleToggle = () => {
    setOpen(!open);
    setOpenIndex(null); // Cerrar todos los submenús al cambiar el estado del sidebar
  };

  const handleSubMenuToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderSubMenu = (children, index) => {
    return (
      <SubMenu open={openIndex === index}>
        {children.map((child, childIndex) => (
          <StyledLink to={child.path} key={childIndex} title={child.title}>
            <SubMenuItem>
              <span>{child.title}</span>
            </SubMenuItem>
          </StyledLink>
        ))}
      </SubMenu>
    );
  };

  const renderMenuItem = (item, index) => {
    return (
      <ContenedorItem
        key={index}
        className={openIndex === index ? "open" : ""}
        title={item.title}
      >
        <StyledLink
          to={item.path || "#"}
          onClick={() => handleSubMenuToggle(index)}
          key={index}
        >
          <SidebarItem
            open={open}
            className={openIndex === index ? "open" : ""}
          >
            <span>
              {item.icon && <i style={{fontSize:"20px"}} className={item.icon}></i>}
              {open && item.title}
            </span>
            {item.children && <i style={{fontSize:"20px"}} className="bi-chevron-down toggle-btn"></i>}
          </SidebarItem>
        </StyledLink>

        {item.children && renderSubMenu(item.children, index)}
      </ContenedorItem>
    );
  };

  return (
    <SidebarContainer open={open}>
      <ToggleButton onClick={handleToggle} open={open}>
        <i style={{fontSize:"20px"}} className={!open ? "bi-list" : "bi-x-lg"}></i>
      </ToggleButton>

      {jsonData(open).map((item, index) => renderMenuItem(item, index))}
    </SidebarContainer>
  );
};
