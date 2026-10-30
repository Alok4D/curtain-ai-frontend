import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserEntry {
  name: string;
  email: string;
  access: string;
  status: string;
  date: string;
}

interface UserTableProps {
  entries: UserEntry[];
}

export const UserTable = ({ entries }: UserTableProps) => {
  return (
    <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="text-gray-400 font-bold text-lg border-b border-[#1F2937] hover:bg-transparent">
            <TableHead className="px-6 py-5 font-normal text-gray-400 h-auto">User name</TableHead>
            <TableHead className="px-6 py-5 font-normal text-gray-400 h-auto">Email</TableHead>
            <TableHead className="px-6 py-5 font-normal text-gray-400 h-auto">Access Type</TableHead>
            <TableHead className="px-6 py-5 font-normal text-gray-400 h-auto">Status</TableHead>
            <TableHead className="px-6 py-5 font-normal text-gray-400 h-auto">Valid Until</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-300 border-none">
          {entries.map((user, index) => (
            <TableRow key={index} className="border-b border-[#1F2937] last:border-0 hover:bg-[#161B22] transition-colors">
              <TableCell className="px-6 py-5 font-medium text-gray-300">{user.name}</TableCell>
              <TableCell className="px-6 py-5 text-gray-400">{user.email}</TableCell>
              <TableCell className="px-6 py-5">
                <span className={
                  user.access === "Monthly" || user.access === "Annual" 
                  ? "text-[#22C55E]" 
                  : "text-[#4640DE]"
                }>
                  {user.access}
                </span>
              </TableCell>
              <TableCell className="px-6 py-5">
                <span className={`px-4 py-1 rounded-full text-xs font-medium ${
                  user.status === "Active" 
                  ? "bg-[#064E3B] text-[#10B981]" 
                  : "bg-[#450A0A] text-[#EF4444]"
                }`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="px-6 py-5 text-gray-300">{user.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
