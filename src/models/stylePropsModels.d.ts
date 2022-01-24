/**
 * models used in styled-components as props
 */

// add _ as suffix to avoid inline style in html
interface AppearanceProps {
  position?: string,
  top?: string,
  left?: string,
  w?: string,
  h?: string,
  padding?: string,
  margin?: string,
  zIndex?: number,
  background?: string
  mixBlendMode?: string,
  filter_?: string,
  overflow_?: string,
  is_round?: boolean
}

type ContentOptions = 'start' | 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch' | 'end';
type ItemOptions = 'center' | 'stretch' | 'start' | 'end' | 'baseline';

interface PlaceProps {
  placeItems?: ItemOptions | `${ItemOptions} ${ItemOptions}`,
  placeSelf?: ItemOptions | `${ItemOptions} ${ItemOptions}`,
  placeContent?: ContentOptions | `${ContentOptions} ${ContentOptions}`
}

type ContainerProps = AppearanceProps & PlaceProps;

interface IthItemProps extends ContainerProps {
  i: number
}

interface MyTextProps {
  background?: string
}

// reference: https://stackoverflow.com/questions/67970513/typescript-error-with-styled-components-and-as-ts2769-no-overload-matches-this
type KnownTags = keyof JSX.IntrinsicElements;
type Children = React.ReactNode | string;

// avoid use 'ref' in props
// https://reactjs.org/warnings/special-props.html
interface WrapperProps {
  children?: Children,
  refObj?: React.RefObject<any>,
  as?: KnownTags,
  className?: string,
  hidden?: boolean
}

