import { RowDiv, cls_constants } from '../components/appBasicStyles';
import { DecoBackground } from '../components/AnimateItems';

export default function DecoPic(props: WrapperProps){
  return (
    <RowDiv
      id='deco_pic_container'
      position='sticky'
      top='50%'
      h='0px'
      overflow_='clip visible'
    >
      <DecoBackground
        ref={props.refObj}
        id='deco_pic'
        className={cls_constants.motion_float}
      />
    </RowDiv>
  );
}