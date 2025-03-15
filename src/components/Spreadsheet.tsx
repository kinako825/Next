import Cell from "./Cell";
import { CellContent } from "@/types/spreadsheet"
import { useState } from "react"



export default function Spreadsheet() {

    const [cellContents, setCellContents] = useState<Array<Array<CellContent>>>([
        [1, 2, 3,],
        [4, 5, 6,],
        [7, 8, 9,],
    ]);

    const getValue = (row: number, col: number): CellContent => {
        return cellContents[row]?.[col] ?? "";
    };

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                    {cellContents.map((row, i) => {
                        return (
                            <tr>
                                <th>{i + 1}</th>
                                {row.map((cell, j) => (
                                    <Cell
                                        content={cell}
                                        onChange={(updated: CellContent) => {
                                            const updatedCellContents = [...cellContents]
                                            updatedCellContents[i][j] = updated
                                            setCellContents(updatedCellContents)
                                        }}
                                        getValue={getValue}
                                    />
                                ))}
                            </tr>
                        )
                    })}
                    <tr>
                        <th></th>
                        {cellContents[0].map((_, i) => (
                            <th>{String.fromCharCode(65 + i)}</th>
                        ))}
                    </tr>
                </tbody>
            </table>

            <button
                onClick={() => {
                    setCellContents([
                        ...cellContents,
                        Array(cellContents[0].length).fill(0),
                    ])
                }}
            >+ row</button>
            <button onClick={() => setCellContents(cellContents.slice(0, -1))}>- row</button>
            <br />
            <button onClick={() => setCellContents(cellContents.map(row => [...row, 0]))}>+ column</button>
            <button onClick={() => setCellContents(cellContents.map(row => row.slice(0, -1)))}>- column</button>

        </>


    )
}