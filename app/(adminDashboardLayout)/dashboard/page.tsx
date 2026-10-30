import { DollarSign, Users } from 'lucide-react';
import { StatsCard } from './dashboard-overview/_component/StatsCard';
import { UserTable } from './dashboard-overview/_component/UserTable';
import { Pagination } from './dashboard-overview/_component/Pagination';

const allUsers = [
  { name: "Alex debid", email: "demoyour@gmail.com", access: "Monthly", status: "Active", date: "Dec 30, 2026" },
  { name: "Sarah Jenkins", email: "sarah.j@example.com", access: "Invited", status: "Active", date: "Jan 15, 2027" },
  { name: "Michael Chen", email: "m.chen@outlook.com", access: "Annual", status: "Active", date: "Mar 10, 2027" },
  { name: "Emma Wilson", email: "emma.w@gmail.com", access: "Annual", status: "Canceled", date: "Dec 12, 2026" },
  { name: "David Miller", email: "dmiller@company.com", access: "Invited", status: "Canceled", date: "Feb 20, 2027" },
  { name: "Jessica Taylor", email: "jtaylor@yahoo.com", access: "Monthly", status: "Active", date: "Jun 05, 2027" },
  { name: "Kevin Brown", email: "kbrown@tech.io", access: "Annual", status: "Active", date: "Apr 22, 2027" },
  { name: "Lisa Anderson", email: "lisa.a@service.com", access: "Monthly", status: "Active", date: "Jul 18, 2027" },
  { name: "Robert White", email: "rwhite@design.net", access: "Invited", status: "Active", date: "May 12, 2027" },
  { name: "Maria Garcia", email: "mgarcia@global.org", access: "Annual", status: "Active", date: "Aug 30, 2027" },
  { name: "James Wilson", email: "jwilson@mail.com", access: "Monthly", status: "Canceled", date: "Nov 02, 2026" },
  { name: "Patricia Moore", email: "pmoore@agency.com", access: "Annual", status: "Active", date: "Oct 14, 2027" },
  { name: "Christopher Lee", email: "clee@innovate.com", access: "Invited", status: "Active", date: "Sep 25, 2027" },
  { name: "Barbara Harris", email: "bharris@edu.net", access: "Monthly", status: "Active", date: "Jan 08, 2027" },
  { name: "Matthew Clark", email: "mclark@firm.com", access: "Annual", status: "Canceled", date: "Dec 20, 2026" },
  { name: "Susan Lewis", email: "slewis@health.org", access: "Invited", status: "Active", date: "Feb 14, 2027" },
  { name: "Andrew Walker", email: "awalker@dev.io", access: "Monthly", status: "Active", date: "Apr 01, 2027" },
  { name: "Linda Young", email: "lyoung@shop.com", access: "Annual", status: "Active", date: "May 20, 2027" },
  { name: "Steven Hall", email: "shall@news.com", access: "Monthly", status: "Active", date: "Jul 04, 2027" },
  { name: "Margaret Allen", email: "mallen@art.net", access: "Invited", status: "Canceled", date: "Oct 31, 2026" },
  { name: "Thomas King", email: "tking@music.com", access: "Annual", status: "Active", date: "Dec 15, 2027" },
  { name: "Dorothy Wright", email: "dwright@legal.io", access: "Monthly", status: "Active", date: "Mar 22, 2027" },
  { name: "Paul Scott", email: "pscott@build.com", access: "Invited", status: "Active", date: "Nov 11, 2027" },
  { name: "Karen Green", email: "kgreen@green.org", access: "Annual", status: "Active", date: "Aug 05, 2027" },
  { name: "Mark Adams", email: "madams@tech.com", access: "Monthly", status: "Canceled", date: "Jan 30, 2027" },
];

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardOverviewPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const currentPage = isNaN(page) ? 1 : page;
  
  const itemsPerPage = 7;
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = allUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard 
            title="Total revenue" 
            value="$152.22" 
            Icon={DollarSign}
            iconBgColor="bg-[#064E3B]"
            iconColor="text-[#10B981]"
          />
          <StatsCard 
            title="Total users" 
            value="1k" 
            Icon={Users}
            iconBgColor="bg-[#064E3B]/40"
            iconColor="text-[#10B981]"
          />
        </div>

        {/* Table Section */}
        <div className="space-y-4">
          <UserTable entries={currentUsers} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
          />
        </div>
        
      </div>
    </div>
  );
}
