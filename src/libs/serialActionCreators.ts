import { RefObject } from "react";

const timeoutIDs = new Map<HTMLElement, any>();

function clearActionBefore(element: HTMLElement){
  clearTimeout(timeoutIDs.get(element));
}

interface serialActionDetail {
  ref: RefObject<HTMLElement>,
  action: ElementAction,
  delay?: number
}
/**
 * @param items Array of action details contained following keys:
 * - ref: RefObject<HTMLElement>, target to execute the action.
 * - action: ElementAction being executed.
 * - delay: optional, number of ms to postpone the action.
 * @returns an ElementAction that triggers all actions of refs.
 */
export function serialActionCreator(items: Array<serialActionDetail>): ElementAction{
  return (referenceElement: HTMLElement) => {
    items.forEach((detail: serialActionDetail)=>{
      if (detail.ref.current){
        timeoutIDs.set(
          detail.ref.current,
          setTimeout(() => {
            clearActionBefore(detail.ref.current);
            detail.action(detail.ref.current);
          }, detail.delay || 0)
        );
      }
    })
  }
}

interface serialScrollActionDetail {
  ref: RefObject<HTMLElement>,
  action: ElementScrollAction
}
/**
 * @param items Array of action details contained following keys:
 * - ref: RefObject<HTMLElement>, target to execute the action.
 * - action: ElementScrollAction being executed.
 * @returns an ElementScrollAction that triggers all actions of refs by scrolling.
 */
export function serialScrollActionCreator(items: Array<serialScrollActionDetail>): ElementScrollAction {
  return (referenceElement: HTMLElement, scrollRatio: number) => {
    items.forEach((detail: serialScrollActionDetail)=>{
      if (detail.ref.current){
        detail.action(detail.ref.current, scrollRatio);
      }
    })
  }
}