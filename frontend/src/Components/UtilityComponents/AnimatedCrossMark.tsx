import { Box } from '@chakra-ui/react';

const AnimatedCrossMark = () => {
  return (
    <Box
      width="50px"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
          className="cross-line"
        />
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
          className="cross-line"
        />
        <style>
          {`
            @keyframes draw {
              from {
                stroke-dasharray: 30;
                stroke-dashoffset: 30;
              }
              to {
                stroke-dasharray: 30;
                stroke-dashoffset: 0;
              }
            }
            .cross-line {
              stroke-dasharray: 30; /* Length of the lines */
              stroke-dashoffset: 30; /* Start hidden */
              animation: draw 1s ease forwards;
            }
          `}
        </style>
      </svg>
    </Box>
  );
};

export default AnimatedCrossMark;
