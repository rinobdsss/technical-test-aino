<template>
  <q-page view="hHh Lpr lFf">
    <q-page-container>
      <div class="row full-width">

        <div class="col-md-4 col-xs-12 q-pl-md q-pr-md q-pt-sm">
          <q-card class="my-card">
              <q-card-section>
                <div class="text-h6">{{ Profile.name }}</div>
                <div class="text-subtitle2">{{ Profile.email }}</div>
                <div class="text-subtitle3">{{ Profile.phone }}</div>
              </q-card-section>
              <q-card-section>
                <q-btn label="edit" color="primary"/>
              </q-card-section>
          </q-card>
        </div>

        <div class="col-md-8 col-xs-12 q-pl-md q-pr-md q-pt-sm">
          <div>
            <q-table
              title="Riwayat Transaksi"
              :rows="state.rows"
              :columns="columns"
              row-key="code"
            >
              <template v-slot:body-cell-no="props">
                <q-td :props="props">
                  <div v-text="props.rowIndex + 1"/>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div v-text="(props.row.status == 1) ? 'Sudah Lunas' : 'Belum Lunas'"/>
                </q-td>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn icon="notes" flat dense clickable @click="$router.push({ name: 'Transaction', params: { transactionId: props.row.id } })">
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>
<script setup>
import Global from '../../methods/global'
import { onMounted, reactive, computed } from 'vue'
const { axios, $store } = Global()
const Profile = computed(() => $store.state.storage.Account)

const state = reactive({
  rows: []
})

const columns = [
  { name: 'no', align: 'left', label: 'No', field: 'no' },
  { name: 'code', label: 'Kode Transaksi', align: 'left', field: 'code', sortable: true },
  { name: 'createdAt', align: 'center', label: 'Tg. Transaksi', field: 'createdAt', sortable: true },
  { name: 'productTotal', align: 'center', label: 'Total Produk', field: 'productTotal', sortable: true },
  { name: 'total', label: 'Total Harga (Rp)', field: 'total', sortable: true },
  { name: 'deliveryFee', label: 'Ongkir (Rp)', field: 'deliveryFee' },
  { name: 'grandTotal', label: 'Total Bayar (Rp)', field: 'grandTotal' },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'expiredDate', label: 'Batas Pembayaran', field: 'expiredDate', sortable: true },
  { name: 'action', align: 'left', label: 'Aksi', field: 'action' }
]

const getTransaction = async () => {
  try {
    axios.get('api/v1/member/transaction').then(response => {
      state.rows = response.data.data
    })
  } catch (err) {
    console.log(err.message)
  }
}

onMounted(async () => {
  await getTransaction()
})

</script>
