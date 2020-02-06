using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyType_Company_CompanyId1",
                table: "CompanyType");

            migrationBuilder.DropIndex(
                name: "IX_CompanyType_CompanyId1",
                table: "CompanyType");

            migrationBuilder.DropColumn(
                name: "CompanyId1",
                table: "CompanyType");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "d5242888-0800-44a4-b217-1f85f818616e", "AQAAAAEAACcQAAAAECPAHBIueMh2Vdfgd6kcNEp5nj3V5Xm/GDLu+lBFOGaJnFg8/tt8tnC4pFT56BQ50g==" });

            migrationBuilder.UpdateData(
                table: "Job",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2020, 2, 6, 9, 41, 44, 330, DateTimeKind.Local).AddTicks(9272));

            migrationBuilder.UpdateData(
                table: "Job",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2020, 2, 6, 9, 41, 44, 338, DateTimeKind.Local).AddTicks(7017));

            migrationBuilder.UpdateData(
                table: "Job",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2020, 2, 6, 9, 41, 44, 338, DateTimeKind.Local).AddTicks(7200));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId1",
                table: "CompanyType",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "61483380-808c-485e-a080-2a360d182350", "AQAAAAEAACcQAAAAEHMQ8d3mcnJ1H5K8+js6OL5KgKThl/G2UCV7EJrMXlFVXnQdCNBIzdcjhf8neycB8A==" });

            migrationBuilder.UpdateData(
                table: "Job",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2020, 2, 5, 14, 23, 21, 343, DateTimeKind.Local).AddTicks(1350));

            migrationBuilder.UpdateData(
                table: "Job",
                keyColumn: "Id",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2020, 2, 5, 14, 23, 21, 345, DateTimeKind.Local).AddTicks(8516));

            migrationBuilder.UpdateData(
                table: "Job",
                keyColumn: "Id",
                keyValue: 3,
                column: "Date",
                value: new DateTime(2020, 2, 5, 14, 23, 21, 345, DateTimeKind.Local).AddTicks(8664));

            migrationBuilder.CreateIndex(
                name: "IX_CompanyType_CompanyId1",
                table: "CompanyType",
                column: "CompanyId1",
                unique: true,
                filter: "[CompanyId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyType_Company_CompanyId1",
                table: "CompanyType",
                column: "CompanyId1",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
