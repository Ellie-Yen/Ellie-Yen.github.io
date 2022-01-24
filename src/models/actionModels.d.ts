interface AnimationSettingOptions {
  duration?: number
  delay?: number,
  fill?: FillMode
}

type ElementScrollAction = (element: HTMLElement, scrollRatio: number) => any;

type ElementAction = (element: HTMLElement) => any;