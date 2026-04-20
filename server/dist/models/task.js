export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["TODO"] = 0] = "TODO";
    TaskStatus[TaskStatus["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    TaskStatus[TaskStatus["DONE"] = 2] = "DONE";
})(TaskStatus || (TaskStatus = {}));
