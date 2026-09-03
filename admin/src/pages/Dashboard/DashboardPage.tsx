import StatCard from "./StatCard";
import Loader from "../../components/Loader/Loader";
import AttendanceTable from "../../features/attendance/components/AttendanceTable";

import styles from "./DashboardPage.module.css";

import { useGetTodayAttendance } from "../../features/attendance/hooks/useAttendance";

function DashboardPage() {
	const { data: attendanceData, isLoading } = useGetTodayAttendance();

	if (isLoading) {
		return (
			<div className={styles.loaderWrapper}>
				<Loader />
			</div>
		);
	}

	const formattedDate = attendanceData?.date
		? new Date(`${attendanceData.date}T00:00:00`).toLocaleDateString("en-US", {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric",
			})
		: "Today";

	const totalEmployees = attendanceData?.total_employees ?? 0;
	const present = attendanceData?.present ?? 0;
	const absent = attendanceData?.absent ?? 0;
	const currentlyIn = attendanceData?.currently_in ?? 0;
	const currentlyOut = attendanceData?.currently_out ?? 0;
	const late = attendanceData?.late ?? 0;

	const totalLateMinutes =
		attendanceData?.employees?.reduce(
			(total, employee) => total + (employee.late_minutes ?? 0),
			0
		) ?? 0;

	const formatLateTime = (minutes: number) => {
		if (minutes < 60) {
			return `${minutes} min`;
		}

		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;

		if (remainingMinutes === 0) {
			return `${hours}h`;
		}

		return `${hours}h ${remainingMinutes}m`;
	};

	const totalLateTime = formatLateTime(totalLateMinutes);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<p className={styles.title}>Attendance Overview</p>
					<p className={styles.date}>{formattedDate}</p>
				</div>
			</header>

			<section className={styles.stats}>
				<StatCard
					value={totalEmployees}
					label="Total Employees"
				/>

				<StatCard
					value={present}
					label="Present Today"
					variant="success"
				/>

				<StatCard
					value={absent}
					label="Absent Today"
					variant="info"
				/>

				<StatCard
					value={late}
					label="Late Today"
					variant="warning"
				/>
			</section>

			<div className={styles.overviewRow}>
				<section className={styles.compactOverviewCard}>
					<div className={styles.overviewHeader}>
						<div>
							<h2 className={styles.overviewTitle}>Current Presence</h2>
							<p className={styles.overviewSubtitle}>
								Live employee status
							</p>
						</div>
					</div>

					<div className={styles.compactPresenceGrid}>
						<div className={`${styles.compactPresenceItem} ${styles.in}`}>
							<span className={styles.presenceStatusDot} />

							<div>
								<span className={styles.compactPresenceValue}>
									{currentlyIn}
								</span>
								<span className={styles.presenceLabel}>
									In
								</span>
							</div>
						</div>

						<div className={`${styles.compactPresenceItem} ${styles.out}`}>
							<span className={styles.presenceStatusDot} />

							<div>
								<span className={styles.compactPresenceValue}>
									{currentlyOut}
								</span>
								<span className={styles.presenceLabel}>
									Out
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className={styles.overviewCard}>
					<div className={styles.overviewHeader}>
						<div>
							<h2 className={styles.overviewTitle}>Late Arrivals</h2>
							<p className={styles.overviewSubtitle}>
								Today's delay summary
							</p>
						</div>
					</div>

					<div className={styles.lateStats}>
						<div className={styles.lateMetric}>
							<span className={styles.lateValue}>{late}</span>
							<span className={styles.lateLabel}>
								{late === 1 ? "employee" : "employees"}
							</span>
						</div>

						<div className={styles.lateTimeMetric}>
							<span className={styles.lateTimeValue}>
								{totalLateTime}
							</span>
							<span className={styles.lateLabel}>
								total late time
							</span>
						</div>
					</div>
				</section>

				<section className={styles.overviewCard}>
					<div className={styles.overviewHeader}>
						<div>
							<h2 className={styles.overviewTitle}>
								Attendance Rate
							</h2>
							<p className={styles.overviewSubtitle}>
								Present employees today
							</p>
						</div>
					</div>

					<div className={styles.rateContent}>
						<span className={styles.rateValue}>
							{totalEmployees > 0
								? Math.round((present / totalEmployees) * 100)
								: 0}
							%
						</span>

						<div className={styles.rateProgress}>
							<div
								className={styles.rateProgressBar}
								style={{
									width:
										totalEmployees > 0
											? `${(present / totalEmployees) * 100}%`
											: "0%",
								}}
							/>
						</div>

						<span className={styles.rateLabel}>
							{present} of {totalEmployees} present
						</span>
					</div>
				</section>
			</div>

			<section className={styles.tableSection}>
				<div className={styles.sectionHeader}>
					<div>
						<h2>Today's Employee Status</h2>
						<p>
							Latest attendance status for each employee today.
						</p>
					</div>

					<span className={styles.employeeCount}>
						{attendanceData?.employees?.length ?? 0}{" "}
						{attendanceData?.employees?.length === 1
							? "employee"
							: "employees"}
					</span>
				</div>

				<AttendanceTable 
					employees={attendanceData?.employees ?? []}
					isLoading={isLoading}
				/>
			</section>
		</div>
	);
}

export default DashboardPage;