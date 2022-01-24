import { useRef, RefObject,MouseEventHandler } from 'react';
import styled from 'styled-components';

import { serialActionCreator } from '../libs/serialActionCreators';
import { 
  switchClsToActive, switchClsToInactive
} from '../libs/basicElementActions';

import { disableBodyScroll, permitBodyScroll } from '../libs/bodyScrollControll';

import {
  SlowTransitionCss,
  RowDiv, ColDiv, ChangeRowDiv,
  constants, cls_constants
} from './appBasicStyles';
import { SVGButton } from './LinkBtnComponents';
import { ExtendableColDiv } from './AnimateItems';

import { default as ICON_MAP } from '../asset/bootstrap_icon_path_map.json';

interface ProjectDisplayComponentProps {
  w?: string,
  h?: string,
  summary: Children,
  coverImg: Children,
  detail: Children
}
/**
 * a component like <details> can switch to display/ hide details.
 * @param props has following keys:
 * - w, h: optional, string of detail's size. Default is 100%.
 * - summary: ReactNode, the content to display always.
 * - coverImg: ReactNode, which contains img mainly.
 * - detail: ReactNode, detailed description, which is hidden initially. 
 * @returns 
 */
export default function MyDetail(props: ProjectDisplayComponentProps) {

  const switchRefs = Array.from(new Array(3)).map(k => useRef(null));
  
  // actions to executed when the open/ close of detail
  const displayActions = [
    switchClsToActive,
    switchClsToInactive
  ].map((action, i) => 
    serialActionCreator(switchRefs.map(ref =>
      ({ref, action, delay: i * 500})  
    ))
  );

  // block body scroll when detail is opened.
  const bodyActions = [disableBodyScroll, permitBodyScroll];
  
  let nxt_action_idx = 0;
  const switchOpenClose: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    displayActions[nxt_action_idx](null);
    bodyActions[nxt_action_idx]();
    nxt_action_idx ^= 1;
  };
  return (
    <RowDiv
      as='article'
    >
      <ExtendBoard
        ref={switchRefs[0]}
        className={cls_constants.inactive}
        w='100%'
        h='100%'
        placeItems='stretch'
        placeContent='stretch'
      >
        <CoverImgPart
          coverImg={props.coverImg}
        />
        <ContentPart
          contentRef={switchRefs[1]}
          detailRef={switchRefs[2]}
          summary={props.summary}
          detail={props.detail}
          switchOpenClose={switchOpenClose}
        />
      </ExtendBoard>
    </RowDiv>
  );
}

interface ContentPartProps extends DetailPartProps {
  contentRef: RefObject<HTMLElement>,
  summary: Children,
  switchOpenClose: MouseEventHandler<HTMLElement>
}
function ContentPart(props: ContentPartProps){
  return (
    <ContentWrapper
      as='section'
      className={cls_constants.inactive}
      ref={props.contentRef}
    >
      <RowDiv as='header'
        w='100%'
        placeContent='start'
        placeItems='start'
      >
        {props.summary}
      </RowDiv>
      <DetailPart
        detailRef={props.detailRef}
        detail={props.detail}
      />
      <SVGButton
        className='switch_open_close'
        onClick={props.switchOpenClose}
        svgPath={ICON_MAP.display_switch}
      />
    </ContentWrapper>
  );
}

interface DetailPartProps {
  detailRef: RefObject<HTMLElement>,
  detail: Children
}
function DetailPart(props: DetailPartProps){
  return (
    <DetailWrapper
      as='article'
      ref={props.detailRef}
      className={cls_constants.inactive}
    >
      {props.detail}
    </DetailWrapper>
  );
}

interface CoverImgPartProps {
  coverImg: Children
}
function CoverImgPart(props: CoverImgPartProps){
  return (
    <RowDiv
      as='figure'
    >
      {props.coverImg}
    </RowDiv>
  );
}

const DetailWrapper = styled(ExtendableColDiv)`
  &.${cls_constants.inactive} {
    display: flex;
  }
  &.${cls_constants.inactive} > * {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2; 
    -webkit-box-orient: vertical; 
    word-break: break-word;
  }
`;

const ContentWrapper = styled(ColDiv)`
  ${SlowTransitionCss}
  padding: ${constants.gap};
  &.${cls_constants.inactive} {
    background: hsla(0deg, 100%, 100%, 0.5);
    z-index: 1;
  }
  &.${cls_constants.inactive}:hover, 
  &.${cls_constants.inactive}:active {
    background: ${constants.maincolor1};
    cursor: pointer;
  }
  &.${cls_constants.active} > header,
  &.${cls_constants.active} > .switch_open_close {
    position: fixed;
    z-index: 1;
  }
  &.${cls_constants.active} > header {
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: ${constants.gap};
    overflow: hidden auto;
    height: ${constants.fontsizeBig};
    width: calc(100% - ${constants.iconsize} - ${constants.gap} * 2);
    background: ${constants.bgcolor};
    filter: drop-shadow(calc(${constants.iconsize} + ${constants.gap} * 2) 0px 0px ${constants.bgcolor});
  }
  &.${cls_constants.active} > .switch_open_close {
    top: ${constants.gap};
    right: ${constants.gap};
    transform: rotate(45deg);
  }
`;

const ExtendBoard = styled(ChangeRowDiv)`
  ${SlowTransitionCss}
  &.${cls_constants.inactive} {
    display: grid;
  }
  &.${cls_constants.inactive} > * {
    grid-area: 1/1/1/1;
  }
  &.${cls_constants.inactive} > figure {
    z-index: -1;
  }
  &.${cls_constants.inactive} > figure .page_controll {
    display: none; /* hide page controll in slide show */
  }
  &.${cls_constants.inactive} > figure img {
    object-fit: cover;
  }
  &.${cls_constants.active} {
    position: fixed;
    z-index: 2;
    overflow: auto;
    padding: ${constants.fontsizeBig} ${constants.gap} ${constants.gap} ${constants.gap};
    top: 0px;
    left: 0px;
    background: ${constants.bgcolor};
  }
  &.${cls_constants.active} > * {
    width: max(50%, ${constants.leastScreenW});
  }
  &.${cls_constants.active} > figure {
    height: 70vh;
  }
`;