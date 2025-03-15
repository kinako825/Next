import { CellContent } from "@/types/spreadsheet"
import { useState, useEffect } from "react"


interface Props {
    content: CellContent;
    onChange: (updated: CellContent) => void;
    getValue: (row: number, col: number) => CellContent;
}


export default function Cell({ content: initialContent, onChange, getValue }: Props) {
    const [editing, setEditing] = useState<boolean>(false)
    const [content, setContent] = useState<CellContent>(initialContent)

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "Escape"].includes(event.key)) {
            setEditing(false);
            setContent(initialContent);
        }
        if (event.key === "Enter") {
            onChange(content)
        }
    };

    useEffect(() => {
        setContent(initialContent)
    }, [initialContent]);


    const evaluateFormula = (exp: string) => {
        try {
            if (exp.startsWith("=")) {

                const replaced = exp.slice(1).replace(/([A-Z])(\d+)/g, (_, col, row) => {
                    const colIndex = col.charCodeAt(0) - "A".charCodeAt(0);
                    const rowIndex = parseInt(row, 10) - 1;
                    const value = getValue(rowIndex, colIndex);
                    return value !== undefined ? value.toString() : "0";
                });

                return new Function(`return (${replaced})`)();
            }
            return exp;
        } catch (error) {
            console.error("Invalid formula:", error);
            return "Error";
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
            ) : typeof content === "string" && content.startsWith("=") ? (
                evaluateFormula(content)
            ) : (
                content
            )}
        </td>
    )
}
