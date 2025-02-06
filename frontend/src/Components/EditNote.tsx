import { useEffect, useState } from "react";
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
import { editNote } from "../Redux/NotesSlice";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./UtilityComponents/GoBackButton";
import PrimaryHeading from "./UtilityComponents/PrimaryHeading";

type INPUTELEMENTCSSTYPE = {
  inputElementCSS: SystemStyleObject;
};

const EditNote = ({ inputElementCSS }: INPUTELEMENTCSSTYPE) => {
  const dispatch = useAppDispatch();
  const { selectedNote, error } = useAppSelector((state) => state.notes);

  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const toast = useToast({
    position: "top",
    duration: 2000,
  });

  useEffect(() => {
    if (selectedNote) {
      setNoteTitle(selectedNote.title);
      setNoteText(selectedNote.text);
      setTags(selectedNote.tags || []);
    }
  }, [selectedNote]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleEditButton = async (): Promise<void> => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        title: noteTitle,
        text: noteText,
        tags: tags,
      };

      dispatch(editNote(updatedNote));
      if (error) toast({ title: "Failed to Edit Note", status: "error" });
      else toast({ title: "Note Edited Successfully", status: "success" });

      navigate("/notes");
    }
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
      <PrimaryHeading title="Edit Note" />

      {/* Title and Tags Input */}
      <HStack spacing={5} my={5} flexDir={{ base: "column", sm: "row" }}>
        <InputGroup>
          <Input
            placeholder="Add Title..."
            sx={inputElementCSS}
            value={noteTitle}
            variant={"flushed"}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Input
            disabled={tags.length === 3 && true}
            placeholder={
              tags.length === 3 ? "Tag Limit Reached" : "Add Tags..."
            }
            variant={"flushed"}
            sx={inputElementCSS}
            value={tagInput}
            _focusVisible={"none"}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
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
            <TagLabel>{tag}</TagLabel>
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

      {/* Button */}
      <HStack spacing={10} mt={5}>
        <Wrap w="100%">
          <Button
            leftIcon={<FaCheck />}
            colorScheme="blue"
            variant="solid"
            w="full"
            textTransform="uppercase"
            onClick={handleEditButton}
          >
            Edit Note
          </Button>
        </Wrap>
      </HStack>
    </Box>
  );
};

export default EditNote;
