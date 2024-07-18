document.addEventListener('DOMContentLoaded', function () {

    // Initial array of task objects to display and feed into gantt chart
    var tasks = [
        {
            id: '1',
            name: 'Dig paving arae',
            start: '2024-07-01',
            end: '2024-07-05',
            progress: 100,
            dependencies: '0'
        },
        {
            id: '2',
            name: 'Fill paving area with sub-base',
            start: '2024-07-06',
            end: '2024-07-10',
            progress: 60,
            dependencies: '1'
        },
        {
            id: '3',
            name: 'Conpact sub-base',
            start: '2024-07-11',
            end: '2024-07-20',
            progress: 20,
            dependencies: '2'
        },
        {
            id: '4',
            name: 'Lay paving',
            start: '2024-07-21',
            end: '2024-08-10',
            progress: 0,
            dependencies: '3'
        },
        {
            id: '5',
            name: 'Plant trees and shrubs',
            start: '2024-08-11',
            end: '2024-08-20',
            progress: 0,
            dependencies: '4'
        },
        {
            id: '6',
            name: 'Mow lawn',
            start: '2024-08-21',
            end: '2024-08-25',
            progress: 0,
            dependencies: '5'
        }
    ];

    // set up new gantt chart from open-source library, hard-coded week view
    var gantt = new Gantt("#gantt", tasks, {
        view_mode: 'Week',
        date_format: 'YYYY-MM-DD'
    });

    // Function to dispaly tasks in table
    // Find correct id, loop through tasks to create the table body as rows
    function displayTaskRows(tasks) {
        document.querySelector("#task-rows").innerHTML = tasks.map(
            task => `<tr>
                 <td>${task.id}</td>
                <td>${task.name}</td>
                <td>${task.start}</td>
                <td>${task.end}</td>
                <td>${task.progress}</td>
                <td>${task.dependencies}</td>
                </tr>`).join('')
    }

    // Execute funciton to insert rows into table
    displayTaskRows(tasks);

    // Add event listener to check if the user has added a new task
    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault(); // do not refresh screen

        // Retrieve task data from form
        const taskName = document.getElementById('task-name').value;
        const taskStart = document.getElementById('task-start').value;
        const taskDuration = parseInt(document.getElementById('task-duration').value, 10);

        // convert dates to correct format  
        if (taskName && taskStart && taskDuration) {
            const taskEnd = new Date(taskStart);
            taskEnd.setDate(taskEnd.getDate() + taskDuration); //calculate end date based on duration entered

            // Contrust a new object with the data input by user
            const newTask = {
                id: (tasks.length + 1).toString(),
                name: taskName,
                start: taskStart,
                end: taskEnd.toISOString().split('T')[0],
                progress: 0,
                dependencies: ''
            };

            // Add the new task to the original list of project atasks
            tasks.push(newTask);

            // Redraw library gantt chart
            gantt.refresh(tasks);

            // Execute funciton to insert rows into table wth new task
            displayTaskRows(tasks);

            console.log(tasks);

            // Clare the form inputs
            document.getElementById('task-name').value = '';
            document.getElementById('task-start').value = '';
            document.getElementById('task-duration').value = '';
        }
    });
});