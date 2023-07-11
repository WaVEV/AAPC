import React from "react";
import { connect } from 'react-redux';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
import { SectionHeading as Heading, Subheading } from "components/misc/Headings.js";


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
    };
}

const ScheduleInfo = (props) => {

	let data = [
        {
            title: "Día inaugural",
            description: "Lunes 31 de julio",
            activities: [
                {
                    time: { start: "9:00", end: "9:40" },
                    description: "Registro de los participantes."
                },
                {
                    time: { start: "9:40", end: "10:30" },
                    description: "Presentación y apertura del Training Camp"
                },
                {
                    time: { start: "10:30", end: "11:00" },
                    description: "Recreo, café con medialunas"
                },
                {
                    time: { start: "11:00", end: "12:00" },
                    description: "Charla Composable (Sponsor DIamond)"
                },
                {
                    time: { start: "12:00", end: "13:30" },
                    description: "Charla teórica"
                },
                {
                    time: { start: "13:30", end: "14:30" },
                    description: "Almuerzo"
                },
                {
                    time: { start: "14:30", end: "19:00" },
                    description: "Simulacro de competencia (Laboratorios)"
                },
            ]
        },
        {
            title: "Días de Competencia",
            description: "Mar 1, Mié 2, Jue 3, Lu 7, Ma 8, Jue 10 de agosto",
            activities: [
                {
                    time: { start: "9:00", end: "11:00" },
                    description: "Resolución de problemas en pizarrón"
                },
                {
                    time: { start: "11:00", end: "11:20" },
                    description: "Recreo, café con medialunas"
                },
                {
                    time: { start: "11:20", end: "13:00" },
                    description: "Charla teórica o Resolución de problemas en pizarrón"
                },
                {
                    time: { start: "13:00", end: "14:00" },
                    description: "Almuerzo"
                },
                {
                    time: { start: "14:00", end: "19:00" },
                    description: "Simulacro de competencia (Laboratorios)"
                },
            ]
        },
        {
            title: "Día sin competencia",
            description: "Viernes 4 y Miércoles 9 de agosto",
            activities: [
                {
                    time: { start: "9:00", end: "11:00" },
                    description: "Resolución de problemas en pizarrón"
                },
                {
                    time: { start: "11:00", end: "11:20" },
                    description: "Recreo, café con medialunas"
                },
                {
                    time: { start: "11:20", end: "13:00" },
                    description: "Charla teórica o Resolución de problemas en pizarrón"
                },
                {
                    time: { start: "13:00", end: "14:00" },
                    description: "Almuerzo"
                },
                {
                    time: { start: "14:00", end: "19:00" },
                    description: "Práctica con problemas pendientes en laboratorio (upsolving) Charla debate sobre estrategia de prueba [viernes 4 de agosto]"
                },
            ]
        },
        {
            title: "Día de cierre",
            description: "Viernes 11 de agosto",
            activities: [
                {
                    time: { start: "9:00", end: "11:00" },
                    description: "Resolución de problemas en pizarrón"
                },
                {
                    time: { start: "11:00", end: "11:20" },
                    description: "Recreo, café con medialunas"
                },
                {
                    time: { start: "11:20", end: "13:00" },
                    description: "Charla teórica o Resolución de problemas en pizarrón"
                },
                {
                    time: { start: "13:00", end: "14:00" },
                    description: "Almuerzo"
                },
                {
                    time: { start: "14:00", end: "15:30" },
                    description: "Reunión de feedback y espacio de discusión"
                },
                {
                    time: { start: "15:30", end: "16:00" },
                    description: "Recreo"
                },
                {
                    time: { start: "16:00", end: "17:00" },
                    description: "Ceremonia de cierre"
                },
            ]
        }
    ]
    let tables = data.map(({title, description, activities}, index) => {
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
                        {activities.map(({time, description}, index) => (
                            <tr key={index}>
                              <td> {time.start} - {time.end} </td>
                              <td> {description} </td>
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
