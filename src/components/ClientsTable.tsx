

import type { Client } from "@/data/clients"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export default function ClientsTable({ data }: { data: Client[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client ID</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="text-blue-600 font-medium">{c.id}</TableCell>
            <TableCell>{c.name}</TableCell>

            <TableCell>{c.email}</TableCell>
            <TableCell className="text-green-600">Active</TableCell>
            <TableCell>{c.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
