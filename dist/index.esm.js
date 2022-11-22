import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// 随机模块
var randomInt = function randomInt(min, max) {
  var p = Math.random();
  return Math.floor(min * (1 - p) + max * p);
};
var createRandomPick = function createRandomPick(target) {
  var copy = target.slice();
  var len = copy.length - 1;
  var randomPick = function randomPick() {
    var index = randomInt(0, len);
    var picked = copy[index];
    var _ref = [copy[len], copy[index]];
    copy[index] = _ref[0];
    copy[len] = _ref[1];
    return picked;
  };

  // 除去第一次的影响
  randomPick();
  return randomPick;
};

var sentence = function sentence(pick, replacer) {
  var ret = pick();
  for (var key in replacer) {
    ret = ret.replace(new RegExp("{{".concat(key, "}}"), 'g'), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
  }
  return ret;
};

// 文章生成
var generate = function generate(title, _ref) {
  var corpus = _ref.corpus,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 5000 : _ref$min,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 10000 : _ref$max;
  var lenOfArticles = randomInt(min, max);
  var famous = corpus.famous,
    bosh_before = corpus.bosh_before,
    bosh = corpus.bosh,
    said = corpus.said,
    conclude = corpus.conclude;
  var _map = [famous, bosh_before, bosh, said, conclude].map(function (item) {
      return createRandomPick(item);
    }),
    _map2 = _slicedToArray(_map, 5),
    pickFamous = _map2[0],
    pickBoshBefore = _map2[1],
    pickBosh = _map2[2],
    pickSaid = _map2[3],
    pickConclude = _map2[4];
  var article = [];
  var lenOfTotal = 0;
  while (lenOfTotal < lenOfArticles) {
    var lenOfSection = randomInt(200, 500);
    var section = '';
    while (section.length < lenOfSection || !/[。？]$/.test(section)) {
      var n = randomInt(0, 100);
      if (n < 20) {
        section += sentence(pickFamous, {
          said: pickSaid,
          conclude: pickConclude,
          title: title
        });
      } else if (n < 50) {
        section += sentence(pickBoshBefore, {
          title: title
        }) + sentence(pickBosh, {
          title: title
        });
      } else {
        section += sentence(pickBosh, {
          title: title
        });
      }
    }
    lenOfTotal += section.length;
    article.push(section);
  }
  return article;
};

// 获取当前脚本的 url
var curUrl = import.meta.url;
var data = readFileSync(resolve(dirname(fileURLToPath(curUrl)), 'corpus/data.json'), {
  encoding: 'utf-8'
});
var corpus = JSON.parse(data);
var pickTitle = createRandomPick(corpus.title);
var title = pickTitle();
var article = generate(title, {
  corpus: corpus
});
console.log("".concat(title, "\n\n  ").concat(article.join("\n ")));
//# sourceMappingURL=index.esm.js.map
