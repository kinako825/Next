import { CellContent } from "@/types/spreadsheet"

interface Props {
    content: CellContent;
}

export default function Cell({ content }: Props) {
    return (
        <td>{content}</td>
    )
}
