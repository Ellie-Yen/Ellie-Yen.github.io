import { useRef, useEffect, RefObject } from 'react';

interface EntryControllRefKwargs {
  action: ElementAction,
  outAction?: ElementAction,
  noObserveAfter?: boolean,
  options?: IntersectionObserverInit,
  ref?: RefObject<any>
}
/**
 * @returns a React.RefObject that can trigger actions when
 * its element is intersecting (or not).
 * @param kwargs contains following keys:
 * - action: the executed function when element is intersecting.
 * - outAction: optional, same as action but is executed when not intersecting.
 * - noObserveAfter: optional boolean, whether to unobserve element after action.
 * - options: optional, the IntersectionObserverInit.
 * - ref: optional, a React.RefObject that can trigger callbacks.
 */
export default function EntryControllRef(kwargs: EntryControllRefKwargs){
  const callback = intersectionObserverCallbackCreator(kwargs);
  const options = kwargs.options || {
    root: null,
    rootMargin: "0px",
    threshold: 1
  };
  const observer = new IntersectionObserver(callback, options);
  const targetRef = kwargs.ref || useRef(null);
  useEffect(()=> {
    if (targetRef.current){
      observer.observe(targetRef.current);
    }
  });
  return targetRef;
}

function intersectionObserverCallbackCreator(kwargs: EntryControllRefKwargs): IntersectionObserverCallback{
  const entryHandler = entryHandlerCreator(kwargs);
  return (entries: IntersectionObserverEntry[], observer) => {
    entries.forEach((entry) => {
      entryHandler(entry, observer);
    });
  };
}

type EntryHandler = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => any
/**
 * @param kwargs EntryControllRefKwargs
 * @returns EntryHandler, a function takes entry and observer as args to make callbacks. 
 */
function entryHandlerCreator(kwargs: EntryControllRefKwargs): EntryHandler{
  // since the result functions will be called mutiple times
  // while this init function will only called once,
  // put the logic outside is more efficient.
  
  if (kwargs.noObserveAfter){
    return (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
      if (entry.isIntersecting){
        kwargs.action((entry.target as HTMLElement));
        observer.unobserve(entry.target);
        return;
      }
    }
  }
  if (kwargs.outAction){
    return (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
      if (entry.isIntersecting){
        kwargs.action((entry.target as HTMLElement));
        return;
      }
      kwargs.outAction((entry.target as HTMLElement));
    }
  }
  return (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
    if (entry.isIntersecting){
      kwargs.action((entry.target as HTMLElement));
      return;
    }
  }
}

