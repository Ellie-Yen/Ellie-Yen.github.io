import {
  useRef, MouseEventHandler, RefObject
} from 'react';
import styled from 'styled-components';

import { LazyLoadImgControllRef } from '../libs/lazyLoadControllRefs';
import indexController from '../libs/indexController';
import { serialActionCreator } from '../libs/serialActionCreators';
import { 
  switchClsToInactive, switchClsToActive,
  makeHidden, makeVisible
 } from '../libs/basicElementActions';
import { makeTransform, changeInnerText } from '../libs/elementActionCreators';
import makeAnimationCreator from '../libs/makeAnimationCreator';

import {
  SlowTransitionCss,
  RowDiv, ColDiv, MyImg,
  constants, cls_constants
} from './appBasicStyles';
import { SlowTransformRowDiv } from './AnimateItems';
import { SVGButton } from './LinkBtnComponents';
import MultiFaceWrapper from './MultiFaceWrapper';

import { default as ICON_MAP } from '../asset/bootstrap_icon_path_map.json';

const ZOOM_FACTOR = 1.5;
const ZOOM_THRESHOLD = 50;
const ZOOM_FREEZE_TIME = 2000;

type Imginfo = {
  dataSrc: string,
  alt: string
}
interface MySlideShowProps {
  imgList: Array<Imginfo>
}
export default function MySlideShow(props: MySlideShowProps){
  const imgRefs = props.imgList.map((info)=> 
    LazyLoadImgControllRef({dataSrc: info.dataSrc})
  );
  const [
    contentRef, viewBoxRef, containerRef, pageDisplayerRef
  ] = Array.from(new Array(4)).map(k => useRef(null));
  
  const page_amount = imgRefs.length;

  // style action when moving to new_idx th page. 
  const unit = `360deg / ${page_amount || 1}`;
  let prev_page_idx = 0;
  const flipToPage = (new_page_idx: number) => {
    serialActionCreator([
      {ref: pageDisplayerRef, action: changeInnerText(`${new_page_idx + 1}`)},
      {ref: contentRef, action: makeTransform(`rotateX(calc(${new_page_idx} * ${unit}))`)},
      {ref: imgRefs[new_page_idx], action: makeVisible}
    ])(null);
    prev_page_idx = new_page_idx;
  }

  // create event handlers that handle page idx change
  const {addBy, getIndex} = indexController(page_amount);
  const [nxtPage, prevPage]: Array<MouseEventHandler<HTMLButtonElement>> = 
    [1, -1].map(amount =>
      (event) => {
        event.preventDefault();
        addBy(amount);
        flipToPage(getIndex());
      }
    )
  ;

  // create event handler that switches the size of container.
  let is_fullsize = 0;
  const sizeActions = [switchClsToActive, switchClsToInactive].map(action =>
    serialActionCreator([{ref: containerRef, action}])
  );
  const switchDisplaySize: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    sizeActions[is_fullsize](null);
    is_fullsize ^= 1;
  }

  // create event handlers that switch the zoom factor of content (by its wrapper).
  // choose mouseout event rather than mouseleave event
  // because latter one is fired when the pointer has exited the element and all of its descendants.
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
  const prev_loc = [0, 0];
  let prev_timeout_id: any;

  const clearZoom = serialActionCreator([
    {ref: viewBoxRef, action: makeTransform('')}
  ]);
  const cancelZoomIn = () => {
    clearZoom(null);
    prev_loc[0] = 0;
    prev_loc[1] = 0;
  };
  const makeAnimation = makeAnimationCreator();
  const zoomIn: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    // only act if it's fullsize and move distance >= threshold
    if (! is_fullsize){
      return;
    }
    const [x, y] = [prev_loc[0] - event.clientX, prev_loc[1] - event.clientY];
    if (Math.max(Math.abs(x), Math.abs(y)) < ZOOM_THRESHOLD){
      return;
    }

    makeAnimation(() => {
      clearTimeout(prev_timeout_id);

      // set boundary to prevent the target is out of view.
      const transform_style = `
        scale(${ZOOM_FACTOR}) 
        translate(max(min(${x}px, 50%), -50%), max(min(${y}px, 50%), -50%))
      `;
      serialActionCreator([
        {ref: viewBoxRef, action: makeTransform(transform_style)}
      ])(null);
      prev_loc[0] = event.clientX;
      prev_loc[1] = event.clientY;

      // resume default zoom size in if no action.
      prev_timeout_id = setTimeout(cancelZoomIn, ZOOM_FREEZE_TIME);
    });
  }
  const zoomOut: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    cancelZoomIn();
  }

  return (
    <SlideShowContainer
      className={cls_constants.inactive}
      ref={containerRef}
      w='100%'
      h='100%'
    >
      <ContentDisplayerPart
        viewBoxRef={viewBoxRef}
        contentRef={contentRef}
        imgRefs={imgRefs}
        imgList={props.imgList}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
      <Menu
        pageDisplayerRef={pageDisplayerRef}
        nxtPage={nxtPage}
        prevPage={prevPage}
        switchDisplaySize={switchDisplaySize}
        pageAmount={page_amount}
      />
    </SlideShowContainer>
  );
}

