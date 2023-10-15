let active;
function toClassName(rule18) {
  return [
    ...rule18.v,
    (rule18.i ? "!" : "") + rule18.n
  ].join(":");
}
function format(rules2, seperator = ",") {
  return rules2.map(toClassName).join(seperator);
}
let escape = "undefined" != typeof CSS && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
function hash(value) {
  for (var h = 9, index = value.length; index--; )
    h = Math.imul(h ^ value.charCodeAt(index), 1597334677);
  return "#" + ((h ^ h >>> 9) >>> 0).toString(36);
}
function mql(screen, prefix = "@media ") {
  return prefix + asArray(screen).map((screen2) => {
    return "string" == typeof screen2 && (screen2 = {
      min: screen2
    }), screen2.raw || Object.keys(screen2).map((feature) => `(${feature}-width:${screen2[feature]})`).join(" and ");
  }).join(",");
}
function asArray(value = []) {
  return Array.isArray(value) ? value : null == value ? [] : [
    value
  ];
}
function identity(value) {
  return value;
}
function noop() {
}
let Layer = {
  d: 0,
  b: 134217728,
  c: 268435456,
  a: 671088640,
  u: 805306368,
  o: 939524096
};
function seperatorPrecedence(string) {
  var _a;
  return ((_a = string.match(/[-=:;]/g)) == null ? void 0 : _a.length) || 0;
}
function atRulePrecedence(css) {
  return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(css) ? Math.max(0, 29.63 * (+RegExp.$1 / (RegExp.$2 ? 15 : 1)) ** 0.137 - 43) : 0, 15) << 22 | Math.min(seperatorPrecedence(css), 15) << 18;
}
let PRECEDENCES_BY_PSEUDO_CLASS = [
  "rst-c",
  "st-ch",
  "h-chi",
  "y-lin",
  "nk",
  "sited",
  "ecked",
  "pty",
  "ad-on",
  "cus-w",
  "ver",
  "cus",
  "cus-v",
  "tive",
  "sable",
  "tiona",
  "quire"
];
function convert({ n: name, i: important, v: variants2 = [] }, context, precedence, conditions) {
  name && (name = toClassName({
    n: name,
    i: important,
    v: variants2
  }));
  conditions = [
    ...asArray(conditions)
  ];
  for (let variant of variants2) {
    let screen = context.theme("screens", variant);
    for (let condition of asArray(screen && mql(screen) || context.v(variant))) {
      var selector;
      conditions.push(condition);
      precedence |= screen ? 67108864 | atRulePrecedence(condition) : "dark" == variant ? 1073741824 : "@" == condition[0] ? atRulePrecedence(condition) : (selector = condition, 1 << ~(/:([a-z-]+)/.test(selector) && ~PRECEDENCES_BY_PSEUDO_CLASS.indexOf(RegExp.$1.slice(2, 7)) || -18));
    }
  }
  return {
    n: name,
    p: precedence,
    r: conditions,
    i: important
  };
}
let registry = /* @__PURE__ */ new Map();
function stringify$1(rule18) {
  if (rule18.d) {
    let groups = [], selector = replaceEach(
      rule18.r.reduce((selector2, condition) => {
        return "@" == condition[0] ? (groups.push(condition), selector2) : condition ? replaceEach(selector2, (selectorPart) => replaceEach(
          condition,
          (conditionPart) => {
            let mergeMatch = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(conditionPart);
            if (mergeMatch) {
              let selectorIndex = selectorPart.indexOf(mergeMatch[1]);
              return ~selectorIndex ? selectorPart.slice(0, selectorIndex) + mergeMatch[0] + selectorPart.slice(selectorIndex + mergeMatch[1].length) : replaceReference(selectorPart, conditionPart);
            }
            return replaceReference(conditionPart, selectorPart);
          }
        )) : selector2;
      }, "&"),
      (selectorPart) => replaceReference(selectorPart, rule18.n ? "." + escape(rule18.n) : "")
    );
    return selector && groups.push(selector.replace(/:merge\((.+?)\)/g, "$1")), groups.reduceRight((body, grouping) => grouping + "{" + body + "}", rule18.d);
  }
}
function replaceEach(selector, iteratee) {
  return selector.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (_, selectorPart, comma) => iteratee(selectorPart) + comma);
}
function replaceReference(selector, reference) {
  return selector.replace(/&/g, reference);
}
let collator = new Intl.Collator("en", {
  numeric: true
});
function sortedInsertionIndex(array, element) {
  for (var low = 0, high = array.length; low < high; ) {
    let pivot = high + low >> 1;
    0 >= compareTwindRules(array[pivot], element) ? low = pivot + 1 : high = pivot;
  }
  return high;
}
function compareTwindRules(a2, b) {
  let layer = a2.p & Layer.o;
  return layer == (b.p & Layer.o) && (layer == Layer.b || layer == Layer.o) ? 0 : a2.p - b.p || a2.o - b.o || collator.compare(byModifier(a2.n), byModifier(b.n)) || collator.compare(byName(a2.n), byName(b.n));
}
function byModifier(s) {
  return (s || "").split(/:/).pop().split("/").pop() || "\0";
}
function byName(s) {
  return (s || "").replace(/\W/g, (c) => String.fromCharCode(127 + c.charCodeAt(0))) + "\0";
}
function parseColorComponent(chars, factor) {
  return Math.round(parseInt(chars, 16) * factor);
}
function toColorValue(color, options = {}) {
  if ("function" == typeof color)
    return color(options);
  let { opacityValue = "1", opacityVariable } = options, opacity = opacityVariable ? `var(${opacityVariable})` : opacityValue;
  if (color.includes("<alpha-value>"))
    return color.replace("<alpha-value>", opacity);
  if ("#" == color[0] && (4 == color.length || 7 == color.length)) {
    let size = (color.length - 1) / 3, factor = [
      17,
      1,
      0.062272
    ][size - 1];
    return `rgba(${[
      parseColorComponent(color.substr(1, size), factor),
      parseColorComponent(color.substr(1 + size, size), factor),
      parseColorComponent(color.substr(1 + 2 * size, size), factor),
      opacity
    ]})`;
  }
  return "1" == opacity ? color : "0" == opacity ? "#0000" : color.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${opacity})`);
}
function serialize(style, rule18, context, precedence, conditions = []) {
  return function serialize$(style2, { n: name, p: precedence2, r: conditions2 = [], i: important }, context2) {
    let rules2 = [], declarations = "", maxPropertyPrecedence = 0, numberOfDeclarations = 0;
    for (let key in style2 || {}) {
      var layer, property;
      let value = style2[key];
      if ("@" == key[0]) {
        if (!value)
          continue;
        if ("a" == key[1]) {
          rules2.push(...translateWith(name, precedence2, parse("" + value), context2, precedence2, conditions2, important, true));
          continue;
        }
        if ("l" == key[1]) {
          for (let css of asArray(value))
            rules2.push(...serialize$(css, {
              n: name,
              p: (layer = Layer[key[7]], precedence2 & ~Layer.o | layer),
              r: "d" == key[7] ? [] : conditions2,
              i: important
            }, context2));
          continue;
        }
        if ("i" == key[1]) {
          rules2.push(...asArray(value).map((value2) => ({
            p: -1,
            o: 0,
            r: [],
            d: key + " " + value2
          })));
          continue;
        }
        if ("k" == key[1]) {
          rules2.push({
            p: Layer.d,
            o: 0,
            r: [
              key
            ],
            d: serialize$(value, {
              p: Layer.d
            }, context2).map(stringify$1).join("")
          });
          continue;
        }
        if ("f" == key[1]) {
          rules2.push(...asArray(value).map((value2) => ({
            p: Layer.d,
            o: 0,
            r: [
              key
            ],
            d: serialize$(value2, {
              p: Layer.d
            }, context2).map(stringify$1).join("")
          })));
          continue;
        }
      }
      if ("object" != typeof value || Array.isArray(value)) {
        if ("label" == key && value)
          name = value + hash(JSON.stringify([
            precedence2,
            important,
            style2
          ]));
        else if (value || 0 === value) {
          key = key.replace(/[A-Z]/g, (_) => "-" + _.toLowerCase());
          numberOfDeclarations += 1;
          maxPropertyPrecedence = Math.max(maxPropertyPrecedence, "-" == (property = key)[0] ? 0 : seperatorPrecedence(property) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(property) ? +!!RegExp.$1 || -!!RegExp.$2 : 0) + 1);
          declarations += (declarations ? ";" : "") + asArray(value).map((value2) => context2.s(
            key,
            resolveThemeFunction("" + value2, context2.theme) + (important ? " !important" : "")
          )).join(";");
        }
      } else if ("@" == key[0] || key.includes("&")) {
        let rulePrecedence = precedence2;
        if ("@" == key[0]) {
          key = key.replace(/\bscreen\(([^)]+)\)/g, (_, screenKey) => {
            let screen = context2.theme("screens", screenKey);
            return screen ? (rulePrecedence |= 67108864, mql(screen, "")) : _;
          });
          rulePrecedence |= atRulePrecedence(key);
        }
        rules2.push(...serialize$(value, {
          n: name,
          p: rulePrecedence,
          r: [
            ...conditions2,
            key
          ],
          i: important
        }, context2));
      } else
        rules2.push(...serialize$(value, {
          p: precedence2,
          r: [
            ...conditions2,
            key
          ]
        }, context2));
    }
    return rules2.unshift({
      n: name,
      p: precedence2,
      o: Math.max(0, 15 - numberOfDeclarations) + 1.5 * Math.min(maxPropertyPrecedence || 15, 15),
      r: conditions2,
      d: declarations
    }), rules2.sort(compareTwindRules);
  }(style, convert(rule18, context, precedence, conditions), context);
}
function resolveThemeFunction(value, theme2) {
  return value.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (_, __, key, ___, defaultValue = "") => {
    let value2 = theme2(key, defaultValue);
    return "function" == typeof value2 && /color|fill|stroke/i.test(key) ? toColorValue(value2) : "" + asArray(value2).filter((v) => Object(v) !== v);
  });
}
function merge(rules2, name) {
  let current;
  let result = [];
  for (let rule18 of rules2)
    if (rule18.d && rule18.n) {
      if ((current == null ? void 0 : current.p) == rule18.p && "" + current.r == "" + rule18.r) {
        current.c = [
          current.c,
          rule18.c
        ].filter(Boolean).join(" ");
        current.d = current.d + ";" + rule18.d;
      } else
        result.push(current = {
          ...rule18,
          n: rule18.n && name
        });
    } else
      result.push({
        ...rule18,
        n: rule18.n && name
      });
  return result;
}
function translate(rules2, context, precedence = Layer.u, conditions, important) {
  let result = [];
  for (let rule18 of rules2)
    for (let cssRule of function(rule19, context2, precedence2, conditions2, important2) {
      rule19 = {
        ...rule19,
        i: rule19.i || important2
      };
      let resolved = function(rule20, context3) {
        let factory = registry.get(rule20.n);
        return factory ? factory(rule20, context3) : context3.r(rule20.n, "dark" == rule20.v[0]);
      }(rule19, context2);
      return resolved ? "string" == typeof resolved ? ({ r: conditions2, p: precedence2 } = convert(rule19, context2, precedence2, conditions2), merge(translate(parse(resolved), context2, precedence2, conditions2, rule19.i), rule19.n)) : Array.isArray(resolved) ? resolved.map((rule20) => {
        var _a;
        var precedence1, layer;
        return {
          o: 0,
          ...rule20,
          r: [
            ...asArray(conditions2),
            ...asArray(rule20.r)
          ],
          p: (precedence1 = precedence2, layer = (_a = rule20.p) != null ? _a : precedence2, precedence1 & ~Layer.o | layer)
        };
      }) : serialize(resolved, rule19, context2, precedence2, conditions2) : [
        {
          c: toClassName(rule19),
          p: 0,
          o: 0,
          r: []
        }
      ];
    }(rule18, context, precedence, conditions, important))
      result.splice(sortedInsertionIndex(result, cssRule), 0, cssRule);
  return result;
}
function translateWith(name, layer, rules2, context, precedence, conditions, important, useOrderOfRules) {
  return merge((useOrderOfRules ? rules2.flatMap((rule18) => translate([
    rule18
  ], context, precedence, conditions, important)) : translate(rules2, context, precedence, conditions, important)).map((rule18) => {
    return rule18.p & Layer.o && (rule18.n || layer == Layer.b) ? {
      ...rule18,
      p: rule18.p & ~Layer.o | layer,
      o: 0
    } : rule18;
  }), name);
}
function define(className, layer, rules2, useOrderOfRules) {
  var factory;
  return factory = (rule18, context) => {
    let { n: name, p: precedence, r: conditions, i: important } = convert(rule18, context, layer);
    return rules2 && translateWith(name, layer, rules2, context, precedence, conditions, important, useOrderOfRules);
  }, registry.set(className, factory), className;
}
function createRule(active2, current, loc) {
  if ("(" != active2[active2.length - 1]) {
    let variants2 = [], important = false, negated = false, name = "";
    for (let value of active2)
      if (!("(" == value || /[~@]$/.test(value))) {
        if ("!" == value[0]) {
          value = value.slice(1);
          important = !important;
        }
        if (value.endsWith(":")) {
          variants2["dark:" == value ? "unshift" : "push"](value.slice(0, -1));
          continue;
        }
        if ("-" == value[0]) {
          value = value.slice(1);
          negated = !negated;
        }
        value.endsWith("-") && (value = value.slice(0, -1));
        value && "&" != value && (name += (name && "-") + value);
      }
    if (name) {
      negated && (name = "-" + name);
      current[0].push(Object.defineProperties({
        n: name,
        v: variants2.filter(uniq),
        i: important
      }, {
        a: {
          value: [
            ...active2
          ]
        },
        l: {
          value: loc
        }
      }));
    }
  }
}
function uniq(value, index, values) {
  return values.indexOf(value) == index;
}
let cache = /* @__PURE__ */ new Map();
function parse(token) {
  let parsed = cache.get(token);
  if (!parsed) {
    let active2 = [], current = [
      []
    ], startIndex = 0, skip = 0, comment = null, position2 = 0, commit = (isRule, endOffset = 0) => {
      if (startIndex != position2) {
        active2.push(token.slice(startIndex, position2 + endOffset));
        isRule && createRule(active2, current, [
          startIndex,
          position2 + endOffset
        ]);
      }
      startIndex = position2 + 1;
    };
    for (; position2 < token.length; position2++) {
      let char = token[position2];
      if (skip)
        "\\" != token[position2 - 1] && (skip += +("[" == char) || -("]" == char));
      else if ("[" == char)
        skip += 1;
      else if (comment) {
        if ("\\" != token[position2 - 1] && comment.test(token.slice(position2))) {
          comment = null;
          startIndex = position2 + RegExp.lastMatch.length;
        }
      } else if ("/" == char && "\\" != token[position2 - 1] && ("*" == token[position2 + 1] || "/" == token[position2 + 1]))
        comment = "*" == token[position2 + 1] ? /^\*\// : /^[\r\n]/;
      else if ("(" == char) {
        commit();
        active2.push(char);
      } else if (":" == char)
        ":" != token[position2 + 1] && commit(false, 1);
      else if (/[\s,)]/.test(char)) {
        commit(true);
        let lastGroup = active2.lastIndexOf("(");
        if (")" == char) {
          let nested = active2[lastGroup - 1];
          if (/[~@]$/.test(nested)) {
            let rules2 = current.shift();
            active2.length = lastGroup;
            createRule([
              ...active2,
              "#"
            ], current, [
              startIndex,
              position2
            ]);
            let { v } = current[0].pop();
            for (let rule18 of rules2)
              rule18.v.splice(+("dark" == rule18.v[0]) - +("dark" == v[0]), v.length);
            createRule([
              ...active2,
              define(
                nested.length > 1 ? nested.slice(0, -1) + hash(JSON.stringify([
                  nested,
                  rules2
                ])) : nested + "(" + format(rules2) + ")",
                Layer.a,
                rules2,
                /@$/.test(nested)
              )
            ], current, [
              startIndex,
              position2
            ]);
          }
          lastGroup = active2.lastIndexOf("(", lastGroup - 1);
        }
        active2.length = lastGroup + 1;
      } else
        /[~@]/.test(char) && "(" == token[position2 + 1] && current.unshift([]);
    }
    commit(true);
    cache.set(token, parsed = current[0]);
  }
  return parsed;
}
function match(pattern, resolve, convert2) {
  return [
    pattern,
    fromMatch(resolve, convert2)
  ];
}
function fromMatch(resolve, convert2) {
  return "function" == typeof resolve ? resolve : "string" == typeof resolve && /^[\w-]+$/.test(resolve) ? (match2, context) => ({
    [resolve]: convert2 ? convert2(match2, context) : maybeNegate(match2, 1)
  }) : (match2) => resolve || {
    [match2[1]]: maybeNegate(match2, 2)
  };
}
function maybeNegate(match2, offset, value = match2.slice(offset).find(Boolean) || match2.$$ || match2.input) {
  return "-" == match2.input[0] ? `calc(${value} * -1)` : value;
}
function matchTheme(pattern, section, resolve, convert2) {
  return [
    pattern,
    fromTheme(section, resolve, convert2)
  ];
}
function fromTheme(section, resolve, convert2) {
  let factory = "string" == typeof resolve ? (match2, context) => ({
    [resolve]: convert2 ? convert2(match2, context) : match2._
  }) : resolve || (({ 1: $1, _ }, context, section2) => ({
    [$1 || section2]: _
  }));
  return withAutocomplete((match2, context) => {
    var _a;
    let themeSection = camelize(section || match2[1]), value = (_a = context.theme(themeSection, match2.$$)) != null ? _a : arbitrary(match2.$$, themeSection, context);
    if (null != value)
      return match2._ = maybeNegate(match2, 0, value), factory(match2, context, themeSection);
  }, (match2, context) => {
    let themeSection = camelize(section || match2[1]), isKeyLookup = match2.input.endsWith("-");
    if (isKeyLookup)
      return Object.entries(context.theme(themeSection) || {}).filter(([key, value2]) => key && "DEFAULT" != key && (!/color|fill|stroke/i.test(themeSection) || [
        "string",
        "function"
      ].includes(typeof value2))).map(([key, value2]) => ({
        suffix: key.replace(/-DEFAULT/g, ""),
        theme: {
          section: themeSection,
          key
        },
        color: /color|fill|stroke/i.test(themeSection) && toColorValue(value2, {
          opacityValue: "1"
        })
      })).concat([
        {
          suffix: "["
        }
      ]);
    let value = context.theme(themeSection, "DEFAULT");
    return value ? [
      {
        suffix: "",
        theme: {
          section: themeSection,
          key: "DEFAULT"
        },
        color: /color|fill|stroke/i.test(themeSection) && toColorValue(value, {
          opacityValue: "1"
        })
      }
    ] : [];
  });
}
function matchColor(pattern, options = {}, resolve) {
  return [
    pattern,
    colorFromTheme(options, resolve)
  ];
}
function colorFromTheme(options = {}, resolve) {
  return withAutocomplete((match2, context) => {
    let { section = camelize(match2[0]).replace("-", "") + "Color" } = options, [colorMatch, opacityMatch] = parseValue(match2.$$);
    if (!colorMatch)
      return;
    let colorValue = context.theme(section, colorMatch) || arbitrary(colorMatch, section, context);
    if (!colorValue || "object" == typeof colorValue)
      return;
    let {
      opacityVariable = `--tw-${match2[0].replace(/-$/, "")}-opacity`,
      opacitySection = section.replace("Color", "Opacity"),
      property = section,
      selector
    } = options, opacityValue = context.theme(opacitySection, opacityMatch || "DEFAULT") || opacityMatch && arbitrary(opacityMatch, opacitySection, context), create = resolve || (({ _ }) => {
      let properties2 = toCSS(property, _);
      return selector ? {
        [selector]: properties2
      } : properties2;
    });
    match2._ = {
      value: toColorValue(colorValue, {
        opacityVariable: opacityVariable || void 0,
        opacityValue: opacityValue || void 0
      }),
      color: (options2) => toColorValue(colorValue, options2),
      opacityVariable: opacityVariable || void 0,
      opacityValue: opacityValue || void 0
    };
    let properties = create(match2, context);
    if (!match2.dark) {
      let darkColorValue = context.d(section, colorMatch, colorValue);
      if (darkColorValue && darkColorValue !== colorValue) {
        match2._ = {
          value: toColorValue(darkColorValue, {
            opacityVariable: opacityVariable || void 0,
            opacityValue: opacityValue || "1"
          }),
          color: (options2) => toColorValue(darkColorValue, options2),
          opacityVariable: opacityVariable || void 0,
          opacityValue: opacityValue || void 0
        };
        properties = {
          "&": properties,
          [context.v("dark")]: create(match2, context)
        };
      }
    }
    return properties;
  }, (match2, context) => {
    let { section = camelize(match2[0]).replace("-", "") + "Color", opacitySection = section.replace("Color", "Opacity") } = options, isKeyLookup = match2.input.endsWith("-"), opacities = Object.entries(context.theme(opacitySection) || {}).filter(([key, value2]) => "DEFAULT" != key && /^[\w-]+$/.test(key) && "string" == typeof value2);
    if (isKeyLookup)
      return Object.entries(context.theme(section) || {}).filter(([key, value2]) => key && "DEFAULT" != key && [
        "string",
        "function"
      ].includes(typeof value2)).map(([key, value2]) => ({
        suffix: key.replace(/-DEFAULT/g, ""),
        theme: {
          section,
          key
        },
        color: toColorValue(value2, {
          opacityValue: context.theme(opacitySection, "DEFAULT") || "1"
        }),
        modifiers: ("function" == typeof value2 || "string" == typeof value2 && (value2.includes("<alpha-value>") || "#" == value2[0] && (4 == value2.length || 7 == value2.length))) && opacities.map(([key2, opacityValue]) => ({
          modifier: key2,
          theme: {
            section: opacitySection,
            key: key2
          },
          color: toColorValue(value2, {
            opacityValue
          })
        })).concat([
          {
            modifier: "[",
            color: toColorValue(value2, {
              opacityValue: "1"
            })
          }
        ])
      })).concat([
        {
          suffix: "["
        }
      ]);
    let value = context.theme(section, "DEFAULT");
    return value ? [
      {
        suffix: "",
        theme: {
          section,
          key: "DEFAULT"
        },
        color: toColorValue(value, {
          opacityValue: context.theme(opacitySection, "DEFAULT") || "1"
        }),
        modifiers: ("function" == typeof value || "string" == typeof value && (value.includes("<alpha-value>") || "#" == value[0] && (4 == value.length || 7 == value.length))) && opacities.map(([key, opacityValue]) => ({
          modifier: key,
          theme: {
            section: opacitySection,
            key
          },
          color: toColorValue(value, {
            opacityValue
          })
        })).concat([
          {
            modifier: "[",
            color: toColorValue(value, {
              opacityValue: "1"
            })
          }
        ])
      }
    ] : [];
  });
}
function parseValue(input) {
  return (input.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/) || []).slice(1);
}
function toCSS(property, value) {
  let properties = {};
  if ("string" == typeof value)
    properties[property] = value;
  else {
    value.opacityVariable && value.value.includes(value.opacityVariable) && (properties[value.opacityVariable] = value.opacityValue || "1");
    properties[property] = value.value;
  }
  return properties;
}
function arbitrary(value, section, context) {
  if ("[" == value[0] && "]" == value.slice(-1)) {
    value = normalize(resolveThemeFunction(value.slice(1, -1), context.theme));
    if (!section)
      return value;
    if (!(/color|fill|stroke/i.test(section) && !(/^color:/.test(value) || /^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(value)) || /image/i.test(section) && !(/^image:/.test(value) || /^[a-z-]+\(/.test(value)) || /weight/i.test(section) && !(/^(number|any):/.test(value) || /^\d+$/.test(value)) || /position/i.test(section) && /^(length|size):/.test(value)))
      return value.replace(/^[a-z-]+:/, "");
  }
}
function camelize(value) {
  return value.replace(/-./g, (x) => x[1].toUpperCase());
}
function normalize(value) {
  return value.includes("url(") ? value.replace(/(.*?)(url\(.*?\))(.*?)/g, (_, before = "", url, after = "") => normalize(before) + url + normalize(after)) : value.replace(/(^|[^\\])_+/g, (fullMatch, characterBefore) => characterBefore + " ".repeat(fullMatch.length - characterBefore.length)).replace(/\\_/g, "_").replace(/(calc|min|max|clamp)\(.+\)/g, (match2) => match2.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 "));
}
let kAutocomplete = /* @__PURE__ */ Symbol("@twind/autocomplete");
function withAutocomplete(rule18, autocomplete) {
  if (autocomplete) {
    if ("function" == typeof rule18)
      return Object.defineProperty(rule18, kAutocomplete, {
        value: autocomplete,
        configurable: true
      });
    let [pattern, resolve, convert2] = asArray(rule18);
    return [
      pattern,
      Object.defineProperty(fromMatch(resolve, convert2), kAutocomplete, {
        value: autocomplete,
        configurable: true
      })
    ];
  }
  return rule18;
}
function defineConfig({ presets = [], ...userConfig }) {
  let config2 = {
    darkMode: void 0,
    darkColor: void 0,
    preflight: false !== userConfig.preflight && [],
    theme: {},
    variants: asArray(userConfig.variants),
    rules: asArray(userConfig.rules),
    ignorelist: asArray(userConfig.ignorelist),
    hash: void 0,
    stringify: (property, value) => property + ":" + value,
    finalize: []
  };
  for (let preset of asArray([
    ...presets,
    {
      darkMode: userConfig.darkMode,
      darkColor: userConfig.darkColor,
      preflight: false !== userConfig.preflight && asArray(userConfig.preflight),
      theme: userConfig.theme,
      hash: userConfig.hash,
      stringify: userConfig.stringify,
      finalize: userConfig.finalize
    }
  ])) {
    let { preflight: preflight2, darkMode = config2.darkMode, darkColor = config2.darkColor, theme: theme2, variants: variants2, rules: rules2, ignorelist, hash: hash2 = config2.hash, stringify = config2.stringify, finalize } = "function" == typeof preset ? preset(config2) : preset;
    config2 = {
      preflight: false !== config2.preflight && false !== preflight2 && [
        ...config2.preflight,
        ...asArray(preflight2)
      ],
      darkMode,
      darkColor,
      theme: {
        ...config2.theme,
        ...theme2,
        extend: {
          ...config2.theme.extend,
          ...theme2 == null ? void 0 : theme2.extend
        }
      },
      variants: [
        ...config2.variants,
        ...asArray(variants2)
      ],
      rules: [
        ...config2.rules,
        ...asArray(rules2)
      ],
      ignorelist: [
        ...config2.ignorelist,
        ...asArray(ignorelist)
      ],
      hash: hash2,
      stringify,
      finalize: [
        ...config2.finalize,
        ...asArray(finalize)
      ]
    };
  }
  return config2;
}
function warn(message, code, detail) {
  if ("function" == typeof dispatchEvent && "function" == typeof CustomEvent) {
    let event = new CustomEvent("warning", {
      detail: {
        message,
        code,
        detail
      },
      cancelable: true
    });
    dispatchEvent(event);
    event.defaultPrevented || console.warn(`[${code}] ${message}`, {
      detail
    });
  } else
    "object" == typeof process && "function" == typeof process.emitWarning ? process.emitWarning(message, {
      code,
      detail
    }) : console.warn(`[${code}] ${message}`, {
      detail
    });
}
function find(value, list, cache2, getResolver, context, isDark) {
  for (let item of list) {
    let resolver = cache2.get(item);
    resolver || cache2.set(item, resolver = getResolver(item));
    let resolved = resolver(value, context, isDark);
    if (resolved)
      return resolved;
  }
}
function getVariantResolver(variant) {
  var resolve;
  return createResolve(variant[0], "function" == typeof (resolve = variant[1]) ? resolve : () => resolve);
}
function getRuleResolver(rule18) {
  var resolve, convert2;
  return Array.isArray(rule18) ? createResolve(rule18[0], fromMatch(rule18[1], rule18[2])) : createResolve(rule18, fromMatch(resolve, convert2));
}
function createResolve(patterns, resolve) {
  return createRegExpExecutor(patterns, (value, condition, context, isDark) => {
    let match2 = condition.exec(value);
    if (match2)
      return match2.$$ = value.slice(match2[0].length), match2.dark = isDark, resolve(match2, context);
  });
}
function createRegExpExecutor(patterns, run) {
  let conditions = asArray(patterns).map(toCondition);
  return (value, context, isDark) => {
    for (let condition of conditions) {
      let result = run(value, condition, context, isDark);
      if (result)
        return result;
    }
  };
}
function toCondition(value) {
  return "string" == typeof value ? RegExp("^" + value + (value.includes("$") || "-" == value.slice(-1) ? "" : "$")) : value;
}
function twind(userConfig, sheet) {
  let config2 = defineConfig(userConfig), context = function({ theme: theme2, darkMode, darkColor = noop, variants: variants2, rules: rules2, hash: hash$1, stringify, ignorelist, finalize }) {
    let variantCache = /* @__PURE__ */ new Map(), variantResolvers = /* @__PURE__ */ new Map(), ruleCache = /* @__PURE__ */ new Map(), ruleResolvers = /* @__PURE__ */ new Map(), ignored = createRegExpExecutor(ignorelist, (value, condition) => condition.test(value)), reportedUnknownClasses = /* @__PURE__ */ new Set();
    variants2.push([
      "dark",
      Array.isArray(darkMode) || "class" == darkMode ? `${asArray(darkMode)[1] || ".dark"} &` : "string" == typeof darkMode && "media" != darkMode ? darkMode : "@media (prefers-color-scheme:dark)"
    ]);
    let h = "function" == typeof hash$1 ? (value) => hash$1(value, hash) : hash$1 ? hash : identity;
    h !== identity && finalize.push((rule18) => {
      var _a;
      return {
        ...rule18,
        n: rule18.n && h(rule18.n),
        d: (_a = rule18.d) == null ? void 0 : _a.replace(/--(tw(?:-[\w-]+)?)\b/g, (_, property) => "--" + h(property).replace("#", ""))
      };
    });
    let ctx = {
      theme: function({ extend = {}, ...base }) {
        let resolved = {}, resolveContext = {
          get colors() {
            return theme3("colors");
          },
          theme: theme3,
          negative() {
            return {};
          },
          breakpoints(screens) {
            let breakpoints = {};
            for (let key in screens)
              "string" == typeof screens[key] && (breakpoints["screen-" + key] = screens[key]);
            return breakpoints;
          }
        };
        return theme3;
        function theme3(sectionKey, key, defaultValue, opacityValue) {
          var _a, _b;
          if (sectionKey) {
            ({ 1: sectionKey, 2: opacityValue } = /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(sectionKey) || [
              ,
              sectionKey
            ]);
            if (/[.[]/.test(sectionKey)) {
              let path = [];
              sectionKey.replace(/\[([^\]]+)\]|([^.[]+)/g, (_, $1, $2 = $1) => path.push($2));
              sectionKey = path.shift();
              defaultValue = key;
              key = path.join("-");
            }
            let section = resolved[sectionKey] || Object.assign(Object.assign(
              resolved[sectionKey] = {},
              deref(base, sectionKey)
            ), deref(extend, sectionKey));
            if (null == key)
              return section;
            key || (key = "DEFAULT");
            let value = (_b = (_a = section[key]) != null ? _a : key.split("-").reduce((obj, prop) => obj == null ? void 0 : obj[prop], section)) != null ? _b : defaultValue;
            return opacityValue ? toColorValue(value, {
              opacityValue: resolveThemeFunction(opacityValue, theme3)
            }) : value;
          }
          let result = {};
          for (let section1 of [
            ...Object.keys(base),
            ...Object.keys(extend)
          ])
            result[section1] = theme3(section1);
          return result;
        }
        function deref(source, section) {
          let value = source[section];
          return ("function" == typeof value && (value = value(resolveContext)), value && /color|fill|stroke/i.test(section)) ? function flattenColorPalette(colors2, path = []) {
            let flattend = {};
            for (let key in colors2) {
              let value2 = colors2[key], keyPath = [
                ...path,
                key
              ];
              flattend[keyPath.join("-")] = value2;
              if ("DEFAULT" == key) {
                keyPath = path;
                flattend[path.join("-")] = value2;
              }
              "object" == typeof value2 && Object.assign(flattend, flattenColorPalette(value2, keyPath));
            }
            return flattend;
          }(value) : value;
        }
      }(theme2),
      e: escape,
      h,
      s(property, value) {
        return stringify(property, value, ctx);
      },
      d(section, key, color) {
        return darkColor(section, key, ctx, color);
      },
      v(value) {
        return variantCache.has(value) || variantCache.set(value, find(value, variants2, variantResolvers, getVariantResolver, ctx) || "&:" + value), variantCache.get(value);
      },
      r(className, isDark) {
        let key = JSON.stringify([
          className,
          isDark
        ]);
        if (!ruleCache.has(key)) {
          ruleCache.set(key, !ignored(className, ctx) && find(className, rules2, ruleResolvers, getRuleResolver, ctx, isDark));
          {
            let rule18 = ruleCache.get(key);
            if (null == rule18 && !reportedUnknownClasses.has(className)) {
              reportedUnknownClasses.add(className);
              warn(`Unknown class ${JSON.stringify(className)} found.`, "TWIND_INVALID_CLASS", className);
            }
          }
        }
        return ruleCache.get(key);
      },
      f(rule18) {
        return finalize.reduce((rule19, p) => p(rule19, ctx), rule18);
      }
    };
    return ctx;
  }(config2), cache2 = /* @__PURE__ */ new Map(), sortedPrecedences = [], insertedRules = /* @__PURE__ */ new Set();
  sheet.resume((className) => cache2.set(className, className), (cssText, rule18) => {
    sheet.insert(cssText, sortedPrecedences.length, rule18);
    sortedPrecedences.push(rule18);
    insertedRules.add(cssText);
  });
  function insert(rule18) {
    let finalRule = context.f(rule18), cssText = stringify$1(finalRule);
    if (cssText && !insertedRules.has(cssText)) {
      insertedRules.add(cssText);
      let index = sortedInsertionIndex(sortedPrecedences, rule18);
      sheet.insert(cssText, index, rule18);
      sortedPrecedences.splice(index, 0, rule18);
    }
    return finalRule.n;
  }
  return Object.defineProperties(function tw2(tokens) {
    if (!cache2.size)
      for (let preflight2 of asArray(config2.preflight)) {
        "function" == typeof preflight2 && (preflight2 = preflight2(context));
        preflight2 && ("string" == typeof preflight2 ? translateWith("", Layer.b, parse(preflight2), context, Layer.b, [], false, true) : serialize(preflight2, {}, context, Layer.b)).forEach(insert);
      }
    tokens = "" + tokens;
    let className = cache2.get(tokens);
    if (!className) {
      let classNames = /* @__PURE__ */ new Set();
      for (let rule18 of translate(parse(tokens), context))
        classNames.add(rule18.c).add(insert(rule18));
      className = [
        ...classNames
      ].filter(Boolean).join(" ");
      cache2.set(tokens, className).set(className, className);
    }
    return className;
  }, Object.getOwnPropertyDescriptors({
    get target() {
      return sheet.target;
    },
    theme: context.theme,
    config: config2,
    snapshot() {
      let restoreSheet = sheet.snapshot(), insertedRules$ = new Set(insertedRules), cache$ = new Map(cache2), sortedPrecedences$ = [
        ...sortedPrecedences
      ];
      return () => {
        restoreSheet();
        insertedRules = insertedRules$;
        cache2 = cache$;
        sortedPrecedences = sortedPrecedences$;
      };
    },
    clear() {
      sheet.clear();
      insertedRules = /* @__PURE__ */ new Set();
      cache2 = /* @__PURE__ */ new Map();
      sortedPrecedences = [];
    },
    destroy() {
      this.clear();
      sheet.destroy();
    }
  }));
}
function changed(a2, b) {
  return a2 != b && "" + a2.split(" ").sort() != "" + b.split(" ").sort();
}
function mo(tw2) {
  let observer = new MutationObserver(handleMutationRecords);
  return {
    observe(target) {
      observer.observe(target, {
        attributeFilter: [
          "class"
        ],
        subtree: true,
        childList: true
      });
      handleClassAttributeChange(target);
      handleMutationRecords([
        {
          target,
          type: ""
        }
      ]);
    },
    disconnect() {
      observer.disconnect();
    }
  };
  function handleMutationRecords(records) {
    for (let { type, target } of records)
      if ("a" == type[0])
        handleClassAttributeChange(target);
      else
        for (let el of target.querySelectorAll("[class]"))
          handleClassAttributeChange(el);
    observer.takeRecords();
  }
  function handleClassAttributeChange(target) {
    var _a;
    let className;
    let tokens = (_a = target.getAttribute) == null ? void 0 : _a.call(target, "class");
    tokens && changed(tokens, className = tw2(tokens)) && target.setAttribute("class", className);
  }
}
function observe(tw$1 = tw, target = "undefined" != typeof document && document.documentElement) {
  if (target) {
    let observer = mo(tw$1);
    observer.observe(target);
    let { destroy } = tw$1;
    tw$1.destroy = () => {
      observer.disconnect();
      destroy.call(tw$1);
    };
  }
  return tw$1;
}
function getStyleElement(selector) {
  let style = document.querySelector(selector || 'style[data-twind=""]');
  if (!style || "STYLE" != style.tagName) {
    style = document.createElement("style");
    document.head.prepend(style);
  }
  return style.dataset.twind = "claimed", style;
}
function cssom(element) {
  let target = (element == null ? void 0 : element.cssRules) ? element : (element && "string" != typeof element ? element : getStyleElement(element)).sheet;
  return {
    target,
    snapshot() {
      let rules2 = Array.from(target.cssRules, (rule18) => rule18.cssText);
      return () => {
        this.clear();
        rules2.forEach(this.insert);
      };
    },
    clear() {
      for (let index = target.cssRules.length; index--; )
        target.deleteRule(index);
    },
    destroy() {
      var _a;
      (_a = target.ownerNode) == null ? void 0 : _a.remove();
    },
    insert(cssText, index) {
      try {
        target.insertRule(cssText, index);
      } catch (error) {
        target.insertRule(":root{}", index);
        /:-[mwo]/.test(cssText) || warn(error.message, "TWIND_INVALID_CSS", cssText);
      }
    },
    resume: noop
  };
}
function assertActive() {
  throw Error("No active twind instance found. Make sure to call setup or install before accessing tw.");
}
let tw = /* @__PURE__ */ new Proxy(
  noop,
  {
    apply(_target, _thisArg, args) {
      return assertActive(), active(args[0]);
    },
    get(target, property) {
      if (property in target)
        return target[property];
      assertActive();
      let value = active[property];
      return "function" == typeof value ? function() {
        return assertActive(), value.apply(active, arguments);
      } : value;
    }
  }
);
(function() {
  if (typeof document === "undefined" || "adoptedStyleSheets" in document) {
    return;
  }
  var hasShadyCss = "ShadyCSS" in window && !ShadyCSS.nativeShadow;
  var bootstrapper = document.implementation.createHTMLDocument("");
  var closedShadowRootRegistry = /* @__PURE__ */ new WeakMap();
  var _DOMException = typeof DOMException === "object" ? Error : DOMException;
  var defineProperty = Object.defineProperty;
  var forEach = Array.prototype.forEach;
  var importPattern = /@import.+?;?$/gm;
  function rejectImports(contents) {
    var _contents = contents.replace(importPattern, "");
    if (_contents !== contents) {
      console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418");
    }
    return _contents.trim();
  }
  function isElementConnected(element) {
    return "isConnected" in element ? element.isConnected : document.contains(element);
  }
  function unique(arr) {
    return arr.filter(function(value, index) {
      return arr.indexOf(value) === index;
    });
  }
  function diff(arr1, arr2) {
    return arr1.filter(function(value) {
      return arr2.indexOf(value) === -1;
    });
  }
  function removeNode(node) {
    node.parentNode.removeChild(node);
  }
  function getShadowRoot(element) {
    return element.shadowRoot || closedShadowRootRegistry.get(element);
  }
  var cssStyleSheetMethods = [
    "addRule",
    "deleteRule",
    "insertRule",
    "removeRule"
  ];
  var NonConstructedStyleSheet = CSSStyleSheet;
  var nonConstructedProto = NonConstructedStyleSheet.prototype;
  nonConstructedProto.replace = function() {
    return Promise.reject(new _DOMException("Can't call replace on non-constructed CSSStyleSheets."));
  };
  nonConstructedProto.replaceSync = function() {
    throw new _DOMException("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.");
  };
  function isCSSStyleSheetInstance(instance) {
    return typeof instance === "object" ? proto$1.isPrototypeOf(instance) || nonConstructedProto.isPrototypeOf(instance) : false;
  }
  function isNonConstructedStyleSheetInstance(instance) {
    return typeof instance === "object" ? nonConstructedProto.isPrototypeOf(instance) : false;
  }
  var $basicStyleElement = /* @__PURE__ */ new WeakMap();
  var $locations = /* @__PURE__ */ new WeakMap();
  var $adoptersByLocation = /* @__PURE__ */ new WeakMap();
  var $appliedMethods = /* @__PURE__ */ new WeakMap();
  function addAdopterLocation(sheet, location) {
    var adopter = document.createElement("style");
    $adoptersByLocation.get(sheet).set(location, adopter);
    $locations.get(sheet).push(location);
    return adopter;
  }
  function getAdopterByLocation(sheet, location) {
    return $adoptersByLocation.get(sheet).get(location);
  }
  function removeAdopterLocation(sheet, location) {
    $adoptersByLocation.get(sheet).delete(location);
    $locations.set(sheet, $locations.get(sheet).filter(function(_location) {
      return _location !== location;
    }));
  }
  function restyleAdopter(sheet, adopter) {
    requestAnimationFrame(function() {
      adopter.textContent = $basicStyleElement.get(sheet).textContent;
      $appliedMethods.get(sheet).forEach(function(command) {
        return adopter.sheet[command.method].apply(adopter.sheet, command.args);
      });
    });
  }
  function checkInvocationCorrectness(self) {
    if (!$basicStyleElement.has(self)) {
      throw new TypeError("Illegal invocation");
    }
  }
  function ConstructedStyleSheet() {
    var self = this;
    var style = document.createElement("style");
    bootstrapper.body.appendChild(style);
    $basicStyleElement.set(self, style);
    $locations.set(self, []);
    $adoptersByLocation.set(self, /* @__PURE__ */ new WeakMap());
    $appliedMethods.set(self, []);
  }
  var proto$1 = ConstructedStyleSheet.prototype;
  proto$1.replace = function replace(contents) {
    try {
      this.replaceSync(contents);
      return Promise.resolve(this);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  proto$1.replaceSync = function replaceSync(contents) {
    checkInvocationCorrectness(this);
    if (typeof contents === "string") {
      var self_1 = this;
      $basicStyleElement.get(self_1).textContent = rejectImports(contents);
      $appliedMethods.set(self_1, []);
      $locations.get(self_1).forEach(function(location) {
        if (location.isConnected()) {
          restyleAdopter(self_1, getAdopterByLocation(self_1, location));
        }
      });
    }
  };
  defineProperty(proto$1, "cssRules", {
    configurable: true,
    enumerable: true,
    get: function cssRules() {
      checkInvocationCorrectness(this);
      return $basicStyleElement.get(this).sheet.cssRules;
    }
  });
  defineProperty(proto$1, "media", {
    configurable: true,
    enumerable: true,
    get: function media() {
      checkInvocationCorrectness(this);
      return $basicStyleElement.get(this).sheet.media;
    }
  });
  cssStyleSheetMethods.forEach(function(method) {
    proto$1[method] = function() {
      var self = this;
      checkInvocationCorrectness(self);
      var args = arguments;
      $appliedMethods.get(self).push({ method, args });
      $locations.get(self).forEach(function(location) {
        if (location.isConnected()) {
          var sheet = getAdopterByLocation(self, location).sheet;
          sheet[method].apply(sheet, args);
        }
      });
      var basicSheet = $basicStyleElement.get(self).sheet;
      return basicSheet[method].apply(basicSheet, args);
    };
  });
  defineProperty(ConstructedStyleSheet, Symbol.hasInstance, {
    configurable: true,
    value: isCSSStyleSheetInstance
  });
  var defaultObserverOptions = {
    childList: true,
    subtree: true
  };
  var locations = /* @__PURE__ */ new WeakMap();
  function getAssociatedLocation(element) {
    var location = locations.get(element);
    if (!location) {
      location = new Location(element);
      locations.set(element, location);
    }
    return location;
  }
  function attachAdoptedStyleSheetProperty(constructor) {
    defineProperty(constructor.prototype, "adoptedStyleSheets", {
      configurable: true,
      enumerable: true,
      get: function() {
        return getAssociatedLocation(this).sheets;
      },
      set: function(sheets) {
        getAssociatedLocation(this).update(sheets);
      }
    });
  }
  function traverseWebComponents(node, callback) {
    var iter = document.createNodeIterator(
      node,
      NodeFilter.SHOW_ELEMENT,
      function(foundNode) {
        return getShadowRoot(foundNode) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
      null,
      false
    );
    for (var next = void 0; next = iter.nextNode(); ) {
      callback(getShadowRoot(next));
    }
  }
  var $element = /* @__PURE__ */ new WeakMap();
  var $uniqueSheets = /* @__PURE__ */ new WeakMap();
  var $observer = /* @__PURE__ */ new WeakMap();
  function isExistingAdopter(self, element) {
    return element instanceof HTMLStyleElement && $uniqueSheets.get(self).some(function(sheet) {
      return getAdopterByLocation(sheet, self);
    });
  }
  function getAdopterContainer(self) {
    var element = $element.get(self);
    return element instanceof Document ? element.body : element;
  }
  function adopt(self) {
    var styleList = document.createDocumentFragment();
    var sheets = $uniqueSheets.get(self);
    var observer = $observer.get(self);
    var container = getAdopterContainer(self);
    observer.disconnect();
    sheets.forEach(function(sheet) {
      styleList.appendChild(getAdopterByLocation(sheet, self) || addAdopterLocation(sheet, self));
    });
    container.insertBefore(styleList, null);
    observer.observe(container, defaultObserverOptions);
    sheets.forEach(function(sheet) {
      restyleAdopter(sheet, getAdopterByLocation(sheet, self));
    });
  }
  function Location(element) {
    var self = this;
    self.sheets = [];
    $element.set(self, element);
    $uniqueSheets.set(self, []);
    $observer.set(self, new MutationObserver(function(mutations, observer) {
      if (!document) {
        observer.disconnect();
        return;
      }
      mutations.forEach(function(mutation) {
        if (!hasShadyCss) {
          forEach.call(mutation.addedNodes, function(node) {
            if (!(node instanceof Element)) {
              return;
            }
            traverseWebComponents(node, function(root) {
              getAssociatedLocation(root).connect();
            });
          });
        }
        forEach.call(mutation.removedNodes, function(node) {
          if (!(node instanceof Element)) {
            return;
          }
          if (isExistingAdopter(self, node)) {
            adopt(self);
          }
          if (!hasShadyCss) {
            traverseWebComponents(node, function(root) {
              getAssociatedLocation(root).disconnect();
            });
          }
        });
      });
    }));
  }
  Location.prototype = {
    isConnected: function() {
      var element = $element.get(this);
      return element instanceof Document ? element.readyState !== "loading" : isElementConnected(element.host);
    },
    connect: function() {
      var container = getAdopterContainer(this);
      $observer.get(this).observe(container, defaultObserverOptions);
      if ($uniqueSheets.get(this).length > 0) {
        adopt(this);
      }
      traverseWebComponents(container, function(root) {
        getAssociatedLocation(root).connect();
      });
    },
    disconnect: function() {
      $observer.get(this).disconnect();
    },
    update: function(sheets) {
      var self = this;
      var locationType = $element.get(self) === document ? "Document" : "ShadowRoot";
      if (!Array.isArray(sheets)) {
        throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Iterator getter is not callable.");
      }
      if (!sheets.every(isCSSStyleSheetInstance)) {
        throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Failed to convert value to 'CSSStyleSheet'");
      }
      if (sheets.some(isNonConstructedStyleSheetInstance)) {
        throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Can't adopt non-constructed stylesheets");
      }
      self.sheets = sheets;
      var oldUniqueSheets = $uniqueSheets.get(self);
      var uniqueSheets = unique(sheets);
      var removedSheets = diff(oldUniqueSheets, uniqueSheets);
      removedSheets.forEach(function(sheet) {
        removeNode(getAdopterByLocation(sheet, self));
        removeAdopterLocation(sheet, self);
      });
      $uniqueSheets.set(self, uniqueSheets);
      if (self.isConnected() && uniqueSheets.length > 0) {
        adopt(self);
      }
    }
  };
  window.CSSStyleSheet = ConstructedStyleSheet;
  attachAdoptedStyleSheetProperty(Document);
  if ("ShadowRoot" in window) {
    attachAdoptedStyleSheetProperty(ShadowRoot);
    var proto = Element.prototype;
    var attach_1 = proto.attachShadow;
    proto.attachShadow = function attachShadow(init) {
      var root = attach_1.call(this, init);
      if (init.mode === "closed") {
        closedShadowRootRegistry.set(this, root);
      }
      return root;
    };
  }
  var documentLocation = getAssociatedLocation(document);
  if (documentLocation.isConnected()) {
    documentLocation.connect();
  } else {
    document.addEventListener("DOMContentLoaded", documentLocation.connect.bind(documentLocation));
  }
})();
let theme = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  columns: {
    auto: "auto",
    "3xs": "16rem",
    "2xs": "18rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem"
  },
  spacing: {
    px: "1px",
    0: "0px",
    .../* @__PURE__ */ linear(4, "rem", 4, 0.5, 0.5),
    .../* @__PURE__ */ linear(12, "rem", 4, 5),
    14: "3.5rem",
    .../* @__PURE__ */ linear(64, "rem", 4, 16, 4),
    72: "18rem",
    80: "20rem",
    96: "24rem"
  },
  durations: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
  },
  animation: {
    none: "none",
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
    bounce: "bounce 1s infinite"
  },
  aspectRatio: {
    auto: "auto",
    square: "1/1",
    video: "16/9"
  },
  backdropBlur: /* @__PURE__ */ alias("blur"),
  backdropBrightness: /* @__PURE__ */ alias("brightness"),
  backdropContrast: /* @__PURE__ */ alias("contrast"),
  backdropGrayscale: /* @__PURE__ */ alias("grayscale"),
  backdropHueRotate: /* @__PURE__ */ alias("hueRotate"),
  backdropInvert: /* @__PURE__ */ alias("invert"),
  backdropOpacity: /* @__PURE__ */ alias("opacity"),
  backdropSaturate: /* @__PURE__ */ alias("saturate"),
  backdropSepia: /* @__PURE__ */ alias("sepia"),
  backgroundColor: /* @__PURE__ */ alias("colors"),
  backgroundImage: {
    none: "none"
  },
  backgroundOpacity: /* @__PURE__ */ alias("opacity"),
  backgroundSize: {
    auto: "auto",
    cover: "cover",
    contain: "contain"
  },
  blur: {
    none: "none",
    0: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px"
  },
  brightness: {
    .../* @__PURE__ */ linear(200, "", 100, 0, 50),
    .../* @__PURE__ */ linear(110, "", 100, 90, 5),
    75: "0.75",
    125: "1.25"
  },
  borderColor: ({ theme: theme2 }) => ({
    DEFAULT: theme2("colors.gray.200", "currentColor"),
    ...theme2("colors")
  }),
  borderOpacity: /* @__PURE__ */ alias("opacity"),
  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "1/2": "50%",
    full: "9999px"
  },
  borderSpacing: /* @__PURE__ */ alias("spacing"),
  borderWidth: {
    DEFAULT: "1px",
    .../* @__PURE__ */ exponential(8, "px")
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)",
    none: "0 0 #0000"
  },
  boxShadowColor: alias("colors"),
  caretColor: /* @__PURE__ */ alias("colors"),
  accentColor: ({ theme: theme2 }) => ({
    auto: "auto",
    ...theme2("colors")
  }),
  contrast: {
    .../* @__PURE__ */ linear(200, "", 100, 0, 50),
    75: "0.75",
    125: "1.25"
  },
  content: {
    none: "none"
  },
  divideColor: /* @__PURE__ */ alias("borderColor"),
  divideOpacity: /* @__PURE__ */ alias("borderOpacity"),
  divideWidth: /* @__PURE__ */ alias("borderWidth"),
  dropShadow: {
    sm: "0 1px 1px rgba(0,0,0,0.05)",
    DEFAULT: [
      "0 1px 2px rgba(0,0,0,0.1)",
      "0 1px 1px rgba(0,0,0,0.06)"
    ],
    md: [
      "0 4px 3px rgba(0,0,0,0.07)",
      "0 2px 2px rgba(0,0,0,0.06)"
    ],
    lg: [
      "0 10px 8px rgba(0,0,0,0.04)",
      "0 4px 3px rgba(0,0,0,0.1)"
    ],
    xl: [
      "0 20px 13px rgba(0,0,0,0.03)",
      "0 8px 5px rgba(0,0,0,0.08)"
    ],
    "2xl": "0 25px 25px rgba(0,0,0,0.15)",
    none: "0 0 #0000"
  },
  fill: ({ theme: theme2 }) => ({
    ...theme2("colors"),
    none: "none"
  }),
  grayscale: {
    DEFAULT: "100%",
    0: "0"
  },
  hueRotate: {
    0: "0deg",
    15: "15deg",
    30: "30deg",
    60: "60deg",
    90: "90deg",
    180: "180deg"
  },
  invert: {
    DEFAULT: "100%",
    0: "0"
  },
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  },
  flexBasis: ({ theme: theme2 }) => ({
    ...theme2("spacing"),
    ...ratios(2, 6),
    ...ratios(12, 12),
    auto: "auto",
    full: "100%"
  }),
  flexGrow: {
    DEFAULT: 1,
    0: 0
  },
  flexShrink: {
    DEFAULT: 1,
    0: 0
  },
  fontFamily: {
    sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(","),
    serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(","),
    mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(",")
  },
  fontSize: {
    xs: [
      "0.75rem",
      "1rem"
    ],
    sm: [
      "0.875rem",
      "1.25rem"
    ],
    base: [
      "1rem",
      "1.5rem"
    ],
    lg: [
      "1.125rem",
      "1.75rem"
    ],
    xl: [
      "1.25rem",
      "1.75rem"
    ],
    "2xl": [
      "1.5rem",
      "2rem"
    ],
    "3xl": [
      "1.875rem",
      "2.25rem"
    ],
    "4xl": [
      "2.25rem",
      "2.5rem"
    ],
    "5xl": [
      "3rem",
      "1"
    ],
    "6xl": [
      "3.75rem",
      "1"
    ],
    "7xl": [
      "4.5rem",
      "1"
    ],
    "8xl": [
      "6rem",
      "1"
    ],
    "9xl": [
      "8rem",
      "1"
    ]
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  gap: /* @__PURE__ */ alias("spacing"),
  gradientColorStops: /* @__PURE__ */ alias("colors"),
  gridAutoColumns: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0,1fr)"
  },
  gridAutoRows: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0,1fr)"
  },
  gridColumn: {
    auto: "auto",
    "span-full": "1 / -1"
  },
  gridRow: {
    auto: "auto",
    "span-full": "1 / -1"
  },
  gridTemplateColumns: {
    none: "none"
  },
  gridTemplateRows: {
    none: "none"
  },
  height: ({ theme: theme2 }) => ({
    ...theme2("spacing"),
    ...ratios(2, 6),
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    auto: "auto",
    full: "100%",
    screen: "100vh"
  }),
  inset: ({ theme: theme2 }) => ({
    ...theme2("spacing"),
    ...ratios(2, 4),
    auto: "auto",
    full: "100%"
  }),
  keyframes: {
    spin: {
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(360deg)"
      }
    },
    ping: {
      "0%": {
        transform: "scale(1)",
        opacity: "1"
      },
      "75%,100%": {
        transform: "scale(2)",
        opacity: "0"
      }
    },
    pulse: {
      "0%,100%": {
        opacity: "1"
      },
      "50%": {
        opacity: ".5"
      }
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
      }
    }
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeight: {
    .../* @__PURE__ */ linear(10, "rem", 4, 3),
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2"
  },
  margin: ({ theme: theme2 }) => ({
    auto: "auto",
    ...theme2("spacing")
  }),
  maxHeight: ({ theme: theme2 }) => ({
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vh",
    ...theme2("spacing")
  }),
  maxWidth: ({ theme: theme2, breakpoints }) => ({
    ...breakpoints(theme2("screens")),
    none: "none",
    0: "0rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    prose: "65ch"
  }),
  minHeight: {
    0: "0px",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vh"
  },
  minWidth: {
    0: "0px",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  opacity: {
    .../* @__PURE__ */ linear(100, "", 100, 0, 10),
    5: "0.05",
    25: "0.25",
    75: "0.75",
    95: "0.95"
  },
  order: {
    first: "-9999",
    last: "9999",
    none: "0"
  },
  padding: /* @__PURE__ */ alias("spacing"),
  placeholderColor: /* @__PURE__ */ alias("colors"),
  placeholderOpacity: /* @__PURE__ */ alias("opacity"),
  outlineColor: /* @__PURE__ */ alias("colors"),
  outlineOffset: /* @__PURE__ */ exponential(8, "px"),
  outlineWidth: /* @__PURE__ */ exponential(8, "px"),
  ringColor: ({ theme: theme2 }) => ({
    ...theme2("colors"),
    DEFAULT: "#3b82f6"
  }),
  ringOffsetColor: /* @__PURE__ */ alias("colors"),
  ringOffsetWidth: /* @__PURE__ */ exponential(8, "px"),
  ringOpacity: ({ theme: theme2 }) => ({
    ...theme2("opacity"),
    DEFAULT: "0.5"
  }),
  ringWidth: {
    DEFAULT: "3px",
    .../* @__PURE__ */ exponential(8, "px")
  },
  rotate: {
    .../* @__PURE__ */ exponential(2, "deg"),
    .../* @__PURE__ */ exponential(12, "deg", 3),
    .../* @__PURE__ */ exponential(180, "deg", 45)
  },
  saturate: /* @__PURE__ */ linear(200, "", 100, 0, 50),
  scale: {
    .../* @__PURE__ */ linear(150, "", 100, 0, 50),
    .../* @__PURE__ */ linear(110, "", 100, 90, 5),
    75: "0.75",
    125: "1.25"
  },
  scrollMargin: /* @__PURE__ */ alias("spacing"),
  scrollPadding: /* @__PURE__ */ alias("spacing"),
  sepia: {
    0: "0",
    DEFAULT: "100%"
  },
  skew: {
    .../* @__PURE__ */ exponential(2, "deg"),
    .../* @__PURE__ */ exponential(12, "deg", 3)
  },
  space: /* @__PURE__ */ alias("spacing"),
  stroke: ({ theme: theme2 }) => ({
    ...theme2("colors"),
    none: "none"
  }),
  strokeWidth: /* @__PURE__ */ linear(2),
  textColor: /* @__PURE__ */ alias("colors"),
  textDecorationColor: /* @__PURE__ */ alias("colors"),
  textDecorationThickness: {
    "from-font": "from-font",
    auto: "auto",
    .../* @__PURE__ */ exponential(8, "px")
  },
  textUnderlineOffset: {
    auto: "auto",
    .../* @__PURE__ */ exponential(8, "px")
  },
  textIndent: /* @__PURE__ */ alias("spacing"),
  textOpacity: /* @__PURE__ */ alias("opacity"),
  transitionDuration: ({ theme: theme2 }) => ({
    ...theme2("durations"),
    DEFAULT: "150ms"
  }),
  transitionDelay: /* @__PURE__ */ alias("durations"),
  transitionProperty: {
    none: "none",
    all: "all",
    DEFAULT: "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
    colors: "color,background-color,border-color,text-decoration-color,fill,stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
    linear: "linear",
    in: "cubic-bezier(0.4,0,1,1)",
    out: "cubic-bezier(0,0,0.2,1)",
    "in-out": "cubic-bezier(0.4,0,0.2,1)"
  },
  translate: ({ theme: theme2 }) => ({
    ...theme2("spacing"),
    ...ratios(2, 4),
    full: "100%"
  }),
  width: ({ theme: theme2 }) => ({
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vw",
    ...theme2("flexBasis")
  }),
  willChange: {
    scroll: "scroll-position"
  },
  zIndex: {
    .../* @__PURE__ */ linear(50, "", 1, 0, 10),
    auto: "auto"
  }
};
function ratios(start, end) {
  let result = {};
  do
    for (var dividend = 1; dividend < start; dividend++)
      result[`${dividend}/${start}`] = Number((dividend / start * 100).toFixed(6)) + "%";
  while (++start <= end);
  return result;
}
function exponential(stop, unit, start = 0) {
  let result = {};
  for (; start <= stop; start = 2 * start || 1)
    result[start] = start + unit;
  return result;
}
function linear(stop, unit = "", divideBy = 1, start = 0, step = 1, result = {}) {
  for (; start <= stop; start += step)
    result[start] = start / divideBy + unit;
  return result;
}
function alias(section) {
  return ({ theme: theme2 }) => theme2(section);
}
let preflight = {
  "*,::before,::after": {
    boxSizing: "border-box",
    borderWidth: "0",
    borderStyle: "solid",
    borderColor: "theme(borderColor.DEFAULT, currentColor)"
  },
  "::before,::after": {
    "--tw-content": "''"
  },
  html: {
    lineHeight: 1.5,
    WebkitTextSizeAdjust: "100%",
    MozTabSize: "4",
    tabSize: 4,
    fontFamily: `theme(fontFamily.sans, ${theme.fontFamily.sans})`,
    fontFeatureSettings: "theme(fontFamily.sans[1].fontFeatureSettings, normal)"
  },
  body: {
    margin: "0",
    lineHeight: "inherit"
  },
  hr: {
    height: "0",
    color: "inherit",
    borderTopWidth: "1px"
  },
  "abbr:where([title])": {
    textDecoration: "underline dotted"
  },
  "h1,h2,h3,h4,h5,h6": {
    fontSize: "inherit",
    fontWeight: "inherit"
  },
  a: {
    color: "inherit",
    textDecoration: "inherit"
  },
  "b,strong": {
    fontWeight: "bolder"
  },
  "code,kbd,samp,pre": {
    fontFamily: `theme(fontFamily.mono, ${theme.fontFamily.mono})`,
    fontFeatureSettings: "theme(fontFamily.mono[1].fontFeatureSettings, normal)",
    fontSize: "1em"
  },
  small: {
    fontSize: "80%"
  },
  "sub,sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline"
  },
  sub: {
    bottom: "-0.25em"
  },
  sup: {
    top: "-0.5em"
  },
  table: {
    textIndent: "0",
    borderColor: "inherit",
    borderCollapse: "collapse"
  },
  "button,input,optgroup,select,textarea": {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    color: "inherit",
    margin: "0",
    padding: "0"
  },
  "button,select": {
    textTransform: "none"
  },
  "button,[type='button'],[type='reset'],[type='submit']": {
    WebkitAppearance: "button",
    backgroundColor: "transparent",
    backgroundImage: "none"
  },
  ":-moz-focusring": {
    outline: "auto"
  },
  ":-moz-ui-invalid": {
    boxShadow: "none"
  },
  progress: {
    verticalAlign: "baseline"
  },
  "::-webkit-inner-spin-button,::-webkit-outer-spin-button": {
    height: "auto"
  },
  "[type='search']": {
    WebkitAppearance: "textfield",
    outlineOffset: "-2px"
  },
  "::-webkit-search-decoration": {
    WebkitAppearance: "none"
  },
  "::-webkit-file-upload-button": {
    WebkitAppearance: "button",
    font: "inherit"
  },
  summary: {
    display: "list-item"
  },
  "blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre": {
    margin: "0"
  },
  fieldset: {
    margin: "0",
    padding: "0"
  },
  legend: {
    padding: "0"
  },
  "ol,ul,menu": {
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  textarea: {
    resize: "vertical"
  },
  "input::placeholder,textarea::placeholder": {
    opacity: 1,
    color: "theme(colors.gray.400, #9ca3af)"
  },
  'button,[role="button"]': {
    cursor: "pointer"
  },
  ":disabled": {
    cursor: "default"
  },
  "img,svg,video,canvas,audio,iframe,embed,object": {
    display: "block",
    verticalAlign: "middle"
  },
  "img,video": {
    maxWidth: "100%",
    height: "auto"
  },
  "[hidden]": {
    display: "none"
  }
};
var rule, rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10, rule11, rule12, rule13, rule14, rule15, rule16, rule17;
let rules = [
  match("\\[([-\\w]+):(.+)]", ({ 1: $1, 2: $2 }, context) => ({
    "@layer overrides": {
      "&": {
        [$1]: arbitrary(`[${$2}]`, "", context)
      }
    }
  })),
  (rule = match("(group|peer)([~/][^-[]+)?", ({ input }, { h }) => [
    {
      c: h(input)
    }
  ]), withAutocomplete(rule, () => [
    "group",
    "peer"
  ])),
  matchTheme("aspect-", "aspectRatio"),
  match("container", (_, { theme: theme2 }) => {
    let { screens = theme2("screens"), center, padding } = theme2("container"), rules2 = {
      width: "100%",
      marginRight: center && "auto",
      marginLeft: center && "auto",
      ...paddingFor("xs")
    };
    for (let screen in screens) {
      let value = screens[screen];
      "string" == typeof value && (rules2[mql(value)] = {
        "&": {
          maxWidth: value,
          ...paddingFor(screen)
        }
      });
    }
    return rules2;
    function paddingFor(screen) {
      let value = padding && ("string" == typeof padding ? padding : padding[screen] || padding.DEFAULT);
      if (value)
        return {
          paddingRight: value,
          paddingLeft: value
        };
    }
  }),
  matchTheme("content-", "content", ({ _ }) => ({
    "--tw-content": _,
    content: "var(--tw-content)"
  })),
  match("(?:box-)?decoration-(slice|clone)", "boxDecorationBreak"),
  match("box-(border|content)", "boxSizing", ({ 1: $1 }) => $1 + "-box"),
  match("hidden", {
    display: "none"
  }),
  match("table-(auto|fixed)", "tableLayout"),
  match([
    "(block|flex|table|grid|inline|contents|flow-root|list-item)",
    "(inline-(block|flex|table|grid))",
    "(table-(caption|cell|column|row|(column|row|footer|header)-group))"
  ], "display"),
  "(float)-(left|right|none)",
  "(clear)-(left|right|none|both)",
  "(overflow(?:-[xy])?)-(auto|hidden|clip|visible|scroll)",
  "(isolation)-(auto)",
  match("isolate", "isolation"),
  match("object-(contain|cover|fill|none|scale-down)", "objectFit"),
  matchTheme("object-", "objectPosition"),
  match("object-(top|bottom|center|(left|right)(-(top|bottom))?)", "objectPosition", spacify),
  match("overscroll(-[xy])?-(auto|contain|none)", ({ 1: $1 = "", 2: $2 }) => ({
    ["overscroll-behavior" + $1]: $2
  })),
  match("(static|fixed|absolute|relative|sticky)", "position"),
  matchTheme("-?inset(-[xy])?(?:$|-)", "inset", ({ 1: $1, _ }) => ({
    top: "-x" != $1 && _,
    right: "-y" != $1 && _,
    bottom: "-x" != $1 && _,
    left: "-y" != $1 && _
  })),
  matchTheme("-?(top|bottom|left|right)(?:$|-)", "inset"),
  match("(visible|collapse)", "visibility"),
  match("invisible", {
    visibility: "hidden"
  }),
  matchTheme("-?z-", "zIndex"),
  match("flex-((row|col)(-reverse)?)", "flexDirection", columnify),
  match("flex-(wrap|wrap-reverse|nowrap)", "flexWrap"),
  matchTheme("(flex-(?:grow|shrink))(?:$|-)"),
  matchTheme("(flex)-"),
  matchTheme("grow(?:$|-)", "flexGrow"),
  matchTheme("shrink(?:$|-)", "flexShrink"),
  matchTheme("basis-", "flexBasis"),
  matchTheme("-?(order)-"),
  withAutocomplete("-?(order)-(\\d+)", () => range({
    end: 12
  })),
  matchTheme("grid-cols-", "gridTemplateColumns"),
  (rule1 = match("grid-cols-(\\d+)", "gridTemplateColumns", gridTemplate), withAutocomplete(rule1, () => range({
    end: 6
  }))),
  matchTheme("col-", "gridColumn"),
  (rule2 = match("col-(span)-(\\d+)", "gridColumn", span), withAutocomplete(rule2, () => range({
    end: 12
  }))),
  matchTheme("col-start-", "gridColumnStart"),
  (rule3 = match("col-start-(auto|\\d+)", "gridColumnStart"), withAutocomplete(rule3, ({ 1: $1 }) => "auto" === $1 ? [
    ""
  ] : range({
    end: 13
  }))),
  matchTheme("col-end-", "gridColumnEnd"),
  (rule4 = match("col-end-(auto|\\d+)", "gridColumnEnd"), withAutocomplete(rule4, ({ 1: $1 }) => "auto" === $1 ? [
    ""
  ] : range({
    end: 13
  }))),
  matchTheme("grid-rows-", "gridTemplateRows"),
  (rule5 = match("grid-rows-(\\d+)", "gridTemplateRows", gridTemplate), withAutocomplete(rule5, () => range({
    end: 6
  }))),
  matchTheme("row-", "gridRow"),
  (rule6 = match("row-(span)-(\\d+)", "gridRow", span), withAutocomplete(rule6, () => range({
    end: 6
  }))),
  matchTheme("row-start-", "gridRowStart"),
  (rule7 = match("row-start-(auto|\\d+)", "gridRowStart"), withAutocomplete(rule7, ({ 1: $1 }) => "auto" === $1 ? [
    ""
  ] : range({
    end: 7
  }))),
  matchTheme("row-end-", "gridRowEnd"),
  (rule8 = match("row-end-(auto|\\d+)", "gridRowEnd"), withAutocomplete(rule8, ({ 1: $1 }) => "auto" === $1 ? [
    ""
  ] : range({
    end: 7
  }))),
  match("grid-flow-((row|col)(-dense)?)", "gridAutoFlow", (match2) => spacify(columnify(match2))),
  match("grid-flow-(dense)", "gridAutoFlow"),
  matchTheme("auto-cols-", "gridAutoColumns"),
  matchTheme("auto-rows-", "gridAutoRows"),
  matchTheme("gap-x(?:$|-)", "gap", "columnGap"),
  matchTheme("gap-y(?:$|-)", "gap", "rowGap"),
  matchTheme("gap(?:$|-)", "gap"),
  withAutocomplete(
    "(justify-(?:items|self))-",
    ({ 1: $1 }) => $1.endsWith("-items-") ? [
      "start",
      "end",
      "center",
      "stretch"
    ] : [
      "auto",
      "start",
      "end",
      "center",
      "stretch"
    ]
  ),
  (rule9 = match("justify-", "justifyContent", convertContentValue), withAutocomplete(rule9, () => [
    "start",
    "end",
    "center",
    "between",
    "around",
    "evenly"
  ])),
  (rule10 = match("(content|items|self)-", (match2) => ({
    ["align-" + match2[1]]: convertContentValue(match2)
  })), withAutocomplete(rule10, ({ 1: $1 }) => "content" == $1 ? [
    "center",
    "start",
    "end",
    "between",
    "around",
    "evenly",
    "stretch",
    "baseline"
  ] : "items" == $1 ? [
    "start",
    "end",
    "center",
    "stretch",
    "baseline"
  ] : [
    "auto",
    "start",
    "end",
    "center",
    "stretch",
    "baseline"
  ])),
  (rule11 = match("(place-(content|items|self))-", ({ 1: $1, $$ }) => ({
    [$1]: ("wun".includes($$[3]) ? "space-" : "") + $$
  })), withAutocomplete(rule11, ({ 2: $2 }) => "content" == $2 ? [
    "center",
    "start",
    "end",
    "between",
    "around",
    "evenly",
    "stretch",
    "baseline"
  ] : "items" == $2 ? [
    "start",
    "end",
    "center",
    "stretch",
    "baseline"
  ] : [
    "auto",
    "start",
    "end",
    "center",
    "stretch",
    "baseline"
  ])),
  matchTheme("p([xytrbl])?(?:$|-)", "padding", edge("padding")),
  matchTheme("-?m([xytrbl])?(?:$|-)", "margin", edge("margin")),
  matchTheme("-?space-(x|y)(?:$|-)", "space", ({ 1: $1, _ }) => ({
    "&>:not([hidden])~:not([hidden])": {
      [`--tw-space-${$1}-reverse`]: "0",
      ["margin-" + {
        y: "top",
        x: "left"
      }[$1]]: `calc(${_} * calc(1 - var(--tw-space-${$1}-reverse)))`,
      ["margin-" + {
        y: "bottom",
        x: "right"
      }[$1]]: `calc(${_} * var(--tw-space-${$1}-reverse))`
    }
  })),
  match("space-(x|y)-reverse", ({ 1: $1 }) => ({
    "&>:not([hidden])~:not([hidden])": {
      [`--tw-space-${$1}-reverse`]: "1"
    }
  })),
  matchTheme("w-", "width"),
  matchTheme("min-w-", "minWidth"),
  matchTheme("max-w-", "maxWidth"),
  matchTheme("h-", "height"),
  matchTheme("min-h-", "minHeight"),
  matchTheme("max-h-", "maxHeight"),
  matchTheme("font-", "fontWeight"),
  matchTheme("font-", "fontFamily", ({ _ }) => {
    return "string" == typeof (_ = asArray(_))[1] ? {
      fontFamily: join(_)
    } : {
      fontFamily: join(_[0]),
      ..._[1]
    };
  }),
  match("antialiased", {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale"
  }),
  match("subpixel-antialiased", {
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto"
  }),
  match("italic", "fontStyle"),
  match("not-italic", {
    fontStyle: "normal"
  }),
  match("(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)", ({ 1: $1, 2: $2 = "", 3: $3 }) => "normal" == $2 ? {
    fontVariantNumeric: "normal"
  } : {
    ["--tw-" + ($3 ? "numeric-fraction" : "pt".includes($2[0]) ? "numeric-spacing" : $2 ? "numeric-figure" : $1)]: $1,
    fontVariantNumeric: "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
    ...asDefaults({
      "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-spacing": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)"
    })
  }),
  matchTheme("tracking-", "letterSpacing"),
  matchTheme("leading-", "lineHeight"),
  match("list-(inside|outside)", "listStylePosition"),
  matchTheme("list-", "listStyleType"),
  (rule12 = match("list-", "listStyleType"), withAutocomplete(rule12, () => [
    "none",
    "disc",
    "decimal"
  ])),
  matchTheme("placeholder-opacity-", "placeholderOpacity", ({ _ }) => ({
    "&::placeholder": {
      "--tw-placeholder-opacity": _
    }
  })),
  matchColor("placeholder-", {
    property: "color",
    selector: "&::placeholder"
  }),
  match("text-(left|center|right|justify|start|end)", "textAlign"),
  match("text-(ellipsis|clip)", "textOverflow"),
  matchTheme("text-opacity-", "textOpacity", "--tw-text-opacity"),
  matchColor("text-", {
    property: "color"
  }),
  matchTheme("text-", "fontSize", ({ _ }) => "string" == typeof _ ? {
    fontSize: _
  } : {
    fontSize: _[0],
    ..."string" == typeof _[1] ? {
      lineHeight: _[1]
    } : _[1]
  }),
  matchTheme("indent-", "textIndent"),
  match("(overline|underline|line-through)", "textDecorationLine"),
  match("no-underline", {
    textDecorationLine: "none"
  }),
  matchTheme("underline-offset-", "textUnderlineOffset"),
  matchColor("decoration-", {
    section: "textDecorationColor",
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  matchTheme("decoration-", "textDecorationThickness"),
  (rule13 = match("decoration-", "textDecorationStyle"), withAutocomplete(rule13, () => [
    "solid",
    "double",
    "dotted",
    "dashed",
    "wavy"
  ])),
  match("(uppercase|lowercase|capitalize)", "textTransform"),
  match("normal-case", {
    textTransform: "none"
  }),
  match("truncate", {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }),
  (rule14 = match("align-", "verticalAlign"), withAutocomplete(rule14, () => [
    "baseline",
    "top",
    "middle",
    "bottom",
    "text-top",
    "text-bottom",
    "sub",
    "super"
  ])),
  (rule15 = match("whitespace-", "whiteSpace"), withAutocomplete(rule15, () => [
    "normal",
    "nowrap",
    "pre",
    "pre-line",
    "pre-wrap"
  ])),
  match("break-normal", {
    wordBreak: "normal",
    overflowWrap: "normal"
  }),
  match("break-words", {
    overflowWrap: "break-word"
  }),
  match("break-all", {
    wordBreak: "break-all"
  }),
  match("break-keep", {
    wordBreak: "keep-all"
  }),
  matchColor("caret-", {
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  matchColor("accent-", {
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  match("bg-gradient-to-([trbl]|[tb][rl])", "backgroundImage", ({ 1: $1 }) => `linear-gradient(to ${position($1, " ")},var(--tw-gradient-stops))`),
  matchColor("from-", {
    section: "gradientColorStops",
    opacityVariable: false,
    opacitySection: "opacity"
  }, ({ _ }) => ({
    "--tw-gradient-from": _.value,
    "--tw-gradient-to": _.color({
      opacityValue: "0"
    }),
    "--tw-gradient-stops": "var(--tw-gradient-from),var(--tw-gradient-to)"
  })),
  matchColor("via-", {
    section: "gradientColorStops",
    opacityVariable: false,
    opacitySection: "opacity"
  }, ({ _ }) => ({
    "--tw-gradient-to": _.color({
      opacityValue: "0"
    }),
    "--tw-gradient-stops": `var(--tw-gradient-from),${_.value},var(--tw-gradient-to)`
  })),
  matchColor("to-", {
    section: "gradientColorStops",
    property: "--tw-gradient-to",
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  match("bg-(fixed|local|scroll)", "backgroundAttachment"),
  match("bg-origin-(border|padding|content)", "backgroundOrigin", ({ 1: $1 }) => $1 + "-box"),
  match([
    "bg-(no-repeat|repeat(-[xy])?)",
    "bg-repeat-(round|space)"
  ], "backgroundRepeat"),
  (rule16 = match("bg-blend-", "backgroundBlendMode"), withAutocomplete(rule16, () => [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
  ])),
  match("bg-clip-(border|padding|content|text)", "backgroundClip", ({ 1: $1 }) => $1 + ("text" == $1 ? "" : "-box")),
  matchTheme("bg-opacity-", "backgroundOpacity", "--tw-bg-opacity"),
  matchColor("bg-", {
    section: "backgroundColor"
  }),
  matchTheme("bg-", "backgroundImage"),
  matchTheme("bg-", "backgroundPosition"),
  match("bg-(top|bottom|center|(left|right)(-(top|bottom))?)", "backgroundPosition", spacify),
  matchTheme("bg-", "backgroundSize"),
  matchTheme("rounded(?:$|-)", "borderRadius"),
  matchTheme("rounded-([trbl]|[tb][rl])(?:$|-)", "borderRadius", ({ 1: $1, _ }) => {
    let corners = {
      t: [
        "tl",
        "tr"
      ],
      r: [
        "tr",
        "br"
      ],
      b: [
        "bl",
        "br"
      ],
      l: [
        "bl",
        "tl"
      ]
    }[$1] || [
      $1,
      $1
    ];
    return {
      [`border-${position(corners[0])}-radius`]: _,
      [`border-${position(corners[1])}-radius`]: _
    };
  }),
  match("border-(collapse|separate)", "borderCollapse"),
  matchTheme("border-opacity(?:$|-)", "borderOpacity", "--tw-border-opacity"),
  match("border-(solid|dashed|dotted|double|none)", "borderStyle"),
  matchTheme("border-spacing(-[xy])?(?:$|-)", "borderSpacing", ({ 1: $1, _ }) => ({
    ...asDefaults({
      "--tw-border-spacing-x": "0",
      "--tw-border-spacing-y": "0"
    }),
    ["--tw-border-spacing" + ($1 || "-x")]: _,
    ["--tw-border-spacing" + ($1 || "-y")]: _,
    "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
  })),
  matchColor("border-([xytrbl])-", {
    section: "borderColor"
  }, edge("border", "Color")),
  matchColor("border-"),
  matchTheme("border-([xytrbl])(?:$|-)", "borderWidth", edge("border", "Width")),
  matchTheme("border(?:$|-)", "borderWidth"),
  matchTheme("divide-opacity(?:$|-)", "divideOpacity", ({ _ }) => ({
    "&>:not([hidden])~:not([hidden])": {
      "--tw-divide-opacity": _
    }
  })),
  match("divide-(solid|dashed|dotted|double|none)", ({ 1: $1 }) => ({
    "&>:not([hidden])~:not([hidden])": {
      borderStyle: $1
    }
  })),
  match("divide-([xy]-reverse)", ({ 1: $1 }) => ({
    "&>:not([hidden])~:not([hidden])": {
      ["--tw-divide-" + $1]: "1"
    }
  })),
  matchTheme("divide-([xy])(?:$|-)", "divideWidth", ({ 1: $1, _ }) => {
    let edges = {
      x: "lr",
      y: "tb"
    }[$1];
    return {
      "&>:not([hidden])~:not([hidden])": {
        [`--tw-divide-${$1}-reverse`]: "0",
        [`border-${position(edges[0])}Width`]: `calc(${_} * calc(1 - var(--tw-divide-${$1}-reverse)))`,
        [`border-${position(edges[1])}Width`]: `calc(${_} * var(--tw-divide-${$1}-reverse))`
      }
    };
  }),
  matchColor("divide-", {
    property: "borderColor",
    selector: "&>:not([hidden])~:not([hidden])"
  }),
  matchTheme("ring-opacity(?:$|-)", "ringOpacity", "--tw-ring-opacity"),
  matchColor("ring-offset-", {
    property: "--tw-ring-offset-color",
    opacityVariable: false
  }),
  matchTheme("ring-offset(?:$|-)", "ringOffsetWidth", "--tw-ring-offset-width"),
  match("ring-inset", {
    "--tw-ring-inset": "inset"
  }),
  matchColor("ring-", {
    property: "--tw-ring-color"
  }),
  matchTheme("ring(?:$|-)", "ringWidth", ({ _ }, { theme: theme2 }) => ({
    ...asDefaults({
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000",
      "&": {
        "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-ring-offset-width": theme2("ringOffsetWidth", "", "0px"),
        "--tw-ring-offset-color": toColorValue(theme2("ringOffsetColor", "", "#fff")),
        "--tw-ring-color": toColorValue(theme2("ringColor", "", "#93c5fd"), {
          opacityVariable: "--tw-ring-opacity"
        }),
        "--tw-ring-opacity": theme2("ringOpacity", "", "0.5")
      }
    }),
    "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
    "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${_} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
    boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
  })),
  matchColor("shadow-", {
    section: "boxShadowColor",
    opacityVariable: false,
    opacitySection: "opacity"
  }, ({ _ }) => ({
    "--tw-shadow-color": _.value,
    "--tw-shadow": "var(--tw-shadow-colored)"
  })),
  matchTheme("shadow(?:$|-)", "boxShadow", ({ _ }) => ({
    ...asDefaults({
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000"
    }),
    "--tw-shadow": join(_),
    "--tw-shadow-colored": join(_).replace(/([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g, "$1var(--tw-shadow-color)$2"),
    boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
  })),
  matchTheme("(opacity)-"),
  (rule17 = match("mix-blend-", "mixBlendMode"), withAutocomplete(rule17, () => [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
  ])),
  ...filter(),
  ...filter("backdrop-"),
  matchTheme("transition(?:$|-)", "transitionProperty", (match2, { theme: theme2 }) => ({
    transitionProperty: join(match2),
    transitionTimingFunction: "none" == match2._ ? void 0 : join(theme2("transitionTimingFunction", "")),
    transitionDuration: "none" == match2._ ? void 0 : join(theme2("transitionDuration", ""))
  })),
  matchTheme("duration(?:$|-)", "transitionDuration", "transitionDuration", join),
  matchTheme("ease(?:$|-)", "transitionTimingFunction", "transitionTimingFunction", join),
  matchTheme("delay(?:$|-)", "transitionDelay", "transitionDelay", join),
  matchTheme("animate(?:$|-)", "animation", (match2, { theme: theme2, h, e }) => {
    let animation = join(match2), parts = animation.split(" "), keyframeValues = theme2("keyframes", parts[0]);
    return keyframeValues ? {
      ["@keyframes " + (parts[0] = e(h(parts[0])))]: keyframeValues,
      animation: parts.join(" ")
    } : {
      animation
    };
  }),
  "(transform)-(none)",
  match("transform", tranformDefaults),
  match("transform-(cpu|gpu)", ({ 1: $1 }) => ({
    "--tw-transform": transformValue("gpu" == $1)
  })),
  matchTheme("scale(-[xy])?-", "scale", ({ 1: $1, _ }) => ({
    ["--tw-scale" + ($1 || "-x")]: _,
    ["--tw-scale" + ($1 || "-y")]: _,
    ...tranformDefaults()
  })),
  matchTheme("-?(rotate)-", "rotate", transform),
  matchTheme("-?(translate-[xy])-", "translate", transform),
  matchTheme("-?(skew-[xy])-", "skew", transform),
  match("origin-(center|((top|bottom)(-(left|right))?)|left|right)", "transformOrigin", spacify),
  withAutocomplete(
    "(appearance)-",
    () => [
      "auto",
      "none"
    ]
  ),
  matchTheme("(columns)-"),
  withAutocomplete("(columns)-(\\d+)", () => range({
    end: 12
  })),
  withAutocomplete(
    "(break-(?:before|after|inside))-",
    ({ 1: $1 }) => $1.endsWith("-inside-") ? [
      "auto",
      "avoid",
      "avoid-page",
      "avoid-column"
    ] : [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column"
    ]
  ),
  matchTheme("(cursor)-"),
  withAutocomplete("(cursor)-", () => [
    "alias",
    "all-scroll",
    "auto",
    "cell",
    "col-resize",
    "context-menu",
    "copy",
    "crosshair",
    "default",
    "e-resize",
    "ew-resize",
    "grab",
    "grabbing",
    "help",
    "move",
    "n-resize",
    "ne-resize",
    "nesw-resize",
    "no-drop",
    "none",
    "not-allowed",
    "ns-resize",
    "nw-resize",
    "nwse-resize",
    "pointer",
    "progress",
    "row-resize",
    "s-resize",
    "se-resize",
    "sw-resize",
    "text",
    "vertical-text",
    "w-resize",
    "wait",
    "zoom-in",
    "zoom-out"
  ]),
  match("snap-(none)", "scroll-snap-type"),
  match("snap-(x|y|both)", ({ 1: $1 }) => ({
    ...asDefaults({
      "--tw-scroll-snap-strictness": "proximity"
    }),
    "scroll-snap-type": $1 + " var(--tw-scroll-snap-strictness)"
  })),
  match("snap-(mandatory|proximity)", "--tw-scroll-snap-strictness"),
  match("snap-(?:(start|end|center)|align-(none))", "scroll-snap-align"),
  match("snap-(normal|always)", "scroll-snap-stop"),
  match("scroll-(auto|smooth)", "scroll-behavior"),
  matchTheme("scroll-p([xytrbl])?(?:$|-)", "padding", edge("scroll-padding")),
  matchTheme("-?scroll-m([xytrbl])?(?:$|-)", "scroll-margin", edge("scroll-margin")),
  match("touch-(auto|none|manipulation)", "touch-action"),
  match("touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))", ({ 1: $1, 2: $2, 3: $3 }) => ({
    ...asDefaults({
      "--tw-pan-x": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-pan-y": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-pinch-zoom": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-touch-action": "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)"
    }),
    [`--tw-${$2 ? "pan-x" : $3 ? "pan-y" : $1}`]: $1,
    "touch-action": "var(--tw-touch-action)"
  })),
  match("outline-none", {
    outline: "2px solid transparent",
    "outline-offset": "2px"
  }),
  match("outline", {
    outlineStyle: "solid"
  }),
  match("outline-(dashed|dotted|double)", "outlineStyle"),
  matchTheme("-?(outline-offset)-"),
  matchColor("outline-", {
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  matchTheme("outline-", "outlineWidth"),
  withAutocomplete(
    "(pointer-events)-",
    () => [
      "auto",
      "none"
    ]
  ),
  matchTheme("(will-change)-"),
  withAutocomplete("(will-change)-", () => [
    "auto",
    "contents",
    "transform"
  ]),
  [
    "resize(?:-(none|x|y))?",
    "resize",
    ({ 1: $1 }) => ({
      x: "horizontal",
      y: "vertical"
    })[$1] || $1 || "both"
  ],
  match("select-(none|text|all|auto)", "userSelect"),
  matchColor("fill-", {
    section: "fill",
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  matchColor("stroke-", {
    section: "stroke",
    opacityVariable: false,
    opacitySection: "opacity"
  }),
  matchTheme("stroke-", "strokeWidth"),
  match("sr-only", {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    clip: "rect(0,0,0,0)",
    borderWidth: "0"
  }),
  match("not-sr-only", {
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    whiteSpace: "normal",
    clip: "auto"
  })
];
function spacify(value) {
  return ("string" == typeof value ? value : value[1]).replace(/-/g, " ").trim();
}
function columnify(value) {
  return ("string" == typeof value ? value : value[1]).replace("col", "column");
}
function position(shorthand, separator = "-") {
  let longhand = [];
  for (let short of shorthand)
    longhand.push({
      t: "top",
      r: "right",
      b: "bottom",
      l: "left"
    }[short]);
  return longhand.join(separator);
}
function join(value) {
  return value && "" + (value._ || value);
}
function convertContentValue({ $$ }) {
  return ({
    r: "flex-",
    "": "flex-",
    w: "space-",
    u: "space-",
    n: "space-"
  }[$$[3] || ""] || "") + $$;
}
function edge(propertyPrefix, propertySuffix = "") {
  return ({ 1: $1, _ }) => {
    let edges = {
      x: "lr",
      y: "tb"
    }[$1] || $1 + $1;
    return edges ? {
      ...toCSS(propertyPrefix + "-" + position(edges[0]) + propertySuffix, _),
      ...toCSS(propertyPrefix + "-" + position(edges[1]) + propertySuffix, _)
    } : toCSS(propertyPrefix + propertySuffix, _);
  };
}
function filter(prefix = "") {
  let filters = [
    "blur",
    "brightness",
    "contrast",
    "grayscale",
    "hue-rotate",
    "invert",
    prefix && "opacity",
    "saturate",
    "sepia",
    !prefix && "drop-shadow"
  ].filter(Boolean), defaults = {};
  for (let key of filters)
    defaults[`--tw-${prefix}${key}`] = "var(--tw-empty,/*!*/ /*!*/)";
  return defaults = {
    ...asDefaults(defaults),
    [`${prefix}filter`]: filters.map((key) => `var(--tw-${prefix}${key})`).join(" ")
  }, [
    `(${prefix}filter)-(none)`,
    match(`${prefix}filter`, defaults),
    ...filters.map((key) => matchTheme(
      `${"h" == key[0] ? "-?" : ""}(${prefix}${key})(?:$|-)`,
      key,
      ({ 1: $1, _ }) => ({
        [`--tw-${$1}`]: asArray(_).map((value) => `${key}(${value})`).join(" "),
        ...defaults
      })
    ))
  ];
}
function transform({ 1: $1, _ }) {
  return {
    ["--tw-" + $1]: _,
    ...tranformDefaults()
  };
}
function tranformDefaults() {
  return {
    ...asDefaults({
      "--tw-translate-x": "0",
      "--tw-translate-y": "0",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1",
      "--tw-transform": transformValue()
    }),
    transform: "var(--tw-transform)"
  };
}
function transformValue(gpu) {
  return [
    gpu ? "translate3d(var(--tw-translate-x),var(--tw-translate-y),0)" : "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))",
    "rotate(var(--tw-rotate))",
    "skewX(var(--tw-skew-x))",
    "skewY(var(--tw-skew-y))",
    "scaleX(var(--tw-scale-x))",
    "scaleY(var(--tw-scale-y))"
  ].join(" ");
}
function span({ 1: $1, 2: $2 }) {
  return `${$1} ${$2} / ${$1} ${$2}`;
}
function gridTemplate({ 1: $1 }) {
  return `repeat(${$1},minmax(0,1fr))`;
}
function range({ start = 1, end, step = 1 }) {
  let result = [];
  for (let index = start; index <= end; index += step)
    result.push(`${index}`);
  return result;
}
function asDefaults(props) {
  return {
    "@layer defaults": {
      "*,::before,::after": props,
      "::backdrop": props
    }
  };
}
let variants = [
  [
    "sticky",
    "@supports ((position: -webkit-sticky) or (position:sticky))"
  ],
  [
    "motion-reduce",
    "@media (prefers-reduced-motion:reduce)"
  ],
  [
    "motion-safe",
    "@media (prefers-reduced-motion:no-preference)"
  ],
  [
    "print",
    "@media print"
  ],
  [
    "(portrait|landscape)",
    ({ 1: $1 }) => `@media (orientation:${$1})`
  ],
  [
    "contrast-(more|less)",
    ({ 1: $1 }) => `@media (prefers-contrast:${$1})`
  ],
  [
    "(first-(letter|line)|placeholder|backdrop|before|after)",
    ({ 1: $1 }) => `&::${$1}`
  ],
  [
    "(marker|selection)",
    ({ 1: $1 }) => `& *::${$1},&::${$1}`
  ],
  [
    "file",
    "&::file-selector-button"
  ],
  [
    "(first|last|only)",
    ({ 1: $1 }) => `&:${$1}-child`
  ],
  [
    "even",
    "&:nth-child(2n)"
  ],
  [
    "odd",
    "&:nth-child(odd)"
  ],
  [
    "open",
    "&[open]"
  ],
  [
    "(aria|data)-",
    withAutocomplete(({ 1: $1, $$ }, context) => $$ && `&[${$1}-${context.theme($1, $$) || arbitrary($$, "", context) || `${$$}="true"`}]`, ({ 1: $1 }, { theme: theme2 }) => [
      .../* @__PURE__ */ new Set([
        ..."aria" == $1 ? [
          "checked",
          "disabled",
          "expanded",
          "hidden",
          "pressed",
          "readonly",
          "required",
          "selected"
        ] : [],
        ...Object.keys(theme2($1) || {})
      ])
    ].map((key) => ({
      suffix: key,
      label: `&[${$1}-${theme2($1, key) || `${key}="true"`}]`,
      theme: {
        section: $1,
        key
      }
    })).concat([
      {
        suffix: "[",
        label: `&[${$1}-\u2026]`
      }
    ]))
  ],
  [
    "((group|peer)(~[^-[]+)?)(-\\[(.+)]|[-[].+?)(\\/.+)?",
    withAutocomplete(({ 2: type, 3: name = "", 4: $4, 5: $5 = "", 6: label = name }, { e, h, v }) => {
      let selector = normalize($5) || ("[" == $4[0] ? $4 : v($4.slice(1)));
      return `${(selector.includes("&") ? selector : "&" + selector).replace(/&/g, `:merge(.${e(h(type + label))})`)}${"p" == type[0] ? "~" : " "}&`;
    }, (_, { variants: variants2 }) => Object.entries(variants2).filter(([, selector]) => /^&(\[|:[^:])/.test(selector)).flatMap(([variant, selector]) => [
      {
        prefix: "group-",
        suffix: variant,
        label: `${selector.replace("&", ".group")} &`,
        modifiers: []
      },
      {
        prefix: "peer-",
        suffix: variant,
        label: `${selector.replace("&", ".peer")} &`,
        modifiers: []
      }
    ]))
  ],
  [
    "(ltr|rtl)",
    withAutocomplete(({ 1: $1 }) => `[dir="${$1}"] &`, ({ 1: $1 }) => [
      {
        prefix: $1,
        suffix: "",
        label: `[dir="${$1}"] &`
      }
    ])
  ],
  [
    "supports-",
    withAutocomplete(({ $$ }, context) => {
      $$ && ($$ = context.theme("supports", $$) || arbitrary($$, "", context));
      if ($$)
        return $$.includes(":") || ($$ += ":var(--tw)"), /^\w*\s*\(/.test($$) || ($$ = `(${$$})`), `@supports ${$$.replace(/\b(and|or|not)\b/g, " $1 ").trim()}`;
    }, (_, { theme: theme2 }) => Object.keys(theme2("supports") || {}).map((key) => ({
      suffix: key,
      theme: {
        section: "supports",
        key
      }
    })).concat([
      {
        suffix: "[",
        label: `@supports \u2026`
      }
    ]))
  ],
  [
    "max-",
    withAutocomplete(({ $$ }, context) => {
      $$ && ($$ = context.theme("screens", $$) || arbitrary($$, "", context));
      if ("string" == typeof $$)
        return `@media not all and (min-width:${$$})`;
    }, (_, { theme: theme2 }) => Object.entries(theme2("screens") || {}).filter(([, value]) => "string" == typeof value).map(([key, value]) => ({
      suffix: key,
      label: `@media not all and (min-width:${value})`,
      theme: {
        section: "screens",
        key
      }
    })).concat([
      {
        suffix: "[",
        label: `@media not all and (min-width: \u2026)`
      }
    ]))
  ],
  [
    "min-",
    withAutocomplete(({ $$ }, context) => {
      return $$ && ($$ = arbitrary($$, "", context)), $$ && `@media (min-width:${$$})`;
    }, () => [
      {
        suffix: "[",
        label: `@media (min-width: \u2026)`
      }
    ])
  ],
  [
    /^\[(.+)]$/,
    ({ 1: $1 }) => /[&@]/.test($1) && normalize($1).replace(/[}]+$/, "").split("{")
  ]
];
function presetTailwindBase({ colors: colors2, disablePreflight } = {}) {
  return {
    preflight: disablePreflight ? void 0 : preflight,
    theme: {
      ...theme,
      colors: {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        ...colors2
      }
    },
    variants,
    rules,
    finalize(rule18) {
      return rule18.n && rule18.d && rule18.r.some((r2) => /^&::(before|after)$/.test(r2)) && !/(^|;)content:/.test(rule18.d) ? {
        ...rule18,
        d: "content:var(--tw-content);" + rule18.d
      } : rule18;
    }
  };
}
let slate = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a"
}, gray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827"
}, zinc = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b"
}, neutral = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717"
}, stone = {
  50: "#fafaf9",
  100: "#f5f5f4",
  200: "#e7e5e4",
  300: "#d6d3d1",
  400: "#a8a29e",
  500: "#78716c",
  600: "#57534e",
  700: "#44403c",
  800: "#292524",
  900: "#1c1917"
}, red = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d"
}, orange = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
  800: "#9a3412",
  900: "#7c2d12"
}, amber = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f"
}, yellow = {
  50: "#fefce8",
  100: "#fef9c3",
  200: "#fef08a",
  300: "#fde047",
  400: "#facc15",
  500: "#eab308",
  600: "#ca8a04",
  700: "#a16207",
  800: "#854d0e",
  900: "#713f12"
}, lime = {
  50: "#f7fee7",
  100: "#ecfccb",
  200: "#d9f99d",
  300: "#bef264",
  400: "#a3e635",
  500: "#84cc16",
  600: "#65a30d",
  700: "#4d7c0f",
  800: "#3f6212",
  900: "#365314"
}, green = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d"
}, emerald = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b"
}, teal = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a"
}, cyan = {
  50: "#ecfeff",
  100: "#cffafe",
  200: "#a5f3fc",
  300: "#67e8f9",
  400: "#22d3ee",
  500: "#06b6d4",
  600: "#0891b2",
  700: "#0e7490",
  800: "#155e75",
  900: "#164e63"
}, sky = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e"
}, blue = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a"
}, indigo = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81"
}, violet = {
  50: "#f5f3ff",
  100: "#ede9fe",
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#8b5cf6",
  600: "#7c3aed",
  700: "#6d28d9",
  800: "#5b21b6",
  900: "#4c1d95"
}, purple = {
  50: "#faf5ff",
  100: "#f3e8ff",
  200: "#e9d5ff",
  300: "#d8b4fe",
  400: "#c084fc",
  500: "#a855f7",
  600: "#9333ea",
  700: "#7e22ce",
  800: "#6b21a8",
  900: "#581c87"
}, fuchsia = {
  50: "#fdf4ff",
  100: "#fae8ff",
  200: "#f5d0fe",
  300: "#f0abfc",
  400: "#e879f9",
  500: "#d946ef",
  600: "#c026d3",
  700: "#a21caf",
  800: "#86198f",
  900: "#701a75"
}, pink = {
  50: "#fdf2f8",
  100: "#fce7f3",
  200: "#fbcfe8",
  300: "#f9a8d4",
  400: "#f472b6",
  500: "#ec4899",
  600: "#db2777",
  700: "#be185d",
  800: "#9d174d",
  900: "#831843"
}, rose = {
  50: "#fff1f2",
  100: "#ffe4e6",
  200: "#fecdd3",
  300: "#fda4af",
  400: "#fb7185",
  500: "#f43f5e",
  600: "#e11d48",
  700: "#be123c",
  800: "#9f1239",
  900: "#881337"
}, colors = {
  __proto__: null,
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose
};
function presetTailwind({ disablePreflight } = {}) {
  return presetTailwindBase({
    colors,
    disablePreflight
  });
}
var i = /* @__PURE__ */ new Map([["align-self", "-ms-grid-row-align"], ["color-adjust", "-webkit-print-color-adjust"], ["column-gap", "grid-column-gap"], ["forced-color-adjust", "-ms-high-contrast-adjust"], ["gap", "grid-gap"], ["grid-template-columns", "-ms-grid-columns"], ["grid-template-rows", "-ms-grid-rows"], ["justify-self", "-ms-grid-column-align"], ["margin-inline-end", "-webkit-margin-end"], ["margin-inline-start", "-webkit-margin-start"], ["mask-border", "-webkit-mask-box-image"], ["mask-border-outset", "-webkit-mask-box-image-outset"], ["mask-border-slice", "-webkit-mask-box-image-slice"], ["mask-border-source", "-webkit-mask-box-image-source"], ["mask-border-repeat", "-webkit-mask-box-image-repeat"], ["mask-border-width", "-webkit-mask-box-image-width"], ["overflow-wrap", "word-wrap"], ["padding-inline-end", "-webkit-padding-end"], ["padding-inline-start", "-webkit-padding-start"], ["print-color-adjust", "color-adjust"], ["row-gap", "grid-row-gap"], ["scroll-margin-bottom", "scroll-snap-margin-bottom"], ["scroll-margin-left", "scroll-snap-margin-left"], ["scroll-margin-right", "scroll-snap-margin-right"], ["scroll-margin-top", "scroll-snap-margin-top"], ["scroll-margin", "scroll-snap-margin"], ["text-combine-upright", "-ms-text-combine-horizontal"]]);
function r(r2) {
  return i.get(r2);
}
function a(i2) {
  var r2 = /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(i2);
  return r2 ? r2[1] ? 1 : r2[2] ? 2 : r2[3] ? 3 : 5 : 0;
}
function t(i2, r2) {
  var a2 = /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(i2);
  return a2 ? a2[1] ? /^sti/i.test(r2) ? 1 : 0 : a2[2] ? /^pat/i.test(r2) ? 1 : 0 : a2[3] ? /^image-/i.test(r2) ? 1 : 0 : a2[4] ? "-" === r2[3] ? 2 : 0 : /^(?:inline-)?grid$/i.test(r2) ? 4 : 0 : 0;
}
let CSSPrefixFlags = [
  [
    "-webkit-",
    1
  ],
  [
    "-moz-",
    2
  ],
  [
    "-ms-",
    4
  ]
];
function presetAutoprefix() {
  return ({ stringify }) => ({
    stringify(property, value, context) {
      let cssText = "", propertyAlias = r(property);
      propertyAlias && (cssText += stringify(propertyAlias, value, context) + ";");
      let propertyFlags = a(property), valueFlags = t(property, value);
      for (let prefix of CSSPrefixFlags) {
        propertyFlags & prefix[1] && (cssText += stringify(prefix[0] + property, value, context) + ";");
        valueFlags & prefix[1] && (cssText += stringify(property, prefix[0] + value, context) + ";");
      }
      return cssText + stringify(property, value, context);
    }
  });
}
const config = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()]
});
function attachTwindStyle(observedElement, documentOrShadowRoot) {
  const sheet = cssom(new CSSStyleSheet());
  const tw2 = twind(config, sheet);
  observe(tw2, observedElement);
  documentOrShadowRoot.adoptedStyleSheets = [sheet.target];
}
export {
  attachTwindStyle as a
};
