import styled, {css, FlattenSimpleInterpolation} from "styled-components";

export const constants = {
  gap: 'var(--gap)',
  sectionGap: 'var(--section_gap)',
  leastScreenW: 'var(--least_width)',
  leastScreenH: 'var(--least_height)',
  maxScreenW: 'var(--max_width)',
  iconsize: 'var(--iconsize)',
  iconradius: 'var(--iconradius)',
  fontsize: 'var(--fontsize_normal)',
  fontsizeBig: 'var(--fontsize_big)',
  decofont: 'var(--decofont)',
  fontcolor: 'var(--fontcolor)',
  maincolor1: 'var(--maincolor1)',
  maincolor2: 'var(--maincolor2)',
  effectcolor: 'var(--effectcolor)',
  bgcolor: 'var(--bgcolor)',
  failedPic: 'var(--failed_pic)'
};
export const animation_constants = {
  start: '1s',
  step: '0.5s',
  duration: '2s'
};
export const cls_constants = {
  active: '_a0',
  inactive: '_a1',
  re_action: /_a[0-1]/g,
  loading: '_l0',
  loading_failed: '_l1',
  re_load: /_l[0-1]/g,
  animate_rotate1: 'rotateX',
  animate_rotate2: 'rotateZ',
  animate_move: 'horizontalBackgroundMove',
  motion_float: '_m0',
  motion_rotate: '_m1',
  re_motion: /_m[0-1]/g,
  motion_position_right: '_p0',
  re_motion_position: /_p[0-1]/g,
}

// to avoid errors in nested css, these css are static.
const FlexCss = css`display: flex;`;
const InlineFlexCss = css`display: inline-flex;`;
const BoxSizeCss = css`box-sizing: border-box;`;
const HiddenCss = css`&[hidden]{display: none;}`;
const DecoFontCss = css`
  font-family: ${constants.decofont};
  font-weight: 200;
`;
export const SlowTransitionCss = css`
  transition-duration: ${animation_constants.duration};
`;
export const RoundCss = css`
  border-radius: ${constants.maxScreenW}; 
`;

type AppearanceMap = {
  [Property in keyof AppearanceProps]: string
};
type PlaceMap = {
  [Property in keyof PlaceProps]: string
};
type MyTextMap = {
  [Property in keyof MyTextProps]: string
};

const sizeMap: AppearanceMap = {
  h: 'height',
  w: 'width'
};
const positionMap: AppearanceMap = {
  position: 'position',
  top: 'top',
  left: 'left'
};
const appearanceMap: AppearanceMap = {
  padding: 'padding',
  margin: 'margin',
  zIndex: 'z-index',
  background: 'background',
  filter_: 'filter',
  mixBlendMode: 'mix-blend-mode',
  overflow_: 'overflow'
}
const placeMap: PlaceMap = {
  placeItems: 'place-items',
  placeContent: 'place-content',
  placeSelf: 'place-self'
};
const myTextMap: MyTextMap = {
  background: 'background'
};

type CssMap = AppearanceMap | PlaceMap | MyTextMap;
type StyleProps = ContainerProps | AppearanceProps | PlaceProps | MyTextProps;

// functions that helps produce static css array
function cssProducer(cssMap: CssMap, props: StyleProps): Array<FlattenSimpleInterpolation> {
  const res: Array<FlattenSimpleInterpolation> = [];
  for (const [k, val] of Object.entries(props)){
    if (! cssMap[(k as keyof typeof cssMap)]){
      continue;
    }
    res.push(css`${cssMap[(k as keyof typeof cssMap)]}: ${val};`);
  }
  return res;
}

export function getBasicPlaceCss(props: ContainerProps = {}): Array<FlattenSimpleInterpolation>{
  props.placeItems = props.placeItems || 'center';
  props.placeContent = props.placeContent || 'center';
  return cssProducer(placeMap, props);
}
export function getBasicAppearanceCss(props: AppearanceProps = {}): Array<FlattenSimpleInterpolation>{
  const res = cssProducer(appearanceMap, props);
  if (!props.is_round){
    return res;
  }
  return [...res, RoundCss];
}
export function getBasicSizeCss(props: AppearanceProps = {}): Array<FlattenSimpleInterpolation>{
  return cssProducer(sizeMap, props);
}
export function getBasicPositionCss(props: AppearanceProps = {}): Array<FlattenSimpleInterpolation>{
  return cssProducer(positionMap, props);
}
export function getBasicTextCss(props: MyTextProps = {}): Array<FlattenSimpleInterpolation>{
  return cssProducer(myTextMap, props);
}

