import React from 'react';

export const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  );
};
const Content = (props) => {

  return (

    <>
      {props.parts.map(value => Part({ value }))}
    </>

  );
};
const Part = ({ value }) => {
  return (
    <p key={value.id}>
      {value.name} {value.exercises}
    </p>
  );
};
const Total = (props) => {

  const total = props.parts.reduce((prev, current) => {
    return prev + current.exercises;
  }, 0);

  return (
    <p>Number of exercies {total}</p>
  );
};
