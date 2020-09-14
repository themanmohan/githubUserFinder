import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Error = () => {
  return <Wrapper>
         <h1>404</h1>
         <h3>
         Sorry  Page Can't Found
         </h3>
         <Link to="/" className="btn">Home</Link>

  </Wrapper>;
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 8rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: .5rem;
  }
`;
export default Error;
