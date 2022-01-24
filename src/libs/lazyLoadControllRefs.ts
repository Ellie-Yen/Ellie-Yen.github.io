import { RefObject } from 'react';
import EntryControllRef from './entryControllRef';
import { toLoadingCls, toLoadFailCls, removeLoadingCls } from './basicElementActions';

interface LazyLoadImgKwargs {
  dataSrc: string,
  options?: IntersectionObserverInit,
  ref?: RefObject<any> 
}
/**
 * @returns a React.RefObject that has lazy loading effect. 
 * (due to not all browsers support setting loading='lazy' )
 * @param kwargs contains following keys:
 * - dataSrc: string, img's src.
 * - options: optional, the IntersectionObserverInit.
 * - ref: optional, a React.RefObject that can trigger callbacks.
 */
export function LazyLoadImgControllRef(kwargs: LazyLoadImgKwargs){
  const action: ElementAction = (element: Element) => {
    handleLoadingStates(kwargs.dataSrc, (element as HTMLImageElement))
  };
  const options = kwargs.options || {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  } 
  return EntryControllRef({
    action,
    noObserveAfter: true,
    ref: kwargs.ref,
    options
  })
}

/**
 * add loading-relative event listeners to element.
 * @param url string as src. 
 * @param element HTMLImageElement
 */
function handleLoadingStates(url: string, element: HTMLImageElement) {
  // a flag indicates whether the src is loaded successly.
  let is_success: boolean | undefined;
  
  // add loading className when init loading
  toLoadingCls(element);

  // use double click to reload.
  const reload = (event: MouseEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    element.src = '';
    element.src = url;
  };

  // for reload, must set useCapture = true.
  // because two anonymous functions are completely different functions.
  // without doing so, removeEventListener will not work.
  element.addEventListener('dblclick', reload, true);

  // and remove the className and reload handler after loading is complete.
  element.onload = () => {
    element.decode().then(()=> {
      removeLoadingCls(element);
      is_success = true;
      element.removeEventListener('dblclick', reload, true);
    });
  }

  // add the failing className
  element.onerror = () => {
    toLoadFailCls(element);
    is_success = false;
  }
  element.src = url;
}