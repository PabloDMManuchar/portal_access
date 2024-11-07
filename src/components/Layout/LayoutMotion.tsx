import React, { useEffect } from "react";
import NavigationUsers from "../templates/NavigationUsers"; // Importa la navegación
import { Box } from "@chakra-ui/react";
import "./LayoutMotion.css";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutMotion: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const circles = document.querySelectorAll(".circle");
      circles.forEach((circle) => {
        const rect = circle.getBoundingClientRect();
        const circleX = rect.left + rect.width / 2;
        const circleY = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - circleX, event.clientY - circleY);
        const maxDistance = 400; // Distancia máxima para que los círculos persigan el mouse
        if (distance < maxDistance) {
          const deltaX = (event.clientX - circleX) * 0.5; // Aumenta el factor de multiplicación
          const deltaY = (event.clientY - circleY) * 0.5; // Aumenta el factor de multiplicación
          circle.setAttribute(
            "style",
            `transform: translate(${deltaX}px, ${deltaY}px); filter: blur(30px); opacity: 0.8;` // Ajusta el desenfoque y la opacidad
          );
        } else {
          circle.setAttribute(
            "style",
            `transform: translate(0, 0); filter: blur(30px); opacity: 0.8;` // Ajusta el desenfoque y la opacidad
          );
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Box className="flex-col relative overflow-auto layout-motion" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #444' }}>
      <div className="circle circle1" />
      <div className="circle circle2" />
      <div className="circle circle3" />
      <header className="p-8 w-full text-start flex z-10 justify-between">
        <img src="/manucharlogo.png" alt="Manuchar Logo" width="180" />
        <div className="flex justify-center items-center">
          <NavigationUsers />
        </div>
      </header>

      <main className="w-full flex flex-col md:flex-row justify-center flex-grow">
        {children}
      </main>

      <footer className="footer sticky bottom-4  flex justify-end p-4" >
        <img width={'80px'} src={"/Mit.png"} alt="LogoIT" className="imagen-footer" />
      </footer>
    </Box>
  );
};

export default LayoutMotion;