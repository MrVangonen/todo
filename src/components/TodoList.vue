<template>
  <div>
    <input
      v-model="newTodo"
      class="add-todo"
      type="text"
      @keydown.enter="addNewTodo(newTodo)"
      @keydown.esc="clearNewTodo()"
      :placeholder="$t('newTodo.placeholder')"
    />
    <Todo
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :index="index"
      @removeTodo="removeTodo"
    />
    <transition name="fade">
      <div v-show="todosCount > 0" class="extra">
        <input
          v-model="checkAll"
          class="extra__check-all"
          type="checkbox"
          id="check-all"
        />
        <label class="extra__check-all-label" for="check-all">check all</label>
        <button
          v-show="completedTodosCount"
          @click="clearCompleted()"
          class="extra__clear-btn"
        >
          clear completed
        </button>
        <div class="extra__todos">
          <span class="extra__todos-completed"
            >{{ completedTodosCount + " " }}
          </span>
          {{ $t("from") + " " + todosCount }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Todo from "./Todo.vue";

export default {
  data() {
    return {
      newTodo: "",
      newTodoId: 3,
      todos: [
        {
          id: 1,
          title: "Something",
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: "Something else",
          completed: false,
          editing: false,
        },
      ],
    };
  },
  components: {
    Todo,
  },
  watch: {
    todos: {
      handler() {
        console.log("todo list changed"); // save todos to your Local Storage
        let data = JSON.stringify(this.todos);
        localStorage.setItem("todos", data);
      },
      deep: true,
    },
  },
  computed: {
    checkAll: {
      get: function () {
        return this.todos.every((todo) => todo.completed == true);
      },
      set: function (isPressed) {
        let stage = isPressed ? true : false;

        this.todos.forEach((element, index, array) => {
          array[index].completed = stage;
        });
      },
    },
    todosCount() {
      return this.todos.length;
    },
    completedTodosCount() {
      let completedCount = 0;

      this.todos.forEach((todo) => {
        todo.completed && completedCount++;
      });

      return completedCount;
    },
  },
  methods: {
    addNewTodo(title) {
      if (title.trim().length == 0) return;

      this.todos.push({
        id: this.newTodoId++,
        title,
        completed: false,
        editing: false,
      });
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    clearNewTodo() {
      this.newTodo = "";
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => {
        return !todo.completed;
      });
    },
  },
  created() {
    // set saved todos
    let data = localStorage.getItem("todos");
    data && (this.todos = JSON.parse(data));
  },
};
</script>

<style lang="scss">
.add-todo {
  width: 100%;
  font-size: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: lighten($secondary, 20);

  &:focus {
    outline-color: $accent;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.extra {
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  column-gap: 1rem;
  text-align: left;
  box-shadow: inset 1px 2px 6px 0px $secondary;
  background-color: lighten($secondary, 20);
  transition: ease-in 1s;
  padding: 1rem 0;

  &__check-all {
    min-height: 3rem;
    min-width: 3rem;
    padding: 1rem;
    transition: 0.1s;
    cursor: pointer;
    margin-left: 0.5rem;

    &:checked {
      mix-blend-mode: exclusion;
    }
  }

  &__todos-completed {
    color: lightgreen;
  }

  &__todos {
    flex-grow: 1;
    text-align: right;
    margin-right: 1.8rem;
  }

  &__check-all-label {
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;
  }

  &__clear-btn {
    font-size: 1.5rem;
    border-radius: 1rem;
    padding: 1rem;
    white-space: nowrap;
    margin-left: 1rem;
    color: yellow;
    font-weight: bold;
    background-image: linear-gradient(
      to right top,
      #d16ba5,
      #c777b9,
      #ba83ca,
      #aa8fd8,
      #9a9ae1,
      #8aa7ec,
      #79b3f4,
      #69bff8,
      #52cffe,
      #41dfff,
      #46eefa,
      #5ffbf1
    );

    &:hover {
      background-color: darken($primary, 40);
      background-image: linear-gradient(
        to left,
        #d16ba5,
        #c777b9,
        #ba83ca,
        #aa8fd8,
        #9a9ae1,
        #8aa7ec,
        #79b3f4,
        #69bff8,
        #52cffe,
        #41dfff,
        #46eefa,
        #5ffbf1
      );
    }
  }
}

@media screen and (max-width: 340px) {
  .extra {
    column-gap: 0;
  }
}
</style>