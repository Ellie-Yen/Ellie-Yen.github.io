import styled from 'styled-components';
import {
  IthDiv, DecoTextSpan, MySpan,
  animation_constants, cls_constants
} from '../components/appBasicStyles';

type TextComponentProps = MyTextProps & WrapperProps & {
  children: string
}
export function SplitRiseUpDecoText(props: TextComponentProps){
  return (
    <SplitDecoTextSpan 
      ref={props.refObj}
      className={`${cls_constants.inactive} ${props.className || ''}`}
    >
      {props.children.split('').map((char, i)=>
        <IthDiv
          as='em'
          key={`split_text-${i}`}
          i={i}
        >
          {char}
        </IthDiv>
      )}
    </SplitDecoTextSpan>
  );
}

interface FixedTextProps extends TextComponentProps {
  repeat?: string,
  is_shallow?: boolean 
}
export function FixedText(props: FixedTextProps){
  const w = 50 * (props.children.length + 1);
  const fakeTextBg = `url("data:image/svg+xml,<svg 
    width='${w}'
    height='120' viewBox='0 0 ${w} 120' 
    xmlns='http://www.w3.org/2000/svg'>
      <text 
        y='80%' 
        font-family='sans-serif' 
        font-size='100'
        stroke='black' 
        strokeWidth='2'
        fill='hsla(0, 0%, 0%, ${props.is_shallow ? 0 : 1})'
      >
        ${props.children}
      </text>
    </svg>") center ${props.repeat || 'no-repeat'} fixed
  `;
  return (
    <FixedTextSpan
      as={props.as}
      ref={props.refObj}
      className={props.className || ''}
      background={fakeTextBg}
    >
      {props.children}
    </FixedTextSpan>
  );
}

const SplitDecoTextSpan = styled(DecoTextSpan)`
  &.${cls_constants.inactive} {
    filter: opacity(0);
  }
  &.${cls_constants.active} > * {
    animation: RiseUp calc(
      var(--i) * ${animation_constants.step} +
      ${animation_constants.start}
    ) ease 1;
  }
`;

const FixedTextSpan = styled(MySpan)`
  height: 100vh;
  width: 100%;
  color: transparent;
`;