'use client';
import { useState, useRef, useEffect } from "react";

export default function TextWithButton({ text }) {
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Vérifie si le texte dépasse 5 lignes
    const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * 5; // 5 lignes
    if (el.scrollHeight > maxHeight) {
      setShowButton(true);
    }
  }, [text]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-gray-700 text-sm md:text-base mb-2 transition-all duration-300 ${!isExpanded ? 'line-clamp-5' : ''}`}
      >
        {text}
      </p>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-green-500 font-medium hover:underline"
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
}
