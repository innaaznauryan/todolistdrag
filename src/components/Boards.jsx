import {useState} from "react"
import {v4 as uuidv4} from 'uuid'
import List from "./List"
import "./boards.scss"

const INITIALBOARDS = [
    {
        id: uuidv4(),
        name: "To do",
        status: "to_do",
        items: []
    },
    {
        id: uuidv4(),
        name: "In progress",
        status: "in_progress",
        items: []
    },
    {
        id: uuidv4(),
        name: "Completed",
        status: "completed",
        items: []
    }
]

const Boards = () => {
    const [currentId, setCurrentId] = useState(() => {
        let ID
        if(!localStorage.getItem("currentId")) {
            ID = uuidv4()
            localStorage.setItem("currentId", ID)
        } else {
            ID = localStorage.getItem("currentId")
        }
        return ID
    })
    const [boards, setBoards] = useState(() => {
        let BOARDS
        if (!localStorage.getItem("boards")) {
            BOARDS = INITIALBOARDS
            localStorage.setItem("boards", JSON.stringify(BOARDS))
        } else {
            BOARDS = JSON.parse(localStorage.getItem("boards"))
        }
        return BOARDS
    })

    const [error, setError] = useState(null)

    function stringValidate (...strings) {
        if(strings.some(string => !string.trim().replace(/\s+/g, " "))) {
            setError("Please fill the form!")
            setTimeout(() => {
                setError(null)
            }, 2000);
            throw new Error("empty value")
        }
    }

    const addItem = (e) => {
        e.preventDefault()
        const {title, description} = e.target 
        try{
            stringValidate(title.value, description.value)
            const newItem = {
                id: currentId,
                ...Object.fromEntries([...new FormData(e.target)])
            }

            setBoards(prev => {
                return prev.map(board => board.status === "to_do" ? {...board, items: [...board.items,newItem]} : board)
            })
            localStorage.setItem("boards", JSON.stringify(((boards)=>{
                return boards.map(board => board.status === "to_do" ? {...board, items: [...board.items,newItem]} : board)
            })(boards)))

            const newId = uuidv4()
            localStorage.setItem("currentId", newId)
            setCurrentId(newId)

        } catch (error) {
            console.log(error)
        } finally {
            e.target.reset()
        }
    }

    const addBoard = (e) => {
        e.preventDefault()
        const {status} = e.target
        try {
            stringValidate(status.value)
            const newBoard = {
                id: uuidv4(),
                name: status.value,
                status: status.value.split(" ").join("_").toLowerCase(),
                items: []
            }
            setBoards(prev => [...prev, newBoard])
            localStorage.setItem("boards", JSON.stringify((boards => [...boards, newBoard])(boards)))
        } catch (error) {
            console.log(error)
        }
    }

  return (
<>
    <div className="boards">
        {boards.map(({id, name, status}) => {
            return <List key={id} name={name} status={status} boards={boards} setBoards={setBoards} stringValidate={stringValidate} />
        })}
    </div>
    <form className="add-item" onSubmit={addItem}>
        <input type="text" name="title" id="title" placeholder="Title" required/>
        <input type="text" name="description" id="description" placeholder="Description" required/>
        <button type="submit">Add Item</button>
    </form>
    <form className="add-board" onSubmit={addBoard}>
        <input type="text" name="status" id="status" placeholder="Status" required />
        <button type="submit">Add Board</button>
    </form>

    <p className="error">{error || ""}</p>
</>
  )
}

export default Boards