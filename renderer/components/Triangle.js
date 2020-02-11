import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  width: 14px;
  height: auto;
  
`;

const Triangle = ({bg, border}) => (
  <Svg height="511pt" viewBox="-10 0 511 511.50933" width="511pt" xmlns="http://www.w3.org/2000/svg">
    <path d="m255.21875 5.566406c-3.539062-7.421875-15.699219-7.421875-19.242188 0l-234.667968 490.667969c-1.578125 3.308594-1.3437502 7.191406.597656 10.28125 1.941406 3.117187 5.355469 4.992187 9.023438 4.992187h469.335937c3.667969 0 7.082031-1.875 9.023437-4.96875 1.960938-3.113281 2.195313-6.996093.597657-10.28125zm0 0" fill={bg} />
    <path d="m480.265625 511.507812h-469.335937c-3.667969 0-7.082032-1.875-9.023438-4.96875-1.9609375-3.113281-2.195312-6.976562-.597656-10.28125l234.667968-490.667968c3.542969-7.425782 15.703126-7.425782 19.242188 0l234.667969 490.667968c1.578125 3.304688 1.34375 7.1875-.597657 10.28125-1.941406 3.09375-5.355468 4.96875-9.023437 4.96875zm-452.417969-21.332031h435.480469l-217.730469-455.273437zm0 0" fill={border} />
  </Svg>
)

export default Triangle;