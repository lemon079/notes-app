import { Heading } from "@chakra-ui/react";

type PrimaryHeadingProps = {
  title: string;
};

const PrimaryHeading = ({ title }: PrimaryHeadingProps) => {
  return (
    <Heading
      as="h1"
      fontSize={{ base: "2xl", md: "3xl" }}
      mb={5}
      fontFamily={'sans-serif'}
      textAlign="center"
      textTransform={'uppercase'}
      color="gray.800"
    >
      {title}
    </Heading>
  );
};

export default PrimaryHeading;
