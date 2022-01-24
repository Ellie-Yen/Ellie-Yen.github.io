export function makeTransform(transform_style: string): ElementAction {
  return (element: HTMLElement) => {
    element.style.transform = transform_style;
  }
}
export function changeInnerText(new_text: string): ElementAction {
  return (element: HTMLElement) => {
    element.innerText = new_text;
  }
}