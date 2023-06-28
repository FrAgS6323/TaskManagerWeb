import Task from "./Task";
Task

export default class TaskManager{
    private load: boolean = false;
    private tasks: Task[] = [];

    constructor(load: boolean){
        this.load = load;
    }

    private findTaskByName(name: string): [Task, 
                                           boolean, 
                                           number]{
        let found: boolean;
        let index: number = this.tasks.findIndex(task=> task.getName() === name);
        let taskToFind: Task = new Task("", false);

        if(index > -1){
            taskToFind = this.tasks[index];
            found = true;
        }else{
            found = false;
        }
        return [taskToFind, found, index];
    }

    public addTask(name: string): void{
        if("" == name) return;
        
        const [task, found] = this.findTaskByName(name);
        if(!found){
            let newTask: Task = new Task(name, task.isDone());
            this.tasks.push(newTask);
            if(this.load) window.localStorage.setItem(name, newTask.toJSON());
            console.log(`Task added with name: ${name}`);
        }
    }

    public removeTask(name: string): void{
        const [task, found, index] = this.findTaskByName(name);
        if(found){
            this.tasks.splice(index, 1);
            if(this.load) window.localStorage.removeItem(task.getName());
            console.log(`Task removed with name: ${name}`);
        }
    }

    public markTaskAsDone(name: string, done: boolean): void{
        const [taskToBeMarked, found, index] = this.findTaskByName(name);
        taskToBeMarked.setState(done);
        window.localStorage.setItem(taskToBeMarked.getName(), taskToBeMarked.toJSON());
    }

    public getAllTasks(): Task[]{
        if(this.load && 
           'undefined' !== typeof window  && 
           0 == this.tasks.length){

            for(let i = 0; i < window.localStorage.length; i++){
                const key: string|null = window.localStorage.key(i);
                const strItem: string|null = key !== null ? window.localStorage.getItem(key) : "";
                
                this.tasks.push(Task.fromJSON(strItem));
            }
        }
        return this.tasks;
    }

    public isEmpty(): boolean{
        return this.tasks.length ? false : true;
    }

    public localRefresh(): [Task[], boolean]{
        return [this.getAllTasks(), this.isEmpty()];
    }
}