import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
const users = [
  {
    id: 1,
    name: "John Michael",
    email: "johnmichael@gmail.com",
    role: "Weaver",
    occupation: "Weavers",
  },
  {
    id: 2,
    name: "Paci Lou",
    email: "pacilou@gmail.com",
    role: "Other",
    occupation: "Engineer",
  },
  {
    id: 3,
    name: "Mary Jane",
    email: "maryjane@gmail.com",
    role: "Designer",
    occupation: "Graphic Artist",
  },
  {
    id: 4, 
    name: "Jade Stallone",
    email: "jadestallone@yahoo.com",
    role: "Weaver",
    occupation: "Fabricator",
  },
  {
    id: 5, 
    name: "Tony Stark",
    email: "tonystark",
    role: "Other",
    occupation: "Philantrophist",
  },
  {
    id: 6,
    name: "Bruce Wayne",
    email: "batman@gmail.com",
    role: "Designer",
    occupation: "CEO",
  },
  {
    id: 7,
    name: "Sydney Sweeney",
    email: "sydneysweeney@gmail.com",
    role: "Designer",
    occupation: "Media",
  },
]


export default function MembersTable() {
  return (
    <Table>
      <TableCaption>A list of your members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-lg">Name</TableHead>
          <TableHead className="font-bold text-lg">Email</TableHead>
          <TableHead className="font-bold text-lg">Role</TableHead>
          <TableHead className="font-bold text-lg">Occupation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.occupation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
  )
}