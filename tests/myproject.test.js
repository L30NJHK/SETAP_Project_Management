import { displayTaskRows } from "../public/script.js";

describe("Create table row with task information", () => {
    test("it should create valid table html", () => {
        const input = [{
            id: '1',
            name: 'Write story',
            start: '2024-08-21',
            end: '2024-08-25',
            progress: 0,
            dependencies: '0'
        },
        {
            id: '2',
            name: 'Draw graphics',
            start: '2024-08-25',
            end: '2024-08-30',
            progress: 0,
            dependencies: '1'
        }
        ];

        const output =
            `<tr>
            <td>'1'</td>
            <td>'Write story'</td>
            <td>'2024-08-21'</td>
            <td>'2024-08-25'</td>
            <td>'0'</td>
            <td>'0'</td>
       </tr>
        <tr>
            <td>'2'</td>
            <td>'Draw graphics'</td>
            <td>'2024-08-25'</td>
            <td>'2024-08-30'</td>
            <td>'0'</td>
            <td>'1'</td>
       </tr>`

        expect(displayTaskRows(input)).toEqual(output);

    });
});