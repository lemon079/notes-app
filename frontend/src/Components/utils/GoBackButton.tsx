import { Button } from "@chakra-ui/react";
import { CgArrowLongLeft } from "react-icons/cg";

import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      mb={4}
      onClick={() => navigate(-1)}
      colorScheme="blue"
    >
      <CgArrowLongLeft />
    </Button>
  );
};

export default GoBackButton;
