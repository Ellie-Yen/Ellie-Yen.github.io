import { useRef, RefObject } from 'react';
import EntryControllRef from '../libs/entryControllRef';
import ScrollControllRef from '../libs/scrollControllRef';
import { LazyLoadImgControllRef } from '../libs/lazyLoadControllRefs';

import { 
  serialActionCreator, serialScrollActionCreator
} from '../libs/serialActionCreators';
import { 
  switchClsToActive, switchClsToInactive,
  toFloatMotionCls, toRotateMotionCls
} from '../libs/basicElementActions';
import { moveY , scaleChange } from '../libs/scrollActionCreators';

import {
  MySection, ChangeRowDiv, RowDiv, ColDiv, OverlappingDiv,
  FrontSpan, DecoTextSpan, MyImg, 
  constants, cls_constants
} from '../components/appBasicStyles';
import { 
  ExtendableColDiv, DecoBackgroundA, DecoBackgroundB
 } from '../components/AnimateItems';
import { SVGLink } from '../components/LinkBtnComponents';
import { SplitRiseUpDecoText } from '../components/TextComponents';
import MultiFaceWrapper from '../components/MultiFaceWrapper';

import { default as ICON_MAP } from '../asset/bootstrap_icon_path_map.json';
import {default as CONTENT} from '../asset/about_me.json';

const TITLE = CONTENT.title;
const PROFILE_SRC = 'profile.png';
const PROFILE_H = `max(40vw, calc(${constants.leastScreenW} * 1.25))`;
const PROFILE_W = `max(32vw, ${constants.leastScreenW})`;
const CONTENT_W = `max(50vw, ${constants.leastScreenW})`;

export default function Intro(props: WrapperProps){
  const imgRef = LazyLoadImgControllRef({
    dataSrc: PROFILE_SRC,
    options: {
      root: null,
      rootMargin: '-300px 0px 0px 0px',
      threshold: 0.1
    }
  });

  const [
    bgRef1, bgRef2,
    identityWrapperRef
  ] = Array.from(new Array(3)).map(k => useRef(null));

  // special words rise up animation
  const [titleRef1, titleRef2] = Array.from(new Array(2)).map(k => 
    EntryControllRef({
      action: switchClsToActive, 
      outAction: switchClsToInactive
    })
  );
  
  // title extend + decoPic rotate animation and its trigger react ref object
  const identityActions = [
    [switchClsToActive, toRotateMotionCls], 
    [switchClsToInactive, toFloatMotionCls]
  ].map(action =>
    serialActionCreator([
      {ref: identityWrapperRef, action: action[0]},
      {ref: props.refObj, action: action[1]}
    ])
  );
  const identityTriggerRef = EntryControllRef({
    action: identityActions[0],
    outAction: identityActions[1]
  });

  // scrolling triggered elements moving in header
  const headerScrollAction = serialScrollActionCreator([
    {ref: bgRef1, action: moveY({from: -50, to: 0, factor: 0.5})},
    {ref: bgRef2, action: moveY({from: 150, to: 0, factor: 0.5})}
  ]);
  const headerScrollRef = ScrollControllRef({action: headerScrollAction});

  // scrolling triggered elements moving in content
  const contentScrollAction = serialScrollActionCreator([
    {ref: imgRef, action: scaleChange({from: 100, to: 120, factor: 1.5})},
    {ref: bgRef1, action: moveY({to: 50, factor: 2})},
    {ref: bgRef2, action: moveY({to: -25, factor: 1.5})}
  ]);
  const contentScrollRef = ScrollControllRef({action: contentScrollAction});
  
  return (
    <MySection id='intro'>
      <HeaderPart
        headerScrollRef={headerScrollRef}
        part1Props={{
          titleRefs: [titleRef1, titleRef2]
        }}
        part2Props={{
          identityTriggerRef: identityTriggerRef,
          identityWrapperRef: identityWrapperRef
        }}
      />
      <AboutMePart
        contentScrollRef={contentScrollRef}
        imgRef={imgRef}
        bgRefs={[bgRef1, bgRef2]}
      />
    </MySection>
  );
}

