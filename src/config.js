export default {
    // Number of retry to get the HTML content of a page (if fail, default: 3)
    retry: 3,
    sleepBeforeRetry: 300,

    // Interval between each loop (default 100)
    loopInterval: 2000,

    // Data files path ( relative entry point of script )
    dataPath: './src/assets/result.json',
    nicknamePath: './src/assets/nickname.json',
}