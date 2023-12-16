<script setup lang="ts">
import { ref } from "vue";
import { ec } from "elliptic";

const privKey = ref("");
const pubKey = ref("");

const returnPublicKey = () => {
  const a = new ec("secp256k1");
  const publicKey = a.keyFromPrivate(privKey.value);
  pubKey.value = publicKey.getPublic("hex");
};

const copyClipboard = () => {
  navigator.clipboard.writeText(pubKey.value);
};
</script>

<template>
  <div class="p-5 w-96">
    <h1 class="mb-5">Key Generator</h1>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Type your private key</span>
      </div>
      <input
        v-model="privKey"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />
    </label>
    <button @click="returnPublicKey" class="btn btn-secondary mt-3">
      Generate
    </button>
    <div class="mt-2">
      <div v-if="pubKey.length > 0" class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Here is your Public Key!</h2>
          <p>{{ pubKey }}</p>
          <div class="card-actions justify-end">
            <button @click="copyClipboard" class="btn btn-primary">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