interface HeaderPartProps {
  headerScrollRef: RefObject<HTMLHeadingElement>,
  part1Props: AnimateTitlePart1Props,
  part2Props: AnimateTitlePart2Props
}
function HeaderPart(props: HeaderPartProps){
  return (
    <ColDiv
      as='header'
      ref={props.headerScrollRef}
    >
      <AnimateTitlePart1 {...props.part1Props}/>
      <AnimateTitlePart2 {...props.part2Props}/>
    </ColDiv>
  );
}
interface AnimateTitlePart1Props {
  titleRefs: Array<RefObject<HTMLHeadingElement>>
}
function AnimateTitlePart1(props: AnimateTitlePart1Props){
  return (
    <>
      <h1>
        {`${TITLE.regular[0]} `}
        <SplitRiseUpDecoText refObj={props.titleRefs[0]}>
          {TITLE.special[0]}
        </SplitRiseUpDecoText>
      </h1>
      <h1>{TITLE.regular[1]}</h1>
      <h1>
        <SplitRiseUpDecoText refObj={props.titleRefs[1]}>
          {TITLE.special[1]}
        </SplitRiseUpDecoText>
      </h1>
      <RowDiv as='h1'
        h={`calc(${constants.sectionGap} * 2)`}
      >
        {TITLE.regular[2]}
      </RowDiv>
    </>
  );
}

type AnimateTitlePart2Props = ShadowPartProps & IdentityPartProps;
function AnimateTitlePart2(props: AnimateTitlePart2Props){
  return (
    <OverlappingDiv
      w='100%'
    >
      <ShadowPart
        identityTriggerRef={props.identityTriggerRef}
      />
      <IdentityPart
        identityWrapperRef={props.identityWrapperRef}
      />
    </OverlappingDiv>
  );
}

interface ShadowPartProps {
  identityTriggerRef: RefObject<HTMLHeadingElement>
}
function ShadowPart(props: ShadowPartProps){
  return (
    <ColDiv
      mixBlendMode='color-dodge'
    >
      <h1>{TITLE.shadow[0]}</h1>
      <h1 ref={props.identityTriggerRef} >{TITLE.shadow[1]}</h1>
      <h1>{TITLE.shadow[2]}</h1>
    </ColDiv>
  );
}

interface IdentityPartProps {
  identityWrapperRef: RefObject<HTMLDivElement>
}
function IdentityPart(props: IdentityPartProps){
  return (
    <ColDiv 
      w='100%'
      h='100%'
    >
      <h1>{TITLE.regular[3]}</h1>
      <ExtendableColDiv
        ref={props.identityWrapperRef}
        className={cls_constants.inactive}
        w='100%'
        h='100%'
      >
        <MultiFaceWrapper
          className={cls_constants.animate_rotate1}
        >
          {TITLE.identity.map((idy)=>
            <DecoTextSpan key={idy}
              as='h1'
            >
              <em>{idy}</em>
            </DecoTextSpan>
          )}
        </MultiFaceWrapper>
      </ExtendableColDiv>
      <h1>{TITLE.regular[4]}</h1>
    </ColDiv>
  );
}

interface AboutMePartProps extends MyPicPartProps{
  contentScrollRef: RefObject<HTMLElement>
}
function AboutMePart(props: AboutMePartProps){
  return (
    <ChangeRowDiv as='article'
      ref={props.contentScrollRef}
      w='100%'
      margin={`${constants.sectionGap} 0`}
    >
      <MyPicPart
        imgRef={props.imgRef}
        bgRefs={props.bgRefs}
      />
      <ContentPart/>
    </ChangeRowDiv>
  );
}
interface MyPicPartProps {
  imgRef:  RefObject<HTMLImageElement>,
  bgRefs: Array<RefObject<HTMLDivElement>>
}
function MyPicPart(props: MyPicPartProps){
  return (
    <RowDiv as='aside'
      w='fit-content'
    >
      <DecoBackgroundA
        ref={props.bgRefs[0]}
        zIndex={-1}
      />
      <RowDiv
        h={PROFILE_H}
        w={PROFILE_W}
        as='figure'
        padding={constants.gap}
        background={constants.maincolor1}
        overflow_='hidden'
        is_round={true}
      >
        <MyImg
          ref={props.imgRef}
          alt='mypic'        
        />
      </RowDiv>
      <DecoBackgroundB
        ref={props.bgRefs[1]}
        zIndex={1}
      />
    </RowDiv>
  )
}
function ContentPart(){
  return (
    <ColDiv
      as='section'
      placeItems='start'
      w={CONTENT_W}
    >
      <header>
        <FrontSpan as='h2'>{CONTENT.name}</FrontSpan>
      </header>
      <p>{CONTENT.intro}</p>
      <LinkPart/>
    </ColDiv>
  );
}
function LinkPart(){
  return (
    <RowDiv as='nav'>
      {CONTENT.links.map((link)=>
        <SVGLink key={link.name} 
          linkUrl={link.url}
          svgPath={ICON_MAP[(link.name as keyof typeof ICON_MAP)]} 
        />
      )}
    </RowDiv>
  );
}