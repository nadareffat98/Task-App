<template>
  <!-- -------------------------alert---------------------- -->
  <transition name="fade">
    <div
      id="alert"
      :class="alert.alertColor"
      class="alert mx-auto"
      role="alert"
      v-if="alert.showMessage"
    >
      <strong> {{ alert.message }} </strong>
    </div>
  </transition>
  <form class="row Filter_form px-3" dir="rtl">
    <!-- -------------------------departments---------------------- -->
    <div class="input-group mb-3 col-md-3">
      <label for="deps" class="input-group-text"> روابط الحسابات </label>
      <select
        class="form-select"
        id="deps"
        @change="changeSelect2"
        v-model="depSelected"
      >
        <option selected hidden></option>
        <option v-for="dep in departments" :key="dep.id" :value="dep.link_name">
          {{ dep.text }}
        </option>
      </select>
    </div>
    <!-- --------------------------accounts------------------------ -->
    <div class="input-group mb-3 col-md-3">
      <label for="items2" class="input-group-text"> الحساب</label>
      <select
        class="form-select"
        id="items2"
        v-model="account"
        @change="showAlert('alert-success', ' تم اختيار الحساب بنجاح  ')"
      >
        <option selected hidden></option>
        <option
          v-for="account in selectItems2"
          :key="account.id"
          :value="{ acc: account.account, name: account.text }"
        >
          {{ account.text }}
        </option>
      </select>
    </div>
    <!----------------------------Date-------------------------->
    <div class="input-group flex-nowrap mb-3 col-md-3">
      <span class="input-group-text"> من تاريخ </span>
      <!-- <label for="names" class="col-sm-4 text-secondary">من</label> -->
      <input
        class="form-control"
        type="date"
        name="begin"
        placeholder="dd-mm-yyyy"
      />
    </div>
    <div class="input-group flex-nowrap mb-3 col-md-3">
      <span class="input-group-text"> الي تاريخ </span>
      <input
        class="form-control"
        type="date"
        name="end"
        placeholder="dd-mm-yyyy"
      />
    </div>
    <!----------------------------button-------------------------->
    <div>
      <button
        class="btn btn-grad mt-4 rounded-pill py-2 px-3 text-white"
        @click.prevent="showTable"
      >
        تصفية <font-awesome-icon icon="filter" />
      </button>
      <button class="btn btn-warning mt-4 me-4 rounded-3 text-white">
        تقرير مختصر <font-awesome-icon icon="filter" />
      </button>
    </div>
  </form>
  <TableComponent v-show="display" :account="account" :tableData="tableData" />
</template>
<script>
import axios from "axios";
import TableComponent from "./TableComponent.vue";
export default {
  name: "FormComponent",
  components: {
    TableComponent,
  },
  data() {
    return {
      alert: {
        showMessage: false,
        alertColor: "",
        message: "",
      },
      departments: "",
      accounts: "",
      depSelected: "",
      selectItems2: "",
      account: "",
      transactions: "",
      tableData: "",
      display: false,
    };
  },
  methods: {
    getData() {
      axios
        .get("database/departments.json")
        .then((res) => (this.departments = res.data))
        .catch((err) => console.log(err));
      axios
        .get("database/accounts.json")
        .then((res) => (this.accounts = res.data))
        .catch((err) => console.log(err));
      axios
        .get("database/transaction.json")
        .then((res) => (this.transactions = res.data))
        .catch((err) => console.log(err));
    },
    changeSelect2() {
      this.showAlert("alert-success", " تم اختيار رابط الحسابات بنجاح ");
      this.account = "";
      this.display=false;
      for (var i = 0; i < this.accounts.length; i++) {
        if (this.depSelected == this.accounts[i].account_link.link_name) {
          this.selectItems2 = this.accounts[i].account_link.accounts;
          break;
        }
        this.selectItems2 = [];
      }
    },
    showTable() {
      if (this.account == "" || this.depSelected == "") {
        this.showAlert("alert-warning", " يجب اختيار روابط الحسابات و الحساب ");
      } else {
        for (var i = 0; i < this.transactions.length; i++) {
          if (this.account.acc == this.transactions[i].account) {
            this.showAlert("alert-success", "تم عرض البيانات بنجاح");
            this.tableData = this.transactions[i].transaction.data;
            this.display = true;
            break;
          }
          this.tableData = "";
        }
        if (this.tableData == "") {
          this.display = false;
          this.showAlert("alert-danger", " لايوجد بيانات ");
        }
      }
    },
    showAlert(color, message) {
      this.alert.alertColor = color;
      this.alert.showMessage = true;
      this.alert.message = message;
      setTimeout(() => {
        this.alert.showMessage = false;
        this.alert.message = "";
      }, 4000);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
select,
input {
  appearance: none;
  border: none;
}
input:focus,
select:focus {
  border-radius: 20px;
  outline-color: rgb(125, 172, 172);
  text-align: center;
}
div.form-group {
  border: 1px solid #e8e9eb;
  padding-right: 0px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.btn-grad {
  background-image: linear-gradient(
    to right,
    #403b4a 0%,
    #e7e9bb 51%,
    #403b4a 100%
  );
  box-shadow: 0 0 20px #eee;
  background-size: 200% auto;
}
.alert {
  width: 35% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.Filter_form .input-group {
  width: 25% !important;
}
.Filter_form .form-control,
.Filter_form .form-select,
.Filter_form label,
.Filter_form span {
  height: 45px !important;
}
.Filter_form label,
.Filter_form span {
  border-radius: 0 20px 20px 0 !important;
  background-color: transparent;
}
.Filter_form .form-control,
.Filter_form .form-select {
  border-radius: 20px 0 0 20px !important;
}
@media (max-width: 767px) {
  .Filter_form .input-group {
    width: 100% !important;
  }
}
</style>
