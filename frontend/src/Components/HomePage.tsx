// HomePage.tsx
import {
  Box,
  Flex,
  Input,
  Select,
  IconButton,
  SystemStyleObject,
  HStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import AllNotes from "./AllNotes";
import Logout from "./Auth/Logout";
import { useState } from "react";

type HOMEPAGETYPE = {
  singleNoteCSS: SystemStyleObject;
  allNotesContainer: SystemStyleObject;
  onOpen: () => void;
};

const HomePage = ({
  onOpen,
  singleNoteCSS,
  allNotesContainer,
}: HOMEPAGETYPE) => {
  const username = localStorage.getItem("username");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]); // State for tags

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  return (
    <>
      <Box
        as="section"
        w={"full"}
        bgColor="#f5f5f5"
        border="1px solid gray"
        borderRadius={"25px"}
        p={4}
        boxShadow="lg"
      >
        <HStack justify={"space-between"} mb={5}>
          <Heading
            as="h1"
            textTransform={"capitalize"}
            fontWeight={"400"}
            fontSize={"xl"}
          >
            welcome back,{" "}
            <Text display={"inline"} fontSize={"3xl"} fontWeight={"bold"}>
              {username}
            </Text>
          </Heading>
          <Logout />
        </HStack>

        <Flex
          as="header"
          align="center"
          justify="space-between"
          flexDir={{ base: "column", md: "row" }}
          mb={6}
          gap={5}
        >
          <Input
            placeholder="Search Notes..."
            px={2}
            py={2}
            flex={1}
            value={searchTerm}
            onChange={handleSearchChange}
            _placeholder={{
              color: "gray.500",
              transition: "all 200ms ease-in-out",
              pl: "0px",
            }}
            _focus={{
              _placeholder: {
                pl: "10px",
              },
            }}
          />
          <Select
            placeholder="Filter Using Tags"
            value={selectedTag}
            color={"black"}
            onChange={handleTagChange}
            width={{ base: "100%", md: "200px" }}
            borderColor="gray.300"
            flex={1}
            _hover={{
              borderColor: "gray.400",
            }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px blue.500",
            }}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
          <Link to="/notes/create">
            <IconButton
              aria-label="Add Note"
              colorScheme="blue"
              icon={<BiPlus fontSize={30} color="white" />}
              px={{ base: 3, md: 0 }}
              py={{ base: 7, md: 0 }}
              _hover={{ bgColor: "#0077b6" }}
            />
          </Link>
        </Flex>
        <AllNotes
          onOpen={onOpen}
          allNotesContainer={allNotesContainer}
          singleNoteCSS={singleNoteCSS}
          filter={searchTerm} // Pass search term
          selectedTag={selectedTag} // Pass selected tag
          setTags={setTags} // Pass setTags function
        />
      </Box>
    </>
  );
};

export default HomePage;
