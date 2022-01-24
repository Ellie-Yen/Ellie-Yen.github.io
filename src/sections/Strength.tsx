import { useRef, RefObject } from 'react';
import EntryControllRef from '../libs/entryControllRef';
import ScrollControllRef from '../libs/scrollControllRef';

import { 
  serialActionCreator, serialScrollActionCreator
} from '../libs/serialActionCreators';
import { moveY, rotateZ } from '../libs/scrollActionCreators';
import { 
  switchClsToActive, switchClsToInactive,
  toStaticMotionCls, toFloatMotionCls, toRightMotionCls, toCenterMotionCls
} from '../libs/basicElementActions';
import { 
  MySection,
  RowDiv, ColDiv, AppearanceDiv, OverlappingDiv,
  DecoTextSpan, constants
} from '../components/appBasicStyles';
import { 
  DecoBackgroundC
 } from '../components/AnimateItems';
import { SplitRiseUpDecoText } from '../components/TextComponents';

import {default as MY_STRENGTH} from '../asset/my_strength.json';

const CONTENT = MY_STRENGTH.content;
const TITLE = MY_STRENGTH.title;
const BG_TOP = '10%';
const BG_H = `80vh`;
const BG_W = `max(calc(33vw - 2 * ${constants.gap}), calc(${constants.leastScreenW} - 2 * ${constants.gap}))`;
const COL_W = `max(66vw, ${constants.leastScreenW})`;


export default function Strength(props: WrapperProps){
  const [
    bgWrapperRef, bgRef
  ] = Array.from(new Array(2)).map(k => useRef(null));

  // background move and decoPic rotate effect in scrolling
  const scrollAction = serialScrollActionCreator([
    {ref: bgRef, action: moveY({to: 50, factor: 0.33})},
    {ref: props.refObj, action: rotateZ({to: 360, factor: 0.25})}
  ]);
  const scrollControllRef = ScrollControllRef({action: scrollAction});

  // riseup text of section title.
  const sectionTitleRef = EntryControllRef({
    action: switchClsToActive,
    outAction: switchClsToInactive
  });

  // position change for decoPic, use bgWrapperRef as its trigger RefObject.
  const positionActions = [
    [toRightMotionCls, toStaticMotionCls], 
    [toCenterMotionCls, toFloatMotionCls]
  ].map(action =>
    serialActionCreator([
      { ref: props.refObj, action: (element)=> {action.forEach(act => act(element))} }
    ])
  );
  EntryControllRef({
    ref: bgWrapperRef,
    action: positionActions[0],
    outAction: positionActions[1],
    options: {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
    }
  });

  return (
    <OverlappingDiv
      as='section'
      id='strength'
      ref={scrollControllRef}
      padding={`${constants.sectionGap} 0`}
    >
      <BackgroundPart
        bgRef={bgRef}
        bgWrapperRef={bgWrapperRef}
      />
      <ContentPart 
        sectionTitleRef={sectionTitleRef}
      />
    </OverlappingDiv>
  );
}

type ContentPartProps = SectionTitlePartProps;
function ContentPart(props: ContentPartProps){
  return (
    <ColDiv
      as='section'
      zIndex={1}
      w={COL_W}
    >
      <SectionTitlePart
        sectionTitleRef={props.sectionTitleRef}
      />
      {CONTENT.map((item, i)=>
        <ItemPart
          key={`strength_content-${i}`}
          summary={item.summary}
          description={item.description}
        />
      )}
      <AppearanceDiv h='50vh'/>
    </ColDiv>
  );
}

interface SectionTitlePartProps {
  sectionTitleRef: RefObject<HTMLHeadingElement>
}
function SectionTitlePart(props: SectionTitlePartProps){
  return (
    <MySection
      as='header'
      margin='0'
    >
      <h1>
        <DecoTextSpan as='em'>{TITLE.special[0]}</DecoTextSpan>
        {` ${TITLE.regular[0]} ${TITLE.regular[1]} `}
        <SplitRiseUpDecoText 
          refObj={props.sectionTitleRef}
        >
          {TITLE.special[1]}
        </SplitRiseUpDecoText>
        {` ${TITLE.regular[2]}`}
      </h1>
    </MySection>
  );
}

interface ItemPartProps {
  description: string,
  summary: string
}
function ItemPart(props: ItemPartProps){
  return (
    <MySection
      as='article'
      margin='0'
    >
      <h2>{props.summary}</h2>
      <p>{props.description}</p>
    </MySection>
  )
}

interface BackgroundPartProps {
  bgWrapperRef: RefObject<HTMLDivElement>,
  bgRef: RefObject<HTMLDivElement>
}
function BackgroundPart(props: BackgroundPartProps){
  return (
    <RowDiv as='aside'
      ref={props.bgWrapperRef}
      placeSelf='start end'
      placeItems='end'
      position='sticky'
      top={BG_TOP}
      h={BG_H}
      w={BG_W}
      margin={`0 ${constants.gap}`}
      zIndex={-1}
      is_round={true}
      overflow_='hidden'
    >
      <DecoBackgroundC
        ref={props.bgRef}
      />
    </RowDiv>
  );
}