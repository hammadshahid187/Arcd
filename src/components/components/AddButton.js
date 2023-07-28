import React from 'react'

const AddButton = ({num}) => {
    return (
        <button className="border border-black rounded-3xl pl-2 pr-2 cursor-default text-xs"><p className="font-bold">+{num}</p></button>
    )
}

export default AddButton
