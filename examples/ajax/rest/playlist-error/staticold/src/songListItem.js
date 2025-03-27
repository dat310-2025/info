/*
* Component song list item
* emits: delete
*/
const songListItemC = {
    props: ['song'],
    template: `<li>
    <button
    class="retry"
        v-if="song.retry"
        v-on:click="$emit('retry')"
    >try save</button>
        <img 
            src="/static/images/saving.gif" 
            alt="saving" 
            class="saving"
            v-if="song.saving"
            v-on:click="$emit('retry')"
        >
        <img 
            src="/static/images/delete.png" 
            alt="delete" 
            class="delete"
            v-else
            v-on:click="$emit('delete')">
        <div>{{ song.name }}</div>
        <div>{{ song.band }}</div>
    </li>`
}