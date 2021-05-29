import React from "react";
import { connect } from 'react-redux';
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading as Heading, Subheading } from "components/misc/Headings.js";

const TableContainer = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap mt-4`;
const Table = styled.table`
  ${tw`table-auto mt-2 w-full border-black`}
  thead {
    ${tw`text-xl font-bold`}
  }
  th {
    ${tw`border-black border`}
  }
  tr {
    ${tw`border-black border-black border-b`}
  }
  tbody {
    ${tw`border-black`}
  }
  td {
    ${tw` mt-10 border border-black items-center text-center`}
  }
  a{
    ${tw` items-center text-center`}
  }
`;

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

class ContestTable extends React.Component{
  state = {
    contests: []
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
    this.setState({contests: data});
  }

  render(){
    // TODO hacer el mapeo con un diccionario enorme.
    let levels = {};
    for(var i=0 ; i<this.state.contests.length ; i++){
      let level = this.state.contests[i].level;
      levels[level.id] = {
        name: level.name.find(elem => elem.language.code === this.props.language).name,
        level: level.level,
      };
    }
    levels = Object.entries(levels).sort((a, b) => a[1].level - b[1].level);

    const headers = this.state.language === 'ESP' ? ['Día', 'Link'] : ['Day', 'Link'];

    if (this.state.contests.length === 0){
      return '';
    }

    return (
      <Container>
        <ContentWithPaddingLg>
          <Heading key={'heading'}>{this.props.language === 'ESP' ? 'Contests' : 'Contests'}</Heading>
          {
            levels.map(([levelId, {name}]) => {
              const rows = this.state.contests.filter(
                  contest => contest.level.id === parseInt(levelId)
                ).map((contest, index) => {
                const d = new Date(contest.date);
                d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000);
                return [
                  d.toLocaleDateString('en-GB'),
                  <a href={contest.link} target='blank'> {contest.link} </a>,
                ]});
              return (
                <React.Fragment key={levelId}>
                  <HeadingContainer key={`header-${levelId}`}>
                    <Subheading key={`subheader-${levelId}`}> {name} </Subheading>
                  </HeadingContainer>
                  <TableContainer key={`table-${levelId}`}>
                    <GenericTable headers={headers} rows={rows} />
                  </TableContainer>
                </React.Fragment>
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

export default connect(mapStateToProps)(ContestTable);
