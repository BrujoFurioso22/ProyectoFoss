import styled, { keyframes, css } from "styled-components";
const ContainerPadre = styled.div`
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  transition: transform 0.6s ease-in-out;
`;

const SignInContainer = styled(FormContainer)`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  transform: ${({ theme }) =>
    theme.rightPanelActive ? "translateX(100%)" : "translateX(0)"};
`;

const SignUpContainer = styled(FormContainer)`
  opacity: ${({ theme }) => (theme.rightPanelActive ? 1 : 0)};
  z-index: ${({ theme }) => (theme.rightPanelActive ? 5 : 1)};
  animation: ${({ theme }) =>
    theme.rightPanelActive &&
    css`
      ${show} 0.6s
    `};
`;

const show = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

const OverlayContainer = styled.div`
  display: flex;
  width: 50%;
`;

const Overlay = styled.div`
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200%;
  transition: transform 0.6s ease-in-out;
  transform: ${({ theme }) =>
    theme.rightPanelActive ? "translateX(-100%)" : "translateX(0)"};
`;

const OverlayPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
  ${({ theme }) =>
    theme.rightPanelActive &&
    css`
      transform: translateX(20%);
    `}
`;

export {
  Container,
  ContainerPadre,
  FormContainer,
  Overlay,
  OverlayContainer,
  OverlayPanel,
  SignInContainer,
  SignUpContainer,
};
