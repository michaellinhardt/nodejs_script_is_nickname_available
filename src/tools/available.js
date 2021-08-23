/**
 * Entry point, run an infinite loop that will execute the tester again and again
 * This script have to be feed by the client script.
 * The Client script generate nickname that will be use in this script,
 * otherwize it will be an empty loop, waiting for nickname.
 */

// Import Testers and Helpers files from related folders
const { importDefaultByFilename } = require('../helpers/import.helper').default
const Helpers = importDefaultByFilename('../helpers', '.helper')

// Start infinite loop with a callback function
Helpers.loop.run(Helpers.result.display, 5000)
