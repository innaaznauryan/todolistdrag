import React from 'react'

export const InputEdit = ({toEdit, valueType, handleEditChange, editInfo}) => {

  return (
        <input onChange={handleEditChange(toEdit)} type="text" name={valueType} id={valueType} value={editInfo[valueType]} />
    )
}
