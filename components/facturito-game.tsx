"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

// Game types
type GameState = "ready" | "playing" | "gameOver" | "paused"
type Obstacle = {
  x: number
  y: number
  width: number
  height: number
  type: "calendar" | "hourglass" | "document"
  passed: boolean
}

type Message = {
  text: string
  x: number
  y: number
  opacity: number
  points?: number
}

// Game constants
const GROUND_HEIGHT = 20
const PLAYER_WIDTH = 60
const PLAYER_HEIGHT = 70
const GRAVITY = 0.6
const JUMP_FORCE = -12
const OBSTACLE_SPEED = 5
const OBSTACLE_FREQUENCY = 1500 // ms
const GAME_SPEED_INCREASE = 0.0001

// Game messages
const POSITIVE_MESSAGES = ["+10 PTS", "+5 PTS", "+15 PTS", "+10 PTS", "+20 PTS"]
const GAME_OVER_MESSAGES = ["GAME OVER", "TRY AGAIN", "DEADLINE MISSED", "ERROR DETECTED", "FACTURITO DOWN"]

export default function FacturitoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>("ready")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOverMessage, setGameOverMessage] = useState("")
  const [facturitoImageLoaded, setFacturitoImageLoaded] = useState(false)
  const facturitoImageRef = useRef<HTMLImageElement | null>(null)

  // Obstacle images
  const [obstacleImagesLoaded, setObstacleImagesLoaded] = useState({
    hourglass: false,
    calendar: false,
    document: false,
  })
  const obstacleImagesRef = useRef<{
    hourglass: HTMLImageElement | null
    calendar: HTMLImageElement | null
    document: HTMLImageElement | null
  }>({
    hourglass: null,
    calendar: null,
    document: null,
  })

  // Game state reference
  const gameStateRef = useRef({
    player: {
      x: 50,
      y: 0,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      velocityY: 0,
      isJumping: false,
    },
    obstacles: [] as Obstacle[],
    messages: [] as Message[],
    ground: {
      y: 0,
      height: GROUND_HEIGHT,
    },
    gameSpeed: 1,
    lastObstacleTime: 0,
    animationFrame: 0,
    score: 0,
    isActive: false,
  })

  // Load Facturito image
  useEffect(() => {
    // Create a new image element
    const img = new Image()

    // Set up load event handler
    img.onload = () => {
      console.log("Facturito image loaded successfully!")
      facturitoImageRef.current = img
      setFacturitoImageLoaded(true)
    }

    // Set up error handler
    img.onerror = (e) => {
      console.error("Error loading Facturito image:", e)
      // We won't create any fallback pixel art as requested
      // Just log the error and continue without an image
    }

    // Set crossOrigin to anonymous to avoid CORS issues
    img.crossOrigin = "anonymous"

    // Load from the provided URL
    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%203%20may%202025%2C%2008_43_23%20p.m.-G4ruzQDAIvN22p2ELkqqPqs66A6496.png"
  }, [])

  // Load obstacle images
  useEffect(() => {
    // Function to load an image with proper error handling
    const loadImage = (url: string, type: "hourglass" | "calendar" | "document") => {
      const img = new Image()

      img.onload = () => {
        console.log(`${type} image loaded successfully!`)
        obstacleImagesRef.current[type] = img
        setObstacleImagesLoaded((prev) => ({
          ...prev,
          [type]: true,
        }))
      }

      img.onerror = (e) => {
        console.error(`Error loading ${type} image:`, e)
        // Try loading from local path as fallback
        const fallbackImg = new Image()
        fallbackImg.onload = () => {
          console.log(`${type} fallback image loaded successfully!`)
          obstacleImagesRef.current[type] = fallbackImg
          setObstacleImagesLoaded((prev) => ({
            ...prev,
            [type]: true,
          }))
        }
        fallbackImg.onerror = () => {
          console.error(`Failed to load ${type} fallback image`)
        }
        fallbackImg.crossOrigin = "anonymous"
        fallbackImg.src = `/images/game/obstacle-${type}.png`
      }

      img.crossOrigin = "anonymous"
      img.src = url
    }

    // Load all obstacle images
    loadImage(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hourglass_sprite_1bit-rlWibn8q95nUK76jmmEGWnCQfEWvto.png",
      "hourglass",
    )
    loadImage(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%203%20may%202025%2C%2008_22_40%20p.m.-lxEPSu8flR2zlXSpCFtupM32imgJ8o.png",
      "calendar",
    )
    loadImage(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%203%20may%202025%2C%2008_29_38%20p.m.-EBaJcFxZWIPB4v1U3eEzWGzTtYU23n.png",
      "document",
    )

    // Set a timeout to ensure we don't wait forever if images fail to load
    const timeoutId = setTimeout(() => {
      setObstacleImagesLoaded({
        hourglass: true,
        calendar: true,
        document: true,
      })
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [])

  // Initialize the game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Adjust canvas size
    const resizeCanvas = () => {
      canvas.width = Math.min(800, window.innerWidth - 40)
      canvas.height = 200
      gameStateRef.current.ground.y = canvas.height - GROUND_HEIGHT
      gameStateRef.current.player.y = gameStateRef.current.ground.y - PLAYER_HEIGHT
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Draw ready screen
    const drawReadyScreen = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ground
      drawGround(ctx, canvas)

      // Draw player
      drawPlayer(ctx, gameStateRef.current.player.x, gameStateRef.current.player.y)

      // Start text
      ctx.fillStyle = "#000000"
      ctx.font = "bold 16px monospace"
      ctx.textAlign = "center"
      ctx.fillText("PRESS SPACE TO START", canvas.width / 2, canvas.height / 2)
    }

    // Main game loop
    const gameLoop = (timestamp: number) => {
      if (!gameStateRef.current.isActive) return

      updateGameState(timestamp)
      drawGame()

      gameStateRef.current.animationFrame = requestAnimationFrame(gameLoop)
    }

    // Start game
    const startGame = () => {
      if (gameState !== "ready" && gameState !== "gameOver" && gameState !== "paused") return

      // If resuming from pause, just continue
      if (gameState === "paused") {
        setGameState("playing")
        gameStateRef.current.isActive = true
        requestAnimationFrame(gameLoop)
        return
      }

      // Reset game state
      const canvas = canvasRef.current
      if (!canvas) return

      gameStateRef.current = {
        player: {
          x: 50,
          y: canvas.height - GROUND_HEIGHT - PLAYER_HEIGHT,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          velocityY: 0,
          isJumping: false,
        },
        obstacles: [],
        messages: [],
        ground: {
          y: canvas.height - GROUND_HEIGHT,
          height: GROUND_HEIGHT,
        },
        gameSpeed: 1,
        lastObstacleTime: performance.now(),
        animationFrame: 0,
        score: 0,
        isActive: true,
      }

      setScore(0)
      setGameState("playing")
      requestAnimationFrame(gameLoop)
    }

    // Pause game
    const pauseGame = () => {
      if (gameState !== "playing") return

      gameStateRef.current.isActive = false
      cancelAnimationFrame(gameStateRef.current.animationFrame)
      setGameState("paused")

      // Draw pause screen
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Semi-transparent overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Pause text
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 24px monospace"
      ctx.textAlign = "center"
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2)
      ctx.font = "16px monospace"
      ctx.fillText("Press SPACE to continue", canvas.width / 2, canvas.height / 2 + 30)
    }

    // End game
    const endGame = () => {
      gameStateRef.current.isActive = false
      cancelAnimationFrame(gameStateRef.current.animationFrame)

      // Update high score
      if (gameStateRef.current.score > highScore) {
        setHighScore(gameStateRef.current.score)

        // Save high score to localStorage for persistence
        try {
          localStorage.setItem("facturitoHighScore", gameStateRef.current.score.toString())
        } catch (e) {
          console.warn("Could not save high score to localStorage")
        }
      }

      // Show random game over message
      const randomMessage = GAME_OVER_MESSAGES[Math.floor(Math.random() * GAME_OVER_MESSAGES.length)]
      setGameOverMessage(randomMessage)

      setGameState("gameOver")
    }

    // Handle jump
    const handleJump = () => {
      console.log("Jump triggered", gameState)
      if (gameState === "ready" || gameState === "gameOver") {
        startGame()
        return
      }

      if (gameState === "paused") {
        startGame() // Resume game
        return
      }

      if (gameState === "playing" && !gameStateRef.current.player.isJumping) {
        gameStateRef.current.player.isJumping = true
        gameStateRef.current.player.velocityY = JUMP_FORCE
      }
    }

    // Event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for game controls
      if (["Space", "ArrowUp", "KeyW", "KeyP", "Escape"].includes(e.code)) {
        e.preventDefault()
      }

      // Jump controls
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        handleJump()
      }
      // Pause controls
      else if (e.code === "KeyP" || e.code === "Escape") {
        if (gameState === "playing") {
          pauseGame()
        } else if (gameState === "paused") {
          startGame() // Resume game
        }
      }
    }

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault()
      handleJump()
    }

    const handleClick = () => {
      handleJump()
    }

    // Load high score from localStorage if available
    try {
      const savedHighScore = localStorage.getItem("facturitoHighScore")
      if (savedHighScore) {
        setHighScore(Number.parseInt(savedHighScore, 10))
      }
    } catch (e) {
      console.warn("Could not load high score from localStorage")
    }

    window.addEventListener("keydown", handleKeyDown)
    canvas.addEventListener("touchstart", handleTouch)
    canvas.addEventListener("click", handleClick)

    // Draw initial screen
    drawReadyScreen()

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("touchstart", handleTouch)
      canvas.removeEventListener("click", handleClick)
      cancelAnimationFrame(gameStateRef.current.animationFrame)
    }
  }, [gameState, highScore, facturitoImageLoaded, obstacleImagesLoaded])

  // Draw player function
  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    if (facturitoImageRef.current && facturitoImageLoaded) {
      try {
        ctx.drawImage(facturitoImageRef.current, x, y, PLAYER_WIDTH, PLAYER_HEIGHT)
      } catch (error) {
        console.error("Error drawing player image:", error)
        ctx.fillStyle = "#000000"
        ctx.fillRect(x, y, PLAYER_WIDTH, PLAYER_HEIGHT)
      }
    } else {
      ctx.fillStyle = "#000000"
      ctx.fillRect(x, y, PLAYER_WIDTH, PLAYER_HEIGHT)
    }
  }

  // Draw ground
  const drawGround = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, gameStateRef.current.ground.y)
    ctx.lineTo(canvas.width, gameStateRef.current.ground.y)
    ctx.stroke()

    ctx.fillStyle = "#000000"
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.fillRect(i, gameStateRef.current.ground.y + 5, 2, 2)
      ctx.fillRect(i + 10, gameStateRef.current.ground.y + 10, 2, 2)
    }
  }

  // Create obstacle
  const createObstacle = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const types = ["calendar", "hourglass", "document"]
    const type = types[Math.floor(Math.random() * types.length)] as "calendar" | "hourglass" | "document"

    let width, height

    switch (type) {
      case "calendar":
        width = 50
        height = 50
        break
      case "hourglass":
        width = 40
        height = 60
        break
      case "document":
        width = 45
        height = 55
        break
    }

    const obstacle: Obstacle = {
      x: canvas.width,
      y: gameStateRef.current.ground.y - height,
      width,
      height,
      type,
      passed: false,
    }

    gameStateRef.current.obstacles.push(obstacle)
  }

  // Draw obstacles
  const drawObstacles = (ctx: CanvasRenderingContext2D) => {
    gameStateRef.current.obstacles.forEach((obstacle) => {
      const obstacleImage = obstacleImagesRef.current[obstacle.type]
      const isImageLoaded = obstacleImagesLoaded[obstacle.type]

      if (obstacleImage && isImageLoaded) {
        try {
          ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
          return
        } catch (error) {
          console.error(`Error drawing ${obstacle.type} image:`, error)
        }
      }

      // Fallback drawing
      switch (obstacle.type) {
        case "calendar":
          ctx.fillStyle = "#EF4444"
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 10)
          ctx.fillStyle = "#000000"

          const cellWidth = (obstacle.width - 10) / 5
          const cellHeight = (obstacle.height - 15) / 4

          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
              ctx.fillRect(
                obstacle.x + 5 + j * cellWidth,
                obstacle.y + 15 + i * cellHeight,
                cellWidth - 1,
                cellHeight - 1,
              )
            }
          }
          break

        case "hourglass":
          ctx.fillStyle = "#F59E0B"
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height / 6)
          ctx.beginPath()
          ctx.moveTo(obstacle.x, obstacle.y + obstacle.height / 6)
          ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height / 6)
          ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2)
          ctx.fill()
          ctx.beginPath()
          ctx.moveTo(obstacle.x, obstacle.y + obstacle.height - obstacle.height / 6)
          ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height - obstacle.height / 6)
          ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2)
          ctx.fill()
          ctx.fillRect(
            obstacle.x,
            obstacle.y + obstacle.height - obstacle.height / 6,
            obstacle.width,
            obstacle.height / 6,
          )
          break

        case "document":
          ctx.fillStyle = "#10B981"
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
          ctx.fillStyle = "#FFFFFF"
          ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 10)
          ctx.strokeStyle = "#000000"
          ctx.lineWidth = 4
          ctx.beginPath()
          ctx.moveTo(obstacle.x + 10, obstacle.y + 10)
          ctx.lineTo(obstacle.x + obstacle.width - 10, obstacle.y + obstacle.height - 10)
          ctx.moveTo(obstacle.x + obstacle.width - 10, obstacle.y + 10)
          ctx.lineTo(obstacle.x + 10, obstacle.y + obstacle.height - 10)
          ctx.stroke()
          break
      }
    })
  }

  // Draw messages
  const drawMessages = (ctx: CanvasRenderingContext2D) => {
    gameStateRef.current.messages = gameStateRef.current.messages.filter((msg) => msg.opacity > 0)

    gameStateRef.current.messages.forEach((message) => {
      ctx.fillStyle = `rgba(0, 0, 0, ${message.opacity})`
      ctx.font = "bold 14px monospace"
      ctx.textAlign = "center"
      ctx.fillText(message.text, message.x, message.y)

      message.y -= 0.5
      message.opacity -= 0.01
    })
  }

  // Show positive message
  const showPositiveMessage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const message = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
    const points = Math.floor(Math.random() * 3 + 1) * 5

    gameStateRef.current.messages.push({
      text: message,
      x: canvas.width / 2,
      y: canvas.height / 2,
      opacity: 1,
      points,
    })

    gameStateRef.current.score += points
    setScore(gameStateRef.current.score)
  }

  // Check collisions
  const checkCollisions = () => {
    const player = gameStateRef.current.player

    for (const obstacle of gameStateRef.current.obstacles) {
      if (!obstacle.passed && player.x > obstacle.x + obstacle.width) {
        obstacle.passed = true
        if (Math.random() > 0.7) {
          showPositiveMessage()
        }
      }

      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        return true
      }
    }

    return false
  }

  // Update game state
  const updateGameState = (timestamp: number) => {
    const gameState = gameStateRef.current
    const canvas = canvasRef.current
    if (!canvas) return

    if (gameState.player.isJumping) {
      gameState.player.velocityY += GRAVITY
      gameState.player.y += gameState.player.velocityY

      if (gameState.player.y >= gameState.ground.y - PLAYER_HEIGHT) {
        gameState.player.y = gameState.ground.y - PLAYER_HEIGHT
        gameState.player.isJumping = false
        gameState.player.velocityY = 0
      }
    }

    if (timestamp - gameState.lastObstacleTime > OBSTACLE_FREQUENCY / gameState.gameSpeed) {
      createObstacle()
      gameState.lastObstacleTime = timestamp
    }

    gameState.obstacles = gameState.obstacles.filter((obstacle) => {
      obstacle.x -= OBSTACLE_SPEED * gameState.gameSpeed
      return obstacle.x > -obstacle.width
    })

    gameState.gameSpeed += GAME_SPEED_INCREASE

    if (checkCollisions()) {
      endGame()
    }
  }

  // Draw game
  const drawGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawGround(ctx, canvas)
    drawObstacles(ctx)
    drawPlayer(ctx, gameStateRef.current.player.x, gameStateRef.current.player.y)
    drawMessages(ctx)

    ctx.fillStyle = "#000000"
    ctx.font = "bold 16px monospace"
    ctx.textAlign = "right"
    ctx.fillText(
      `HI ${highScore.toString().padStart(5, "0")} ${gameStateRef.current.score.toString().padStart(5, "0")}`,
      canvas.width - 20,
      30,
    )
  }

  // Game loop
  const gameLoop = (timestamp: number) => {
    if (!gameStateRef.current.isActive) return

    updateGameState(timestamp)
    drawGame()

    gameStateRef.current.animationFrame = requestAnimationFrame(gameLoop)
  }

  // End game
  const endGame = () => {
    gameStateRef.current.isActive = false
    cancelAnimationFrame(gameStateRef.current.animationFrame)

    if (gameStateRef.current.score > highScore) {
      setHighScore(gameStateRef.current.score)
      try {
        localStorage.setItem("facturitoHighScore", gameStateRef.current.score.toString())
      } catch (e) {
        console.warn("Could not save high score to localStorage")
      }
    }

    const randomMessage = GAME_OVER_MESSAGES[Math.floor(Math.random() * GAME_OVER_MESSAGES.length)]
    setGameOverMessage(randomMessage)

    setGameState("gameOver")
  }

  const handleJump = () => {
    if (gameState === "ready" || gameState === "gameOver") {
      startGame()
      return
    }

    if (gameState === "paused") {
      startGame() // Resume game
      return
    }

    if (gameState === "playing" && !gameStateRef.current.player.isJumping) {
      gameStateRef.current.player.isJumping = true
      gameStateRef.current.player.velocityY = JUMP_FORCE
    }
  }

  const pauseGame = () => {
    if (gameState !== "playing") return

    gameStateRef.current.isActive = false
    cancelAnimationFrame(gameStateRef.current.animationFrame)
    setGameState("paused")

    // Draw pause screen
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Pause text
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 24px monospace"
    ctx.textAlign = "center"
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2)
    ctx.font = "16px monospace"
    ctx.fillText("Press SPACE to continue", canvas.width / 2, canvas.height / 2 + 30)
  }

  const startGame = () => {
    if (gameState !== "ready" && gameState !== "gameOver" && gameState !== "paused") return

    // If resuming from pause, just continue
    if (gameState === "paused") {
      setGameState("playing")
      gameStateRef.current.isActive = true
      requestAnimationFrame(gameLoop)
      return
    }

    // Reset game state
    const canvas = canvasRef.current
    if (!canvas) return

    gameStateRef.current = {
      player: {
        x: 50,
        y: canvas.height - GROUND_HEIGHT - PLAYER_HEIGHT,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        velocityY: 0,
        isJumping: false,
      },
      obstacles: [],
      messages: [],
      ground: {
        y: canvas.height - GROUND_HEIGHT,
        height: GROUND_HEIGHT,
      },
      gameSpeed: 1,
      lastObstacleTime: performance.now(),
      animationFrame: 0,
      score: 0,
      isActive: true,
    }

    setScore(0)
    setGameState("playing")
    requestAnimationFrame(gameLoop)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative border-2 border-black rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} className="bg-white" width="800" height="200" style={{ touchAction: "none" }} />

        {/* Virtual buttons for mobile */}
        <div className="absolute bottom-4 left-4 md:hidden">
          <button
            className="w-16 h-16 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center text-xs font-bold text-black shadow-lg active:scale-95 transition-transform"
            onTouchStart={(e) => {
              e.preventDefault()
              handleJump()
            }}
          >
            {gameState === "paused" ? "PLAY" : "JUMP"}
          </button>
        </div>

        {/* Pause button for mobile */}
        <div className="absolute bottom-4 right-4 md:hidden">
          <button
            className="w-16 h-16 bg-gray-300 rounded-full border-4 border-gray-400 flex items-center justify-center text-xs font-bold text-black shadow-lg active:scale-95 transition-transform"
            onClick={() => {
              if (gameState === "playing") {
                pauseGame()
              } else if (gameState === "paused") {
                startGame() // Resume game
              }
            }}
          >
            {gameState === "playing" ? "PAUSE" : "PLAY"}
          </button>
        </div>

        {gameState === "gameOver" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs">
              <h3 className="text-xl font-bold text-black mb-2">GAME OVER</h3>
              <p className="text-black font-medium mb-4">{gameOverMessage}</p>
              <p className="text-black mb-1">SCORE: {score}</p>
              <p className="text-black mb-4">HI-SCORE: {highScore}</p>
              <Button onClick={() => setGameState("ready")} className="bg-black hover:bg-gray-800 text-white">
                RESTART
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>SPACE / ARROW UP to jump | P to pause | Touch screen to play</p>
      </div>
    </div>
  )
}
