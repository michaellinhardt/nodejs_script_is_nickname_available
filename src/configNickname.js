/* eslint-disable max-len */
export default {
  // Interval between each loop (default 100)
  loopInterval: 100,

  // Valid lengh for a sound string
  soundLengthMin: 1,
  soundLengthMax: 4,

  // Valid length for a nickname generated string
  nicknameLengthMin: 5,
  nicknameLengthMax: 5,

  // Max nickname generated before rebuild all the seeds
  rebuildSeedEvery: 1,

  // Wait server for nickname if reach this number waiting to be send
  waitServerForNickname: 3,

  // Shuddle sound generation (0 = none)
  howManySuffleSounds: 4,

  // Silent mode (no terminal output)
  silentMode: true,

  // Silent mode but display nickname
  silentModeButNickname: true,

  // Debug display refresh every X ms
  debugRefreshRate: 50,

  // Sleep after found good nickname
  sleepAfterGood: 1,

  // Debug max nickname to display in terminal
  debugMaxNickOuput: 5 * 4,
  debugMaxNickOuputPerLine: 5,

  // Number of recursion authorized while generating nickname
  // NB: 3 is long, 4 very.. long
  // NB: also depends on the size of the seed arrays
  maxNicknameLevels: 3,

  // Set true to allow 2 times or more the same char in a nickname (ex. 'Pala')
  allowDoubleLetter: false,

  // Do not allow double char in a row. ex. bbali or deep
  allowDoubleLetterInarow: false,

  // Use the array "dontStartWith" or "dontEndWith" to invalidate some nickname
  useDontStartWith: true,
  useDontEndWith: true,

  // Force to start or end with specify string from array
  useDoStartWith: false,
  useDoEndWith: false,

  // When true, nickname need to contain a substring from exclusiveList
  useExclusiveList: false,

  // When true, nickname who contain a substring from blackListArr will be ignore
  useBlackListArr: true,

  // Require to have a consonnant or vowel every X character
  // Ex. vowelEvery 2 will invalidate helllo or khloe, because of 3 consonant in a row
  // Ex. consonantEvery 2 will invalidate hellooo or koual
  consonantEvery: 2,
  vowelEvery: 2,

  // List of vowel (better to not change) used for consonantEvery and vowelEvery
  vowel: ['a', 'e', 'i', 'o', 'u', 'y'],

  // Nickname will never start with this if 'useDontStartWith' is true
  dontStartWith: [
    // Composition of sound I dont like as a nickname starter
    'b', 'c', 'ced', 'cef', 'ceg', 'jum', 'y', 'u', 'de', 'i',
    'do', 'bc', 'du',
    'ba', 'ca', 'da', 'fa', 'ga', 'ha', 'ja', 'ka', 'la', 'ma', 'na', 'pa', 'qa',
    'ra', 'sa', 'ta', 'va', 'wa', 'xa', 'za',
    'by', 'cy', 'dy', 'fy', 'gy', 'hy', 'jy', 'ky', 'ly', 'my', 'ny', 'py', 'qy',
    'ry', 'sy', 'ty', 'vy', 'wy', 'xy', 'zy',
    'bi', 'ci', 'di', 'fi', 'gi', 'hi', 'ji', 'ki', 'li', 'mi', 'ni', 'pi', 'qi',
    'ri', 'si', 'ti', 'vi', 'wi', 'xi', 'zi',
    'eji', 'egi',
    'i', 'o', 'h',
  ],

  // Nickname will never end with this if 'useDontEndWith' is true
  dontEndWith: [
    'a', 'i', 'y', 'w', 'g', 'j', 'h', 'rd', 'cl',

    ['qq'], ['wq'], ['rq'], ['tq'], ['pq'], ['sq'], ['dq'], ['fq'], ['gq'], ['hq'], ['jq'], ['kq'], ['lq'], ['zq'], ['xq'], ['cq'], ['vq'], ['bq'], ['nq'], ['mq'],
    ['qw'], ['ww'], ['rw'], ['tw'], ['pw'], ['sw'], ['dw'], ['fw'], ['gw'], ['hw'], ['jw'], ['kw'], ['lw'], ['zw'], ['xw'], ['cw'], ['vw'], ['bw'], ['nw'], ['mw'],
    ['qr'], ['wr'], ['rr'], ['tr'], ['pr'], ['sr'], ['dr'], ['fr'], ['gr'], ['hr'], ['jr'], ['kr'], ['lr'], ['zr'], ['xr'], ['cr'], ['vr'], ['br'], ['nr'], ['mr'],
    ['qt'], ['wt'], ['rt'], ['tt'], ['pt'], ['st'], ['dt'], ['ft'], ['gt'], ['ht'], ['jt'], ['kt'], ['lt'], ['zt'], ['xt'], ['ct'], ['vt'], ['bt'], ['nt'], ['mt'],
    ['qp'], ['wp'], ['rp'], ['tp'], ['pp'], ['sp'], ['dp'], ['fp'], ['gp'], ['hp'], ['jp'], ['kp'], ['lp'], ['zp'], ['xp'], ['cp'], ['vp'], ['bp'], ['np'], ['mp'],
    ['qs'], ['ws'], ['rs'], ['ts'], ['ps'], ['ss'], ['ds'], ['fs'], ['gs'], ['hs'], ['js'], ['ks'], ['ls'], ['zs'], ['xs'], ['cs'], ['vs'], ['bs'], ['ns'], ['ms'],
    ['qd'], ['wd'], ['rd'], ['td'], ['pd'], ['sd'], ['dd'], ['fd'], ['gd'], ['hd'], ['jd'], ['kd'], ['ld'], ['zd'], ['xd'], ['cd'], ['vd'], ['bd'], ['nd'], ['md'],
    ['qf'], ['wf'], ['rf'], ['tf'], ['pf'], ['sf'], ['df'], ['ff'], ['gf'], ['hf'], ['jf'], ['kf'], ['lf'], ['zf'], ['xf'], ['cf'], ['vf'], ['bf'], ['nf'], ['mf'],
    ['qg'], ['wg'], ['rg'], ['tg'], ['pg'], ['sg'], ['dg'], ['fg'], ['gg'], ['hg'], ['jg'], ['kg'], ['lg'], ['zg'], ['xg'], ['cg'], ['vg'], ['bg'], ['ng'], ['mg'],
    ['qh'], ['wh'], ['rh'], ['th'], ['ph'], ['sh'], ['dh'], ['fh'], ['gh'], ['hh'], ['jh'], ['kh'], ['lh'], ['zh'], ['xh'], ['ch'], ['vh'], ['bh'], ['nh'], ['mh'],
    ['qj'], ['wj'], ['rj'], ['tj'], ['pj'], ['sj'], ['dj'], ['fj'], ['gj'], ['hj'], ['jj'], ['kj'], ['lj'], ['zj'], ['xj'], ['cj'], ['vj'], ['bj'], ['nj'], ['mj'],
    ['qk'], ['wk'], ['rk'], ['tk'], ['pk'], ['sk'], ['dk'], ['fk'], ['gk'], ['hk'], ['jk'], ['kk'], ['lk'], ['zk'], ['xk'], ['ck'], ['vk'], ['bk'], ['nk'], ['mk'],
    ['ql'], ['wl'], ['rl'], ['tl'], ['pl'], ['sl'], ['dl'], ['fl'], ['gl'], ['hl'], ['jl'], ['kl'], ['ll'], ['zl'], ['xl'], ['cl'], ['vl'], ['bl'], ['nl'], ['ml'],
    ['qz'], ['wz'], ['rz'], ['tz'], ['pz'], ['sz'], ['dz'], ['fz'], ['gz'], ['hz'], ['jz'], ['kz'], ['lz'], ['zz'], ['xz'], ['cz'], ['vz'], ['bz'], ['nz'], ['mz'],
    ['qx'], ['wx'], ['rx'], ['tx'], ['px'], ['sx'], ['dx'], ['fx'], ['gx'], ['hx'], ['jx'], ['kx'], ['lx'], ['zx'], ['xx'], ['cx'], ['vx'], ['bx'], ['nx'], ['mx'],
    ['qc'], ['wc'], ['rc'], ['tc'], ['pc'], ['sc'], ['dc'], ['fc'], ['gc'], ['hc'], ['jc'], ['kc'], ['lc'], ['zc'], ['xc'], ['cc'], ['vc'], ['bc'], ['nc'], ['mc'],
    ['qv'], ['wv'], ['rv'], ['tv'], ['pv'], ['sv'], ['dv'], ['fv'], ['gv'], ['hv'], ['jv'], ['kv'], ['lv'], ['zv'], ['xv'], ['cv'], ['vv'], ['bv'], ['nv'], ['mv'],
    ['qb'], ['wb'], ['rb'], ['tb'], ['pb'], ['sb'], ['db'], ['fb'], ['gb'], ['hb'], ['jb'], ['kb'], ['lb'], ['zb'], ['xb'], ['cb'], ['vb'], ['bb'], ['nb'], ['mb'],
    ['qn'], ['wn'], ['rn'], ['tn'], ['pn'], ['sn'], ['dn'], ['fn'], ['gn'], ['hn'], ['jn'], ['kn'], ['ln'], ['zn'], ['xn'], ['cn'], ['vn'], ['bn'], ['nn'], ['mn'],
    ['qm'], ['wm'], ['rm'], ['tm'], ['pm'], ['sm'], ['dm'], ['fm'], ['gm'], ['hm'], ['jm'], ['km'], ['lm'], ['zm'], ['xm'], ['cm'], ['vm'], ['bm'], ['nm'], ['mm'],
  ],

  // Nickname will never end with this if 'useDontEndWith' is true
  doStartWith: [
    'mik', 'Ro', 'Jo',
    'Do',
  ],

  // Nickname will never end with this if 'useDontEndWith' is true
  doEndWith: [
    'up',
  ],

  // Only nickname who have a substring from this array will be valid
  // NB: it is not string but array, it is posssible to specify 2 or more string
  // That way it will necessaray to match with all string
  // Example ['nu', 'la'] will validate 'nutela' but not 'nute' or 'tela'
  exclusiveList: [
    // ['sadix'],
    // ['crax'],
    // ['rax'],
    // ['tak'],
    // ['dar'],
    // ['tar'],
    // ['gar'],
    // ['zar'],
    // ['kar'],
    // ['dax'],
    // ['x'],
    // ['w'],
    // ['r'],
    // ['k'],
    // ['tax'],
    // ['tax'],
    // ['war'],
    // ['kra'],
    // ['dak'],
    // ['tak'],
    // ['pak'],
    // ['cra'], ['tak'], ['wek'], ['war'],
    // ['dix'], ['dax'], ['tri'], ['tra'], ['kro'],
    // ['kra'],
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
    ['fol'],

    ['nd'], ['nr'], ['mr'], ['rn'], ['rm'], ['dv'], ['dl'], ['tc'],
    ['lr'], ['vk'], ['rk'], ['rd'], ['lc'], ['ml'], ['vm'], ['vn'], ['nv'], ['mv'], ['sb'], ['ln'], ['nb'],
    ['bt'], ['nt'], ['pb'], ['np'], ['mp'], ['ns'], ['nm'], ['vd'], ['km'], ['kn'], ['bp'], ['dm'],
    ['qn'], ['wn'], ['rn'], ['tn'], ['pn'], ['dn'], ['fn'], ['hn'], ['jn'], ['ln'], ['zn'], ['xn'], ['cn'], ['vn'], ['bn'], ['mn'],
    ['qc'], ['wc'], ['rc'], ['tc'], ['pc'], ['dc'], ['fc'], ['gc'], ['hc'], ['jc'], ['kc'], ['lc'], ['xc'], ['vc'], ['bc'], ['nc'], ['mc'],
    ['qw'], ['rw'], ['pw'], ['dw'], ['fw'], ['gw'], ['hw'], ['jw'], ['lw'], ['zw'], ['xw'], ['cw'], ['vw'], ['bw'], ['nw'], ['mw'],
    ['qr'], ['wr'], ['sr'], ['jr'],
    ['wr'], ['pm'], ['lm'], ['lv'],
    ['qt'], ['wt'], ['rt'], ['pt'], ['dt'], ['ft'], ['gt'], ['ht'], ['jt'], ['lt'], ['zt'], ['xt'], ['ct'], ['vt'], ['bt'], ['nt'], ['mt'],
    ['qp'], ['wp'], ['rp'], ['tp'], ['dp'], ['fp'], ['gp'], ['hp'], ['jp'], ['kp'], ['lp'], ['zp'], ['xp'], ['cp'], ['vp'], ['bp'], ['np'], ['mp'],
    ['qs'], ['ws'], ['rs'], ['ts'], ['ps'], ['ds'], ['fs'], ['gs'], ['hs'], ['js'], ['zs'], ['ls'], ['xs'], ['cs'], ['vs'], ['bs'], ['ns'], ['ms'],
    ['qd'], ['wd'], ['rd'], ['td'], ['pd'], ['sd'], ['fd'], ['gd'], ['hd'], ['jd'], ['kd'], ['ld'], ['zd'], ['xd'], ['cd'], ['vd'], ['bd'], ['nd'], ['md'],
    ['qf'], ['wf'], ['rf'], ['tf'], ['pf'], ['df'], ['gf'], ['hf'], ['jf'], ['kf'], ['lf'], ['zf'], ['xf'], ['cf'], ['vf'], ['bf'], ['nf'], ['mf'],
    ['qg'], ['wg'], ['rg'], ['tg'], ['pg'], ['sg'], ['dg'], ['fg'], ['hg'], ['jg'], ['kg'], ['lg'], ['zg'], ['xg'], ['cg'], ['vg'], ['bg'], ['ng'], ['mg'],
    ['qh'], ['jh'], ['lh'],
    ['qj'], ['wj'], ['rj'], ['tj'], ['pj'], ['sj'], ['dj'], ['fj'], ['gj'], ['hj'], ['lj'], ['kj'], ['zj'], ['xj'], ['cj'], ['vj'], ['bj'], ['nj'], ['mj'],
    ['qk'], ['wk'], ['rk'], ['tk'], ['pk'], ['dk'], ['fk'], ['gk'], ['hk'], ['jk'], ['lk'], ['zk'], ['xk'], ['ck'], ['vk'], ['bk'], ['nk'], ['mk'],
    ['ql'], ['wl'], ['rl'], ['tl'], ['dl'], ['hl'], ['jl'], ['xl'], ['nl'], ['ml'],
    ['qz'], ['wz'], ['rz'], ['tz'], ['pz'], ['sz'], ['dz'], ['fz'], ['gz'], ['hz'], ['jz'], ['kz'], ['lz'], ['xz'], ['cz'], ['vz'], ['bz'], ['nz'], ['mz'],
    ['qx'], ['wx'], ['rx'], ['tx'], ['px'], ['sx'], ['dx'], ['fx'], ['gx'], ['hx'], ['jx'], ['kx'], ['lx'], ['zx'], ['xx'], ['cx'], ['vx'], ['bx'], ['nx'], ['mx'],
    ['qc'], ['wc'], ['rc'], ['tc'], ['pc'], ['dc'], ['fc'], ['gc'], ['hc'], ['jc'], ['kc'], ['lc'], ['zc'], ['xc'], ['vc'], ['bc'], ['nc'], ['mc'],
    ['qv'], ['wv'], ['rv'], ['tv'], ['pv'], ['sv'], ['dv'], ['fv'], ['gv'], ['hv'], ['jv'], ['kv'], ['lv'], ['zv'], ['xv'], ['cv'], ['vv'], ['bv'], ['nv'], ['mv'],
    ['qb'], ['wb'], ['rb'], ['tb'], ['pb'], ['sb'], ['db'], ['fb'], ['gb'], ['hb'], ['jb'], ['kb'], ['lb'], ['zb'], ['xb'], ['cb'], ['vb'], ['bb'], ['nb'], ['mb'],
    ['qn'], ['wn'], ['rn'], ['tn'], ['pn'], ['dn'], ['hn'], ['jn'], ['ln'], ['zn'], ['xn'], ['cn'], ['vn'], ['bn'], ['nn'], ['mn'],
    ['qm'], ['wm'], ['rm'], ['tm'], ['pm'], ['dm'], ['fm'], ['gm'], ['hm'], ['jm'], ['lm'], ['xm'], ['cm'], ['vm'], ['bm'], ['nm'], ['mm'],
    ['ms'], ['ls'], ['vc'], ['dt'], ['dl'], ['rl'],
    ['sr'], ['db'], ['kl'], ['dc'], ['tp'], ['sv'], ['mc'], ['lb'],
    ['bm'], ['lk'], ['pk'], ['vt'], ['pv'], ['rv'], ['kv'],
    ['tv'], ['td'], ['tm'], ['tf'], ['kx'], ['gx'], ['vg'],
    ['lg'],

    ['q'], ['y'],

    // vowel + consonant or special one
    ['yw'],
    ['w'],
    ['z'],
    ['x'],
    ['g'],
    ['f'],
    ['j'],
    ['q'],
    ['x'],
    ['y'],
    ['cs'],
    ['mb'],
    ['vb'],
    ['rt'],
    ['pt'],
    ['i', 'y'],
    ['v', 'w'],
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
    // 'br', 'bl', 'cl', 'ch', 'dr', 'dj', 'dh',
    // 'fr', 'fl', 'fh', 'kr', 'kw', 'kl', 'mh',
    // 'nh', 'pr', 'pl', 'qr', 'ql', 'rh', 'sl',
    // 'sc', 'sk', 'sm', 'sn', 'tr', 'th', 'vr',
    // 'vl', 'vh', 'wr', 'wl', 'wh', 'zr', 'zl',
    // 'zh',
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

  sound_1: [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k',
    'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
    'v', 'w', 'x', 'z',
    // '',
    // 'a', 'e', 'i', 'o', 'u', 'y',
  ],

  sound_2: [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k',
    'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
    'v', 'w', 'x', 'z',
    '',
    'a', 'e', 'i', 'o', 'u', 'y',
  ],

  sound_3: [
    'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k',
    'l', 'm', 'n', 'p', 'q', 'r', 's', 't',
    'v', 'w', 'x', 'z',
    '',
    'a', 'e', 'i', 'o', 'u', 'y',
  ],
}
