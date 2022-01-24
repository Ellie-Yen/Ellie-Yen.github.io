import { RefObject } from 'react';
import entryControllRef from './entryControllRef';
import makeAnimationCreator from './makeAnimationCreator';

interface ScrollControllRefKwargs {
  action: ElementScrollAction,
  ref?: RefObject<any>
}
export default function ScrollControllRef(kwargs: ScrollControllRefKwargs){
  // init info to calculate changing of scroll amount
  let window_height: undefined | number;
  let start_scroll_pos: undefined | number;

  // scrollAction: window event listener to make effect on element (ref.current).
  let scrollAction: undefined | ((event: Event) => void);

  // window event listener to update the init info when resizing.
  function updateInitInfo(): void{
    window_height = undefined;
    start_scroll_pos = undefined;
  }

  // create a event handler helps make action on element (ref.current)
  // when scrolling.
  function scrollActionCreator(element: HTMLElement) {
    const makeAnimation = makeAnimationCreator();
    return (event: Event) => {
      if (window_height === undefined){
        window_height = window.innerHeight;
      }
      if (start_scroll_pos === undefined){
        start_scroll_pos = window.scrollY + element.getBoundingClientRect().y;
        return;
      }
      makeAnimation(()=> {
        kwargs.action(element, (window.scrollY - start_scroll_pos) / window_height);
      });
    };
  }

  // everything happened only when element is intersecting.
  return entryControllRef({
    action: (element: HTMLElement)=>{
      if (! scrollAction){
        scrollAction = scrollActionCreator(element);
      }
      window.addEventListener('scroll', scrollAction, true);
      window.addEventListener('resize', updateInitInfo, true);
    },
    outAction: (element: HTMLElement)=>{
      window.removeEventListener('scroll', scrollAction, true);
      window.removeEventListener('resize', updateInitInfo, true);
    },
    options: {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    },
    ref: kwargs.ref
  });
}