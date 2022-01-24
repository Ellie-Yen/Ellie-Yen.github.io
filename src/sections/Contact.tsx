import { 
  MySection, RowDiv, ChangeRowDiv,
  DecoTextSpan, FrontSpan,
  constants, cls_constants
} from '../components/appBasicStyles';
import { MyPrimaryLink } from '../components/LinkBtnComponents';
import { DecoBackground } from '../components/AnimateItems';
import MultiFaceWrapper from '../components/MultiFaceWrapper';

import {default as CONTENT} from '../asset/contact.json';

const TITLE = CONTENT.title;
const SUB_TITLE = CONTENT.subtitle;
const LINKS = CONTENT.links;
const BG_H = '80vh';
const BG_TOP = '10%';
const BG_CONTENT_SIZE = '50%';

export default function Contact(props: WrapperProps){
  return (
    <MySection
      id='contact'
      background={`linear-gradient(transparent, ${constants.maincolor1})`}
      margin='0'
    >
      <BackgroundPart/>
      <SectionTitlePart/>
    </MySection>
  );
}

function SectionTitlePart(){
  return (
    <MySection
      as='header'
      margin='0'
    >
      <h1>
        {`${TITLE.regular[0]} `}
        <FrontSpan>{TITLE.special[0]}</FrontSpan>
      </h1>
      <h1>
        <DecoTextSpan as='em'>{TITLE.special[1]}</DecoTextSpan>
        {` ${TITLE.regular[1]}`}
      </h1>
      <FrontSpan as='p'>{SUB_TITLE}</FrontSpan>
      <LinkPart/>
    </MySection>
  );
}

function LinkPart(){
  return (
    <ChangeRowDiv as='nav'
      w='100%'
    >
      {LINKS.map((link, i)=>
        <MyPrimaryLink 
          key={link.name}
          href={link.url}
          target='_blank'
        >
          {link.name}
        </MyPrimaryLink>
      )}
    </ChangeRowDiv>
  );
}

function BackgroundPart(){
  return (
    <RowDiv
      as='aside'
      w='100%'
      h={BG_H}
      overflow_='clip visible'
      position='sticky'
      top={BG_TOP}
      zIndex={-1}
    >
      <RowDiv
        w={BG_CONTENT_SIZE}
        h={BG_CONTENT_SIZE}
      >
        <MultiFaceWrapper
          className={cls_constants.animate_rotate2}
          axis='Z'
        >
          {Array.from(new Array(9)).map((k, i)=>
            <DecoBackground
              className={cls_constants.motion_rotate}
              key={`deco-${i}`}
            />
          )}
        </MultiFaceWrapper>
      </RowDiv>
    </RowDiv>
  );
}