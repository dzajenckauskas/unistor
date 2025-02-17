export default function websiteLogs(txt, req) {
  let fs = require("fs");
  let date = new Date(Date.now()).toLocaleDateString("lt", {
    timeZone: "Europe/Vilnius",
  });

  if (!fs.existsSync(`websiteLogs/${date}.txt`)) {
    //  fs.writeFileSync(`test.txt`);
  }

  let logger = fs.createWriteStream(`LOGS/${date}.txt`, {
    flags: "a",
  });

  let writeLine = (line) => logger.write(`\n${line}`);
  writeLine(
    `${txt}; ${new Date(Date.now()).toLocaleString("lt", {
      timeZone: "Europe/VIlnius",
    })} /`
  );
}
