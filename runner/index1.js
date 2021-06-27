function generateTable(n, m) {
    let person_x = Math.floor(Math.random() * n),
        person_y = Math.floor(Math.random() * m),
        exit_x = Math.floor(Math.random() * n),
        exit_y = Math.floor(Math.random() * m);

    let table = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < m; j++) {
            if (i === person_x && j === person_y)
                row.push(2);
            else if (i === exit_x && j === exit_y)
                row.push(-1);
            else
                row.push(Math.floor(2 * Math.random() * 0.75));
        }
        table.push(row);
    }
    return {"table": table, "person_x": person_x, "person_y": person_y, "exit_x": exit_x, "exit_y": exit_y};
}

function generateViewTable(table) {
    let tableView;
    if (document.body.children.length <= 1) {
        tableView = document.createElement("div");
        tableView.className = "table";
        document.body.appendChild(tableView);
    } else {
        tableView = document.body.children[1];
        tableView.innerHTML = "";
    }

    for (let row of table) {
        let rowView = document.createElement("div");
        rowView.className = "table-row";
        for (let cell of row) {
            let cellView = document.createElement("div");

            if (cell === 0)
                cellView.className = "cell empty";
            else if (cell === 1)
                cellView.className = "cell wall";
            else if (cell === 2)
                cellView.className = "cell person";
            else if (cell === 3){
                cellView.className = "cell step";

                let image = document.createElement("img");
                    image.style.width = "100%";
                    image.src = "step.png";
                let wrapper = document.createElement("div");
                    wrapper.style.height = "100%";
                    wrapper.style.width = "auto";

                cellView.appendChild(image);
            }
            else if (cell === -1)
                cellView.className = "cell exit";

            rowView.appendChild(cellView);
        }
        tableView.appendChild(rowView);
    }
}

function checkExit(x_person, y_person, x_exit, y_exit) {
    if (x_person === x_exit && y_person === y_exit)
        return true;
    return false;
}

function allDirection(x, y, table) {
    let directions = [];
    if (x !== 0 && (table[x - 1][y] <= 0))
        directions.push({"x": x - 1, "y": y});
    if (y !== 0 && table[x][y - 1] <= 0)
        directions.push({"x": x, "y": y - 1});
    if (x !== table.length - 1 && table[x + 1][y] <= 0)
        directions.push({"x": x + 1, "y": y});
    if (y !== table[x].length - 1 && table[x][y + 1] <= 0)
        directions.push({"x": x, "y": y + 1});
    return directions;
}

function removeOldDirection(new_directions, old_directions) {
    new_directions = new_directions.filter(function (new_direction) {
        for (let old_direct of old_directions) {
            if (old_direct["x"] === new_direction["x"] && old_direct["y"] === new_direction["y"])
                return false;
        }
        return true;
    })
    return new_directions;
}

function findExit(x, y, table, old_directions = []) {
    if (checkExit(x, y, x_exit, y_exit))
        return [{"x": x, "y": y}];
    else {
        let new_directions = allDirection(x, y, table);
        if (new_directions) {
            new_directions = removeOldDirection(new_directions, old_directions);
            if (new_directions) {
                for (let new_direct of new_directions) {
                    old_directions.push(new_direct);
                    let futher_direct = findExit(new_direct["x"], new_direct["y"], table, old_directions);
                    if (futher_direct)
                        return [{"x": x, "y": y}].concat(futher_direct);
                }
            } else
                return null;
        } else
            return null;
        return null;
    }
}


const N = prompt("Введите ширину таблицы:"),
    M = prompt("Введите длину таблицы:");
let objectTable = generateTable(N, M);
let table = objectTable["table"],
    x = objectTable["person_x"],
    y = objectTable["person_y"],
    x_exit = objectTable["exit_x"],
    y_exit = objectTable["exit_y"];

generateViewTable(table);
let exit = findExit(x, y, table);

if(exit){
    let step = 1;
    let timer = setInterval(function () {
        let element = exit[step];

        table[x][y] = 3;
        [x, y] = [element["x"], element["y"]];
        table[x][y] = 2;
        generateViewTable(table);

        step++;
        if (step >= exit.length){
            alert("He exited!");
            clearInterval(timer);
        }
    }, 1000)
}
else
    alert("Sorry, but exit blocked!");
