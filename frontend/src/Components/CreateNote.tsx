import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Textarea,
  Wrap,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  SystemStyleObject,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { createNote } from "../Redux/NotesSlice";
import PrimaryHeading from "./UtilityComponents/PrimaryHeading";
import GoBackButton from "./UtilityComponents/GoBackButton";

type CreateNoteProps = {
  inputElementCSS: SystemStyleObject;
};

const CreateNote = ({ inputElementCSS }: CreateNoteProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast({ position: "top", duration: 2000 });
  const error = useAppSelector(state => state.notes.error)
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleCreateButtonLogic = (): void => {
    if (noteTitle === "" || noteText === "") {
      toast({ title: "Empty Title or Text", status: "error" });
    } else {
      const note = { title: noteTitle, text: noteText, tags };

      dispatch(createNote(note));
      if (error) toast({ title: "Failed to Create Note", status: "error" });
      else toast({ title: "Note Added Successfully", status: "success" });

      navigate("/notes");
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput) && tags.length < 3) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Box
      as="section"
      w={"full"}
      bgColor="#f5f5f5"
      border="1px solid gray"
      borderRadius={"25px"}
      p={4}
      boxShadow="lg"
    >
      <GoBackButton />
      <PrimaryHeading title="Create Note" />

      {/* Title and Tags Input */}
      <HStack spacing={5} my={5} flexDir={{ base: "column", sm: "row" }}>
        <InputGroup>
          <Input
            placeholder="Add Title..."
            sx={inputElementCSS}
            variant={"flushed"}
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Input
            disabled={tags.length >= 3}
            placeholder={tags.length >= 3 ? "Tag Limit Reached" : "Add Tags..."}
            variant={"flushed"}
            sx={inputElementCSS}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && addTag();
            }}
          />
          <InputRightAddon cursor={"pointer"} onClick={addTag}>
            Add
          </InputRightAddon>
        </InputGroup>
      </HStack>

      {/* Tags Display */}
      <Wrap spacing={2} mb={4}>
        {tags.map((tag, index) => (
          <Tag key={index} size="lg" variant="solid" colorScheme="blue">
            <TagLabel># {tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(tag)} />
          </Tag>
        ))}
      </Wrap>

      {/* Textarea for Note Text */}
      <Textarea
        placeholder="Enter Text..."
        resize="none"
        height="30vh"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />

      {/* Button to Add Note */}
      <HStack spacing={10} mt={5}>
        <Wrap w="100%">
          <Button
            leftIcon={<FaCheck />}
            colorScheme="blue"
            variant="solid"
            w="full"
            textTransform="uppercase"
            onClick={handleCreateButtonLogic}
          >
            Add Note
          </Button>
        </Wrap>
      </HStack>
    </Box>
  );
};

export default CreateNote;
