import { CellContent } from "@/types/spreadsheet"
import { useEffect, useState, KeyboardEvent } from "react"

interface Props {
    content: CellContent;
}

export default function Cell({ content: initialContent }: Props) {
    const [editing, setEditing] = useState<boolean>(false)
    const [content, setContent] = useState<CellContent>(initialContent)

    const onKeyDown = (event: any) => {
        if (["Enter", "Escape"].includes(event.key)) {
            setEditing(false);
        }
    };

    return (
        <td onClick={() => setEditing(!editing)}>
            {editing ? (
                <input
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={onKeyDown}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            ) : (
                content
            )}
        </td>
    )
}
