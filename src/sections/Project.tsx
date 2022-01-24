import { RefObject } from 'react';
import EntryControllRef from '../libs/entryControllRef';

import { 
  switchClsToActive, switchClsToInactive
} from '../libs/basicElementActions';

import {
  MySection, ColDiv, 
  AppearanceDiv, SprayDiv,
  TagSpan, FrontSpan, DecoTextSpan,
  cls_constants
} from '../components/appBasicStyles';
import { TextedSVGLink } from '../components/LinkBtnComponents';
import { SplitRiseUpDecoText, FixedText } from '../components/TextComponents';
import MyDetail from '../components/MyDetail';
import MySlideShow from '../components/MySlideShow';

import { default as PROJECT } from '../asset/project.json'
import { default as ICON_MAP } from '../asset/bootstrap_icon_path_map.json';

const TITLE = PROJECT.title;
const CONTENT = PROJECT.content;
const LINK_TITLE = PROJECT.link_title;

export default function Project(props: WrapperProps){
  // rise up of em text in section title.
  const sectionTitleRef = EntryControllRef({
    action: switchClsToActive,
    outAction: switchClsToInactive
  });

  return (
    <MySection
      id='project' 
    >
      <SectionTitlePart
        sectionTitleRef={sectionTitleRef}
      />
      {CONTENT.map((content, i) =>
        <ProjectSection
          key={content.title}
          title={content.title}
          projectList={require(`../asset/projects_${content.url}.json`)}
        />
      )}
    </MySection>
  );
}

interface SectionTitlePartProps {
  sectionTitleRef: RefObject<HTMLElement>
}
function SectionTitlePart(props: SectionTitlePartProps){
  return (
    <ColDiv as='header'>
      <h1>
        <DecoTextSpan as='em'>{TITLE.special[0]}</DecoTextSpan>
        {` ${TITLE.regular[0]}`}
      </h1>
      <h1>
        {`${TITLE.regular[1]} `}
        <FrontSpan>{TITLE.special[1]}</FrontSpan>
        {` ${TITLE.regular[2]}`}
      </h1>
      <h1>
        <SplitRiseUpDecoText refObj={props.sectionTitleRef}>
          {TITLE.special[2]}
        </SplitRiseUpDecoText>
        {TITLE.regular[3]}
      </h1>
    </ColDiv>
  );
}

interface ProjectSectionProps extends ProjectSectionTitleProps {
  projectList: Array<ProjectItemProps>,
}
function ProjectSection(props: ProjectSectionProps){
  return (
    <MySection
      id={`project_${props.title}`}
      margin='0'
    >
      <ProjectSectionTitle 
        title={props.title}
      />
      <SprayDiv
        w='100%'
      >
        {props.projectList.map((project, i)=>
          <ProjectItem
            key={`project_${props.title}_${i}`}
            {...project}
          />
        )}
      </SprayDiv>
    </MySection>
  );
}

interface ProjectSectionTitleProps {
  title: string
}
function ProjectSectionTitle(props: ProjectSectionTitleProps){
  return (
    <AppearanceDiv as='header'
      position='sticky'
      top='0'
      w='100%'
      mixBlendMode='difference'
      filter_='invert(1)'
    >
      <FixedText
        className={cls_constants.animate_move}
        repeat='repeat-x'
        is_shallow={true}
      >
        {props.title}
      </FixedText>
      <h1 hidden>{props.title}</h1>
    </AppearanceDiv>
  );
}

type ProjectItemProps = 
  ProjectItemSummaryProps &
  ProjectItemPicProps & 
  ProjectItemContentProps
;
function ProjectItem(props: ProjectItemProps){
  return (
    <MyDetail
      summary={
        <ProjectItemSummary 
          name={props.name}
        />
      }
      coverImg={
        <ProjectItemPic
          name={props.name}
          photos={props.photos}
        />
      }
      detail={
        <ProjectItemContent
          links={props.links}
          intro={props.intro}
          tags={props.tags}
        />
      }
    />
  );
}

interface ProjectItemSummaryProps {
  name: string
}
function ProjectItemSummary(props: ProjectItemSummaryProps){
  return (
    <h2>{props.name}</h2>
  );
}

interface ProjectItemPicProps {
  photos: Array<{
    url: string,
    alt: string
  }>,
  name: string
}
function ProjectItemPic(props: ProjectItemPicProps){
  return (
    <MySlideShow
      imgList={props.photos.map(photo=> ({
          dataSrc: photo.url,
          alt: photo.alt
        })
      )}
    />
  );
}

interface ProjectItemContentProps {
  links: {
    live?: string,
    code: string
  },
  intro: string,
  tags: Array<string>
}
function ProjectItemContent(props: ProjectItemContentProps){
  return (
    <article>
      {props.links.live &&
        <TextedSVGLink 
          svgPath={ICON_MAP.link} 
          linkUrl={props.links.live}
        >
          {LINK_TITLE.live} 
        </TextedSVGLink>
      }
      <TextedSVGLink 
        svgPath={ICON_MAP.code_link}
        linkUrl={props.links.code}
      >
        {LINK_TITLE.code}
      </TextedSVGLink>
      <p>
        {props.tags.map((tag, i)=>
          <TagSpan key={`tag-${i}`}>{tag}</TagSpan>
        )}
      </p>
      <p>{props.intro}</p>
    </article>
  );
}