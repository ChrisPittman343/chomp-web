export function updateStateNoRepeats<T extends TypeWithId>(
  state: T[],
  data: T[]
): T[] {
  const newState = [...state];
  data.forEach((value) => {
    const ix = newState.findIndex((existing) => existing.id === value.id);
    ix === -1 ? newState.push(value) : (newState[ix] = { ...value });
  });
  return (newState as unknown) as T[];
}
interface TypeWithId {
  id: string;
}
