import { cls_constants as CONSTANT } from '../components/appBasicStyles';

export function makeHidden(element: HTMLElement){
  element.hidden = true;
}
export function makeVisible(element: HTMLElement){
  element.hidden = false;
}
/**
 * following functions use RE to manipulate classname.
 * 
 */
function clsHelper(re: RegExp, cls_name: string, element: HTMLElement){
  if (re.test(element.className)){
    element.className = element.className.replace(re, cls_name).trimEnd();
  }
  else {
    element.className += cls_name ? ` ${cls_name}` : '';
  }
}

export function switchClsToInactive(element: HTMLElement){
  clsHelper(CONSTANT.re_action, CONSTANT.inactive, element);
}
export function switchClsToActive(element: HTMLElement){
  clsHelper(CONSTANT.re_action, CONSTANT.active, element);
}

export function toLoadingCls(element: HTMLElement){
  clsHelper(CONSTANT.re_load, CONSTANT.loading, element);
}

export function toLoadFailCls(element: HTMLElement){
  clsHelper(CONSTANT.re_load, CONSTANT.loading_failed, element);
}

export function removeLoadingCls(element: HTMLElement){
  clsHelper(CONSTANT.re_load, '', element);
}

export function toStaticMotionCls(element: HTMLElement){
  clsHelper(CONSTANT.re_motion, '', element);
}
export function toFloatMotionCls(element: HTMLElement){
  clsHelper(CONSTANT.re_motion, CONSTANT.motion_float, element);
}
export function toRotateMotionCls(element: HTMLElement){
  clsHelper(CONSTANT.re_motion, CONSTANT.motion_rotate, element);
}
export function toRightMotionCls(element: HTMLElement){
  clsHelper(CONSTANT.re_motion_position, CONSTANT.motion_position_right, element);
}
export function toCenterMotionCls(element: HTMLElement){
  clsHelper(CONSTANT.re_motion_position, '', element);
}