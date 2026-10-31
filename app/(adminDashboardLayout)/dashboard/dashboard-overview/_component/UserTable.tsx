"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldCheck, UserCheck, Calendar, Users } from "lucide-react";

export interface UserEntry {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  phone?: string;
  location?: string;
  createdAt?: string;
}

interface UserTableProps {
  entries: UserEntry[];
}

export const UserTable = ({ entries }: UserTableProps) => {
  // Get initials
  const getInitials = (name?: string) => {
    if (!name) return "US";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-2xl border border-gray-200/80 text-gray-400">
        <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
        <p className="text-sm font-semibold text-gray-600">No client accounts yet</p>
        <p className="text-xs text-gray-400 mt-0.5">New registered accounts will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs font-['Urbanist',sans-serif]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/70 border-b border-gray-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-3.5 font-bold text-xs text-gray-600 uppercase tracking-wider">
                User / Client Name
              </TableHead>
              <TableHead className="px-6 py-3.5 font-bold text-xs text-gray-600 uppercase tracking-wider">
                Email Address
              </TableHead>
              <TableHead className="px-6 py-3.5 font-bold text-xs text-gray-600 uppercase tracking-wider">
                Access Role
              </TableHead>
              <TableHead className="px-6 py-3.5 font-bold text-xs text-gray-600 uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-6 py-3.5 font-bold text-xs text-gray-600 uppercase tracking-wider">
                Member Since
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-700 divide-y divide-gray-100">
            {entries.map((user, index) => {
              const isAdmin = user.role === "admin";
              return (
                <TableRow
                  key={user._id || index}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  {/* Name with initials badge */}
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isAdmin
                            ? "bg-[#004642] text-white"
                            : "bg-[#004642]/10 text-[#004642]"
                        }`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 leading-tight">
                          {user.name}
                        </p>
                        {user.location && (
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {user.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Email & Phone */}
                  <TableCell className="px-6 py-4">
                    <p className="text-xs font-medium text-gray-700">
                      {user.email}
                    </p>
                    {user.phone && (
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {user.phone}
                      </p>
                    )}
                  </TableCell>

                  {/* Role / Access */}
                  <TableCell className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        isAdmin
                          ? "bg-[#004642]/10 text-[#004642] border border-[#004642]/20"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {isAdmin ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : (
                        <UserCheck className="w-3 h-3" />
                      )}
                      <span>{isAdmin ? "Studio Admin" : "Client User"}</span>
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-6 py-4">
                    <span
                      className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        user.status === "blocked"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {user.status === "blocked" ? "● Blocked" : "● Active"}
                    </span>
                  </TableCell>

                  {/* Member Since Date */}
                  <TableCell className="px-6 py-4 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
