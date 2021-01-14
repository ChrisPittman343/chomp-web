import { wrapChars } from "../constants";

type EI = React.KeyboardEvent<HTMLTextAreaElement>;
interface FI {
  val: string;
  selStart: number;
  selEnd: number;
}
type FR = [string, number?, number?];

export const inputReducer = (key: string, event: EI): FR | undefined => {
  const e: FI = {
    val: event.currentTarget.value,
    selStart: event.currentTarget.selectionStart,
    selEnd: event.currentTarget.selectionEnd,
  };
  switch (key) {
    case "Enter":
      return handleEnter(e);
    case "Tab":
      return handleTab(e);
    case "Control Tab":
      break;
    case "Shift Tab":
      break;
    case "Backspace":
      return handleBackspace(e);
    case "Control b":
      return handleB(e);
    case "Control i":
      return handleI(e);
    case "`":
      return handleInlineCode(e);
    case "Control Shift ~":
      return handleCodeBlock(e);
    case "Control m":
      return handleInlineMath(e);
    case "Control Shift M":
      return handleMathBlock(e);
    case "Shift (":
      return handleParentheses(e);
    case "Shift {":
      return handleCuBrackets(e);
    case "[":
      return handleSqBrackets(e);
    case 'Shift "':
      return handleDubQuotes(e);
    default:
      return [e.val];
  }
};
/**
 * Surrounds the selected text in whatever string is passed in.
 *
 * If a second string is passed, the beginning is wrapped in str1, end is wrapped in str2
 */
const surround = (e: FI, surr: string, endWrap?: string) => {
  return (
    e.val.substring(0, e.selStart) +
    surr +
    e.val.substring(e.selStart, e.selEnd) +
    (endWrap ? endWrap : surr) +
    e.val.substring(e.selEnd)
  );
};

const handleEnter = (e: FI): FR => {
  console.log(e.selStart);
  let lines = e.val.split("\n");
  let lineIx = 0;
  let charIx = 0;
  while (charIx < e.selStart && charIx < e.val.length) {
    lineIx += e.val[charIx] === "\n" ? 1 : 0;
    charIx++;
  }
  const spaces = lines[lineIx].match(/\s*(?=(\S|\n))/);
  const pre = spaces ? spaces[0] : "";
  lines = lines.slice(0, lineIx + 1).concat([pre, ...lines.slice(lineIx + 1)]);
  const startingIx =
    e.val.indexOf(lines[lineIx]) + lines[lineIx].length + pre.length + 1;

  return [lines.join("\n"), startingIx, startingIx];
};

const handleTab = (e: FI): FR => {
  return [
    e.val.substring(0, e.selStart) + "\t" + e.val.substring(e.selStart),
    e.selStart + 1,
    e.selEnd + 1,
  ];
};

/**
 * If wrapped by special characters (Such as brackets or quotes), delete both sides. Else do a normal backspace.
 */
const handleBackspace = (e: FI): FR => {
  const fourChar = e.val.substring(e.selStart - 2, e.selEnd + 2); //Need to check if these vals exist first, causing bugs with deletion (Not too major, though)
  const twoChar = e.val.substring(e.selStart - 1, e.selEnd + 1);
  if (e.selStart !== e.selEnd) {
    return [
      e.val.substring(0, e.selStart) + e.val.substring(e.selEnd),
      e.selStart,
      e.selStart,
    ];
  } else if (wrapChars.includes(fourChar)) {
    return [
      e.val.substring(0, e.selStart - 2) + e.val.substring(e.selEnd + 2),
      e.selStart - 2,
      e.selStart - 2,
    ];
  } else if (wrapChars.includes(twoChar)) {
    return [
      e.val.substring(0, e.selStart - 1) + e.val.substring(e.selEnd + 1),
      e.selStart - 1,
      e.selStart - 1,
    ];
  } else
    return [
      e.val.substring(0, e.selStart - 1) + e.val.substring(e.selStart),
      e.selStart - 1,
      e.selStart - 1,
    ];
};

//#region Simple Formats
const handleB = (e: FI): FR => {
  return [surround(e, "**"), e.selStart + 2, e.selEnd + 2];
};
const handleI = (e: FI): FR => {
  return [surround(e, "*"), e.selStart + 1, e.selEnd + 1];
};
const handleParentheses = (e: FI): FR => {
  return [surround(e, "(", ")"), e.selStart + 1, e.selEnd + 1];
};
const handleSqBrackets = (e: FI): FR => {
  return [surround(e, "[", "]"), e.selStart + 1, e.selEnd + 1];
};
const handleCuBrackets = (e: FI): FR => {
  return [surround(e, "{", "}"), e.selStart + 1, e.selEnd + 1];
};
const handleDubQuotes = (e: FI): FR => {
  return [surround(e, '"'), e.selStart + 1, e.selEnd + 1];
};
const handleInlineCode = (e: FI): FR => {
  return [surround(e, "`"), e.selStart + 1, e.selEnd + 1];
};
const handleCodeBlock = (e: FI): FR => {
  return [
    e.val.slice(0, e.selStart) + "```\n\n```" + e.val.slice(e.selStart),
    e.selStart + 4,
    e.selEnd + 4,
  ];
};
const handleInlineMath = (e: FI): FR => {
  return [surround(e, "$"), e.selStart + 1, e.selEnd + 1];
};
const handleMathBlock = (e: FI): FR => {
  return [
    e.val.slice(0, e.selStart) + "$$\n\n$$" + e.val.slice(e.selStart),
    e.selStart + 3,
    e.selEnd + 3,
  ];
};
//#endregion
