import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../Redux/Store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


// To know why we created another file and stored the actual hooks (useSelector and useDispatch) here
// is because typescript demands type of hooks we use, so we created this hooks.ts file to configure the hooks and their types
// so that we dont have to keep using hooks
// and defining their types like "useDispatch.withTypes<AppDispatch>()" or "useSelector.withTypes<RootState>()" evertime, thats why.
//go through redux-toolkit typscript docs for more info