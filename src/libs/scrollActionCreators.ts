interface ActionKwargs {
  factor?: number,
  from?: number,
  to?: number
}
export function moveY(kwargs: ActionKwargs = {}): ElementScrollAction {
  return (element: HTMLElement, scrollRatio: number) => {
    element.style.transform = `
      translateY(${getMoveAmount(kwargs, scrollRatio)}%)
    `;
  }
}
export function scaleChange(kwargs: ActionKwargs = {}): ElementScrollAction {
  return (element: HTMLElement, scrollRatio: number) => {
    element.style.transform = `
      scale(${getMoveAmount(kwargs, scrollRatio)}%)
    `; 
  }
}
export function rotateZ(kwargs: ActionKwargs = {}): ElementScrollAction {
  return (element: HTMLElement, scrollRatio: number) => {
    element.style.transform = `
      rotate(${getMoveAmount(kwargs, scrollRatio)}deg)
    `;
  }
}

function getMoveAmount(kwargs: ActionKwargs = {}, scrollRatio: number): number{
  kwargs.factor = kwargs.factor || 1;
  kwargs.from = kwargs.from || 0;
  kwargs.to = kwargs.to === undefined ? 100 : kwargs.to;
  
  const delta = kwargs.from + 
    kwargs.factor * scrollRatio * (kwargs.to - kwargs.from);
  
  const [min, max] = 
    (kwargs.from < kwargs.to) 
    ? [kwargs.from, kwargs.to]
    : [kwargs.to, kwargs.from]

  return Math.min(
    max,
    Math.max(min, delta)
  );
}