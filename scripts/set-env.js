import { argv, env } from "node:process"
import { spawn } from "node:child_process"

// Set custom env variables here
const extenv = {
    NODE_OPTIONS: "--experimental-vm-modules",
}

// The first two command line args are "node" and "set-env.js"
// The third arg is the actual command to launch in a subprocess
const command = argv[2]
const args = argv.slice(3)
spawn(command, args, {
    env: { ...env, ...extenv },
    stdio: "inherit",
})
