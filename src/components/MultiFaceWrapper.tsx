import styled from 'styled-components';
import { IthDiv } from '../components/appBasicStyles';
import { SlowTransformRowDiv } from '../components/AnimateItems';

type Axis = 'X' | 'Y' | 'Z';
interface MultiFaceWrapperProps extends WrapperProps {
  axis?: Axis,
  children: Array<Children>
}

export default function MultiFaceWrapper(props: MultiFaceWrapperProps){
  const FaceWrapper = FaceWrapperMap[props.axis || 'X'];
  return (
      <FaceWrapper
        ref={props.refObj}
        className={props.className || ''}
        itemCount={props.children.length || 1}
        h='100%'
        w='100%'
      >
        {props.children.map((child, i)=>
          <Face
            key={`multiface-${i}`}
            h='100%'
            w='100%'
            i={i}
          >
            {child}
          </Face>
        )}
      </FaceWrapper>
  );
}

interface MultiFaceProps {
  itemCount: number
}
const XMultiFace = styled(SlowTransformRowDiv)((props: MultiFaceProps) =>
  getXAxisTemplate(props.itemCount)
);
const YMultiFace = styled(SlowTransformRowDiv)((props: MultiFaceProps) =>
  getYAxisTemplate(props.itemCount)
);

// unlike other axises, in z axis, translateX is constant and bigger to avoid overlapping
const ZMultiFace = styled(SlowTransformRowDiv)((props: MultiFaceProps) =>
  getZAxisTemplate(props.itemCount)
);

const FaceWrapperMap = {
  'X': XMultiFace,
  'Y': YMultiFace,
  'Z': ZMultiFace
};

const Face = styled(IthDiv)`
  backface-visibility: hidden;
  position: absolute;
`;

function getXAxisTemplate(item_count: number){
  const deg = getRotateDegree(item_count);
  const factor = getTranslateDistanceFactor(deg);
  return `
  & > div {
    transform:
      rotateX(calc(var(--i) * -${deg}deg))
      rotateX(90deg)
      translateY(calc(100% * ${factor}))
      rotateX(-90deg)
    ;
  }
  `;
}

function getYAxisTemplate(item_count: number){
  const deg = getRotateDegree(item_count);
  const factor = getTranslateDistanceFactor(deg);
  return `
  & > div {
    transform:
      rotateY(calc(var(--i) * -${deg}deg))
      rotateY(90deg)
      translateX(calc(100% * ${factor}))
      rotateY(-90deg)
    ;
  }
  `;
}

function getZAxisTemplate(item_count: number){
  const deg = getRotateDegree(item_count);
  const factor = getTranslateDistanceFactor(deg);
  return `
  & > div {
    transform:
      rotateZ(calc(var(--i) * ${deg}deg))
      translateY(calc(-100% + 50% * ${factor}))
    ;
  }
  `;
}

/**
 * calculate rotating degree by count of faces to form a 3d cylindrical.
 * @param face_count : number of face count, at least 1.
 * @returns a number represents degree as the unit of rotating.
 */
function getRotateDegree(face_count: number): number{
  return 360 / face_count;
}

/**
 * calculate the ratio of
 * translate distance to one of the sides
 * by degree to form a 3d cylindrical.
 * @param deg : number, degree as unit of rotating.
 * @returns a number as a factor.
 */
 function getTranslateDistanceFactor(deg: number): number {
  // for following deg, will get an invalid tan value.
  if (deg === 360 || deg === 0){
    return 0;
  }
  return 0.5 * Math.tan((90 - deg / 2) / 180 * Math.PI);
}