export function selectElementContents(el: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  try {
    range.selectNodeContents(el);
    selection.addRange(range);
  } catch (e) {
    range.selectNode(el);
    selection.addRange(range);
  }
  document.execCommand("Copy");
}
