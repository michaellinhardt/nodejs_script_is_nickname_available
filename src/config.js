export default {
  // Those test will open a Chrome APP to navigate the website
  // They require to be inside a VM or to not use the PC while runing
  skipBrowsingTest: false,

  // Number of retry to get the HTML content of a page (if fail, default: 3)
  retry: 3,

  // Interval between each loop (default 100)
  loopInterval: 1000,

  // Ignore tester for X milisecs after fails
  ignoreTesterWhenFail: 30000,

  // Sleep after fail
  sleepAfterFail: 200,

  // Data files path ( relative entry point of script )
  dataPath: './src/assets/result.json',
  nicknamePath: './src/assets/nickname.json',

  // Nickname to test simultanously
  nicknameConcurence: 5,

  // Tester priority, first test those one, if fail, wont test the other
  testerPrio: [
    'instagram',
    'reddit',
  ],
}
