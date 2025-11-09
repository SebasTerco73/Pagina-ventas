import { useEffect, useState } from "react";
import "./ScrollButtons.css";

export const ScrollButtons = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setShowUp(scrollY > 300);
      setShowDown(scrollY + windowHeight < fullHeight - 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // chequear al cargar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <div className="scroll-buttons">
      {showUp && (
        <button className="scroll-btn up" onClick={scrollToTop} title="Subir">
          ⬆
        </button>
      )}
      {showDown && (
        <button className="scroll-btn down" onClick={scrollToBottom} title="Bajar">
          ⬇
        </button>
      )}
    </div>
  );
};