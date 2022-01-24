import styled from 'styled-components';
import { constants } from './appBasicStyles';

interface MySVGProps {
  svgPath: string | Array<string>
}
export default function MySVG(props: MySVGProps){
  const svgPaths: Array<string> = Array.isArray(props.svgPath) ? props.svgPath : [props.svgPath];
  return (
    <MySVGElement xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      {svgPaths.map((svgPath, i)=>
        <path key={`svg_path-${i}`} d={svgPath}/>
      )}
    </MySVGElement>
  );
}

const MySVGElement = styled.svg`
  width: ${constants.iconsize};
`;