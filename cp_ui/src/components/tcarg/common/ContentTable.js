import React from "react";
import { connect } from 'react-redux';
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading as Heading, Subheading } from "components/misc/Headings.js";
import { ReactComponent as PdfIcon } from "images/pdf-icon.svg"
import { ReactComponent as ZipIcon } from "images/zip-icon.svg"
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import api from 'helpers/api'

const RowContainer = tw.div`mt-8`
const TableContainer = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap mt-4 overflow-x-auto`;
const Table = styled.table`
  ${tw`table-auto mt-2 w-full`}
  thead {
    ${tw`text-xl font-bold`}
  }
  th {
    ${tw`border-black border-b pb-4`}
  }
  tr {
    ${tw`even:bg-gray-300`}
  }
  tbody {
    ${tw``}
  }
  td {
    ${tw`items-center text-center pb-2 pt-2`}
  }
  a{
    ${tw` items-center text-center`}
  }
`;

const Pdf = tw(PdfIcon)`w-10 h-10 text-center inline-block`;
const Zip = tw(ZipIcon)`w-10 h-10 text-center inline-block`;
const Youtube = tw(YoutubeIcon)`w-10 h-10 text-center inline-block`;

const HeadingContainer = tw.div`text-center mt-6`;

const GenericTable = ({rows=[], headers=[]}) => {
  const headerRender = headers.map((elem, index) => <th key={index}> {elem} </th>)
  const rowsRender = rows.map((elems, index) => (<tr key={index}>
    {
      elems.map((elem, index) => (<td key={index}> {elem} </td>))
    }
  </tr>));

  return (
    <Table>
      <thead>
        <tr>
          {headerRender}
        </tr>
      </thead>
      <tbody>
        {rowsRender}
      </tbody>
    </Table>
  );
}

class ContentTable extends React.Component{
  state = {
    lessons: []
  }

  componentDidMount() {
    this.__fetchData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.componentNeedsUpdate(this.props, prevProps)){
      this.__fetchData();
    }
  }

  __fetchData = async () => {
    let data = await this.props.fetchData(this.props);
    this.setState({lessons: data});
  }

  render(){
    // TODO hacer el mapeo con un diccionario enorme.
    let levels = {};
    for(var i=0 ; i<this.state.lessons.length ; i++){
      let level = this.state.lessons[i].level;
      levels[level.id] = {
        name: level.name.find(elem => elem.language.code === this.props.language).name,
        level: level.level,
      };
    }
    levels = Object.entries(levels).sort((a, b) => a[1].level - b[1].level);

    console.log('this.state.language')
    console.log(this.props.language)
    const headers = this.props.language === 'ESP' ? ['Día', 'Orador/a', 'Materia', 'Adjunto', 'Video'] : ['Day', 'Speaker', 'Subject', 'Attachment', 'Video'];
    if (this.state.lessons.length === 0){
      return '';
    }

    return (
      <Container>
        <ContentWithPaddingLg>
          <Heading key={'heading'}>{this.props.language === 'ESP' ? 'Contenidos' : 'Contents'}</Heading>
          {
            levels.map(([levelId, {name}]) => {
              const rows = this.state.lessons.filter(
                  lesson => lesson.level.id === parseInt(levelId)
                ).map((lesson, index) => {
                const d = new Date(lesson.date);
                d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000);
                const Icon = lesson.attachment === null ? (() => '') : lesson.attachment.split('.').pop() === 'pdf' ? Pdf : Zip
                return [
                  d.toLocaleDateString('en-GB'),
                  lesson.speakers.map(elem => `${elem.name} ${elem.surname}`).join(','),
                  lesson.subjects.map(subject => subject.name.find(name => name.language.code === this.props.language).name).join(','),
                  // lesson.subjects.filter(elem => name).name.filter(elem => elem.language.code === this.props.language).map(elem => elem.name).join(','),
                  <a href={lesson.attachment} target='blank'> <Icon /> </a>,
                  lesson.video && (<a href={lesson.video} target='blank'> <Youtube /> </a>),
                ]});
              return (
                <RowContainer key={levelId}>
                  <HeadingContainer>
                    <Subheading> {name} </Subheading>
                  </HeadingContainer>
                  <TableContainer>
                    <GenericTable headers={headers} rows={rows} />
                  </TableContainer>
                </RowContainer>
              );
            })
          }
        </ContentWithPaddingLg>
      </Container>
      );
  }
}


const mapStateToProps = (state) => {
    return {
        editions: state.editions,
        language: state.language,
    };
}

export default connect(mapStateToProps)(ContentTable);
