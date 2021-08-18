<template>
  <div class="todo-wrapper">
    <input
      v-show="localTodo.editing"
      @keydown.enter="editTodo(todo)"
      @keydown.esc="localTodo.editing = false"
      @blur="editTodo(todo)"
      class="todo__edit"
      v-model="localTodo.title"
      v-focus
      type="text"
    />
    <div class="todo-item" v-show="!localTodo.editing">
      <input class="todo-item__checkbox" type="checkbox" v-model="localTodo.completed" />
      <div
        @click="startEditingTodo()"
        class="todo-item__label"
        :class="{ 'todo-item__label_done': localTodo.completed }"
      >
        {{ localTodo.title }}
        <hr v-if="localTodo.completed" class="todo-item__through-line" />
      </div>
      <button class="todo-item__cross" @click="$emit('removeTodo', index)">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localTodo: this.todo,
      cachedTitle: "",
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  directives: {
    focus: {
      // directive definition
      updated: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    startEditingTodo() {
      this.cachedTitle = this.localTodo.title;
      this.localTodo.editing = true;
    },
    editTodo() {
      this.localTodo.editing = false;

      if (this.localTodo.title.trim().length == 0) {
        this.localTodo.title = this.cachedTitle;
      }
    },
  },
};
</script>

<style lang="scss">
.todo-wrapper {
  margin-bottom: 2rem;

  .todo {
    margin-bottom: 1.2rem;
    padding-left: 1.2rem;

    &__edit {
      width: 100%;
      font-size: 2rem;
      color: #2c3e50;
      padding: 1rem;
      border: 1px solid #ccc;
      font-family: Arial, Helvetica, sans-serif;

      &:focus {
        outline-color: $accent;
      }
    }

    &-item {
      position: relative;
      bottom: 0;
      transition: 0.25s;
      display: grid;
      grid-template-columns: 0.8fr 8.4fr 0.8fr;
      place-items: center;
      column-gap: 1rem;
      text-align: left;
      box-shadow: 1px 2px 6px 0px $primary;

      /* anitselect text */
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;

      &:hover {
        bottom: 0.3rem;
      }

      &__checkbox {
        min-height: 4rem;
        min-width: 4rem;
        font-size: 2rem;
        padding: 1rem;
        transition: 0.1s;
        cursor: pointer;

        &:hover {
          color: black;
          background-color: rgb(231, 231, 231);
          font-size: 2.2rem;
        }
      }

      &__label {
        position: relative;
        width: 100%;
        text-align: left;
        padding: 1rem;
        cursor: text;
        overflow: hidden;
        text-overflow: ellipsis;

        &_done {
          text-decoration: line-through;
          color: $accent;

          /* color cross */
          & + .todo-item__cross {
            color: $accent;

            &:hover {
              background-color: lighten($accent, 20);
            }
          }
        }
      }

      &__through-line {
        position: absolute;
        top: 50%;
        bottom: 50%;
        width: 100%;
        height: 0.3rem;
        background-color: $accent;
      }

      &__cross {
        height: 100%;
        width: 100%;
        font-size: 2rem;
        padding: 1rem;
        transition: 0.1s;

        &:hover {
          background-color: rgb(231, 231, 231);
          font-size: 2.2rem;
        }
      }
    }
  }
}
</style>