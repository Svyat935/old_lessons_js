class Cell {
    //Все соседи данной ячейки.
    topLeftNeighbour = null;        //Верхний левый
    topMiddleNeighbour = null;      //Верхний
    topRightNeighbour = null;       //Верхиний правый
    leftNeighbour = null;           //Левый
    rightNeighbour = null;          //Правый
    downLeftNeighbour = null;       //Нижний левый
    downMiddleNeighbour = null;     //Нижний
    downRightNeighbour = null;      //Нижний правый
    status;                         //Текущий статус ячейки
    futureStatus;                   //Будущий статус, который неоходим для каждого шага
    constructor(status) {            //Контсруктор
        this.status = status;
    }

    //Подсчет количества "соседей"
    getNeighbourCount() {
        let count = [];
        count[0] = 0;   //Количество соседей
        count[1] = 0;   //Количество черных гэнгста
        count[2] = 0;   //Количество красных
        count[3] = 0;   //Количество турпов
        if (this.topLeftNeighbour != null)
            if (this.topLeftNeighbour.status != 0 && this.topLeftNeighbour.status != 3) {
                count[0]++;
                this.topLeftNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.topLeftNeighbour.status == 3) {
                count[3]++;
            }
        if (this.topMiddleNeighbour != null)
            if (this.topMiddleNeighbour.status != 0 && this.topMiddleNeighbour.status != 3) {
                count[0]++;
                this.topMiddleNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.topMiddleNeighbour.status == 3) {
                count[3]++;
            }
        if (this.topRightNeighbour != null)
            if (this.topRightNeighbour.status != 0 && this.topRightNeighbour.status != 3) {
                count[0]++;
                this.topRightNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.topRightNeighbour.status == 3) {
                count[3]++;
            }
        if (this.leftNeighbour != null)
            if (this.leftNeighbour.status != 0 && this.leftNeighbour.status != 3) {
                count[0]++;
                this.leftNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.leftNeighbour.status == 3) {
                count[3]++;
            }
        if (this.rightNeighbour != null)
            if (this.rightNeighbour.status != 0 && this.rightNeighbour.status != 3) {
                count[0]++;
                this.rightNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.rightNeighbour.status == 3) {
                count[3]++;
            }
        if (this.downLeftNeighbour != null)
            if (this.downLeftNeighbour.status != 0 && this.downLeftNeighbour.status != 3) {
                count[0]++;
                this.downLeftNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.downLeftNeighbour.status == 3) {
                count[3]++;
            }
        if (this.downMiddleNeighbour != null)
            if (this.downMiddleNeighbour.status != 0 && this.downMiddleNeighbour.status != 3) {
                count[0]++;
                this.downMiddleNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.downMiddleNeighbour.status == 3) {
                count[3]++;
            }
        if (this.downRightNeighbour != null)
            if (this.downRightNeighbour.status != 0 && this.downRightNeighbour.status != 3) {
                count[0]++;
                this.downRightNeighbour.status == 1 ? count[1]++ : count[2]++;
            } else if (this.downRightNeighbour.status == 3) {
                count[3]++;
            }
        return count;
    }

    changeFutureStatus() {
        this.status = this.futureStatus;
        this.futureStatus = null;
    }
}

//Первичная генерация таблицы
function generateTable(n, m, k = 1) {

    let table = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < m; j++) {
            row.push(new Cell(Math.floor(Math.random() * 3 * k)))  //Можно немного подправить, чтобы было поровну пустых и заполненных ячеек
        }
        table.push(row);
    }
    //Связываем всё
    connectTableCells(table);
    return table;
}

function connectTableCells(table) {
    let n = table.length,
        m = table[0].length;
    for (let i = 1; i < n - 1; i++) {
        for (let j = 1; j < m - 1; j++) {
            //Связываем все ячейки
            table[i][j].topLeftNeighbour = table[i - 1][j - 1];
            table[i - 1][j - 1].downRightNeighbour = table[i][j];

            table[i][j].topMiddleNeighbour = table[i - 1][j];
            table[i - 1][j].downMiddleNeighbour = table[i][j];

            table[i][j].topRightNeighbour = table[i - 1][j + 1];
            table[i - 1][j + 1].downLeftNeighbour = table[i][j];

            table[i][j].leftNeighbour = table[i][j - 1];
            table[i][j - 1].rightNeighbour = table[i][j];

            table[i][j].rightNeighbour = table[i][j + 1];
            table[i][j + 1].leftNeighbour = table[i][j];

            table[i][j].downLeftNeighbour = table[i + 1][j - 1];
            table[i + 1][j - 1].topRightNeighbour = table[i][j];

            table[i][j].downMiddleNeighbour = table[i + 1][j];
            table[i + 1][j].topMiddleNeighbour = table[i][j];

            table[i][j].downRightNeighbour = table[i + 1][j + 1];
            table[i + 1][j + 1].topLeftNeighbour = table[i][j];
        }
    }
}

function step(table) {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
            let count = table[i][j].getNeighbourCount();
            if (table[i][j].status != 3) {
                if (((count[0] == 3 || count[0] == 2) && table[i][j].status != 0)) {
                    if (count[1] > count[2])
                        table[i][j].futureStatus = 1;
                    else
                        table[i][j].futureStatus = 2;
                } else if (count[0] == 3 && table[i][j].status == 0) {
                    if (count[1] > count[2])
                        table[i][j].futureStatus = 1;
                    else
                        table[i][j].futureStatus = 2;
                } else table[i][j].futureStatus = 0;
            } else {
                table[i][j].futureStatus = 3;
            }
        }
    }
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
            table[i][j].changeFutureStatus();
        }
    }
}


function generationViewTable(table) {
    let tableView = document.getElementById("table");
    tableView.innerHTML = "";

    let tableArrayView = []
    let count = 0;
    for (let row of table) {
        let rowArrayView = [];
        for (let cell of row) {
            let element = React.createElement(
                "div", {
                    className: cell.status == 1 ?
                        "cell black" : cell.status == 2 ?
                            "cell red" : "cell white",
                    onClick: () => {
                        console.log("epta");
                        godMode(cell);
                    },
                    key: count,
                })
            rowArrayView.push(element);
            count++;
        }

        let el = React.createElement(
            "div",
            {key: count},
            rowArrayView
        )
        tableArrayView.push(el);
        count++;
    }
    ReactDOM.render(
        tableArrayView, tableView
    )
}

function updateViewTable(table) {
    let tableView = document.getElementById("table");

    let i = 0;
    for (let row of tableView.children) {
        let j = 0;
        for (let cell of row.children) {
            cell.className = table[i][j].status == 1 ?
                "cell black" : table[i][j].status == 2 ?
                    "cell red" : table[i][j].status == 3 ?
                        "cell dead" : "cell white";
            j++;
        }
        i++;
    }

}

var table;

window.onload = () => {
    const N = 100, M = 60;
    table = generateTable(N, M, 0.75);
    generationViewTable(table);
}

var timer, flag = false;

function godMode(cell) {
    cell.status == 3 ? cell.futureStatus = 0 : cell.futureStatus = 3;
    cell.changeFutureStatus();
    updateViewTable(table);
}

$("#start").click(() => {
    if (!flag) {
        let time = 1000;
        timer = setInterval(() => {
            step(table);
            updateViewTable(table);
            time--;

            if (time < 0) {
                clearInterval(timer);
            }
        }, 100);
        flag = true;

    }
});

$("#stop").click(() => {
    clearInterval(timer);
    flag = false;
});