interface ContentDisplayerPartProps extends MySlideShowProps {
  viewBoxRef: RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>,
  imgRefs: Array<RefObject<HTMLImageElement>>,
  zoomIn: MouseEventHandler<HTMLElement>,
  zoomOut: MouseEventHandler<HTMLElement>
}
function ContentDisplayerPart(props: ContentDisplayerPartProps){
  return (
    <RowDiv
      onMouseMove={props.zoomIn}
      onMouseOut={props.zoomOut}
      w='100%'
      h='100%'
      overflow_='hidden'
      filter_={`drop-shadow(0px 0px ${constants.sectionGap} ${constants.maincolor2})`}
    >
      <SlowTransformRowDiv
        ref={props.viewBoxRef}
        w='100%'
        h='100%'
      >
        <MultiFaceWrapper
          refObj={props.contentRef}
        >
          {props.imgRefs.map((ref, i)=>
            <MyImg
              key={`${props.imgList[i].alt}-${i}`}
              ref={ref}
              alt={props.imgList[i].alt}
              hidden={i !== 0}
              decoding='async'
            />
          )}
        </MultiFaceWrapper>
      </SlowTransformRowDiv>
    </RowDiv>
  );
}

interface MenuProps extends PageControllPanelProps {
  switchDisplaySize: MouseEventHandler<HTMLButtonElement>
}
function Menu(props: MenuProps){
  return (
    <ColDiv
      as='nav'
      className='page_controll'
      w='0px'
      h='100%'
      placeItems='end'
      placeContent='space-between'
      mixBlendMode='difference'
      filter_='invert(1)'
    >
      <PageControllPanel
        pageDisplayerRef={props.pageDisplayerRef}
        nxtPage={props.nxtPage}
        prevPage={props.prevPage}
        pageAmount={props.pageAmount}
      />
      {['fullscreen_on', 'fullscreen_off'].map(action=>
        <SVGButton
          key={action}
          className={action}
          svgPath={ICON_MAP[action as keyof typeof ICON_MAP]}
          onClick={props.switchDisplaySize}
          noBorder={true}
        />
      )}
    </ColDiv>
  );
}

interface PageControllPanelProps {
  pageAmount: number,
  pageDisplayerRef: RefObject<HTMLButtonElement>,
  nxtPage: MouseEventHandler<HTMLButtonElement>,
  prevPage: MouseEventHandler<HTMLButtonElement>
}
function PageControllPanel(props: PageControllPanelProps){
  return (
    <ColDiv>
      <SVGButton
        svgPath={ICON_MAP.prev_page}
        onClick={props.prevPage}
        noBorder={true}
      />
      <span ref={props.pageDisplayerRef}>1</span>
      <small>/</small>
      <small>{props.pageAmount}</small>
      <SVGButton
        svgPath={ICON_MAP.next_page}
        onClick={props.nxtPage}
        noBorder={true}
      />
    </ColDiv>
  );
}

const SlideShowContainer = styled(RowDiv)`
  &.${cls_constants.active} {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    background: ${constants.bgcolor};
  }
  &.${cls_constants.active} .fullscreen_on {
    display: none;
  }
  &.${cls_constants.inactive} .fullscreen_off {
    display: none;
  }
`;