const DivProtoType = styled.div`
  ${HiddenCss}
  ${BoxSizeCss}
`;
const SizeDiv = styled(DivProtoType)((props: ContainerProps = {})=> 
  getBasicSizeCss(props)
);
const PositionDiv = styled(SizeDiv)((props: ContainerProps = {})=> 
  getBasicPositionCss(props)
);
export const AppearanceDiv = styled(PositionDiv)((props: ContainerProps = {})=> 
  getBasicAppearanceCss(props)
);
export const PlaceDiv = styled(PositionDiv)((props: ContainerProps = {})=> 
  getBasicPlaceCss(props)
);

const FlexDivPrototype = styled(PlaceDiv)`
  ${FlexCss}
`;

export const RowDiv = styled(FlexDivPrototype)((props: ContainerProps = {})=> 
  getBasicAppearanceCss(props)
);
export const ColDiv = styled(RowDiv)`
  flex-flow: column;
`;
export const ChangeRowDiv = styled(RowDiv)`
  flex-wrap: wrap;
  & > * { 
    flex-grow: 1; 
  }
`;
export const IthDiv = styled(RowDiv)((props: IthItemProps) =>`
  --i: ${props.i};
`);
export const SprayDiv = styled(ColDiv)`
  padding: ${constants.gap};
  gap: ${constants.gap};
  & > * {
    ${RoundCss}
    width: max(33%, ${constants.leastScreenW});
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }
  & > :nth-child(2n + 1) {
    place-self: start;
  }
  & > :nth-child(2n) {
    place-self: end;
  }
`;

const OverlappingDivPrototype = styled(PlaceDiv)`
  display: grid;
  grid-template: 1fr/ 1fr;
  & > * {
    grid-area: 1/1/1/1;
  }
`;
export const OverlappingDiv = styled(OverlappingDivPrototype)((props: ContainerProps = {})=> 
  getBasicAppearanceCss(props)
);

const BasicSection = styled.section`
  ${FlexCss}
  ${BoxSizeCss}
  flex-direction: column;
  place-content: center;
  place-items: center;
  min-height: max(100vh, ${constants.leastScreenH});
  min-width: max(100%, ${constants.leastScreenW});
  max-width: ${constants.maxScreenW};
  margin: ${constants.sectionGap} 0;
  padding: 0;
`;
export const MySection = styled(BasicSection)((props: ContainerProps = {})=>
  getBasicAppearanceCss(props)
);

export const MyImg = styled.img`
  ${SlowTransitionCss}
  ${HiddenCss}
  ${BoxSizeCss}
  object-fit: contain;
  height: inherit;
  width: inherit;
  color: transparent;
  &.${cls_constants.loading} {
    background: repeating-linear-gradient(45deg, transparent, transparent 25px, ${constants.maincolor2} 25px, ${constants.maincolor2} 50px) center/ 200% 200%;
    animation: Loading 2s ease infinite;
  }
  &.${cls_constants.loading_failed}::before {
    ${InlineFlexCss}
    ${BoxSizeCss}
    content: 'double click to reload "' attr(alt) '"';
    height: 100%;
    width: 100%;
    place-content: center;
    place-items: center;
    float: left;
    shape-outside: inset(100%);
    background: ${constants.failedPic} no-repeat center/ contain content-box, ${constants.maincolor1};
    padding: ${constants.gap};
    color: initial;
  }
`;

const MySpanProtoType = styled.span`
  ${HiddenCss}
  ${SlowTransitionCss}
  ${InlineFlexCss}
`;
export const MySpan = styled(MySpanProtoType)((props: MyTextProps)=>
  getBasicTextCss(props)
);

export const FrontSpan = styled(MySpan)`
  filter: opacity(1); /* create effect like translateZ in non-nested area. */
`;
export const DecoTextSpan = styled(FrontSpan)`
  ${DecoFontCss}
`;
export const TagSpan = styled.span`
  font-size: small;
  &::before {
    content: '#';
    padding: 0 0.2rem;
    opacity: 0.5;
  }
`;