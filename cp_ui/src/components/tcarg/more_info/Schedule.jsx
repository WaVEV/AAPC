import React, { useState,  useEffect } from "react";
import { connect } from 'react-redux';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import { SectionHeading as Heading, Subheading } from "components/misc/Headings.js";
import api from 'helpers/api'


const RowContainer = styled.div`${tw`grid md:grid-cols-2 md:gap-3 grid-cols-1 gap-2`}`;
const ScheduleCard = styled.div`
    ${tw`mt-4 border-b-4`}
    h3 {
      ${tw`text-xl font-bold`}
    }
    span{
      ${tw`text-base font-light`}
    }
    table {
      ${tw`table-auto w-full mt-2`}
    }
    thead {
      ${tw`text-base`}
    }
    th {
      ${tw`border-gray-300 pb-1 border-b`}
    }
    tr {
      ${tw`even:bg-gray-300`}
    }
    tbody {
      ${tw``}
    }
    td {
      ${tw`first:w-32 items-center text-center pb-2 pt-2 text-sm`}
    }
    a{
      ${tw` items-center text-center`}
    }
`;



const mapStateToProps = (state) => {
    return {
        language: state.language,
        editions: state.editions
    };
}



const ScheduleInfo = (props) => {
    const [data, setData] = useState({schedules: []});

    useEffect(() => {
        async function fetchData() {
            const schedules = await api.get(
                'schedules/',
                {params: {edition: props.editions.current?.id, language: props.language}}
            );
            setData({schedules: schedules.data ? schedules.data : []});
        };
        fetchData();
    }, [props.editions.current?.id, props.language]);

    let tables = data.schedules.map(({metadata, activities}, index) => {
        const {description, title} = metadata[0]
        return (
            <ScheduleCard key={index}>
                <h3> {title} </h3>
                <span> {description} </span>
                <table>
                    <thead>
                        <tr>
                            <th> Horario </th>
                            <th> Actividad </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map(({time_start, time_end, detail}, index) => (
                            <tr key={index}>
                              <td> {time_start} - {time_end} </td>
                              <td> {detail[0].description} </td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </ScheduleCard>
        )
    })
    return (
        <Container>
            <ContentWithPaddingLg>
                <Heading> Cronograma </Heading>
                <RowContainer>
                      {tables}
                </RowContainer>

            </ContentWithPaddingLg>
        </Container>
    );
}

export default connect(mapStateToProps)(ScheduleInfo);
