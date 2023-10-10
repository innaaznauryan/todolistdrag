import Item from "./Item"

const List = ({name, status, boards, setBoards, setEditMode, setDeleteMode}) => {

  const allowDrop = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    const draggableId = +e.dataTransfer.getData("draggable_id")
    const draggableStatus = e.dataTransfer.getData("draggable_status")
    if(boards.find(board => board.status === status).items.find(item => item.id === draggableId)) {
      return
    }
    const draggableItem = boards.find(board => board.status === draggableStatus).items.find(item => item.id === draggableId)
    const boardsCopy = [...boards]
    const boardsIndexToAdd = boardsCopy.findIndex(board => board.status === status)
    boardsCopy[boardsIndexToAdd].items.push(draggableItem)

    const boardsIndexToDelete = boardsCopy.findIndex(board => board.status === draggableStatus)
    const ItemsIndexToDelete = boardsCopy[boardsIndexToDelete].items.findIndex(item => item.id === draggableId)
    boardsCopy[boardsIndexToDelete].items.splice(ItemsIndexToDelete, 1)
    
    setBoards(boardsCopy)
  }

  return (
    <div className={status} onDragOver={allowDrop} onDrop={handleDrop}>
        <h2>{name}</h2>
        {boards
        .find(board => board.status === status)
        .items
        .map(({id, title, description}) => {
              return <Item key={id} id={id} title={title} description={description} status={status} boards={boards} setBoards={setBoards} setEditMode={setEditMode} setDeleteMode={setDeleteMode} />
            })
        }
    </div>
  )
}

export default List