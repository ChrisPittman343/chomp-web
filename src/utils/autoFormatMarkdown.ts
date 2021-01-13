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
      break;
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
/**
 * Need number of spaces in previous line
 * Index of last line would be nice
 */
const handleEnter = (e: FI): FR => {
  let i = 0;
  let count = 0;
  let lineNum = 0;
  //Gets the line number of the selected line
  for (; i <= e.selStart; i++) {
    e.val[i] === "\n" ? lineNum++ : (lineNum += 0);
  }
  i++;
  const pl = e.val.split("\n")[lineNum];
  const spaces = pl.match(/\s*(?=\S)/);
  const added = spaces ? `\n${spaces[0]}` : "\n";
  return [
    e.val.substring(0, i + pl.length) +
      added +
      e.val.substring(count + added.length + pl.length),
  ];
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
const handleBackspace = (e: FI) => {};

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
