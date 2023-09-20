type TempType = "inc" | "dec";

const tempValue = document.querySelector("#tempValue") as HTMLSpanElement;
const currentValue = document.querySelector("#currentValue") as HTMLDivElement;
const incButton = document.querySelector(
  '.button[data-action="inc"]'
) as HTMLButtonElement;
const decButton = document.querySelector(
  '.button[data-action="dec"]'
) as HTMLButtonElement;

let timeout: NodeJS.Timeout;
let interval: NodeJS.Timeout;
let defaultDelay: number = 500;

async function debounce(fn: () => void, ms: number): Promise<void> {
  if (timeout) {
    await clearTimeout(timeout);
  }
  timeout = await setTimeout(fn, ms);
}

function startClick(type: TempType): void {
  interval = setInterval(() => clickTemp(type), 250);
}

function stopClick(): void {
  clearInterval(interval);
}

function clickTemp(type: TempType): Promise<void> {
  let temp = parseInt(tempValue.textContent!);
  switch (type) {
    case "inc":
      temp++;
      tempValue.textContent = `${temp.toString() + "°"}`;
      return debounce(() => {
        currentValue.textContent = `${temp.toString() + "°"}`;
      }, defaultDelay).catch(console.log);
    case "dec":
      temp--;
      tempValue.textContent = `${temp.toString() + "°"}`;
      return debounce(() => {
        currentValue.textContent = `${temp.toString() + "°"}`;
      }, defaultDelay).catch(console.log);
  }
}

(function () {
  incButton?.addEventListener("mousedown", () => startClick("inc"));
  incButton?.addEventListener("mouseup", stopClick);
  incButton?.addEventListener("mouseleave", stopClick);
  incButton?.addEventListener("click", () => clickTemp("inc"));

  decButton?.addEventListener("mousedown", () => startClick("dec"));
  decButton?.addEventListener("mouseup", stopClick);
  decButton?.addEventListener("mouseleave", stopClick);
  decButton?.addEventListener("click", () => clickTemp("dec"));
})();
