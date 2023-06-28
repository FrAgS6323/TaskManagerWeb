<script lang="ts">
    import Task from "../lib/Task";
    import TaskManager from "../lib/TaskManager";
    Task
    TaskManager

    let taskName: string = "";
    let done: boolean = false;
    
    let taskManager: TaskManager = new TaskManager(true);
    let allTasks: Task[] = taskManager.getAllTasks();
    let empty: boolean = allTasks.length ? false : true;

    console.log(`Empty: ${empty}`);
    
    function localAddTask(){
        taskManager.addTask(taskName);
        taskManager.markTaskAsDone(taskName,
                                   done);
        [allTasks, empty] = taskManager.localRefresh();
    }

    function localChangeState(task: Task): void{
        taskManager.markTaskAsDone(task.getName(),
                                   !task.isDone());
        [allTasks, empty] = taskManager.localRefresh();
    }

    function localRemoveTask(task: Task): void{
        taskManager.removeTask(task.getName());
        [allTasks, empty] = taskManager.localRefresh();
    }
</script>

<div><h1 class="font-bold text-center p-5">TaskManager</h1></div>
<div class="flex flex-row items-stretch text-center justify-center">
    {#if empty}
            <p>No tasks in queue</p>
    {:else}
        <div class = "outline rounded-md w-auto inline-block mx-5 p-5">
            <h2 class="font-bold text-center">Ongoing tasks:</h2>
            {#each allTasks as task}
                {#if !task.isDone()}
                    <div class = "border-2 w-auto block">
                        <div class="inline rounded-md p-5">
                            {task.getName()}
                            <button class="rounded-md bg-green-600 text-white"
                                on:click={()=>{
                                    localChangeState(task);
                                }}>
                                Mark as done
                            </button>
                            <button class="rounded-md bg-red-600 text-white"
                                on:click={()=>{
                                    localRemoveTask(task);  
                                }}>
                                Remove
                            </button> 
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
        <div class = "outline rounded-md w-auto inline-block mx-5 p-5">
            <h2 class="font-bold text-center">Done tasks:</h2>
            {#each allTasks as task}
                {#if task.isDone()}
                    <div class = "border-2 w-auto block">
                        <div class="inline">
                            {task.getName()}
                            <button class="rounded-md bg-red-600 text-white"
                                on:click={()=>{
                                    localChangeState(task);
                                }}>
                                Mark as undone
                            </button>
                            <button class="rounded-md bg-red-600 text-white"
                                on:click={()=>{
                                    localRemoveTask(task);
                                }}>
                                Remove
                            </button>  
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<div class="block text-center justify-center">
    <br>
    <div class="inline m-5">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Task name: </label>
        <input class="outline rounded-md" type="text" bind:value={taskName}/>
    </div>
    <button class="border-2 rounded-md bg-black text-white"
        on:click={()=>{
            localAddTask();
        }}>Add Task</button>
</div>