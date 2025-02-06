// AllNotes.tsx
import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  SystemStyleObject,
  Tag,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { getAllNotes, NOTETYPE, setSelectedNote } from "../Redux/NotesSlice";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

type singleNoteCSSTYPE = {
  singleNoteCSS: SystemStyleObject;
  allNotesContainer: SystemStyleObject;
  onOpen: () => void;
  filter: string;
  selectedTag: string;
  setTags: (tags: string[]) => void; // Add a function to set tags
};

const AllNotes = ({
  onOpen,
  singleNoteCSS,
  allNotesContainer,
  filter,
  selectedTag,
  setTags, // Receive the setTags function
}: singleNoteCSSTYPE) => {
  const dispatch = useAppDispatch();
  const { notesList, loading, error } = useAppSelector((state) => state.notes);
  const [clickedNote, setClickedNote] = useState<NOTETYPE | undefined>(undefined);

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  // Extract unique tags from notes
  useEffect(() => {
    const tags = Array.from(new Set(notesList.flatMap(note => note.tags)));
    setTags(tags); // Set the unique tags
  }, [notesList, setTags]);

  const fetchingMessageCSS = {
    as: "h2",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: "3xl",
    textAlign: "center",
    w: "100%",
  };

  const handleClick = (note: NOTETYPE | undefined) => {
    if (note !== undefined) {
      setClickedNote(note);
    }
  };

  const filteredNotes = notesList.filter((note) => {
    const matchesSearchTerm = note.title.toLowerCase().includes(filter.toLowerCase()) || 
                              note.text.toLowerCase().includes(filter.toLowerCase());
    const matchesTag = selectedTag ? note.tags.includes(selectedTag) : true;

    return matchesSearchTerm && matchesTag;
  });

  return (
    <Box px={5} pt={5} as="section" sx={allNotesContainer}>
      {loading && <Text sx={fetchingMessageCSS}>Fetching notes...</Text>}
      {error && <Text sx={fetchingMessageCSS}>{error}</Text>}
      {filteredNotes.length === 0 && !loading && (
        <Text sx={fetchingMessageCSS}>No Notes Created...</Text>
      )}
      {!loading && filteredNotes.length > 0 && (
        <SimpleGrid
          as={"section"}
          columns={{ base: 1, md: 2, lg: 2, xl: 4 }}
          spacing={5}
        >
          {filteredNotes.map((note) => (
            <Box
              position={"relative"}
              key={note.id}
              as="section"
              sx={singleNoteCSS}
              onClick={() => handleClick(note)}
              boxShadow={clickedNote?.id === note.id ? '10px 10px 0px black' : ''}
              transition={'all 0.1s ease-in'}
              transform={clickedNote?.id === note.id ? 'translate(-10px,-10px)' : ''}
            >
              <HStack
                display={clickedNote?.id === note.id ? "flex" : "none"}
                position="absolute"
                zIndex={5}
                justify={"center"}
                w={"full"}
                h={"full"}
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                backdropFilter={"blur(5px)"}
                spacing={3}
              >
                <Link to={`/notes/edit/${note.id}`}>
                  <IconButton
                    aria-label="Edit Note"
                    icon={<MdEdit fontSize={30} color="white" />}
                    colorScheme="blue"
                    onClick={() => dispatch(setSelectedNote(clickedNote))}
                  />
                </Link>
                <Link to={`/notes/delete/${note.id}`}>
                  <IconButton
                    aria-label="Delete Note"
                    icon={<MdDelete fontSize={30} color="white" />}
                    colorScheme="red"
                    onClick={() => {
                      dispatch(setSelectedNote(clickedNote));
                      onOpen();
                    }}
                  />
                </Link>
              </HStack>
              <Heading
                as={"h2"}
                fontSize={"xl"}
                textTransform={"capitalize"}
                color={"#0056b3"}
                textShadow={"1px 1px 2px rgba(0, 0, 0, 0.1)"}
                textDecoration={"underline"}
              >
                {note.title}
              </Heading>
              <Text as={"h3"} fontSize={"sm"}>
                {note.text}
              </Text>
              {note.tags.length > 0 && (
                <Flex
                  as={"section"}
                  bg={"gray.300"}
                  w={"full"}
                  position={"absolute"}
                  align={"center"}
                  wrap={"wrap"}
                  bottom={0}
                  left={0}
                  pt={1}
                  pl={1}
                >
                  <Flex
                    gap={1}
                    wrap={"wrap"}
                    justify={"center"}
                    alignItems={"center"}
                  >
                    {note.tags.map((tag) => (
                      <Tag
                        key={tag}
                        bg={"blue.500"}
                        fontSize={"10px"}
                        px={"0.5rem"}
                        color={"white"}
                      >
                        #{tag}
                      </Tag>
                    ))}
                  </Flex>
                </Flex>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllNotes;
