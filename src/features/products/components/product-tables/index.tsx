'use client'

import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'

import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/ui/table/data-table'
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar'

interface ProductTableParams<TData, TValue> {
  data: TData[]
  totalItems: number
  columns: ColumnDef<TData, TValue>[]
}
export function ProductTable<TData, TValue>({ data, totalItems, columns }: ProductTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10))

  const pageCount = Math.ceil(totalItems / pageSize)

  const { table } = useDataTable({
    data, // product data
    columns, // product columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}
