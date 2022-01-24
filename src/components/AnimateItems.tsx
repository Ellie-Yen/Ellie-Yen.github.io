import styled from 'styled-components';
import { 
  SlowTransitionCss,
  ColDiv, RowDiv, AppearanceDiv,
  constants, animation_constants, cls_constants 
} from './appBasicStyles';


export const DecoBackground = styled(AppearanceDiv)`
  ${SlowTransitionCss}
  background: url(pexels-anna-tarazevich-5896085-1.png) center/contain no-repeat;
  height: max(50vh, calc(${constants.leastScreenH} / 2));
  width: max(33%, ${constants.leastScreenW});
  position: relative;
  left: 0;
  &.${cls_constants.motion_float} {
    animation: Floating 5s ease infinite;
  }
  &.${cls_constants.motion_rotate}{
    animation: RotateZ 5s ease infinite;
  }
  &.${cls_constants.motion_position_right}{
    left: calc(50% - max(calc(${constants.leastScreenW} / 2), 16.5%));
  }
`;

export const DecoBackgroundA = styled(AppearanceDiv)`
  ${SlowTransitionCss}
  background: url(pexels-anna-tarazevich-5896085-2.png) center/contain no-repeat;
  height: 80%;
  width: 70%;
  position: absolute;
  margin: 0% 20% 30% 0%;
`;

export const DecoBackgroundB = styled(AppearanceDiv)`
  ${SlowTransitionCss}
  background: url(pexels-anna-tarazevich-5896085-3.png) center/contain no-repeat;
  height: 40%;
  width: 30%;
  position: absolute;
  margin: 50% 0% 0% 30%;
`;

export const DecoBackgroundC = styled(AppearanceDiv)`
  ${SlowTransitionCss}
  background: url(deco2.png) no-repeat center/contain ${constants.maincolor1};
  height: 200%;
  width: 100%;
`;

export const ExtendableColDiv = styled(ColDiv)`
  ${SlowTransitionCss}
  &.${cls_constants.active} {
    animation: Extend ${animation_constants.duration} ease 1;
  }
  &.${cls_constants.inactive} {
    display: none;
  }
`;

export const SlowTransformRowDiv = styled(RowDiv)`
  ${SlowTransitionCss}
  transform-style: preserve-3d;
`;