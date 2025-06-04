const { spawn } = require("child_process")
const path = require("path")
const colors = ["green", "cyan", "yellow", "magenta"]

// Color formatting functions
const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`
const getColorCode = (name) => {
  switch (name) {
    case "green":
      return "32"
    case "cyan":
      return "36"
    case "yellow":
      return "33"
    case "magenta":
      return "35"
    default:
      return "0"
  }
}

// Define the servers to run
const servers = [
  {
    name: "BACKEND",
    command: "npx",
    args: ["nodemon", "server.js"],
    cwd: path.join(__dirname, "stockTree"),
    color: "green",
  },
  {
    name: "CHAT-SERVER",
    command: "npx",
    args: ["nodemon", "server.js"],
    cwd: path.join(__dirname, "socket-chat"),
    color: "cyan",
  },
]

// Start each server
const processes = servers.map((server) => {
  console.log(colorize(`Starting ${server.name}...`, getColorCode(server.color)))

  const proc = spawn(server.command, server.args, {
    cwd: server.cwd,
    stdio: ["ignore", "pipe", "pipe"],
  })

  // Handle stdout
  proc.stdout.on("data", (data) => {
    const lines = data.toString().trim().split("\n")
    lines.forEach((line) => {
      console.log(colorize(`[${server.name}]`, getColorCode(server.color)), line)
    })
  })

  // Handle stderr
  proc.stderr.on("data", (data) => {
    const lines = data.toString().trim().split("\n")
    lines.forEach((line) => {
      console.log(colorize(`[${server.name} ERROR]`, getColorCode(server.color)), line)
    })
  })

  proc.on("error", (error) => {
    console.error(colorize(`[${server.name}] Failed to start:`, getColorCode(server.color)), error)
  })

  proc.on("exit", (code) => {
    console.log(colorize(`[${server.name}] Process exited with code ${code}`, getColorCode(server.color)))
  })

  return proc
})

// Handle process termination
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...")
  processes.forEach((proc) => proc.kill())
  process.exit(0)
})

console.log(colorize("All servers started. Press Ctrl+C to stop.", "33"))
