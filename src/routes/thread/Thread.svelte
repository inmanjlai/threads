<script>
    export let data;
</script>

<article>
    <h4>{data.thread?.title}</h4>
    <p>{data.thread?.content}</p>
    
    <footer class="flex-center justify-sb">
        <p class="remove-mp"><em>Posted by User {data.thread?.user}</em></p>
        <!-- <div class="thread-controls">
            <div role="button"  class="thread-btns">
                Like<span class="material-symbols-outlined">thumb_up</span>
            </div>
            <div role="button" class="thread-btns">
                Comment<span class="material-symbols-outlined">chat_bubble</span>
            </div>
        </div> -->
    </footer>
</article>

<style>
    .thread-controls {
        display: flex;
        gap: 10px;
    }

    .thread-btns {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .remove-mp {
        padding: 0;
        margin: 0;
    }

    .flex-center {
        display: flex;
        align-items: center;
    }

    .justify-sb {
        display: flex;
        justify-content: space-between;
    }   
</style>