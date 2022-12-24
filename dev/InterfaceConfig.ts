import fs from "fs";
import path from "path";
import rls from "readline-sync";
import clc from "cli-color";

const filepath = path.resolve(
  process.cwd(),
  "src",
  "interfaces",
  "mainConfig.ts",
);

//! 1. Read file in var

let data: Record<string, Record<string, { _v: string; _r?: boolean }>> = {};

let sfdt: string = fs.readFileSync(filepath, { encoding: "utf-8" });

let spl = sfdt.split("\n");

//! 1.1. Split it up
let sections = spl
  .filter((e) => e.startsWith("export interface"))
  .map((e) => {
    return {
      i: -1,
      v: e.substring("export interface ".length, e.length - 1).trim(),
    };
  });

sections = sections.map((e) => {
  return { ...e, i: spl.indexOf(`export interface ${e.v} {`) };
});

sections.forEach((e) => {
  data[e.v] = {};
});

for (let i = 0; i < sections.length; i++) {
  let start = sections[i].i + 1,
    end = spl.indexOf("}", start) - 1;
  for (let j = start; j <= end; j++) {
    let dtm = spl[j].trim();
    let [_, name, opt, val] = /^([a-zA-Z_][a-zA-Z0-9_]*)(\??):(.*);$/g.exec(
      dtm,
    ) as RegExpMatchArray;

    data[sections[i].v][name] = {
      _r: opt === "",
      _v: val.trim(),
    };
  }
}
let ans = "";

console.clear();
do {
  console.log(
    `We are having next ${clc.yellowBright("Interfaces")} to work with:\n` +
      `${Object.keys(data)
        .map((e, i) => clc.cyanBright(e) + ((i + 1) % 4 ? " " : "\n"))
        .join("")}\n\n` +
      `(Available additional actions: ${clc.greenBright(
        ".add",
      )}, ${clc.greenBright(".del")}, ${clc.greenBright(
        ".exit",
      )}, ${clc.greenBright(".save")}, ${clc.greenBright(".sort")})`,
  );
  ans = rls.question("What to do: ");
  if (ans === ".add") {
    let k = rls.question("Enter the interface name: ");
    data[k] &&
      console.log("You cannot create this interface. It is already created.");
    if (data[k]) rls.question();
    !data[k] && (data[k] = {});
  }
  if (ans === ".del") {
    let k = rls.question("Enter the interface name: ");
    !data[k] &&
      console.log("You cannot delete this interface. It is nonexisting.");
    if (!data[k]) rls.question();
    data[k] && delete data[k];
  }
  if (ans === ".save") {
    let out = "";
    Object.keys(data).forEach((e) => {
      out += "export interface " + e + " {\n";
      Object.keys(data[e]).forEach((el) => {
        out +=
          "  " +
          el +
          (data[e][el]._r != true ? "?" : "") +
          ": " +
          data[e][el]._v +
          ";\n";
      });
      out += "}\n" + (e != Object.keys(data).at(-1) ? "\n" : "");
    });
    fs.writeFileSync(filepath, out, { encoding: "utf-8" });
  }
  if (ans === ".sort") {
    data = Object.keys(data)
      .sort()
      .reduce((obj: any, key: string) => {
        obj[key] = data[key];
        return obj;
      }, {});
  }
  if (/^\.(add|del|exit|save|sort)$/.exec(ans)) {
    /^\.(add|del|save|sort)$/.exec(ans) && console.clear();
    continue;
  }
  if (data[ans]) {
    console.clear();
    let ans2 = "";
    do {
      console.log(
        `We are having next ${clc.yellow(
          "Types",
        )} in interface ${clc.cyanBright(ans)} to work with:\n` +
          `${
            Object.keys(data[ans]).length
              ? Object.keys(data[ans])
                  .map(
                    (e) =>
                      clc.cyan(e) +
                      ": " +
                      clc.redBright(data[ans][e]._v) +
                      (data[ans][e]._r != true
                        ? clc.cyanBright(" (optional)")
                        : ""),
                  )
                  .join(",\n")
              : clc.green("No types in this interface")
          }\n\n` +
          `(Available additional actions: ${clc.greenBright(
            ".exit",
          )}, ${clc.greenBright(".fexit")}, ${clc.greenBright(".sort")})`,
      );
      ans2 = rls.question("What to do: ");
      if (ans2 === ".sort") {
        data[ans] = Object.keys(data[ans])
          .sort()
          .reduce((obj: any, key: string) => {
            obj[key] = data[ans][key];
            return obj;
          }, {});
      }
      if (/\.(exit|fexit|sort)/.exec(ans2)) {
        /\.sort/.exec(ans2) && console.clear();
        /\.fexit/.exec(ans2) && (ans = ".exit") && (ans2 = ".exit");
        continue;
      }
      if (data[ans][ans2] === undefined) {
        let dtam = rls.question("Enter type of this var: ");
        data[ans][ans2] = {
          _r: true,
          _v: dtam,
        };
        console.clear();
      } else {
        let ans3 = "";
        do {
          ans3 = rls.question(
            "" +
              "\n" +
              clc.greenBright(".chname") +
              " - Change the name of variable" +
              "\n" +
              clc.greenBright(".chtype") +
              " - Change type of variable" +
              "\n" +
              clc.greenBright(".del") +
              "    - " +
              clc.strike("Delete") +
              " variable from interface" +
              "\n" +
              clc.greenBright(".topt") +
              "   - Toogle " +
              clc.italic("optional") +
              "\n" +
              clc.greenBright(".skip") +
              "   - Skip. " +
              clc.strike("I choosed another one.") +
              "\n" +
              "What to do with it: ",
          );
          if (ans3 === ".topt") {
            data[ans][ans2]._r = !data[ans][ans2]._r;
          }
          if (ans3 === ".chtype") {
            data[ans][ans2]._v = rls.question("Enter new value: ");
          }
          if (ans3 === ".chname") {
            let k = rls.question("Enter new name: ");
            data[ans][k] = { ...data[ans][ans2] };
            delete data[ans][ans2];
          }
          if (ans3 === ".del") {
            delete data[ans][ans2];
          }
        } while (!/\.(chname|chtype|del|topt|skip)/.exec(ans3));
        console.clear();
      }
    } while (ans2 != ".exit");
    ans != ".exit" && console.clear();
  } else {
    console.log(
      clc.redBright(`There is no interface with name `) +
        clc.yellow(ans) +
        clc.redBright(". Try another one."),
    );
  }
} while (ans != ".exit");
console.log("Bye.");
