export function toggleColorScheme(isCurrentlyDarkMode: Boolean) {
  let root = document.documentElement;
  if (isCurrentlyDarkMode) {
    root.style.setProperty("--main-bg", "var(--white)");
    root.style.setProperty("--main-hover", "var(--light-gray)");
    root.style.setProperty("--main-press", "var(--medium-gray)");
    root.style.setProperty("--main-color", "var(--black)");
  } else {
    root.style.setProperty("--main-bg", "var(--coal)");
    root.style.setProperty("--main-hover", "var(--dark-gray)");
    root.style.setProperty("--main-press", "var(--light-coal)");
    root.style.setProperty("--main-color", "var(--white)");
  }
}
