import { Box } from '@chakra-ui/react';

const AnimatedCheckmark = () => {
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
        stroke="blue"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M4 12l5 5L20 6"
          strokeDasharray="15"
          strokeDashoffset="15"
          className="checkmark-path"
        />
        <style>
          {`
            @keyframes draw {
              from {
                stroke-dasharray: 0, 15;
              }
              to {
                stroke-dasharray: 15, 0;
              }
            }
            .checkmark-path {
              animation: draw 1s ease forwards;
            }
          `}
        </style>
      </svg>
    </Box>
  );
};

export default AnimatedCheckmark;
