<script setup>
import { ref } from "vue";
defineEmits(["create"]);
const props = defineProps({
  users: {
    type: Array,
    require: true,
  },
});

const isModalOn = ref(false);
const Name = ref("");
const Email = ref("");
const option = ref();
const roles = ["student", "lecturer", "admin"];
const error = ref(false);

const empty = (name) => {
  if (name.trim() == "") {
    error.value = true;
  } else {
    error.value = false;
  }
};

const isunique = ref(false);
const Nerror = ref(false);

const uniquename = (name) => {
  props.users.forEach((e) => {
    if (e.name.toLowerCase() == name.trim().toLowerCase()) {
      isunique.value = true;
      Nerror.value = true;
    }
  });
};
const Eerror = ref(false);
const uniqueemail = (email) => {
  props.users.forEach((e) => {
    if (e.email.toLowerCase() == email.trim().toLowerCase()) {
      isunique.value = true;
      Eerror.value = true;
    }
  });
};

</script>

<template>
  <div id="create">
    <button class="btn btn-outline text-xl font-extrabold px-10"
      @click="Name = ''; Email = ''; option = undefined; error = false; isunique = false; isModalOn = !isModalOn;">
      CREATE
    </button>
    <div v-show="isModalOn" class="modal-show flex justify-center">
      <div class="modal-content bg-base-100 rounded-2xl">
        <div class="flex justify-end">
          <button class="btn btn-square btn-outline" @click="isModalOn = !isModalOn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- form -->
        <form method="post"
          @submit.prevent="$emit('create', Name, Email, option); error == true ? isModalOn : isunique == true ? isModalOn : errorpass == true ? isModalOn : (isModalOn = !isModalOn); isunique = false;">
          <!-- Name -->
          <div class="grid justify-center">
            <label for="name">Name
              <span class="auto-fill">({{ Name.length }}/100)</span></label>
            <div class="py-3">
              <input type="text" v-model="Name" maxlength="100" class="form-element bg-base-100 italic"
                placeholder="Please enter your name" required />
            </div>
            <!-- <p class="text-red-600" v-show="error">Empty element</p> -->
            <p class="text-red-600" v-show="Nerror">This name is already in use.</p>

            <!-- Email -->
            <label for="Email">Email
              <span class="auto-fill">({{ Email.length }}/50)</span></label>
            <div class="py-3">
              <input type="email" v-model="Email" maxlength="50" class="form-element bg-base-100 border-b-2 italic"
                placeholder="Please enter your email" required />
            </div>
            <p class="text-red-600" v-show="Eerror">This email is already in use.</p>

            <!-- Role -->
            <label for="role">Role</label>
            <div class="py-3">
              <select name="roles" class="select form-element bg-base-100 border-b-2 italic" v-model="option">
                <option v-for="role in roles">{{ role }}</option>
              </select>
            </div>
            <span class="text-xs	text-red-500">** If you don't select role, the default will be student **</span>
          </div>
          <div class="pt-2">
            <!-- Create -->
            <input class="float-right justify-end btn" type="submit" value="Create"
              @click="empty(Name); uniquename(Name); uniqueemail(Email);" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.form-password {
  border-color: #494a7d;
  border-width: 2px;
  padding: 10px;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.form-eye {
  border-color: #494a7d;
  padding: 8px;
  border-width: 2px;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.form-element {
  border-color: #494a7d;
  border-radius: 5px;
  padding: 10px;
  border-width: 2px;
  width: 100%;
}

.form-element:focus {
  outline: none !important;
  border: 2px solid #fcc302;
}

.modal-content {
  margin: auto;
  padding: 20px;
  width: 500px;
}

.modal-show {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(32, 32, 32);
  background-color: rgba(73, 73, 73, 0.4);
}

.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(82, 80, 80);
  text-decoration: none;
  cursor: pointer;
}

.auto-fill {
  color: #8f8f8f;
}
</style>
