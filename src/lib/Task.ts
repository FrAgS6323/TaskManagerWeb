export default class Task{
    private done: boolean = false;
    private name: string = "";

    constructor(name: string, done: boolean){
        this.name = name;
        this.done = done;
    }

    public setState(state: boolean): void{
        this.done = state;
        //console.log(this.name);
        //console.log(this.done);
    }
    
    public isDone(): boolean{
        return this.done;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getName(): string{
        return this.name;
    }

    public toJSON(): any{
        return JSON.stringify({name: this.name,
                               done: this.done});
    }

    public static fromJSON(JSONstr: string|null): Task{
        let newTask: Task = new Task("", false);

        if(null === JSONstr) return newTask;

        const data: Task = JSON.parse(JSONstr);
        newTask = new Task(data.name, data.done);

        return newTask;
    }

}