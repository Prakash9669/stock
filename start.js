const { spawn } = require("child_process")
const path = require("path")

// Start the backend
const backend = spawn("node", ["server.js"], {
  cwd: path.join(__dirname, "stockTree"),
  stdio: "inherit",
})

// Start the frontend
const frontend = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "socket-chat"),
  stdio: "inherit",
})

// Handle process termination
process.on("SIGINT", () => {
  console.log("Stopping all processes...")
  backend.kill()
  frontend.kill()
  process.exit(0)
})

console.log("Running both applications. Press Ctrl+C to stop.")

// Log any errors
backend.on("error", (error) => console.error("Backend error:", error))
frontend.on("error", (error) => console.error("Frontend error:", error))

// Log when processes exit
backend.on("exit", (code) => console.log(`Backend exited with code ${code}`))
frontend.on("exit", (code) => console.log(`Frontend exited with code ${code}`))
