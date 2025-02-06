import { MenuList, Menu, MenuItem, MenuButton, useToast } from "@chakra-ui/react";
import { FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../Hooks/useAuth";

const Logout = () => {

  const navigate = useNavigate();
  const toast = useToast();

  function handleLogOut() {

    removeCookie("token");
    localStorage.clear()
    toast({
      title: "Logged Out!",
      duration: 2000,
      status: "success",
      position: "top",
    });
    navigate("/");
  }

  return (
    <Menu>
      <MenuButton
        fontSize="2xl"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.500", color: "white" }}
        px={4}
        py={2}
        transition="all 0.2s"
      >
        <FaUserCog />
      </MenuButton>
      <MenuList position={"absolute"} right={-55}>
        <MenuItem
          textAlign={"right"}
          display={"block"}
          fontSize={16}
          onClick={handleLogOut}
        >
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Logout;
