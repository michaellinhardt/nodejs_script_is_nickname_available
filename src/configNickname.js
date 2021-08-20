export default {
    // Valid lengh for a sound string
    soundLengthMin: 1,
    soundLengthMax: 3,

    // Valid length for a nickname generated string
    nicknameLengthMin: 4,
    nicknameLengthMax: 5,
    
    // Number of recursion authorized while generating nickname
    // NB: 3 is long, 4 very.. long
    // NB: also depends on the size of the seed arrays
    maxNicknameLevels: 3,
    
    // Set true to allow 2 times or more the same char in a nickname (ex. 'Pala')
    allowDoubleLetter: true,
    
    // Use the array "dontStartWith" or "dontEndWith" to invalidate some nickname
    useDontStartWith: false,
    useDontEndWith: false,

    // When true, nickname need to contain a substring from exclusiveList
    useExclusiveList: false,

    // When true, nickname who contain a substring from blackListArr will be ignore
    useBlackListArr: false,

    // Require to have a consonnant or vowel every X character
    // Ex. vowelEvery 2 will invalidate helllo or khloe, because of 3 consonant in a row
    // Ex. consonantEvery 2 will invalidate hellooo or koual
    consonantEvery: 2,
    vowelEvery: 2,

    // List of vowel (better to not change)
    vowel: ['a', 'e', 'i', 'o', 'u', 'y'],

    // Nickname will never start with this if 'useDontStartWith' is true
    dontStartWith: [
        // Composition of sound I dont like as a nickname starter
        'ba', 'ca', 'da', 'fa', 'ga', 'ha', 'ja', 'ka', 'la', 'ma', 'na', 'pa', 'qa', 'ra', 'sa', 'ta', 'va', 'wa', 'xa', 'za',
        'by', 'cy', 'dy', 'fy', 'gy', 'hy', 'jy', 'ky', 'ly', 'my', 'ny', 'py', 'qy', 'ry', 'sy', 'ty', 'vy', 'wy', 'xy', 'zy',
        'bi', 'ci', 'di', 'fi', 'gi', 'hi', 'ji', 'ki', 'li', 'mi', 'ni', 'pi', 'qi', 'ri', 'si', 'ti', 'vi', 'wi', 'xi', 'zi',
    ],

    // Nickname will never end with this if 'useDontEndWith' is true
    dontEndWith: [
        'a', 'i', 'y', 'w',
    ],

    // Only nickname who have a substring from this array will be valid
    // NB: it is not string but array, it is posssible to specify 2 or more string
    // That way it will necessaray to match with all string
    // Example ['nu', 'la'] will validate 'nutela' but not 'nute' or 'tela'
    exclusiveList: [
        ['mik'], ['cra'], ['tak'], ['wek'], ['war'],
        ['dix'], ['dax'], ['tri'], ['tra'], ['kro'],
        ['kra'],
    ],

    // Nickname who have a substring from this array will be ignored
    // NB: it is not string but array, it is posssible to specify 2 or more string
    // That way it will necessaray to match with all string
    // Example ['nu', 'la'] will ignore 'nutela' but not 'nute' or 'tela'
    blackListArr: [
        // double vowel
        ['ae'], ['ai'], ['ao'], ['au'], ['ay'],
        ['ea'], ['ei'], ['eo'], ['eu'], ['ey'],
        ['ia'], ['ie'], ['io'], ['iu'], ['iy'],
        ['oa'], ['oe'], ['oi'], ['ou'], ['oy'],
        ['ua'], ['ue'], ['ui'], ['uo'], ['uy'],
        ['ya'], ['ye'], ['yi'], ['yo'], ['yu'],
        ['ou'], ['ei'], ['ai'], ['oiw'], ['oe'],
        ['ae'],
    
        // vowel + consonant or special one
        ['i', 'y'],
        ['oin'], ['eq'], ['fi'], ['ya'], ['fy'],
        ['py'], ['pi'], ['li'], ['ly'], ['ik'],
        ['udi'], ['ny'], ['ni'], ['my'], ['mi'],
    
        // double consonant
        ['kr', 'xt'],
        ['kfa'], ['akb'], ['kj'], ['kg'], ['kd'],
        ['nm'], ['mn'], ['xt'], ['xn'], ['xs'],
        ['xm'], ['rm'], ['rn'], ['kb'], ['kc'],
        ['xr'], ['xw'], ['xb'], ['rc'], ['ynx'],
        ['yk'], ['rx'], ['kp'], ['mx'], ['yx'],
        ['kmax'], ['gbw'], ['cr', 'xh'],
    ],

    // To compose a nickname, it first compose sound using a string from left array
    // THen concat this string with a string from right array
    // After creating all sound possible, it will match them together to create
    // Nickname
    left: [
        'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k',
        'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
        'v', 'w', 'x', 'z',
        'br', 'bl', 'cl', 'ch', 'dr', 'dj', 'dh',
        'fr', 'fl', 'fh', 'kr', 'kw', 'kl', 'mh',
        'nh', 'pr', 'pl', 'qr', 'ql', 'rh', 'sl',
        'sc', 'sk', 'sm', 'sn', 'tr', 'th', 'vr',
        'vl', 'vh', 'wr', 'wl', 'wh', 'zr', 'zl',
        'zh',
        '',
        // 'al', 'el', 'il', 'ol', 'ul', 'yl',
        // 'am', 'em', 'im', 'om', 'um', 'ym',
        // 'an', 'en', 'in', 'on', 'un', 'yn',
        // 'ar', 'er', 'ir', 'or', 'ur', 'yr',
        // 'ar', 'er', 'ir', 'or', 'ur', 'yr',
    ],

    // See comentary for left property..
    right: [
        '',
        'a', 'e', 'i', 'o', 'u', 'y',
        'al', 'el', 'il', 'ol', 'ul', 'yl',
        'am', 'em', 'im', 'om', 'um', 'ym',
        'an', 'en', 'in', 'on', 'un', 'yn',
        'ar', 'er', 'ir', 'or', 'ur', 'yr',
        'ar', 'er', 'ir', 'or', 'ur', 'yr',
    ],
}