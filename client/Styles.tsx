import styled, { createGlobalStyle } from 'styled-components';

type Theme = {
    fonts: { [key: string]: string };
    fontSizes: string[];
    fontWeights: { [key: string]: number };
    colors: { [key: string]: string };
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    color: ${(props: { theme: Theme }) => props.theme.colors.text};
    background: ${(props: { theme: Theme }) => props.theme.colors.background};
    textarea, select, input, button { outline: none; }
  }

  a {
      color: ${(props: { theme: Theme }) => props.theme.colors.secondary};
  }
`;

export const Button = styled.button`
  padding: 6px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #bbb #aaa #999;
`;

export const Column = styled.main`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const Comment = styled.textarea`    
    height: 200px;    
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    background-color: rgba(33,33,33,.2);
`;

export const Label = styled.label`
    color: ${({ theme }) => theme.colors.text};
    display: block;
    > div {
        margin-bottom: 4px;
    }   
`

export const Processed = styled.div`
    margin: 12px 0;
    color: rgba(22,22,22);
    background-color: rgba(255,255,255,.8);
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes[3]};
    padding: 8px;
    border-radius: 3px;
`

export const Heading = styled.h1`
    margin: 12px 0 8px 0;
`