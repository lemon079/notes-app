import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Type definitions
export type NOTETYPE = {
  id?: string;
  title: string;
  text: string;
  tags: string[];
};

type AllStateType = {
  error: string | null;
  loading: boolean;
  notesList: NOTETYPE[];
  selectedNote: NOTETYPE;
};

type ApiResponseType = NOTETYPE;

// Async Thunks
const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAllNotes = createAsyncThunk<ApiResponseType[]>(
  "notes/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("notes/", { withCredentials: true });
      return response.data.map(
        (note: { _id: any; title: any; text: any; tags: any }) => ({
          id: note._id, // let it give typo error, basically typescript error and nothing else
          title: note.title,
          text: note.text,
          tags: note.tags,
        })
      );
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createNote = createAsyncThunk<ApiResponseType, NOTETYPE>(
  "notes/create",
  async (note: NOTETYPE, { rejectWithValue }) => {
    try {
      const response = await api.post("/notes/", note, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editNote = createAsyncThunk<ApiResponseType, NOTETYPE>(
  "notes/edit",
  async (note: NOTETYPE, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/notes/${note.id}`, note, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteNote = createAsyncThunk<ApiResponseType, NOTETYPE>(
  "notes/delete",
  async (note, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/notes/${note.id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial state
const initialState: AllStateType = {
  error: null,
  loading: false,
  notesList: [],
  selectedNote: { id: "", title: "", text: "", tags: [] },
};

// Slice
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notesList = action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notesList.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.notesList.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notesList[index] = action.payload;
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notesList = state.notesList.filter(
          (note) => note.id !== action.payload.id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Exports
export const { setSelectedNote } = noteSlice.actions;
export default noteSlice.reducer;
