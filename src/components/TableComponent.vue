<template>
  <div class="text-end px-4" dir="rtl">
    <button class="btn btn-grad mt-4 py-2 px-3 rounded-pill text-white">
      طباعة <font-awesome-icon icon="print" />
    </button>
    <div
      class="mt-3 py-1 px-5 w-25 rounded-pill text-white bg-warning"
      style="font-size: 20px"
    >
      كشف حساب : {{ account.acc }} - {{ account.name }}
    </div>
    <table
      class="table table-dark table-striped table-bordered mt-4 text-center text-end"
    >
      <thead class="fixed">
        <tr>
          <th colspan="2">الرصيد</th>
          <th colspan="2">حركة الحساب</th>
          <th colspan="3">رصيد سابق : 0</th>
        </tr>
        <tr>
          <th scope="col">مدين</th>
          <th scope="col">دائن</th>
          <th scope="col">مدين</th>
          <th scope="col">دائن</th>
          <th scope="col">البيان</th>
          <th scope="col">التاريخ</th>
          <th scope="col">رقم المستند</th>
        </tr>
      </thead>
      <tbody v-for="row in tableData" :key="row.id">
        <tr>
          <td>{{ row.debit }}</td>
          <td>{{ row.credit }}</td>
          <td>{{ row.balance_debit }}</td>
          <td>{{ row.balance_credit }}</td>
          <td>{{ row.description }}</td>
          <td>{{ row.date }}</td>
          <td>{{ row.reference_id }}</td>
        </tr>
        <tr>
          <td colspan="4"></td>
          <td colspan="3">
            <table class="table table-dark table-striped table-bordered">
              <thead class="text-center">
                <tr>
                  <th>الباركود</th>
                  <th>الصنف</th>
                  <th>الكمية</th>
                  <th colspan="2">السعر</th>
                  <th>ض.ق.م</th>
                  <th>القيمة</th>
                </tr>
              </thead>
              <tbody class="text-end">
                <tr class="text-center">
                  <td>{{ row.reference.items[0].serial }}</td>
                  <td>{{ row.reference.items[0].title_ar }}</td>
                  <td>{{ row.reference.items[0].quantity }}</td>
                  <td colspan="2">{{ row.reference.items[0].price }}</td>
                  <td>{{ row.reference.items[0].tax_percentage }} %</td>
                  <td>{{ row.reference.items[0].subtotal }}</td>
                </tr>
                <tr>
                  <td colspan="3">اجمالي القيمة</td>
                  <td colspan="2" class="text-center">
                    <span>{{ row.reference.subtotal }}</span> ريال
                  </td>
                </tr>
                <tr>
                  <td colspan="3">يضاف ضريبة القيمة المضافة</td>
                  <td colspan="2" class="text-center">
                    <span>{{ row.reference.total_tax }}</span> ريال
                  </td>
                </tr>
                <tr>
                  <td colspan="3">اجمالي الفاتورة</td>
                  <td colspan="2" class="text-center">
                    <span>{{ row.reference.total }}</span> ريال
                  </td>
                </tr>
                <tr>
                  <td colspan="3">المدفوع</td>
                  <td colspan="2" class="text-center">
                    <span>{{ row.reference.paid_amount }}</span> ريال
                  </td>
                </tr>
                <tr>
                  <td colspan="3">المتبقي</td>
                  <td colspan="2" class="text-center">
                    <span>{{ row.reference.remaining_amount }}</span> ريال
                  </td>
                </tr>
                <tr>
                  <td colspan="3">التاريخ</td>
                  <td colspan="2" class="text-center">{{ row.date }}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "TableComponent",
  props: ["account", "tableData"],
};
</script>
<style>
.fixed {
  position: sticky;
  top: 0;
  z-index: 1;
}
td span {
  padding-left: 4px !important;
}
/* tr:nth-of-type(odd) > td:nth-child(odd),td:nth-child(odd)
{
  --bs-table-accent-bg: rgb(73, 71, 71) !important;
} */
</style>
