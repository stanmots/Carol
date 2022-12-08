/*
 * File: node-cmd.js
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { argv, env } from "node:process"
import { spawn } from "node:child_process"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChildProcess } from "node:child_process"

const CACHE_PARAMS = ["--cache", "--cache-strategy", "metadata"]
const GIT_DIFF = ["git", "diff", "--name-only"]
const PRETTIER_CMD = ["prettier", "--write", "--ignore-unknown"]
const ESLINT_CMD = ["eslint", "--fix"]
const CSPELL_CMD = [
    "cspell",
    "lint",
    "--exclude",
    ".{git,cspell}",
    "--gitignore",
    "--dot",
]

/**
 * Alternative version of `NPM` scripts.
 *
 * One array element represents a shell command with args.
 * Multiple array elements are piped in the array's order.
 *
 * @type {Object.<string, string[][]>}
 * */
const scripts = {
    prettier: [PRETTIER_CMD],
    "prettier-cached": [[...PRETTIER_CMD, ...CACHE_PARAMS]],
    eslint: [ESLINT_CMD],
    "eslint-cached": [[...ESLINT_CMD, ...CACHE_PARAMS]],
    cspell: [CSPELL_CMD],
    "cspell-cached": [[...CSPELL_CMD, ...CACHE_PARAMS]],
    "cspell-changed": [[...GIT_DIFF], [...CSPELL_CMD, "--file-list", "stdin"]],
}

/** @type {Object.<string, string>} */
const NODE_ENV = {
    NODE_OPTIONS: "--experimental-vm-modules",
}

/** @type {Object.<string, NODE_ENV>} */
const ENV_CONFIG = {
    jest: NODE_ENV,
}

/**
 * The passed-in command.
 *
 * The first two command line args are `node` and the filename.
 * The third arg is the actual command to launch in a subprocess.
 *
 * @type {string}
 */
const command = argv[2]
const args = argv.slice(3)

/** @type {string[][]} */
const customScripts = scripts[command] ?? [[command]]

// Push the passed-in arguments to the last piped command
customScripts.at(-1).push(...args)

/** @type {ChildProcess} */
let previousProcess

for (let i = 0; i < customScripts.length; ++i) {
    const currentScript = customScripts[i]

    /** @type {string} */
    const customCommand = currentScript.shift()
    const customArgs = currentScript
    const commandEnv = ENV_CONFIG[customCommand]
    const customEnv = { ...env, ...commandEnv }

    // `inherit` connects child and parent processes preserving formatting
    // `pipe` is set to redirect `stdout` to `stdin` between consecutive proceses
    const customStdin = previousProcess?.stdout ?? "inherit"
    const customStdout = i === customScripts.length - 1 ? "inherit" : "pipe"
    const customStderr = "inherit"

    const customStdio = [customStdin, customStdout, customStderr]

    previousProcess = spawn(customCommand, customArgs, {
        env: customEnv,
        stdio: customStdio,
    })
}
