import { useEffect, useState } from "react"
import "./App.css"
import persoImage from "./assets/image.png"
import whaleImage from "./assets/whale2.png"

function App() {
  const [decor, setDecor] = useState<{ id: number; x: number; y: number; type: string }[]>([])
  const [isLoveActive, setIsLoveActive] = useState(false)
  const [isMagic, setIsMagic] = useState(false) // monde magique ou normal

  // Génération des décorations
  useEffect(() => {
    if (!isLoveActive) return

    const interval = setInterval(() => {
      const items = isMagic ? ["🐳", "✨", "💖"] : ["💖", "✨", "🌸", "💕"]

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
  }, [isLoveActive, isMagic])

  // Animation de montée
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

  // Stop l’animation si love désactivé
  useEffect(() => {
    if (!isLoveActive) setDecor([])
  }, [isLoveActive])

  // Basculer entre monde normal et monde magique
  const handleMagicClick = () => {
    setIsMagic((prev) => !prev) // toggle
  }

  return (
    <div className="app">
      {/* Titre */}
      <h1 className="title">
        {isMagic
          ? "Bienvenue dans le monde enchanté de Docker ✨🐳"
          : "Bienvenue dans le monde enchanté de Choquet ✨🎀"}
      </h1>

      {/* Mascotte ou baleine */}
      <div className="mascot">
        <img
          src={isMagic ? whaleImage : persoImage}
          alt={isMagic ? "Baleine magique" : "Mascotte mignonne"}
          className={isMagic ? "whale" : ""}
        />
      </div>

      {/* Sous-texte */}
      <p className="subtitle">
        {isMagic
          ? "Explore les merveilles de Docker avec notre baleine magique ✨"
          : "Plonge dans un monde rempli d’amour, de paillettes et de douceurs 🍓"}
      </p>

      {/* Boutons */}
      <div className="buttons">
        <button onClick={() => setIsLoveActive((prev) => !prev)}>
          {isLoveActive ? "💔 Arrêter l'amour" : "💌 Envoyer de l'amour"}
        </button>
        <button onClick={handleMagicClick}>
          🌸 Lancer le sort magique
        </button>
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
