import { useEffect, useState } from "react"
import "./App.css"
import persoImage from "./assets/image.png"
import darkMascot from "./assets/leGrand.png"

function App() {
  const [decor, setDecor] = useState<{ id: number; x: number; y: number; type: string }[]>([])
  const [isLoveActive, setIsLoveActive] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Génération des décorations
  useEffect(() => {
    if (!isLoveActive) return

    const interval = setInterval(() => {
      const items = isDark
        ? ["sudo", "bash", "🐧", "🚬", "🌙"]
        : ["💖", "🌸", "💕", "🐳"]

      setDecor((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          type: items[Math.floor(Math.random() * items.length)]
        }
      ])
    }, 300)

    return () => clearInterval(interval)
  }, [isLoveActive, isDark])

  useEffect(() => {
    if (!isLoveActive) return

    const timer = setInterval(() => {
      setDecor((prev) =>
        prev
          .map((d) => ({ ...d, y: d.y - 2 }))
          .filter((d) => d.y > -50)
      )
    }, 30)

    return () => clearInterval(timer)
  }, [isLoveActive])

  useEffect(() => {
    if (!isLoveActive) setDecor([])
  }, [isLoveActive])

  const handleMagicClick = () => {
    setIsDark(true)
    setIsLoveActive(true)
  }

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      {/* Titre */}
      <h1 className="title">
        {isDark
          ? "tux lovers 🐧"
          : "Docker & Debian Wonderland 🐳"}
      </h1>

      {/* Mascotte */}
      <div className="mascot">
        <img src={isDark ? darkMascot : persoImage} alt="Mascotte" className={isDark ? "whale" : ""}/>
      </div>

      {/* Sous-texte */}
      <p className="subtitle">
        {isDark
          ? "frissons, ténébres ... LINUX "
          : "Plonge dans Docker, Debian et plein de mignonneries 🐳✨"}
      </p>

      {/* Boutons */}
      <div className="buttons">
        <button
          onClick={() => {
            if (isDark && isLoveActive) {
              setIsDark(false)
              setIsLoveActive(false)
              setDecor([])
            } else {
              setIsLoveActive((prev) => !prev)
            }
          }}
        >
          {isLoveActive
            ? isDark
              ? "💀 Quitter le club"
              : "💔 Arrêter le fun"
            : isDark
            ? "☠️ Entrer dans Linux Night"
            : "💌 un peu de fun"}
        </button>
        {!isDark && (
          <button onClick={handleMagicClick}>🐧 linux club </button>
        )}
      </div>

      {/* Décor flottant */}
      {decor.map((d) => (
        <div
          key={d.id}
          className="floating"
          style={{ left: d.x, top: d.y }}
        >
          {d.type}
        </div>
      ))}
    </div>
  )
}

export default App
