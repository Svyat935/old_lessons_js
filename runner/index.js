function generate(n, m) {
    document.body.style.background = "grey";

    //Создание поля
    let table = document.createElement("div");
    table.className = "table";

    x = Math.floor(n * Math.random());
    y = Math.floor(m * Math.random());
    document.body.append(table);
    personFlag = true;
    for (let i = 0; i < m; i++) {
        row = document.createElement("div");
        row.className = "table-row";
        for (let j = 0; j < n; j++) {
            cell = document.createElement("div");

            number = Math.floor(5 * Math.random());
            if (x == j && y == i) {
                cell.className = "cell person";
            } else if (number == 0)
                cell.className = "cell wall";
            else
                cell.className = "cell empty";

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    person = table.children[y].children[x];

    return table;
}


//Логика
function checkExit(x, y, max_x, max_y) {
    if (x + 1 == max_x || x == 0)
        return true;
    else if (y + 1 == max_y || y == 0)
        return true;
    return false;
}

function allDirection(x, y, table) {
    directions = []
    if (table.children[y - 1].children[x].className != "cell wall" && table.children[y - 1].children[x].className != "cell sled")
        directions.push({"elem": table.children[y - 1].children[x], "x": x, "y": y - 1})
    if (table.children[y + 1].children[x].className != "cell wall" && table.children[y + 1].children[x].className != "cell sled")
        directions.push({"elem": table.children[y + 1].children[x], "x": x, "y": y + 1})
    if (table.children[y].children[x + 1].className != "cell wall" && table.children[y].children[x + 1].className != "cell sled")
        directions.push({"elem": table.children[y].children[x + 1], "x": x + 1, "y": y})
    if (table.children[y].children[x - 1].className != "cell wall" && table.children[y].children[x - 1].className != "cell sled")
        directions.push({"elem": table.children[y].children[x - 1], "x": x - 1, "y": y})
    return directions
}

// function findExit(x, y, m, n, table, list_all_prev_directions=null) {
//     if (checkExit(x, y, m, n))
//         return [direct];
//     let new_directions = allDirection(x, y, table);
//     if (new_directions) {
//         for (var direct of new_directions) {
//             let flag = true;
//             if(list_all_prev_directions){
//                 for(var d of list_all_prev_directions){
//                     if(d["x"] == direct["x"] && d["y"] == direct["y"]){
//                         flag = false;
//                         continue;
//                     }
//                 }
//                 if(flag)
//                     list_all_prev_directions.push(direct);
//             }
//             else
//                 list_all_prev_directions = [direct];
//             if(!flag){
//                 return null;
//             }
//             else {
//                 var next_direction = findExit(direct['x'], direct['y'], m, n, table);
//                 if (!next_direction)
//                     return null;
//                 else {
//                     if (direct)
//                         return next_direction.concat(direct);
//                     else
//                         return next_direction;
//                 }
//             }
//         }
//     } else {
//         return null;
//     }
// }

function represent(next_x, next_y, element) {
    person.className = "cell sled";

    person = element;
    person.className = "cell person";

    x = next_x;
    y = next_y;
}

// MAIN

let n = prompt("Введите ширину таблицы:");
let m = prompt("Введите длину таблицы:");
let table = generate(n, m);

//Не рандомом
let exit = findExit(x, y, m, n, table);
if(exit){
    exit = exit.reverse();
    exit.pop();
    if (exit){
        for(let elem of exit){
            setTimeout(represent(elem["x"], elem["y"], elem["elem"]), 1000);
        }
        alert("Он вышел!");
    }else{
        alert("Он вышел!");
    }
}
else
    alert("Не нашел выхода или запутался.");

//Рандомом
// let timer = setInterval(function () {
//     if (checkExit(x, y, m, n)) {
//         alert("Он вышел!");
//         clearInterval(timer);
//         return;
//     }
//
//     directions = allDirection(x, y, table)
//     directions.sort(function (a, b) {
//         return 0.5 - Math.random();
//     })
//         represent(directions[0]["x"], directions[0]["y"], directions[0]["elem"]);
// }, 1000);
//
