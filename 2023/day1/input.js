import fs from "fs";

function partOne(file) {
  const data = fs.readFileSync(file, "utf-8").trim().split("\r\n");
  console.log(data);

  const values = data.map(line => {
    let value = "";
    let first = line.split("").find(v => !Number.isNaN(Number(v)));
    let last = line.split("").findLast(v => !Number.isNaN(Number(v)));

    return Number(first + last);
  });

  const final = values.reduce((s, n) => s + n);

  console.log(final);
}

// partOne("./input.txt");

function partTwo(file) {
  const vals = fs.readFileSync(file, "utf-8").trim().split("\r\n");

  const dict = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const dictAsRegexString = dict.join("|");
  const regex = new RegExp(dictAsRegexString, "g");

  vals.reduce((acc, cur) => {
    const arrayOfMatches = [];
    while (cur) {
      const matches = cur.match(regex);
      matches && arrayOfMatches.push(matches[0]);
      cur = cur.slice(1);
    }

    const first = dict.indexOf(arrayOfMatches[0]) % 10;
    const last = dict.indexOf(arrayOfMatches[arrayOfMatches.length - 1]) % 10;
    const result = acc + (~first && ~last ? Number(`${first}${last}`) : 0);
    console.log(result);
    return result;
  }, 0);
}

partTwo("./input.txt");
