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
      break;
    case "Backspace":
      break;
    case "Control b":
      return handleB(e);
    case "Control i":
      return handleI(e);
    case "Control `":
      return handleInlineCode(e);
    case "Control Shift ~":
      return handleCodeBlock(e);
    case "(":
      break;
    case "{":
      break;
    case "[":
      break;
    case '"':
      break; //LMAO
    case "'":
      break;
    case "Control Shift 7":
      break;
    case "Control Shift 8":
      break;
    case "Tab":
      break;
    case "Control Tab":
      break;
    case "Shift Tab":
      break;
    default:
      return [e.val];
  }
};

const surround = (str: string, start: number, end: number, surr: string) => {
  return (
    str.substring(0, start) +
    surr +
    str.substring(start, end) +
    surr +
    str.substring(end)
  );
};

const handleB = (e: FI): FR => {
  return [
    surround(e.val, e.selStart, e.selEnd, "**"),
    e.selStart + 2,
    e.selEnd + 2,
  ];
};

const handleI = (e: FI): FR => {
  return [
    surround(e.val, e.selStart, e.selEnd, "*"),
    e.selStart + 1,
    e.selEnd + 1,
  ];
};

const handleInlineCode = (e: FI): FR => {
  return [
    surround(e.val, e.selStart, e.selEnd, "`"),
    e.selStart + 1,
    e.selEnd + 1,
  ];
};

const handleCodeBlock = (e: FI): FR => {
  return [
    e.val.slice(0, e.selStart) + "```\n\n```" + e.val.slice(e.selStart),
    e.selStart + 4,
    e.selEnd + 4,
  ];
};

//  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     const lines = value.split("\n");
//     const last = lines[lines.length - 1];
//     const startWhitespace = new RegExp(/\s*(?=\S)/);
//     const spaces = last.match(startWhitespace);
//     if (spaces) setValue(`${value}\n${spaces[0]}`);
// };
