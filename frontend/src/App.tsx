import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Loading from "./Components/utils/Loading";
import Signup from "./pages/Auth/Signup";
import NotesApp from "./pages/StartPage";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import DeleteNote from "./Components/DeleteNote";
import EditNote from "./pages/EditNote";

function App() {
  const allNotesContainer = {
    overflowY: { base: "scroll", md: "scroll", lg: "auto" },
    height: { base: "50vh" },
  };

  const singleNoteCSS = {
    textTransform: "uppercase",
    borderRadius: "10px",
    textAlign: "center",
    padding: "1rem",
    cursor: "pointer",
    overflow: "hidden",
    userSelect: "none",
    border: "1px solid gray",
    height: "150px",
    ":hover": {
      backgroundColor: "#f0f0f0",
    },
  };

  const inputElementCSS = {
    px: 2,
    flex: "1",
    _placeholder: {
      color: "gray.500",
      transition: "all 200ms ease-in-out",
      pl: "0px",
    },
    _focus: {
      _placeholder: {
        pl: "10px",
      },
    },
  };

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <Box as="section" h={"100vh"} bg="#c1bebe" p={4}>
      <Loading />
      <Flex
        as="main"
        maxWidth={"920px"}
        fontFamily="sans-serif"
        w={{ base: "90%", sm: "80%", md: "60%" }}
        direction="column"
        align="center"
        justify={"center"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%,-50%)"}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<NotesApp />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<ProtectedRoute element={<HomePage onOpen={onOpen} allNotesContainer={allNotesContainer} singleNoteCSS={singleNoteCSS} />} />} />
            <Route path="/notes/create" element={<ProtectedRoute element={<CreateNote inputElementCSS={inputElementCSS} />} />} />
            <Route path="/notes/delete/:id" element={<ProtectedRoute element={<DeleteNote isOpen={isOpen} onClose={onClose} />} />} />
            <Route path="/notes/edit/:id" element={<ProtectedRoute element={<EditNote inputElementCSS={inputElementCSS} />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Flex>
    </Box>
  );
}

export default App;
