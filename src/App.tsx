import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Filter, ArrowDownUp } from "lucide-react"

import ClientsTable from "./components/ClientsTable"
import SortPanel, { type SortCriterion } from "./components/SortPanel"
import { mockClients, type Client } from "./data/clients"

export default function App() {
  const [criteria, setCriteria] = useState<SortCriterion[]>([])
  const [clients] = useState<Client[]>(mockClients)
  const [showSort, setShowSort] = useState(false)

  // 🔑 Proper sorting implementation
  const sortedClients = useMemo(() => {
    if (criteria.length === 0) return clients

    return [...clients].sort((a, b) => {
      for (const { field, direction } of criteria) {
        let aVal = a[field]
        let bVal = b[field]

        // handle dates
        if (field === "createdAt" || field === "updatedAt") {
          aVal = new Date(aVal as string).getTime()
          bVal = new Date(bVal as string).getTime()
        }

        if (aVal < bVal) return direction === "asc" ? -1 : 1
        if (aVal > bVal) return direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [clients, criteria])


  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Client
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setShowSort(!showSort)}>
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <Card>
        <CardContent>
          <ClientsTable data={sortedClients} />
        </CardContent>
      </Card>

      {/* Sort Panel */}
      {showSort && (
        <div className="fixed right-6 top-20 z-50">
          <SortPanel
            criteria={criteria}
            setCriteria={setCriteria}
            onApply={() => setShowSort(false)}
          />
        </div>
      )}
    </div>
  )
}
