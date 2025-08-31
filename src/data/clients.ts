export type Client = {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
  status: "active" | "inactive" | "pending"
}

export const mockClients: Client[] = [

  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    createdAt: "2024-06-05",
    updatedAt: "2024-06-12",
    status: "inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    createdAt: "2024-05-22",
    updatedAt: "2024-06-02",
    status: "pending",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david@example.com",
    createdAt: "2024-05-15",
    updatedAt: "2024-06-14",
    status: "active",
  },
  {
    id: 5,
    name: "Eva Green",
    email: "eva@example.com",
    createdAt: "2024-06-03",
    updatedAt: "2024-06-09",
    status: "inactive",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    createdAt: "2024-05-29",
    updatedAt: "2024-06-11",
    status: "pending",
  },
    {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    createdAt: "2024-06-01",
    updatedAt: "2024-06-10",
    status: "active",
  },
  {
    id: 7,
    name: "Grace Kim",
    email: "grace@example.com",
    createdAt: "2024-06-07",
    updatedAt: "2024-06-15",
    status: "active",
  },
  {
    id: 8,
    name: "Henry Ford",
    email: "henry@example.com",
    createdAt: "2024-05-18",
    updatedAt: "2024-06-08",
    status: "inactive",
  },
  {
    id: 9,
    name: "Ivy Chen",
    email: "ivy@example.com",
    createdAt: "2024-06-04",
    updatedAt: "2024-06-13",
    status: "active",
  },
  {
    id: 10,
    name: "Jack Daniels",
    email: "jack@example.com",
    createdAt: "2024-05-25",
    updatedAt: "2024-06-05",
    status: "pending",
  },
]
