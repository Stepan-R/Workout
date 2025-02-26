import { useContext } from "react"
import { WorkoutsContext } from "../context/WokroutContext";

export function useWorkoutsContext() {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw new Error('There is no context!')
  }

  return context;
}