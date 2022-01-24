import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import {
  constants, SlowTransitionCss, RoundCss
} from './appBasicStyles';
import MySVG from './MySVG';

interface SVGLinkProps extends WrapperProps {
  linkUrl: string,
  svgPath: Array<string> | string
}
export function SVGLink(props: SVGLinkProps){
  return (
    <LargeSvgLinkWrapper 
      className={props.className || ''}
      href={props.linkUrl} 
      target='_blank'
    >
      <MySVG svgPath={props.svgPath}/>
    </LargeSvgLinkWrapper>
  );
}

interface TextedSVGLinkProps extends SVGLinkProps {
  children: string
}
export function TextedSVGLink(props: TextedSVGLinkProps){
  return (
    <SvgWithTextWrapper
      className={props.className || ''}
      href={props.linkUrl} 
      target='_blank'
    >
      <MySVG svgPath={props.svgPath}/>
      {props.children}
    </SvgWithTextWrapper>
  );
}

interface SVGButtonProps extends WrapperProps {
  noBorder?: boolean,
  svgPath: Array<string> | string,
  onClick: MouseEventHandler<any>
}
export function SVGButton(props: SVGButtonProps){
  const Wrapper = props.noBorder ? SmallSvgLinkWrapper : SvgBtnWithBorder;
  return (
    <Wrapper as='button'
      className={props.className || ''}
      onClick={props.onClick}
    >
      <MySVG svgPath={props.svgPath}/>
    </Wrapper>
  );
}

const LinkPrototype = styled.a`
  ${SlowTransitionCss}
  ${RoundCss}
  display: inline-flex;
  align-items: center;
  max-width: fit-content;
  max-height: fit-content;
  gap: ${constants.gap};
  text-decoration: none;
  cursor: pointer;
`;

const BasicLink = styled(LinkPrototype)`
  color: ${constants.effectcolor};
  &:hover, &:active {
    color: ${constants.bgcolor};
    background: ${constants.effectcolor};
  }
`;

export const MyLink = styled(BasicLink)`
  padding: ${constants.iconradius};
`;

export const MyPrimaryLink = styled(LinkPrototype)`
  padding: ${constants.iconradius};
  color: ${constants.bgcolor};
  background: ${constants.effectcolor};
  filter: drop-shadow(${constants.gap} ${constants.gap} ${constants.gap} ${constants.maincolor2});
  &:hover, &:active {
    color: ${constants.effectcolor};
    background: ${constants.bgcolor};
  }
`;

const LargeSvgLinkWrapper = styled(BasicLink)`
  & > svg {
    fill: ${constants.effectcolor};
  }
  &:hover > svg, &:active > svg {
    fill: ${constants.bgcolor};
  }
`;
const SmallSvgLinkWrapper = styled(LargeSvgLinkWrapper)`
  & > svg {
    transform: scale(0.66);
  }
`;
const SvgWithTextWrapper = styled(SmallSvgLinkWrapper)`
  padding-right: ${constants.iconradius};
`;
const SvgBtnWithBorder = styled(SmallSvgLinkWrapper)`
  border: 1px solid;
`;

