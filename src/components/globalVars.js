import {v4 as uuidv4} from 'uuid'

export const INITIALBOARDS = [
  {
      id: uuidv4(),
      name: "To do",
      color: "lightblue",
      items: []
  },
  {
      id: uuidv4(),
      name: "In progress",
      color: "coral",
      items: []
  },
  {
      id: uuidv4(),
      name: "Completed",
      color: "lightgreen",
      items: []
  }
]
export const BOARDS = "boards"
export const MAINBOARD = "To do"
export const EDITTITLE = "editTitle"
export const EDITDESCRIPTION = "editDescription"
export const EDITBOARD = "editBoard"