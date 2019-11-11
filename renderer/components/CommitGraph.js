import React from 'react';
import styled, { css } from 'styled-components';
import {
  buttonInfo,
  complementaryPrimary,
  highlightSecondary,
} from '../layout/colors';

const Container = styled.ul`
  display: flex;
  flex-flow: column;

  margin: 0;
  padding: 0;
  list-style: none;
`;

const Dot = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 7px 16px 7px 11px;
  border-radius: 16px;
  background: ${complementaryPrimary};
`;

const Line = styled.div`
  position: absolute;
  top: 23px;
  left: 18px;
  width: 2px;
  height: 100%;
  background: ${complementaryPrimary};
`;

const AuthorImage = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 30px;
  background: #ddd;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  flex-flow: column;
  margin: 0 0 0 ${props => (props.level ? props.level * 30 : 0)}px;
  padding: 0;

  &:first-child {
    margin-top: 10px;
  }

  &:last-child {
    ${Line} {
      display: none;
    }
  }

  ${AuthorImage} {
    margin-left: ${props => (props.level && props.level === 1 ? 10 : 40)}px;
  }

  ${props =>
    props.color &&
    css`
      ${Dot} {
        background: ${props.color};
      }

      ${Line} {
        background: ${props.color};
      }
    `}
`;

const Commit = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 16px;
`;

const Name = styled.p`
  display: inline-block;
  margin: 1px 6px 1px 0;
  font-size: 20px;
  line-height: 140%;
  color: ${buttonInfo};
`;

const Message = styled.p`
  display: inline-block;
  font-size: 20px;
  line-height: 140%;
  margin: 1px 0;
  color: ${complementaryPrimary};
`;

export default function CommitGraph({ graph }) {
  return (
    <Container>
      {graph.map(({ hash, author, message, subBranch = [] }) => (
        <Item key={`commit-${hash}`}>
          <Commit>
            <Dot />
            <Line />
            <AuthorImage />
            <Name>{author.name}:</Name> <Message>{message}</Message>
          </Commit>
          {subBranch.map(({ hash, author, message }) => (
            <Item key={`commit-${hash}`} level={1} color={highlightSecondary}>
              <Commit>
                <Dot />
                <Line />
                <AuthorImage />
                <Name>{author.name}:</Name> <Message>message</Message>
              </Commit>
            </Item>
          ))}
        </Item>
      ))}
    </Container>
  );
}
